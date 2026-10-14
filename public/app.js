/**
 * CBSE Autumn Break Holiday Homework Portal (October 2026)
 * Real-time Google Drive Sync, Reopening Countdown & Coverage Tracker
 */

// Official CBSE Curriculum Subject mapping as specified in instructions
const CURRICULUM_SUBJECTS = {
  primary: [
    'English', 'Hindi', 'Sanskrit', 'Telugu', 'Maths', 'EVS', 'Computers', 'Art & Craft', 'TWAU'
  ],
  middle: [
    'English', 'Hindi', 'Sanskrit', 'Telugu', 'Maths', 'Science', 'Social Science', 'AI Foundation'
  ],
  secondary: [
    'English', 'Hindi', 'Telugu', 'Sanskrit', 'Mathematics', 'Science', 'Social Science', 'Artificial Intelligence'
  ],
  seniorSecondary: [
    'Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science (CS)', 'Artificial Intelligence (AI)', 'English Core', 'Hindi Core'
  ]
};

// Target Reopening Date: October 26, 2026 at 08:00:00 AM IST (Vacation is 15/10/2026 to 25/10/2026)
const REOPENING_TARGET_TIME = new Date('2026-10-26T08:00:00+05:30').getTime();

function getSubjectLucideIcon(subject) {
  const s = (subject || '').toLowerCase();
  if (s.includes('physics')) return 'atom';
  if (s.includes('chemistry')) return 'flask-conical';
  if (s.includes('bio') || s.includes('microscope')) return 'microscope';
  if (s.includes('math')) return 'calculator';
  if (s.includes('computer') || s.includes('ai') || s.includes('cs')) return 'cpu';
  if (s.includes('art') || s.includes('craft')) return 'palette';
  if (s.includes('evs') || s.includes('twau') || s.includes('nature') || s.includes('leaf')) return 'leaf';
  if (s.includes('social') || s.includes('globe')) return 'globe';
  return 'book-open'; // Languages: English, Hindi, Sanskrit, Telugu
}

