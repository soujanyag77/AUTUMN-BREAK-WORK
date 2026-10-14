# CBSE Autumn Break Holiday Homework Portal (October 2026)

A web application designed for students (Classes 1–12), parents, and faculty to access autumn vacation homework dockets class-wise and subject-wise with real-time synchronization with the official Google Drive repository.

---

## 🎨 Theme & Visual Aesthetics
- **Theme**: Warm Autumn Harvest Palette
  - **Amber Gold**: `#D97706` / `#F59E0B`
  - **Pumpkin Orange**: `#EA580C` / `#FB923C`
  - **Forest Pine Green**: `#166534` / `#15803D`
  - **Warm Linen / Cream Background**: `#FDFBF7`
  - **Slate Dark Typography**: `#1E293B`
- **Target Audience & Persona**:
  - **Primary Wing (Classes 1–5)**: Warm, friendly, experiential learning focus (handwriting, craft, TWAU boat-making & recycled paper activities).
  - **Middle Wing (Classes 6–8)**: Structured exploratory projects and AI Foundation learning.
  - **Secondary (Classes 9–10)**: CBSE Board & Competency-Based Questions (CBQ) practice.
  - **Senior Secondary (Classes 11–12)**: Rigorous pre-board problem sets and core subject dockets.
- **Icon System**: Lucide icons mapped for every subject:
  - 📖 **BookOpen**: Languages (English, Hindi, Sanskrit, Telugu, English Core, Hindi Core)
  - 🧮 **Calculator**: Mathematics & Maths
  - 🔬 **Microscope**: Science & Biology
  - ⚛️ **Atom**: Physics
  - 🧪 **FlaskConical**: Chemistry
  - 💻 **Cpu**: Computers, AI Foundation, Artificial Intelligence, Computer Science (CS)
  - 🎨 **Palette**: Art & Craft, TWAU
  - 🍃 **Leaf**: EVS (Environmental Studies)
  - 🌍 **Globe**: Social Science

---

## 📂 Google Drive Live Integration
- **Master Drive Link**: [Google Drive Folder (1RFLDeE-RARKYF-7YlMRpALc5_HfjoFc5)](https://drive.google.com/drive/folders/1RFLDeE-RARKYF-7YlMRpALc5_HfjoFc5?usp=drive_link)
- **Class Folders Discovered**: Roman numeral subfolders `I` through `XII` (Class 1 to Class 12).
- **Auto-Sync Mechanism**:
  1. **On App Load / Refresh**: Fetches cached and live updates from the Drive service.
  2. **On-Demand "Refresh Drive" Button**: Real-time scrape & update from Google Drive with live toast feedback.
  3. **Periodic Auto-Sync**: Runs in background every 10 minutes to auto-detect newly uploaded teacher assignments.
  4. **Fault-Tolerant Cache**: Stored in `data/homework_cache.json` for instant (<10ms) responses.

---

## 🧩 Dynamic Subject Allocation
Subject dropdown dynamically populates based on selected class:
- **Primary (1 to 5)**: English, Hindi, Sanskrit, Telugu, Maths, EVS, Computers, Art & Craft, TWAU.
- **Middle (6 to 8)**: English, Hindi, Sanskrit, Telugu, Maths, Science, Social Science, AI Foundation.
- **Secondary (9 & 10)**: English, Hindi, Telugu, Sanskrit, Mathematics, Science, Social Science, Artificial Intelligence.
- **Senior Secondary (11 & 12)**: Physics, Chemistry, Biology, Mathematics, Computer Science (CS), Artificial Intelligence (AI), English Core, Hindi Core.

---

## 🚀 Running the Portal

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the Web Server**:
   ```bash
   npm start
   ```
   Server will run at: `http://localhost:3000`

3. **Force a Drive Refresh from Terminal**:
   ```bash
   npm run sync
   ```

---

## 🌟 Key Features
- **In-App Document Preview Modal**: Preview PDF, Word, and Google Docs directly in-app or view image sheets.
- **1-Click Direct Download**: Direct download link to original Google Drive documents.
- **Student Progress Tracker & Checklist**: Check off completed assignments, view progress percentage, with celebration confetti on completion!
- **Printable Docket**: Clean print stylesheet formatted for parents to print and hang on study desks.
- **Curriculum Subject Docket View**: Visual checklist of all official CBSE subjects showing uploaded vs pending status.
