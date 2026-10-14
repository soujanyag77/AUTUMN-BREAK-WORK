const https = require('https');
const fs = require('fs');
const path = require('path');

const MASTER_FOLDER_ID = '1RFLDeE-RARKYF-7YlMRpALc5_HfjoFc5';
const MASTER_DRIVE_URL = `https://drive.google.com/drive/folders/${MASTER_FOLDER_ID}?usp=drive_link`;

const ROMAN_MAP = {
  'I': 1,
  'II': 2,
  'III': 3,
  'IV': 4,
  'V': 5,
  'VI': 6,
  'VII': 7,
  'VIII': 8,
  'IX': 9,
  'X': 10,
  'XI': 11,
  'XII': 12
};

// Curriculum subjects defined by CBSE and user prompt
const CURRICULUM_SUBJECTS = {
  primary: ['English', 'Hindi', 'Sanskrit', 'Telugu', 'Maths', 'EVS', 'Computers', 'Art & Craft', 'TWAU'],
  middle: ['English', 'Hindi', 'Sanskrit', 'Telugu', 'Maths', 'Science', 'Social Science', 'AI Foundation'],
  secondary: ['English', 'Hindi', 'Telugu', 'Sanskrit', 'Mathematics', 'Science', 'Social Science', 'Artificial Intelligence'],
  seniorSecondary: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science (CS)', 'Artificial Intelligence (AI)', 'English Core', 'Hindi Core']
};

function getTierForClass(classNum) {
  const c = parseInt(classNum, 10);
  if (c >= 1 && c <= 5) return 'primary';
  if (c >= 6 && c <= 8) return 'middle';
  if (c >= 9 && c <= 10) return 'secondary';
  if (c >= 11 && c <= 12) return 'seniorSecondary';
  return 'primary';
}

function getSubjectsForClass(classNum) {
  const tier = getTierForClass(classNum);
  return CURRICULUM_SUBJECTS[tier] || [];
}

// Helper to fetch any Google Drive folder HTML and parse window['_DRIVE_ivd']
function fetchDriveFolderItems(folderId) {
  return new Promise((resolve) => {
    const url = `https://drive.google.com/drive/folders/${folderId}`;
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      timeout: 15000
    }, res => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        const match = html.match(/window\['_DRIVE_ivd'\]\s*=\s*'([^']+)'/);
        if (!match) return resolve([]);
        const raw = match[1];
        try {
          const decoded = raw.replace(/\\x([0-9A-Fa-f]{2})/g, (m, g) => String.fromCharCode(parseInt(g, 16)))
                             .replace(/\\\//g, '/');
          const data = JSON.parse(decoded);
          const items = [];
          function extract(arr) {
            if (!Array.isArray(arr)) return;
            for (const item of arr) {
              if (Array.isArray(item)) {
                if (typeof item[0] === 'string' && item[0].length >= 20 && typeof item[2] === 'string') {
                  items.push({
                    id: item[0],
                    name: item[2],
                    mimeType: item[3] || 'application/octet-stream',
                    size: item[4] || 0,
                    modifiedTime: item[10] || Date.now()
                  });
                } else {
                  extract(item);
                }
              }
            }
          }
          extract(data);
          resolve(items);
        } catch (e) {
          console.error(`Failed to parse IVD for ${folderId}:`, e.message);
          resolve([]);
        }
      });
    });

    req.on('error', err => {
      console.error(`Request error for folder ${folderId}:`, err.message);
      resolve([]);
    });

    req.on('timeout', () => {
      req.destroy();
      console.error(`Timeout fetching folder ${folderId}`);
      resolve([]);
    });
  });
}

// Special handler for camera photo uploads that have generic filenames
function getSpecialMetadata(fileId, fileName, classNum) {
  if (fileId === '1SIE7gdLSh3GcuoMgHFmUPNrkHUP7d_ys') {
    return {
      title: 'Class 4 English Holiday Homework - Grammar & Cursive Writing Sheet',
      subject: 'English',
      section: 'All Sections',
      description: 'Grammar practice: Noun, Pronoun, Verb, Adjective definitions and examples, sentence making, grammar chart, cursive writing.'
    };
  }
  if (fileId === '1TwEWpyF96qek28nd4nesU9dBP0rxMCyZ') {
    return {
      title: 'Class 4A TWAU Holiday Homework - Boat Making & Recycled Paper Activity',
      subject: 'TWAU',
      section: 'A',
      description: 'Eco-friendly project: Boat making with ice cream sticks/shells, homemade recycled paper with methi seeds, plastic waste management study.'
    };
  }
  return null;
}

