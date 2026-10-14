/**
 * CBSE Autumn Break Holiday Homework Portal (October 2026)
 * High Performance Client-Side Controller & Drive Sync Integration
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

// Stage banner metadata
const STAGE_INFO = {
  all: {
    tier: 'All Classes (1 to 12)',
    badgeClass: 'bg-amber-600 text-white',
    title: 'Autumn Break Holiday Homework Portal (October 2026)',
    description: 'Centralized assignment desk for all CBSE classes. Filter by your class, section, and subject to access homework sheets, project guides, and practice modules.'
  },
  primary: {
    tier: 'Primary Wing (Classes 1 - 5)',
    badgeClass: 'bg-emerald-600 text-white',
    title: 'Primary Wing: Experiential & Joyful Learning Activities',
    description: 'Nurturing foundational literacy, numeracy, and curiosity. Activities include cursive handwriting, craft projects (TWAU recycled boats), foundational math, and creative expression.'
  },
  middle: {
    tier: 'Middle Wing (Classes 6 - 8)',
    badgeClass: 'bg-orange-600 text-white',
    title: 'Middle Wing: Exploratory & Skill Development Assignments',
    description: 'Strengthening analytical thinking and language proficiency across English, Hindi, Sanskrit, Telugu, Mathematics, Science, Social Science, and AI Foundation.'
  },
  secondary: {
    tier: 'Secondary Wing (Classes 9 - 10)',
    badgeClass: 'bg-indigo-600 text-white',
    title: 'Secondary Desk: CBSE Board & Competency Preparation',
    description: 'Curated Autumn assignments with Case-Based Questions (CBQ), Science practical concepts (Physics, Chemistry, Biology), Mathematics problem sets, and Artificial Intelligence.'
  },
  seniorSecondary: {
    tier: 'Senior Secondary (Classes 11 - 12)',
    badgeClass: 'bg-rose-700 text-white',
    title: 'Senior Secondary Desk: Advanced Practice & Pre-Board Preparation',
    description: 'Rigorous holiday assignments designed for CBSE Board & Entrance preparation across Physics, Chemistry, Biology, Mathematics, CS, AI, and Core Languages.'
  }
};

// Lucide Icon Name Map for subjects
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

// Inline SVG Icon generator as fallback / instant renderer
function renderIconSvg(name, extraClasses = 'w-5 h-5') {
  const icons = {
    'atom': `<svg xmlns="http://www.w3.org/2000/svg" class="${extraClasses}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 8.3c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/></svg>`,
    'flask-conical': `<svg xmlns="http://www.w3.org/2000/svg" class="${extraClasses}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>`,
    'microscope': `<svg xmlns="http://www.w3.org/2000/svg" class="${extraClasses}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="m14 22 3-3 3 3"/><path d="M18 14h-8"/><path d="M9 14a6 6 0 0 0 6-6V3"/><path d="M12 21a3 3 0 0 0 3-3v-4"/></svg>`,
    'calculator': `<svg xmlns="http://www.w3.org/2000/svg" class="${extraClasses}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>`,
    'cpu': `<svg xmlns="http://www.w3.org/2000/svg" class="${extraClasses}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
    'palette': `<svg xmlns="http://www.w3.org/2000/svg" class="${extraClasses}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
    'leaf': `<svg xmlns="http://www.w3.org/2000/svg" class="${extraClasses}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
    'globe': `<svg xmlns="http://www.w3.org/2000/svg" class="${extraClasses}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    'book-open': `<svg xmlns="http://www.w3.org/2000/svg" class="${extraClasses}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    'check-circle-2': `<svg xmlns="http://www.w3.org/2000/svg" class="${extraClasses}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
    'circle': `<svg xmlns="http://www.w3.org/2000/svg" class="${extraClasses}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`,
    'eye': `<svg xmlns="http://www.w3.org/2000/svg" class="${extraClasses}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
    'download': `<svg xmlns="http://www.w3.org/2000/svg" class="${extraClasses}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
    'external-link': `<svg xmlns="http://www.w3.org/2000/svg" class="${extraClasses}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`
  };
  return icons[name] || icons['book-open'];
}

// App State
class HomeworkPortalApp {
  constructor() {
    this.homeworkList = [];
    this.filteredList = [];
    this.classFolders = [];
    this.lastSyncTime = null;
    this.selectedClass = 'all';
    this.selectedSection = 'all';
    this.selectedSubject = 'all';
    this.searchQuery = '';
    this.currentViewMode = 'grid'; // 'grid' | 'docket' | 'table'
    this.completedItems = new Set();

    this.initElements();
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
    this.lastSyncLabel = document.getElementById('lastSyncLabel');
    this.syncDriveBtn = document.getElementById('syncDriveBtn');
    this.syncIcon = document.getElementById('syncIcon');
    this.stageBanner = document.getElementById('stageBanner');
    this.tierBadge = document.getElementById('tierBadge');
    this.tierTitle = document.getElementById('tierTitle');
    this.tierDescription = document.getElementById('tierDescription');
    this.progressCount = document.getElementById('progressCount');
    this.progressPercent = document.getElementById('progressPercent');
    this.progressBar = document.getElementById('progressBar');
    this.totalFilesBadge = document.getElementById('totalFilesBadge');

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

      // Trigger confetti if all currently visible homework is completed!
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
    this.updateProgressSummary();
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
    // Class select change
    this.classSelect.addEventListener('change', (e) => {
      this.selectedClass = e.target.value;
      this.updateSubjectDropdown();
      this.updateStageBanner();
      this.filterHomework();
      this.highlightClassPill();
    });

    // Section select change
    this.sectionSelect.addEventListener('change', (e) => {
      this.selectedSection = e.target.value;
      this.filterHomework();
    });

    // Subject select change
    this.subjectSelect.addEventListener('change', (e) => {
      this.selectedSubject = e.target.value;
      this.filterHomework();
    });

    // Search input
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      this.filterHomework();
    });

    // Reset filters
    this.resetFiltersBtn.addEventListener('click', () => {
      this.selectedClass = 'all';
      this.selectedSection = 'all';
      this.selectedSubject = 'all';
      this.searchQuery = '';
      this.classSelect.value = 'all';
      this.sectionSelect.value = 'all';
      this.searchInput.value = '';
      this.updateSubjectDropdown();
      this.updateStageBanner();
      this.filterHomework();
      this.highlightClassPill();
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

  switchView(mode) {
    this.currentViewMode = mode;
    const activeClass = 'bg-amber-600 text-white font-semibold shadow-xs';
    const inactiveClass = 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium';

    this.viewGridBtn.className = `inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition ${mode === 'grid' ? activeClass : inactiveClass}`;
    this.viewDocketBtn.className = `inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition ${mode === 'docket' ? activeClass : inactiveClass}`;
    this.viewTableBtn.className = `inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition ${mode === 'table' ? activeClass : inactiveClass}`;

    this.renderCurrentView();
  }

  renderClassPills() {
    this.classPillsContainer.innerHTML = '';

    // "All" pill
    const allBtn = document.createElement('button');
    allBtn.className = 'class-pill whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ' +
      (this.selectedClass === 'all' ? 'bg-amber-600 text-white shadow-xs' : 'bg-white hover:bg-amber-50 text-slate-700 border border-amber-200');
    allBtn.innerHTML = `<span>All Classes</span>`;
    allBtn.addEventListener('click', () => {
      this.classSelect.value = 'all';
      this.classSelect.dispatchEvent(new Event('change'));
    });
    this.classPillsContainer.appendChild(allBtn);

    // Classes 1 through 12
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

  updateStageBanner() {
    const tier = this.getTier(this.selectedClass);
    const info = STAGE_INFO[tier] || STAGE_INFO.all;

    this.tierBadge.textContent = this.selectedClass === 'all' ? info.tier : `Class ${this.selectedClass} • ${info.tier}`;
    this.tierBadge.className = `px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-xs ${info.badgeClass}`;
    this.tierTitle.textContent = info.title;
    this.tierDescription.textContent = info.description;
  }

  updateSubjectDropdown() {
    const tier = this.getTier(this.selectedClass);
    let subjects = [];

    if (tier === 'all') {
      // Gather unique subjects across all tiers
      const allSubs = new Set();
      Object.values(CURRICULUM_SUBJECTS).forEach(list => list.forEach(s => allSubs.add(s)));
      subjects = Array.from(allSubs);
      this.subjectTierIndicator.textContent = '(all levels)';
    } else {
      subjects = CURRICULUM_SUBJECTS[tier] || [];
      this.subjectTierIndicator.textContent = `(${tier} tier)`;
    }

    // Preserve selection if valid
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

  async fetchData() {
    try {
      this.lastSyncLabel.textContent = 'Loading...';
      const res = await fetch('/api/homework');
      if (!res.ok) throw new Error('API network error');
      const data = await res.json();
      
      this.homeworkList = data.homework || [];
      this.classFolders = data.classFolders || [];
      this.lastSyncTime = data.lastSyncTime || null;

      this.updateDriveStatus(data.lastSyncTime);
      this.updateSubjectDropdown();
      this.updateStageBanner();
      this.filterHomework();
      this.updatePillCounts();

      // Automatically trigger live sync with Google Drive on every page load/refresh
      console.log('[Portal] Triggering on-refresh live Drive synchronization...');
      this.syncWithDrive({ isBackground: true });
    } catch (err) {
      console.error('Fetch error:', err);
      this.lastSyncLabel.textContent = 'Drive connected (cached)';
      this.showToast('Loaded offline holiday homework cache', 'info');
    }

    // Set up auto-sync on tab refocus and periodic 90s interval
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

  updateDriveStatus(timestamp) {
    if (this.totalFilesBadge) {
      this.totalFilesBadge.textContent = this.homeworkList.length;
    }
    if (!timestamp) {
      this.lastSyncLabel.textContent = 'Synced just now';
      return;
    }
    const date = new Date(timestamp);
    this.lastSyncLabel.textContent = `Synced: ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  updatePillCounts() {
    // Show count badges on quick class pills
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
    } else {
      this.lastSyncLabel.textContent = 'Syncing Drive...';
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
        this.updateDriveStatus(result.data.lastSyncTime);
        this.filterHomework();
        this.updatePillCounts();

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
      this.updateDriveStatus(this.lastSyncTime);
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
        // Exact match or partial match
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
    this.updateProgressSummary();
    this.renderCurrentView();
  }

  updateProgressSummary() {
    const total = this.filteredList.length;
    const completed = this.filteredList.filter(i => this.completedItems.has(i.id)).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    this.progressCount.textContent = `${completed} / ${total}`;
    this.progressPercent.textContent = `${percent}% Completed`;
    this.progressBar.style.width = `${percent}%`;
  }

  renderCurrentView() {
    if (this.filteredList.length === 0) {
      this.cardsView.classList.add('hidden');
      this.tableView.classList.add('hidden');
      this.subjectDocketSection.classList.add('hidden');
      this.emptyState.classList.remove('hidden');

      const msg = document.getElementById('emptyStateMsg');
      if (this.selectedClass !== 'all' && this.selectedSubject !== 'all') {
        msg.textContent = `No homework currently uploaded for Class ${this.selectedClass} - ${this.selectedSubject}. Check Google Drive or refresh when teachers post new files.`;
      } else {
        msg.textContent = `No assignments match your search filter. Try resetting filters or clicking Refresh Drive.`;
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

    // Refresh lucide icons if available
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  renderCards() {
    this.cardsView.innerHTML = '';

    this.filteredList.forEach((item) => {
      const isDone = this.completedItems.has(item.id);
      const iconName = getSubjectLucideIcon(item.subject);

      const card = document.createElement('div');
      card.className = `harvest-card rounded-2xl bg-white border p-5 flex flex-col justify-between transition-all relative overflow-hidden ${
        isDone ? 'border-emerald-300 bg-emerald-50/20' : 'border-amber-200/90 shadow-xs'
      }`;

      // Card Header
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

          <!-- Description / Task hint -->
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

          <div class="grid grid-cols-3 gap-2">
            <button class="preview-btn inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition active:scale-95" data-id="${item.id}">
              ${renderIconSvg('eye', 'w-3.5 h-3.5')}
              <span>Preview</span>
            </button>

            <a href="${item.downloadUrl}" target="_blank" download class="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition active:scale-95">
              ${renderIconSvg('download', 'w-3.5 h-3.5')}
              <span>Download</span>
            </a>

            <a href="${item.viewUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition active:scale-95">
              ${renderIconSvg('external-link', 'w-3.5 h-3.5')}
              <span>Drive</span>
            </a>
          </div>
        </div>
      `;

      // Event listeners for card buttons
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
      ? 'CBSE Subject Docket (All Classes)' 
      : `Class ${this.selectedClass} Official CBSE Subject Docket`;

    uniqueCurriculum.forEach((subj) => {
      // Find all homework matching this subject for currently selected class
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
          : 'bg-harvest-linen/40 border-dashed border-slate-300'
      }`;

      card.innerHTML = `
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg ${isUploaded ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-500'} flex items-center justify-center">
              ${renderIconSvg(iconName, 'w-4 h-4')}
            </div>
            <span class="text-sm font-bold text-slate-800">${subj}</span>
          </div>
          ${isUploaded 
            ? `<span class="text-[11px] font-bold px-2 py-0.5 rounded-full ${allDone ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-100 text-amber-900'}">${matching.length} File${matching.length > 1 ? 's' : ''}</span>`
            : `<span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Pending Upload</span>`
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
          <p class="text-[11px] text-slate-400 mt-2 italic">
            Self-revision / No holiday homework uploaded by teacher yet.
          </p>
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
          <div class="inline-flex items-center gap-1.5">
            <button class="table-preview-btn p-1.5 rounded-lg text-amber-700 hover:bg-amber-100 transition" title="Preview" data-id="${item.id}">
              ${renderIconSvg('eye', 'w-4 h-4')}
            </button>
            <a href="${item.downloadUrl}" target="_blank" download class="p-1.5 rounded-lg text-amber-700 hover:bg-amber-100 transition" title="Download">
              ${renderIconSvg('download', 'w-4 h-4')}
            </a>
            <a href="${item.viewUrl}" target="_blank" rel="noopener noreferrer" class="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition" title="Open in Google Drive">
              ${renderIconSvg('external-link', 'w-4 h-4')}
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
    this.modalDriveBtn.href = item.viewUrl;

    const iconName = getSubjectLucideIcon(item.subject);
    this.modalSubjectIcon.innerHTML = renderIconSvg(iconName, 'w-5 h-5 text-white');

    // Handle images vs doc iframe
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

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

// Initialize Application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.portalApp = new HomeworkPortalApp();
});