const SVG_ICONS = {
  'leaf': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  'tree-pine': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2a1 1 0 0 1-.8-1.6L12 3l4 4.4a1 1 0 0 1-.8 1.6h-.2l3 3.3a1 1 0 0 1-.7 1.7H17z"/><path d="M12 22v-3"/></svg>`,
  'book-open': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  'book': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>`,
  'graduation-cap': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-.838L12.83 2.18a2 2 0 0 0-1.66 0L2.6 10.084a1 1 0 0 0 0 1.832l8.57 7.908a2 2 0 0 0 1.66 0l8.57-7.908a1 1 0 0 0 .02-.994z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  'refresh-cw': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
  'printer': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>`,
  'sparkles': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
  'alert-circle': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
  'clock': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  'calendar': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  'calendar-check': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>`,
  'layers': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  'chevron-down': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  'users': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  'search': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`,
  'layout-grid': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>`,
  'list-checks': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>`,
  'table': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>`,
  'rotate-ccw': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,
  'check-square': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
  'file-question': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M10 10.3c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.6.6.7 1.5.3 2.2-.4.6-1.3 1.1-1.3 1.6"/><path d="M12 17h.01"/></svg>`,
  'info': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>`,
  'edit-3': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  'palette': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  'file-text': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>`,
  'download': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
  'x': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>`,
  'arrow-up': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="19" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`,
  'check': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  'check-circle-2': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
  'circle': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`,
  'eye': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  'atom': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 8.3c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/></svg>`,
  'flask-conical': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>`,
  'microscope': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="m14 22 3-3 3 3"/><path d="M18 14h-8"/><path d="M9 14a6 6 0 0 0 6-6V3"/><path d="M12 21a3 3 0 0 0 3-3v-4"/></svg>`,
  'calculator': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>`,
  'cpu': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
  'globe': `<svg xmlns="http://www.w3.org/2000/svg" class="ICON_CLASS" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`
};

function renderIconSvg(name, extraClasses = 'w-5 h-5') {
  const tpl = SVG_ICONS[name] || SVG_ICONS['book-open'];
  return tpl.replace('ICON_CLASS', extraClasses);
}

function replaceDataLucideIcons(root = document) {
  // If Lucide is available, run it safely
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    try {
      window.lucide.createIcons();
    } catch (e) {
      console.warn('Lucide createIcons notice:', e);
    }
  }

  // Self-contained inline SVG fallback for all remaining [data-lucide] tags
  const remaining = root.querySelectorAll('[data-lucide]');
  remaining.forEach(el => {
    const name = el.getAttribute('data-lucide');
    const svgStr = SVG_ICONS[name] || SVG_ICONS['book-open'];
    if (svgStr) {
      const cls = el.getAttribute('class') || '';
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgStr.replace('ICON_CLASS', cls), 'image/svg+xml');
      const svg = doc.querySelector('svg');
      if (svg) {
        if (el.id) svg.id = el.id;
        el.parentNode.replaceChild(svg, el);
      }
    }
  });
}

class HomeworkPortalApp {
  constructor() {
    this.homeworkList = [];
    this.filteredList = [];
    this.classFolders = [];
    this.lastSyncTime = null;
    this.selectedClass = 'all';
    this.selectedSection = 'all';
    this.selectedSubject = 'all';
    this.selectedStatusFilter = 'all'; // 'all' | 'uploaded' | 'pending'
    this.searchQuery = '';
    this.currentViewMode = 'grid'; // 'grid' | 'docket' | 'table'
    this.completedItems = new Set();
    this.isSyncing = false;

    this.initElements();
    this.startCountdownTimer();
    this.loadCompletedFromStorage();
    this.bindEvents();
    this.renderClassPills();
    this.fetchData();
  }

  initElements() {
    this.classSelect = document.getElementById('classSelect');
    this.sectionSelect = document.getElementById('sectionSelect');
    this.subjectSelect = document.getElementById('subjectSelect');
    this.searchInput = document.getElementById('searchInput');
    this.subjectTierIndicator = document.getElementById('subjectTierIndicator');
    this.resultsCountBadge = document.getElementById('resultsCountBadge');
    this.cardsView = document.getElementById('cardsView');
    this.tableView = document.getElementById('tableView');
    this.tableBody = document.getElementById('tableBody');
    this.subjectDocketSection = document.getElementById('subjectDocketSection');
    this.docketSubjectList = document.getElementById('docketSubjectList');
    this.docketTitle = document.getElementById('docketTitle');
    this.emptyState = document.getElementById('emptyState');
    this.classPillsContainer = document.getElementById('classPillsContainer');
    this.syncDriveBtn = document.getElementById('syncDriveBtn');
    this.syncIcon = document.getElementById('syncIcon');
    this.navTotalBadge = document.getElementById('navTotalBadge');

    // Countdown elements
    this.countDays = document.getElementById('countDays');
    this.countHours = document.getElementById('countHours');
    this.countMins = document.getElementById('countMins');
    this.countSecs = document.getElementById('countSecs');

    // Hero stat cards
    this.heroUploadedCount = document.getElementById('heroUploadedCount');
    this.heroFilesCount = document.getElementById('heroFilesCount');
    this.heroPendingCount = document.getElementById('heroPendingCount');

    // Uploaded vs Pending Status Bar elements
    this.activeClassLabelBadge = document.getElementById('activeClassLabelBadge');
    this.statusAllCount = document.getElementById('statusAllCount');
    this.statusUploadedCount = document.getElementById('statusUploadedCount');
    this.statusPendingCount = document.getElementById('statusPendingCount');
    this.filterStatusAll = document.getElementById('filterStatusAll');
    this.filterStatusUploaded = document.getElementById('filterStatusUploaded');
    this.filterStatusPending = document.getElementById('filterStatusPending');
    this.coveragePercentText = document.getElementById('coveragePercentText');
    this.coverageUploadedBar = document.getElementById('coverageUploadedBar');
    this.coveragePendingBar = document.getElementById('coveragePendingBar');
    this.barUploadedLabel = document.getElementById('barUploadedLabel');
    this.barPendingLabel = document.getElementById('barPendingLabel');

    // Top Tabs
    this.tabStudentZone = document.getElementById('tabStudentZone');
    this.tabCoverageMatrix = document.getElementById('tabCoverageMatrix');

    // Modal elements
    this.previewModal = document.getElementById('previewModal');
    this.closeModalBtn = document.getElementById('closeModalBtn');
    this.closeModalOverlay = document.getElementById('closeModalOverlay');
    this.previewIframe = document.getElementById('previewIframe');
    this.modalSpinner = document.getElementById('modalSpinner');
    this.imagePreviewContainer = document.getElementById('imagePreviewContainer');
    this.imagePreview = document.getElementById('imagePreview');
    this.modalTitle = document.getElementById('modalTitle');
    this.modalClassBadge = document.getElementById('modalClassBadge');
    this.modalSubjectBadge = document.getElementById('modalSubjectBadge');
    this.modalFileTypeBadge = document.getElementById('modalFileTypeBadge');
    this.modalSubjectIcon = document.getElementById('modalSubjectIcon');
    this.modalDownloadBtn = document.getElementById('modalDownloadBtn');
    this.modalDriveBtn = document.getElementById('modalDriveBtn');
    this.modalDescription = document.getElementById('modalDescription');

    // View toggles
    this.viewGridBtn = document.getElementById('viewGridBtn');
    this.viewDocketBtn = document.getElementById('viewDocketBtn');
    this.viewTableBtn = document.getElementById('viewTableBtn');
    this.resetFiltersBtn = document.getElementById('resetFiltersBtn');
    this.printBtn = document.getElementById('printBtn');
  }

  // School Reopening Live Countdown Timer
  startCountdownTimer() {
    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, REOPENING_TARGET_TIME - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const pad = (n) => String(n).padStart(2, '0');

      if (this.countDays) this.countDays.textContent = pad(days);
      if (this.countHours) this.countHours.textContent = pad(hours);
      if (this.countMins) this.countMins.textContent = pad(mins);
      if (this.countSecs) this.countSecs.textContent = pad(secs);
    };

    update();
    setInterval(update, 1000);
  }

  loadCompletedFromStorage() {
    try {
      const stored = localStorage.getItem('cbse_autumn_hw_completed_items');
      if (stored) {
        this.completedItems = new Set(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read completed items from storage', e);
    }
  }

  saveCompletedToStorage() {
    try {
      localStorage.setItem('cbse_autumn_hw_completed_items', JSON.stringify(Array.from(this.completedItems)));
    } catch (e) {
      console.warn('Could not save completed items', e);
    }
  }

  toggleItemComplete(id) {
    if (this.completedItems.has(id)) {
      this.completedItems.delete(id);
      this.showToast('Marked as pending', 'info');
    } else {
      this.completedItems.add(id);
      this.showToast('Marked as completed! Great progress! 🍁', 'success');

      const allCurrentDone = this.filteredList.length > 0 && this.filteredList.every(i => this.completedItems.has(i.id));
      if (allCurrentDone && typeof confetti === 'function') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
    this.saveCompletedToStorage();
    this.renderCurrentView();
  }

  getTier(classNum) {
    if (classNum === 'all') return 'all';
    const c = parseInt(classNum, 10);
    if (c >= 1 && c <= 5) return 'primary';
    if (c >= 6 && c <= 8) return 'middle';
    if (c >= 9 && c <= 10) return 'secondary';
    if (c >= 11 && c <= 12) return 'seniorSecondary';
    return 'all';
  }

  bindEvents() {
    // Class select
    this.classSelect.addEventListener('change', (e) => {
      this.selectedClass = e.target.value;
      this.updateSubjectDropdown();
      this.filterHomework();
      this.highlightClassPill();
      this.calculateUploadStats();
    });

    // Section select
    this.sectionSelect.addEventListener('change', (e) => {
      this.selectedSection = e.target.value;
      this.filterHomework();
    });

    // Subject select
    this.subjectSelect.addEventListener('change', (e) => {
      this.selectedSubject = e.target.value;
      this.filterHomework();
    });

    // Search input
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      this.filterHomework();
    });

    // Quick jump buttons in hero
    document.querySelectorAll('[data-jump]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const jump = e.currentTarget.dataset.jump;
        if (jump === 'primary') this.classSelect.value = '1';
        else if (jump === 'middle') this.classSelect.value = '6';
        else if (jump === 'secondary') this.classSelect.value = '9';
        else if (jump === 'senior') this.classSelect.value = '11';
        this.classSelect.dispatchEvent(new Event('change'));
        // Smooth scroll to assignments
        document.getElementById('uploadPendingStatusBar').scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Upload / Pending status filter buttons
    this.filterStatusAll.addEventListener('click', () => this.setStatusFilter('all'));
    this.filterStatusUploaded.addEventListener('click', () => this.setStatusFilter('uploaded'));
    this.filterStatusPending.addEventListener('click', () => this.setStatusFilter('pending'));

    // Top Tabs
    this.tabStudentZone.addEventListener('click', () => {
      this.switchView('grid');
      this.tabStudentZone.className = 'nav-tab-active inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition active:scale-95';
      this.tabCoverageMatrix.className = 'nav-tab-inactive inline-flex items-center gap-2 px-3 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition active:scale-95 border border-transparent hover:border-amber-200';
    });

    this.tabCoverageMatrix.addEventListener('click', () => {
      this.switchView('docket');
      this.tabCoverageMatrix.className = 'nav-tab-active inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition active:scale-95';
      this.tabStudentZone.className = 'nav-tab-inactive inline-flex items-center gap-2 px-3 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition active:scale-95 border border-transparent hover:border-amber-200';
      document.getElementById('subjectDocketSection').scrollIntoView({ behavior: 'smooth' });
    });

    // Reset filters
    this.resetFiltersBtn.addEventListener('click', () => {
      this.selectedClass = 'all';
      this.selectedSection = 'all';
      this.selectedSubject = 'all';
      this.selectedStatusFilter = 'all';
      this.searchQuery = '';
      this.classSelect.value = 'all';
      this.sectionSelect.value = 'all';
      this.searchInput.value = '';
      this.updateSubjectDropdown();
      this.setStatusFilter('all');
      this.filterHomework();
      this.highlightClassPill();
      this.calculateUploadStats();
    });

    // View Switchers
    this.viewGridBtn.addEventListener('click', () => this.switchView('grid'));
    this.viewDocketBtn.addEventListener('click', () => this.switchView('docket'));
    this.viewTableBtn.addEventListener('click', () => this.switchView('table'));

    // Sync button
    this.syncDriveBtn.addEventListener('click', () => this.syncWithDrive());

    // Modal Close
    this.closeModalBtn.addEventListener('click', () => this.closePreviewModal());
    this.closeModalOverlay.addEventListener('click', () => this.closePreviewModal());
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.previewModal.classList.contains('hidden')) {
        this.closePreviewModal();
      }
    });

    // Print button
    this.printBtn.addEventListener('click', () => {
      const printDate = document.getElementById('printDate');
      if (printDate) printDate.textContent = new Date().toLocaleDateString('en-IN', { dateStyle: 'full' });
      const printClass = document.getElementById('printClassBadge');
      if (printClass) {
        printClass.textContent = this.selectedClass === 'all' ? 'All Classes (1 to 12)' : `Class ${this.selectedClass}`;
      }
      window.print();
    });
  }

  setStatusFilter(filter) {
    this.selectedStatusFilter = filter;
    const activeBtnClass = 'px-3 py-1.5 rounded-lg font-bold bg-white text-slate-800 shadow-xs transition';
    const inactiveBtnClass = 'px-3 py-1.5 rounded-lg font-semibold text-slate-600 hover:bg-white/60 transition';

    this.filterStatusAll.className = filter === 'all' ? activeBtnClass : inactiveBtnClass;
    this.filterStatusUploaded.className = filter === 'uploaded' ? activeBtnClass : inactiveBtnClass;
    this.filterStatusPending.className = filter === 'pending' ? activeBtnClass : inactiveBtnClass;

    if (filter === 'pending') {
      this.switchView('docket');
    } else {
      this.filterHomework();
    }
  }

  switchView(mode) {
    this.currentViewMode = mode;
    const activeClass = 'inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold shadow-xs';
    const inactiveClass = 'inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium';

    this.viewGridBtn.className = mode === 'grid' ? activeClass : inactiveClass;
    this.viewDocketBtn.className = mode === 'docket' ? activeClass : inactiveClass;
    this.viewTableBtn.className = mode === 'table' ? activeClass : inactiveClass;

    this.renderCurrentView();
  }

  renderClassPills() {
    this.classPillsContainer.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = 'class-pill whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ' +
      (this.selectedClass === 'all' ? 'bg-amber-600 text-white shadow-xs' : 'bg-white hover:bg-amber-50 text-slate-700 border border-amber-200');
    allBtn.innerHTML = `<span>All Classes</span>`;
    allBtn.addEventListener('click', () => {
      this.classSelect.value = 'all';
      this.classSelect.dispatchEvent(new Event('change'));
    });
    this.classPillsContainer.appendChild(allBtn);

    for (let i = 1; i <= 12; i++) {
      const btn = document.createElement('button');
      btn.dataset.classNum = i;
      btn.className = 'class-pill whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ' +
        (this.selectedClass === String(i) ? 'bg-amber-600 text-white shadow-xs' : 'bg-white hover:bg-amber-50 text-slate-700 border border-amber-200');
      btn.innerHTML = `<span>Class ${i}</span>`;
      btn.addEventListener('click', () => {
        this.classSelect.value = String(i);
        this.classSelect.dispatchEvent(new Event('change'));
      });
      this.classPillsContainer.appendChild(btn);
    }
  }

  highlightClassPill() {
    const pills = this.classPillsContainer.querySelectorAll('.class-pill');
    pills.forEach((p) => {
      const c = p.dataset.classNum || 'all';
      if (c === this.selectedClass) {
        p.className = 'class-pill whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 bg-amber-600 text-white shadow-xs';
      } else {
        p.className = 'class-pill whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 bg-white hover:bg-amber-50 text-slate-700 border border-amber-200';
      }
    });
  }

  updateSubjectDropdown() {
    const tier = this.getTier(this.selectedClass);
    let subjects = [];

    if (tier === 'all') {
      const allSubs = new Set();
      Object.values(CURRICULUM_SUBJECTS).forEach(list => list.forEach(s => allSubs.add(s)));
      subjects = Array.from(allSubs);
      this.subjectTierIndicator.textContent = '(all levels)';
    } else {
      subjects = CURRICULUM_SUBJECTS[tier] || [];
      this.subjectTierIndicator.textContent = `(${tier} tier)`;
    }

    const currentVal = this.subjectSelect.value;
    this.subjectSelect.innerHTML = `<option value="all">All Subjects</option>`;

    subjects.forEach((subj) => {
      const opt = document.createElement('option');
      opt.value = subj;
      opt.textContent = subj;
      this.subjectSelect.appendChild(opt);
    });

    if (subjects.includes(currentVal)) {
      this.subjectSelect.value = currentVal;
    } else {
      this.subjectSelect.value = 'all';
      this.selectedSubject = 'all';
    }
  }

  // Calculate exact Uploaded vs Pending counts based on selected class or total school
  calculateUploadStats() {
    let classesToCalculate = [];
    if (this.selectedClass === 'all') {
      classesToCalculate = Array.from({ length: 12 }, (_, i) => i + 1);
    } else {
      classesToCalculate = [parseInt(this.selectedClass, 10)];
    }

    let totalSlots = 0;
    let uploadedSlots = 0;
    let pendingSlots = 0;

    classesToCalculate.forEach(c => {
      const tier = this.getTier(String(c));
      const subs = CURRICULUM_SUBJECTS[tier] || [];
      totalSlots += subs.length;

      subs.forEach(subj => {
        const hasHomework = this.homeworkList.some(item => {
          if (String(item.classNum) !== String(c)) return false;
          const s = (item.subject || '').toLowerCase();
          const target = subj.toLowerCase();
          if (s === target) return true;
          if (target.includes('math') && s.includes('math')) return true;
          if (target.includes('science') && s.includes('science')) return true;
          if (target.includes('ai') && s.includes('ai')) return true;
          if (target.includes('cs') && s.includes('cs')) return true;
          if (target.includes('english') && s.includes('english')) return true;
          if (target.includes('hindi') && s.includes('hindi')) return true;
          return false;
        });

        if (hasHomework) {
          uploadedSlots++;
        } else {
          pendingSlots++;
        }
      });
    });

    const percent = totalSlots > 0 ? Math.round((uploadedSlots / totalSlots) * 100) : 0;

    // Update Uploaded vs Pending detail bar
    if (this.activeClassLabelBadge) {
      this.activeClassLabelBadge.textContent = this.selectedClass === 'all' ? 'All Classes (1 to 12)' : `Class ${this.selectedClass}`;
    }
    if (this.statusAllCount) this.statusAllCount.textContent = totalSlots;
    if (this.statusUploadedCount) this.statusUploadedCount.textContent = uploadedSlots;
    if (this.statusPendingCount) this.statusPendingCount.textContent = pendingSlots;

    if (this.coveragePercentText) this.coveragePercentText.textContent = `${percent}% Uploaded (${uploadedSlots}/${totalSlots})`;
    if (this.coverageUploadedBar) this.coverageUploadedBar.style.width = `${percent}%`;
    if (this.coveragePendingBar) this.coveragePendingBar.style.width = `${100 - percent}%`;

    if (this.barUploadedLabel) this.barUploadedLabel.textContent = `${uploadedSlots} Uploaded`;
    if (this.barPendingLabel) this.barPendingLabel.textContent = `${pendingSlots} Pending Upload`;

    // Update Hero Stats
    if (this.heroUploadedCount) this.heroUploadedCount.textContent = this.selectedClass === 'all' ? this.homeworkList.length : uploadedSlots;
    if (this.heroFilesCount) this.heroFilesCount.textContent = this.selectedClass === 'all' ? this.homeworkList.length : this.filteredList.length;
    if (this.heroPendingCount) this.heroPendingCount.textContent = pendingSlots;
  }

  async fetchData() {
    try {
      const res = await fetch('/api/homework');
      if (!res.ok) throw new Error('API network error');
      const data = await res.json();
      
      this.homeworkList = data.homework || [];
      this.classFolders = data.classFolders || [];
      this.lastSyncTime = data.lastSyncTime || null;

      if (this.navTotalBadge) this.navTotalBadge.textContent = this.homeworkList.length;

      this.updateSubjectDropdown();
      this.filterHomework();
      this.updatePillCounts();
      this.calculateUploadStats();

      // Automatically sync live with Google Drive on every page load/refresh
      console.log('[Portal] Triggering on-refresh live Drive synchronization...');
      this.syncWithDrive({ isBackground: true });
    } catch (err) {
      console.error('Fetch error:', err);
      this.showToast('Loaded offline holiday homework cache', 'info');
    }

    // Auto-sync on tab refocus and periodic 90s interval
    window.addEventListener('focus', () => {
      this.syncWithDrive({ isBackground: true });
    });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.syncWithDrive({ isBackground: true });
      }
    });
    setInterval(() => {
      this.syncWithDrive({ isBackground: true });
    }, 90 * 1000);
  }

  updatePillCounts() {
    const pills = this.classPillsContainer.querySelectorAll('.class-pill');
    pills.forEach((p) => {
      const c = p.dataset.classNum;
      if (c) {
        const count = this.homeworkList.filter(item => String(item.classNum) === c).length;
        p.innerHTML = `<span>Class ${c}</span><span class="text-[10px] px-1.5 py-0.2 rounded-full ${this.selectedClass === c ? 'bg-amber-800 text-white' : 'bg-amber-100 text-amber-900'}">${count}</span>`;
      }
    });
  }

  async syncWithDrive(options = {}) {
    const isBackground = options.isBackground || false;
    if (this.isSyncing) return;
    this.isSyncing = true;

    if (!isBackground) {
      this.syncDriveBtn.disabled = true;
      this.syncIcon.classList.add('animate-spin');
      this.showToast('Checking Google Drive for newly uploaded assignments...', 'info');
    }

    try {
      const prevCount = this.homeworkList.length;
      const res = await fetch('/api/sync', { method: 'POST' });
      const result = await res.json();

      if (result.success && result.data) {
        const newHomework = result.data.homework || [];
        const newCount = newHomework.length;
        this.homeworkList = newHomework;
        this.lastSyncTime = result.data.lastSyncTime;

        if (this.navTotalBadge) this.navTotalBadge.textContent = this.homeworkList.length;

        this.filterHomework();
        this.updatePillCounts();
        this.calculateUploadStats();

        if (newCount > prevCount) {
          const added = newCount - prevCount;
          this.showToast(`✨ ${added} newly uploaded assignment(s) found in Google Drive!`, 'success');
        } else if (!isBackground) {
          this.showToast(`Up to date! ${this.homeworkList.length} assignments active from Google Drive.`, 'success');
        }
      } else {
        throw new Error(result.message || 'Sync response unsuccessful');
      }
    } catch (err) {
      console.warn('Sync notice:', err.message);
      if (!isBackground) {
        this.showToast('Google Drive synced from cached repository.', 'info');
      }
    } finally {
      this.isSyncing = false;
      this.syncDriveBtn.disabled = false;
      this.syncIcon.classList.remove('animate-spin');
    }
  }

  filterHomework() {
    let list = [...this.homeworkList];

    // Filter by Class
    if (this.selectedClass !== 'all') {
      list = list.filter(item => String(item.classNum) === this.selectedClass);
    }

    // Filter by Section
    if (this.selectedSection !== 'all') {
      list = list.filter(item => item.section === 'All Sections' || item.section === this.selectedSection);
    }

    // Filter by Subject
    if (this.selectedSubject !== 'all') {
      const target = this.selectedSubject.toLowerCase();
      list = list.filter(item => {
        const s = (item.subject || '').toLowerCase();
        if (s === target) return true;
        if (target.includes('math') && s.includes('math')) return true;
        if (target.includes('science') && s.includes('science')) return true;
        if (target.includes('ai') && s.includes('ai')) return true;
        if (target.includes('cs') && s.includes('cs')) return true;
        if (target.includes('english') && s.includes('english')) return true;
        if (target.includes('hindi') && s.includes('hindi')) return true;
        return false;
      });
    }

    // Search query
    if (this.searchQuery) {
      const q = this.searchQuery;
      list = list.filter(item => {
        return (item.title && item.title.toLowerCase().includes(q)) ||
               (item.subject && item.subject.toLowerCase().includes(q)) ||
               (item.originalName && item.originalName.toLowerCase().includes(q)) ||
               (item.description && item.description.toLowerCase().includes(q)) ||
               (item.fileType && item.fileType.toLowerCase().includes(q));
      });
    }

    this.filteredList = list;
    this.resultsCountBadge.textContent = `Showing ${list.length} Assignment${list.length === 1 ? '' : 's'}`;
    this.calculateUploadStats();
    this.renderCurrentView();
  }

  renderCurrentView() {
    if (this.filteredList.length === 0 && this.selectedStatusFilter !== 'pending') {
      this.cardsView.classList.add('hidden');
      this.tableView.classList.add('hidden');
      this.subjectDocketSection.classList.add('hidden');
      this.emptyState.classList.remove('hidden');

      const msg = document.getElementById('emptyStateMsg');
      if (this.selectedClass !== 'all' && this.selectedSubject !== 'all') {
        msg.textContent = `No homework uploaded for Class ${this.selectedClass} - ${this.selectedSubject}. Check Google Drive or click Subject Docket to view pending status.`;
      } else {
        msg.textContent = `No assignments match your filter. Try resetting filters or clicking Refresh Drive.`;
      }
      return;
    }

    this.emptyState.classList.add('hidden');

    if (this.currentViewMode === 'grid') {
      this.cardsView.classList.remove('hidden');
      this.tableView.classList.add('hidden');
      this.subjectDocketSection.classList.add('hidden');
      this.renderCards();
    } else if (this.currentViewMode === 'docket') {
      this.cardsView.classList.add('hidden');
      this.tableView.classList.add('hidden');
      this.subjectDocketSection.classList.remove('hidden');
      this.renderDocket();
    } else if (this.currentViewMode === 'table') {
      this.cardsView.classList.add('hidden');
      this.tableView.classList.remove('hidden');
      this.subjectDocketSection.classList.add('hidden');
      this.renderTable();
    }

    replaceDataLucideIcons(document);
  }

  renderCards() {
    this.cardsView.innerHTML = '';

    this.filteredList.forEach((item) => {
      const isDone = this.completedItems.has(item.id);
      const iconName = getSubjectLucideIcon(item.subject);

      const card = document.createElement('div');
      card.className = `harvest-card rounded-2xl bg-white p-5 flex flex-col justify-between transition-all relative overflow-hidden ${
        isDone ? 'border-emerald-300 bg-emerald-50/20' : 'shadow-xs'
      }`;

      card.innerHTML = `
        <div>
          <!-- Top Tag Bar -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                Class ${item.classNum}
              </span>
              <span class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700">
                ${item.section === 'All Sections' ? 'All Secs' : `Sec ${item.section}`}
              </span>
              <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border ${item.badgeClass || 'bg-gray-100 text-gray-800'}">
                ${item.fileType}
              </span>
            </div>

            <!-- Complete Toggle Checkbox -->
            <button class="complete-toggle p-1 rounded-lg text-slate-400 hover:text-emerald-700 transition" title="${isDone ? 'Mark as incomplete' : 'Mark as complete'}" data-id="${item.id}">
              ${isDone 
                ? `<span class="inline-flex items-center text-emerald-600 font-bold text-xs gap-1">${renderIconSvg('check-circle-2', 'w-5 h-5 text-emerald-600')} <span class="hidden sm:inline">Done</span></span>` 
                : `<span class="inline-flex items-center text-slate-400 hover:text-amber-700 text-xs gap-1">${renderIconSvg('circle', 'w-5 h-5 text-slate-400')} <span class="hidden sm:inline">Check</span></span>`
              }
            </button>
          </div>

          <!-- Subject Title with Icon -->
          <div class="flex items-start gap-3 mt-1 mb-2">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              ${renderIconSvg(iconName, 'w-5 h-5 text-white')}
            </div>
            <div class="min-w-0 flex-1">
              <span class="text-xs font-bold uppercase tracking-wider text-amber-800">${item.subject}</span>
              <h3 class="text-base font-bold text-slate-900 leading-snug line-clamp-2 ${isDone ? 'line-through text-slate-500' : ''}">
                ${item.title}
              </h3>
            </div>
          </div>

          <!-- Description -->
          <p class="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
            ${item.description || 'Autumn break assignment. Please complete and submit on reopening day.'}
          </p>
        </div>

        <!-- Footer / Metadata and Actions -->
        <div class="mt-5 pt-3 border-t border-slate-100">
          <div class="flex items-center justify-between text-[11px] text-slate-400 mb-3">
            <span class="truncate max-w-[180px]" title="${item.originalName}">${item.originalName}</span>
            <span>${item.formattedDate || 'Oct 2026'}</span>
          </div>

          <div class="grid grid-cols-2 gap-2.5">
            <button class="preview-btn inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition active:scale-95" data-id="${item.id}">
              ${renderIconSvg('eye', 'w-4 h-4')}
              <span>Preview</span>
            </button>

            <a href="${item.downloadUrl}" target="_blank" download class="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition active:scale-95">
              ${renderIconSvg('download', 'w-4 h-4')}
              <span>Download</span>
            </a>
          </div>
        </div>
      `;

      card.querySelector('.complete-toggle').addEventListener('click', () => {
        this.toggleItemComplete(item.id);
      });

      card.querySelector('.preview-btn').addEventListener('click', () => {
        this.openPreviewModal(item);
      });

      this.cardsView.appendChild(card);
    });
  }

  renderDocket() {
    this.subjectDocketSection.classList.remove('hidden');
    this.docketSubjectList.innerHTML = '';

    const tier = this.getTier(this.selectedClass);
    const curriculum = (tier !== 'all' && CURRICULUM_SUBJECTS[tier]) 
      ? CURRICULUM_SUBJECTS[tier] 
      : Object.values(CURRICULUM_SUBJECTS).flat();
    
    const uniqueCurriculum = Array.from(new Set(curriculum));
    this.docketTitle.textContent = this.selectedClass === 'all' 
      ? 'CBSE Subject Docket & Pending Uploads (All Classes)' 
      : `Class ${this.selectedClass} CBSE Subject Coverage & Pending Docket`;

    uniqueCurriculum.forEach((subj) => {
      const matching = this.filteredList.filter(item => {
        const s = (item.subject || '').toLowerCase();
        const target = subj.toLowerCase();
        if (s === target) return true;
        if (target.includes('math') && s.includes('math')) return true;
        if (target.includes('science') && s.includes('science')) return true;
        if (target.includes('ai') && s.includes('ai')) return true;
        if (target.includes('cs') && s.includes('cs')) return true;
        if (target.includes('english') && s.includes('english')) return true;
        if (target.includes('hindi') && s.includes('hindi')) return true;
        return false;
      });

      const iconName = getSubjectLucideIcon(subj);
      const isUploaded = matching.length > 0;
      const allDone = isUploaded && matching.every(m => this.completedItems.has(m.id));

      const card = document.createElement('div');
      card.className = `p-4 rounded-2xl border transition-all ${
        isUploaded 
          ? (allDone ? 'bg-emerald-50/70 border-emerald-300' : 'bg-white border-amber-200 shadow-xs') 
          : 'bg-orange-50/40 border-dashed border-orange-300'
      }`;

      card.innerHTML = `
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg ${isUploaded ? 'bg-emerald-600 text-white' : 'bg-orange-200 text-orange-800'} flex items-center justify-center font-bold">
              ${renderIconSvg(iconName, 'w-4 h-4')}
            </div>
            <span class="text-sm font-bold text-slate-800">${subj}</span>
          </div>
          ${isUploaded 
            ? `<span class="text-[11px] font-bold px-2 py-0.5 rounded-full ${allDone ? 'bg-emerald-200 text-emerald-900' : 'bg-emerald-100 text-emerald-800'}">✓ ${matching.length} Uploaded</span>`
            : `<span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">⏳ Pending Upload</span>`
          }
        </div>

        ${isUploaded ? `
          <ul class="mt-2 space-y-1.5 text-xs text-slate-600">
            ${matching.map(m => `
              <li class="flex items-center justify-between gap-1 p-1.5 rounded-lg bg-amber-50/60 hover:bg-amber-100/60 transition">
                <span class="truncate ${this.completedItems.has(m.id) ? 'line-through text-slate-400' : ''}">${m.title}</span>
                <button class="docket-preview-btn text-amber-700 hover:text-amber-900 font-bold ml-1 flex-shrink-0" data-id="${m.id}">View</button>
              </li>
            `).join('')}
          </ul>
        ` : `
          <div class="mt-2 pt-2 border-t border-orange-200/50 flex items-center justify-between text-[11px] text-orange-800">
            <span>Awaiting teacher upload / In progress</span>
            <button onclick="document.getElementById('syncDriveBtn').click()" class="underline font-bold text-orange-700 hover:text-orange-900">Refresh</button>
          </div>
        `}
      `;

      card.querySelectorAll('.docket-preview-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          const found = this.filteredList.find(i => i.id === id);
          if (found) this.openPreviewModal(found);
        });
      });

      this.docketSubjectList.appendChild(card);
    });
  }

  renderTable() {
    this.tableBody.innerHTML = '';

    this.filteredList.forEach((item) => {
      const isDone = this.completedItems.has(item.id);
      const iconName = getSubjectLucideIcon(item.subject);

      const row = document.createElement('tr');
      row.className = `hover:bg-amber-50/50 transition ${isDone ? 'bg-emerald-50/20' : ''}`;

      row.innerHTML = `
        <td class="py-3 px-4">
          <button class="table-complete-toggle text-slate-400 hover:text-emerald-700 transition" data-id="${item.id}">
            ${isDone 
              ? renderIconSvg('check-circle-2', 'w-5 h-5 text-emerald-600') 
              : renderIconSvg('circle', 'w-5 h-5 text-slate-400')
            }
          </button>
        </td>
        <td class="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
          Class ${item.classNum} <span class="text-xs font-normal text-slate-500">${item.section === 'All Sections' ? '' : `(${item.section})`}</span>
        </td>
        <td class="py-3 px-4 whitespace-nowrap">
          <span class="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800">
            ${renderIconSvg(iconName, 'w-3.5 h-3.5 text-amber-700')}
            ${item.subject}
          </span>
        </td>
        <td class="py-3 px-4">
          <div class="font-bold text-slate-900 ${isDone ? 'line-through text-slate-400' : ''}">${item.title}</div>
          <div class="text-[11px] text-slate-500 truncate max-w-xs">${item.description}</div>
        </td>
        <td class="py-3 px-4 whitespace-nowrap">
          <span class="px-2 py-0.5 rounded text-[11px] font-semibold ${item.badgeClass || 'bg-gray-100'}">
            ${item.fileType}
          </span>
        </td>
        <td class="py-3 px-4 text-xs text-slate-500 whitespace-nowrap">
          ${item.formattedDate || 'Oct 2026'}
        </td>
        <td class="py-3 px-4 text-right whitespace-nowrap">
          <div class="inline-flex items-center gap-2">
            <button class="table-preview-btn p-1.5 rounded-lg text-amber-700 hover:bg-amber-100 transition" title="Preview" data-id="${item.id}">
              ${renderIconSvg('eye', 'w-4 h-4')}
            </button>
            <a href="${item.downloadUrl}" target="_blank" download class="p-1.5 rounded-lg text-amber-700 hover:bg-amber-100 transition" title="Download">
              ${renderIconSvg('download', 'w-4 h-4')}
            </a>
          </div>
        </td>
      `;

      row.querySelector('.table-complete-toggle').addEventListener('click', () => {
        this.toggleItemComplete(item.id);
      });

      row.querySelector('.table-preview-btn').addEventListener('click', () => {
        this.openPreviewModal(item);
      });

      this.tableBody.appendChild(row);
    });
  }

  openPreviewModal(item) {
    this.modalTitle.textContent = item.title;
    this.modalClassBadge.textContent = `Class ${item.classNum}`;
    this.modalSubjectBadge.textContent = item.subject;
    this.modalFileTypeBadge.textContent = item.fileType;
    this.modalDescription.textContent = item.description || `Original file: ${item.originalName}`;

    this.modalDownloadBtn.href = item.downloadUrl;
    if (this.modalDriveBtn) {
      this.modalDriveBtn.href = item.viewUrl;
    }

    const iconName = getSubjectLucideIcon(item.subject);
    this.modalSubjectIcon.innerHTML = renderIconSvg(iconName, 'w-5 h-5 text-white');

    if (item.fileExtension === 'jpg' || item.fileExtension === 'jpeg' || item.fileExtension === 'png') {
      this.previewIframe.classList.add('hidden');
      this.modalSpinner.classList.add('hidden');
      this.imagePreviewContainer.classList.remove('hidden');
      this.imagePreview.src = `https://drive.google.com/uc?export=view&id=${item.id}`;
    } else {
      this.imagePreviewContainer.classList.add('hidden');
      this.previewIframe.classList.remove('hidden');
      this.modalSpinner.classList.remove('hidden');

      this.previewIframe.onload = () => {
        this.modalSpinner.classList.add('hidden');
      };

      this.previewIframe.src = item.previewUrl;
    }

    this.previewModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  closePreviewModal() {
    this.previewModal.classList.add('hidden');
    this.previewIframe.src = 'about:blank';
    this.imagePreview.src = '';
    document.body.classList.remove('overflow-hidden');
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    const colorClasses = {
      info: 'bg-slate-900 text-white border-amber-500/40',
      success: 'bg-emerald-900 text-white border-emerald-500',
      warning: 'bg-amber-900 text-white border-amber-500'
    };

    toast.className = `pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-semibold shadow-xl border transition-all duration-300 transform translate-y-2 opacity-0 ${colorClasses[type] || colorClasses.info}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '🍂' : (type === 'warning' ? '⚠️' : 'ℹ️')}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  replaceDataLucideIcons(document);
  window.portalApp = new HomeworkPortalApp();
});