function detectSubjectAndDetails(fileName, mimeType, classNum, fileId) {
  const special = getSpecialMetadata(fileId, fileName, classNum);
  if (special) return special;

  const lower = fileName.toLowerCase();
  const c = parseInt(classNum, 10);
  let subject = 'General / Interdisciplinary';
  let section = 'All Sections';

  // Section check
  if (/\b(?:sec|section)?\s*([1-9]|1[0-2])?[-_\s]*a\b/i.test(lower) && !lower.includes('art')) {
    if (lower.includes('4a') || lower.includes('class 4 a') || lower.includes('section a')) {
      section = 'A';
    }
  }
  if (/\b(?:sec|section)?\s*([1-9]|1[0-2])?[-_\s]*b\b/i.test(lower)) section = 'B';
  if (/\b(?:sec|section)?\s*([1-9]|1[0-2])?[-_\s]*c\b/i.test(lower)) section = 'C';
  if (/\b(?:sec|section)?\s*([1-9]|1[0-2])?[-_\s]*d\b/i.test(lower)) section = 'D';

  // Subject detection based on class tier
  if (c >= 11) {
    // Senior Secondary (11 & 12)
    if (lower.includes('physic')) subject = 'Physics';
    else if (lower.includes('chem')) subject = 'Chemistry';
    else if (lower.includes('bio')) subject = 'Biology';
    else if (lower.includes('math') || lower.includes('cbq')) subject = 'Mathematics';
    else if (lower.includes('cs') && lower.includes('ai')) subject = 'Computer Science (CS) / Artificial Intelligence (AI)';
    else if (lower.includes('cs') || lower.includes('computer')) subject = 'Computer Science (CS)';
    else if (lower.includes('ai') || lower.includes('artificial')) subject = 'Artificial Intelligence (AI)';
    else if (lower.includes('english') || lower.includes('eng')) subject = 'English Core';
    else if (lower.includes('hindi')) subject = 'Hindi Core';
  } else if (c >= 9) {
    // Secondary (9 & 10)
    if (lower.includes('sanskrit')) subject = 'Sanskrit';
    else if (lower.includes('telugu')) subject = 'Telugu';
    else if (lower.includes('hindi')) subject = 'Hindi';
    else if (lower.includes('english') || lower.includes('eng')) subject = 'English';
    else if (lower.includes('math') || lower.includes('cbq')) subject = 'Mathematics';
    else if (lower.includes('ai') || lower.includes('artificial')) subject = 'Artificial Intelligence';
    else if (lower.includes('social') || lower.includes('sst')) subject = 'Social Science';
    else if (lower.includes('bio') || lower.includes('chem') || lower.includes('physic') || lower.includes('science')) {
      // Secondary science can have chemistry / biology modules
      if (lower.includes('chem')) subject = 'Science (Chemistry)';
      else if (lower.includes('bio')) subject = 'Science (Biology)';
      else subject = 'Science';
    }
  } else if (c >= 6) {
    // Middle (6 to 8)
    if (lower.includes('sanskrit')) subject = 'Sanskrit';
    else if (lower.includes('telugu')) subject = 'Telugu';
    else if (lower.includes('hindi')) subject = 'Hindi';
    else if (lower.includes('english') || lower.includes('eng')) subject = 'English';
    else if (lower.includes('math')) subject = 'Maths';
    else if (lower.includes('ai') || lower.includes('artificial')) subject = 'AI Foundation';
    else if (lower.includes('social') || lower.includes('sst')) subject = 'Social Science';
    else if (lower.includes('science')) subject = 'Science';
  } else {
    // Primary (1 to 5)
    if (lower.includes('twau') || lower.includes('world around us')) subject = 'TWAU';
    else if (lower.includes('art') || lower.includes('craft')) subject = 'Art & Craft';
    else if (lower.includes('computer')) subject = 'Computers';
    else if (lower.includes('evs')) subject = 'EVS';
    else if (lower.includes('math')) subject = 'Maths';
    else if (lower.includes('sanskrit')) subject = 'Sanskrit';
    else if (lower.includes('telugu')) subject = 'Telugu';
    else if (lower.includes('hindi')) subject = 'Hindi';
    else if (lower.includes('english') || lower.includes('eng')) subject = 'English';
  }

  // Format clean title
  let cleanTitle = fileName
    .replace(/\.[a-zA-Z0-9]+$/, '') // remove extension
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Create friendly description
  let description = `Autumn Vacation 2026 assignment for ${subject}, Class ${classNum}.`;
  if (lower.includes('cbq')) {
    description = `CBSE Competency / Case-Based Questions (CBQ) Autumn practice set for ${subject}, Class ${classNum}.`;
  } else if (lower.includes('activity')) {
    description = `Activity & experiential learning holiday assignment for ${subject}, Class ${classNum}.`;
  }

  return {
    title: cleanTitle,
    subject,
    section,
    description
  };
}

