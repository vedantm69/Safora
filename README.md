# 🛡️ SAFORA: Smart Tourist Safety, AI Assistance & Emergency Dispatch Ecosystem

> **Smart India Hackathon (SIH) Innovation Project**  
> An intelligent, responsive tourist safety platform featuring live emergency telemetry, automatic multilingual translation, gender-tailored safety avatars, and real-time police command coordination.

---

## 🌟 Key Features

- **📱 Transformative Responsive UI**:
  - Automatically detects laptops/desktops and offers a 1-click **Mobile Phone Simulator** for an authentic smartphone view.
  - Native fluid layout on real mobile devices.
- **🚨 1-Slide Emergency SOS**:
  - Immediate distress dispatch with GPS telemetry.
  - Siren audio playback, distress category selector, and live police alert feed.
- **👤 Custom PFP Avatar Studio**:
  - Clean emoji avatar selector with male, female, and neutral defaults based on profile gender.
- **🌐 Real-Time Multilingual Translation**:
  - Live phrasebook and audio speech playback with zero dependencies.
- **🗺️ Interactive City Exploration & Safety Corridor**:
  - Interactive map integration with verified tourist hotels, safe spots, and scam warnings.
- **🏢 Integrated Authority Command Center**:
  - Dedicated control dashboard for police and tourism departments (`/authority`).

---

## 🚀 Instant Deployment on Vercel

### Step 1: Push to GitHub
1. Create a new repository on [GitHub](https://github.com/new) named `safora` (or any name you prefer).
2. Upload this project folder to the repository:
   - **Option A (GitHub Web)**: On your new GitHub repo page, click **"uploading an existing file"**, drag and drop all project files, and click **Commit changes**.
   - **Option B (Git CLI / GitHub Desktop)**:
     ```bash
     git init
     git add .
     git commit -m "Initial commit: SAFORA production release"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/safora.git
     git push -u origin main
     ```

### Step 2: Deploy to Vercel
1. Go to [Vercel](https://vercel.com/) and log in (or sign up with GitHub).
2. Click **"Add New..."** -> **"Project"**.
3. Select your `safora` GitHub repository and click **"Import"**.
4. Keep the default settings:
   - **Framework Preset**: `Other`
   - **Root Directory**: `./`
5. Click **"Deploy"**! 🚀
6. In ~15 seconds, your app will be live with a free worldwide SSL URL (e.g., `https://safora.vercel.app`)!

---

## 💻 Running Locally

### Prerequisites
- Node.js (v16 or newer recommended)

### Quick Start
```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/safora.git
cd safora

# 2. Start the local server
npm start
# OR: node server.js
```

Open your browser:
- **Tourist App**: [http://localhost:5000](http://localhost:5000)
- **Authority Command Center**: [http://localhost:5000/authority](http://localhost:5000/authority)

---

## 📂 Project Structure

```text
├── index.html                   # Main Tourist Safety Application
├── tourist_app.js               # React 18 Application Core
├── tourist.html                 # Direct tourist portal
├── authority.html               # Police / Tourism Command Center
├── authority_app.js             # Authority dashboard application
├── vercel.json                  # Vercel deployment & routing config
├── package.json                 # Project manifest & start scripts
├── server.js                    # Node.js local server
├── api/
│   └── index.js                 # Vercel serverless API handler
├── images/                      # Destination photos & UI assets
│   └── avatars/                 # 9 Character Avatar profile photos
└── README.md                    # Project documentation
```

---

## 📄 License
This project is licensed under the MIT License.
