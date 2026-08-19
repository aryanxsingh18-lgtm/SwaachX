# SwaachX

**SwaachX — Smart Waste Management & Citizen Reporting Platform**

SwaachX is a prototype civic-tech platform for reporting waste issues, visualizing sanitation operations, supporting collection workflows, and encouraging citizen participation through rewards.

> **Current project state:** This repository contains the supplied web and app prototypes. The current implementation is a front-end demonstration with in-memory mock data and simulated interactions. It does not currently contain a production backend, database, real authentication system, real GPS service, or real AI/route-optimization service.

## Repository structure

```text
SwaachX/
├── README.md
├── .gitignore
├── web/
│   ├── index.html
│   └── assets/
│       ├── app.js
│       ├── styles.css
│       └── swaachx-logo.jpg
└── app/
    ├── index.html
    └── assets/
        ├── app.js
        ├── styles.css
        └── swaachx-logo.jpg
```

### What each part does

- `web/index.html` — SwaachX operations/dashboard interface.
- `web/assets/app.js` — web dashboard state, report table, filters, upvotes, map markers, fleet telemetry, notifications, and route-optimization simulation.
- `web/assets/styles.css` — styles originally embedded in the supplied web prototype.
- `app/index.html` — SwaachX citizen/driver mobile-style interface.
- `app/assets/app.js` — citizen reporting, rewards, role switching, camera/lens simulation, offline queue simulation, driver pickup workflow, and hotspot layer interaction.
- `app/assets/styles.css` — styles originally embedded in the supplied app prototype.
- `assets/swaachx-logo.jpg` — extracted copy of the logo image that was previously embedded as a large Base64 data URI.

## Main features

### Citizen app prototype

- Citizen home/incident feed.
- Waste report capture flow.
- Waste-category selection.
- Simulated AI waste classification.
- Simulated location extraction.
- Online/offline report submission flow.
- Offline report queue and sync simulation.
- CivicPoints for submitted reports.
- Rewards marketplace.
- Citizen analytics view.
- Citizen/driver role switching.
- Driver collection workflow with slide-to-complete interaction.
- Waste hotspot prediction layer simulation.
- System toast notifications.

The supplied app code stores its main state in an in-memory `appState` object, including incidents, rewards, points, simulated network state, and the offline queue.

### Web operations dashboard prototype

- Overview/operations dashboard.
- Citizen report table.
- Report urgency filters.
- Community upvoting.
- New report submission.
- Interactive SVG waste-report map.
- Fleet telemetry cards.
- Simulated truck movement.
- Vehicle connection test notifications.
- Smart Route AI Finder simulation.
- Route result metrics.
- Civic/government-style visual theme.

The supplied web code stores reports and fleet vehicles in in-memory JavaScript arrays.

## Tech stack used by the supplied prototype

- HTML5
- CSS3
- Vanilla JavaScript
- Tailwind CSS via CDN
- Google Fonts via CDN
- Inline SVG graphics
- Browser-side in-memory mock data

No JavaScript framework or package manager is currently required by these prototypes.

## Running SwaachX locally

### Easiest method

You can open either `index.html` directly in a browser, but a local web server is recommended.

If Python is installed:

```bash
cd SwaachX
python -m http.server 8000
```

Then open:

- Web dashboard: `http://localhost:8000/web/`
- App prototype: `http://localhost:8000/app/`

The current prototype uses Tailwind CSS and Google Fonts from CDNs, so an internet connection may be needed for the external styling/fonts to load correctly.

## Important prototype limitations

The current files demonstrate the user experience and interaction logic, but several values are intentionally simulated:

- Report data is stored in JavaScript memory rather than a database.
- Fleet locations are simulated.
- Route optimization is simulated.
- Waste classification is simulated.
- Location extraction uses predefined sample addresses.
- Offline mode is simulated with an in-memory queue.
- Authentication/authorization is not implemented as a real security system.
- There is no production API/backend in the supplied files.

These should be clearly described as prototype/demo functionality in an SIH presentation unless a real backend/service is added later.

## Security and GitHub hygiene

Do **not** commit:

- `.env` files
- API keys
- access tokens
- passwords
- private certificates
- database credentials
- service-account JSON files
- personal/private datasets
- `node_modules/`
- build/cache folders
- editor/OS metadata

The repository includes a `.gitignore` that blocks common secret, dependency, build, and local-environment files.

Before your first push, run:

```bash
git status
```

and inspect the list carefully.

If you ever accidentally commit a real secret, do not just delete the file and assume the secret is safe. Rotate/revoke the exposed credential first, then remove it from Git history.

## GitHub setup for beginners

### 1. Install Git

Install Git for your computer from the official Git website.

After installation, open Command Prompt, PowerShell, or Git Bash and check:

```bash
git --version
```

### 2. Create the GitHub repository

On GitHub:

1. Sign in.
2. Click **New repository**.
3. Repository name: `SwaachX`
4. Choose Public or Private according to your team's needs.
5. Do **not** add another README if you are using the README already in this project.
6. Create the repository.

### 3. Open the SwaachX folder in a terminal

Go into the folder that contains:

```text
README.md
.gitignore
web/
app/
```

### 4. Initialize Git

```bash
git init
```

This creates a hidden `.git` folder that lets Git track changes.

### 5. Check what will be uploaded

```bash
git status
```

Make sure you do not see `.env`, credentials, `node_modules`, or other private files.

### 6. Add the project

```bash
git add .
```

The `.` means “add the files in this project folder.”

Then check again:

```bash
git status
```

### 7. Create your first commit

```bash
git commit -m "Initial SwaachX project"
```

A commit is a saved checkpoint of your project.

### 8. Connect the local project to GitHub

GitHub will show you the repository URL. Use that URL in:

```bash
git remote add origin YOUR_GITHUB_REPOSITORY_URL
```

For example:

```bash
git remote add origin https://github.com/YOUR_USERNAME/SwaachX.git
```

### 9. Push SwaachX to GitHub

```bash
git branch -M main
git push -u origin main
```

After this finishes, refresh your GitHub repository page. Your SwaachX files should appear there.

## Updating the repository later

Whenever you make changes:

```bash
git status
git add .
git commit -m "Describe what changed"
git push
```

A simple way to remember it:

```text
git add      → prepare changes
git commit   → save a checkpoint
git push     → upload the checkpoint to GitHub
```

## Safe cleanup approach

The original project files were supplied as two large HTML prototypes. The cleanup in this repository keeps their functionality but separates three things that were previously mixed together:

```text
HTML       → page structure and UI
CSS        → visual styling
JavaScript → interaction/state logic
```

The large embedded logo data was also extracted into a normal image file. The prototype's external Tailwind CSS dependency remains external rather than being replaced with a different styling system.

No backend functionality has been invented or substituted during this cleanup.

## Future production architecture

When you move beyond the prototype, a possible architecture is:

```text
Citizen App ─────┐
                 ├── SwaachX API ─── Database
Web Dashboard ───┤          │
                 │          ├── Authentication
Driver Interface ┘          ├── Reports
                            ├── GPS / Maps
                            ├── Notifications
                            ├── AI classification
                            └── Route optimization
```

The backend and services should be added as separate components rather than putting API credentials or server secrets into the front-end files.

## SIH 2026

SwaachX is being developed as a Smart Waste Management & Citizen Reporting Platform concept for SIH 2026, with the goal of connecting citizen reporting with sanitation operations and more efficient waste collection workflows.

---

**Project:** SwaachX  
**Status:** Prototype / SIH 2026 development