function getFileTypeInfo(mimeType, fileName) {
  const lower = fileName.toLowerCase();
  if (mimeType === 'application/vnd.google-apps.document') {
    return {
      type: 'Google Doc',
      extension: 'gdoc',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
      iconName: 'file-text'
    };
  }
  if (lower.endsWith('.pdf') || mimeType === 'application/pdf') {
    return {
      type: 'PDF Document',
      extension: 'pdf',
      badgeClass: 'bg-red-100 text-red-800 border-red-200',
      iconName: 'file-text'
    };
  }
  if (lower.endsWith('.docx') || lower.endsWith('.doc') || mimeType.includes('word')) {
    return {
      type: 'Word Document',
      extension: 'docx',
      badgeClass: 'bg-sky-100 text-sky-800 border-sky-200',
      iconName: 'file-edit'
    };
  }
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png') || mimeType.startsWith('image/')) {
    return {
      type: 'Image Sheet',
      extension: 'jpg',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      iconName: 'image'
    };
  }
  return {
    type: 'Document',
    extension: 'file',
    badgeClass: 'bg-gray-100 text-gray-800 border-gray-200',
    iconName: 'file'
  };
}

function getSubjectIcon(subject) {
  const s = (subject || '').toLowerCase();
  if (s.includes('physics')) return 'Atom';
  if (s.includes('chemistry')) return 'FlaskConical';
  if (s.includes('bio') || s.includes('microscope')) return 'Microscope';
  if (s.includes('math')) return 'Calculator';
  if (s.includes('computer') || s.includes('ai') || s.includes('cs')) return 'Cpu';
  if (s.includes('art') || s.includes('craft')) return 'Palette';
  if (s.includes('evs') || s.includes('twau') || s.includes('nature')) return 'Leaf';
  if (s.includes('social') || s.includes('globe')) return 'Globe';
  return 'BookOpen'; // Languages (English, Hindi, Telugu, Sanskrit)
}

class DriveSyncService {
  constructor() {
    this.cacheFile = path.join(__dirname, 'data', 'homework_cache.json');
    this.isSyncing = false;
    this.lastSyncTime = null;
    this.lastSyncStatus = 'INITIALIZING';
    this.homeworkData = [];
    this.classFolders = [];
    this.loadFromCache();
  }

  loadFromCache() {
    try {
      if (fs.existsSync(this.cacheFile)) {
        const raw = fs.readFileSync(this.cacheFile, 'utf8');
        const parsed = JSON.parse(raw);
        this.homeworkData = parsed.homework || [];
        this.classFolders = parsed.classFolders || [];
        this.lastSyncTime = parsed.lastSyncTime || null;
        this.lastSyncStatus = 'CACHED_READY';
        console.log(`Loaded ${this.homeworkData.length} homework items from cache.`);
      }
    } catch (e) {
      console.error('Error loading homework cache:', e.message);
    }
  }

  saveToCache() {
    try {
      const dataDir = path.dirname(this.cacheFile);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const payload = {
        lastSyncTime: this.lastSyncTime,
        lastSyncStatus: this.lastSyncStatus,
        masterDriveUrl: MASTER_DRIVE_URL,
        masterFolderId: MASTER_FOLDER_ID,
        totalItems: this.homeworkData.length,
        classFolders: this.classFolders,
        homework: this.homeworkData
      };
      fs.writeFileSync(this.cacheFile, JSON.stringify(payload, null, 2), 'utf8');
      console.log(`Saved ${this.homeworkData.length} items to disk cache.`);
    } catch (e) {
      console.error('Error saving cache to disk:', e.message);
    }
  }

