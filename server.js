const express = require('express');
const cors = require('cors');
const path = require('path');
const { DriveSyncService, MASTER_DRIVE_URL, MASTER_FOLDER_ID, CURRICULUM_SUBJECTS } = require('./driveSync');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const driveService = new DriveSyncService();

// Trigger an initial sync on server start if cache is empty or older than 15 minutes
const fifteenMinutesAgo = Date.now() - 15 * 60 * 1000;
if (!driveService.lastSyncTime || new Date(driveService.lastSyncTime).getTime() < fifteenMinutesAgo) {
  console.log('[Server] Performing initial Drive sync...');
  driveService.syncWithDrive().catch(err => {
    console.error('[Server] Initial sync failed:', err.message);
  });
}

// Automatic periodic sync every 3 minutes in background
setInterval(() => {
  console.log('[Server] Running background Google Drive sync check...');
  driveService.syncWithDrive().catch(err => {
    console.error('[Server] Periodic sync error:', err.message);
  });
}, 3 * 60 * 1000);

// API Routes
app.get('/api/homework', async (req, res) => {
  // If client requested a force sync on load/refresh, sync live from Drive
  if (req.query.refresh === 'true' || req.query.sync === 'true') {
    try {
      await driveService.syncWithDrive();
    } catch (e) {
      console.error('[Server] On-refresh sync error:', e.message);
    }
  }
  res.json(driveService.getData());
});

app.all('/api/sync', async (req, res) => {
  try {
    const previousCount = driveService.homeworkData.length;
    const result = await driveService.syncWithDrive();
    const currentCount = driveService.homeworkData.length;
    res.json({
      success: true,
      newFilesCount: Math.max(0, currentCount - previousCount),
      ...result,
      data: driveService.getData()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    itemsCount: driveService.homeworkData.length,
    lastSyncTime: driveService.lastSyncTime
  });
});

// Fallback to index.html for SPA navigation
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`PMSHRI KENDRIYA VIDYALAYA TENALI PORTAL for VACATION WORK`);
  console.log(`Server running at: http://localhost:${PORT}`);
  console.log(`Work Submission Date: 26/10/2026 (Reopening Day)`);
  console.log(`====================================================`);
});