  async syncWithDrive() {
    if (this.isSyncing) {
      console.log('Sync already in progress, skipping duplicate call.');
      return { status: 'already_syncing', lastSyncTime: this.lastSyncTime, count: this.homeworkData.length };
    }

    this.isSyncing = true;
    console.log(`[DriveSync] Starting live fetch from Google Drive folder: ${MASTER_FOLDER_ID}...`);

    try {
      // 1. Fetch top-level folder items (Class folders I through XII)
      const rootItems = await fetchDriveFolderItems(MASTER_FOLDER_ID);
      console.log(`[DriveSync] Found ${rootItems.length} items in root folder.`);

      const detectedClassFolders = [];
      for (const item of rootItems) {
        const nameUpper = item.name.trim().toUpperCase();
        if (ROMAN_MAP[nameUpper]) {
          detectedClassFolders.push({
            roman: nameUpper,
            classNum: ROMAN_MAP[nameUpper],
            folderId: item.id,
            folderName: item.name
          });
        }
      }

      // Sort class folders by classNum 1..12
      detectedClassFolders.sort((a, b) => a.classNum - b.classNum);
      this.classFolders = detectedClassFolders;

      // 2. Fetch files from all class folders in parallel for ultra-fast sync (<1.5s)
      console.log(`[DriveSync] Fetching ${detectedClassFolders.length} class folders in parallel...`);
      const folderFetchPromises = detectedClassFolders.map(async (cf) => {
        try {
          const files = await fetchDriveFolderItems(cf.folderId);
          return { cf, files };
        } catch (e) {
          console.error(`Error fetching folder for Class ${cf.classNum}:`, e.message);
          return { cf, files: [] };
        }
      });

      const folderResults = await Promise.all(folderFetchPromises);
      const allHomework = [];

      for (const { cf, files } of folderResults) {
        for (const f of files) {
          const fileTypeInfo = getFileTypeInfo(f.mimeType, f.name);
          const meta = detectSubjectAndDetails(f.name, f.mimeType, cf.classNum, f.id);
          const icon = getSubjectIcon(meta.subject);

          // Build preview & download URLs
          let previewUrl = `https://drive.google.com/file/d/${f.id}/preview`;
          let viewUrl = `https://drive.google.com/file/d/${f.id}/view?usp=sharing`;
          let downloadUrl = `https://drive.google.com/uc?export=download&id=${f.id}`;

          if (f.mimeType === 'application/vnd.google-apps.document') {
            previewUrl = `https://docs.google.com/document/d/${f.id}/preview`;
            viewUrl = `https://docs.google.com/document/d/${f.id}/edit`;
            downloadUrl = `https://docs.google.com/document/d/${f.id}/export?format=pdf`;
          }

          allHomework.push({
            id: f.id,
            classNum: cf.classNum,
            classRoman: cf.roman,
            tier: getTierForClass(cf.classNum),
            folderId: cf.folderId,
            folderUrl: `https://drive.google.com/drive/folders/${cf.folderId}`,
            originalName: f.name,
            title: meta.title,
            subject: meta.subject,
            section: meta.section,
            description: meta.description,
            mimeType: f.mimeType,
            fileType: fileTypeInfo.type,
            fileExtension: fileTypeInfo.extension,
            badgeClass: fileTypeInfo.badgeClass,
            iconName: icon,
            previewUrl,
            viewUrl,
            downloadUrl,
            modifiedTime: f.modifiedTime,
            formattedDate: new Date(f.modifiedTime || Date.now()).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })
          });
        }
      }

      this.homeworkData = allHomework;
      this.lastSyncTime = new Date().toISOString();
      this.lastSyncStatus = 'SYNCED_SUCCESS';
      this.saveToCache();

      console.log(`[DriveSync] Successfully synced! Total homework files: ${allHomework.length}`);
      return {
        status: 'success',
        lastSyncTime: this.lastSyncTime,
        count: allHomework.length,
        classes: detectedClassFolders.length
      };
    } catch (err) {
      console.error('[DriveSync] Sync error:', err.message);
      this.lastSyncStatus = 'SYNC_ERROR';
      return {
        status: 'error',
        message: err.message,
        lastSyncTime: this.lastSyncTime,
        count: this.homeworkData.length
      };
    } finally {
      this.isSyncing = false;
    }
  }

  getData() {
    return {
      masterDriveUrl: MASTER_DRIVE_URL,
      masterFolderId: MASTER_FOLDER_ID,
      lastSyncTime: this.lastSyncTime,
      lastSyncStatus: this.lastSyncStatus,
      isSyncing: this.isSyncing,
      totalItems: this.homeworkData.length,
      curriculum: CURRICULUM_SUBJECTS,
      classFolders: this.classFolders,
      homework: this.homeworkData
    };
  }
}

module.exports = {
  DriveSyncService,
  MASTER_DRIVE_URL,
  MASTER_FOLDER_ID,
  CURRICULUM_SUBJECTS,
  getSubjectsForClass,
  getTierForClass,
  getSubjectIcon
};
