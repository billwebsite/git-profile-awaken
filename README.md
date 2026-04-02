<div align="center">

# ⚔️ Git Profile Awaken

**[SYSTEM NOTIFICATION] You have been chosen as a Player.**

Drawing inspiration from the iconic System interfaces found in LitRPG and progression fantasy literature, this project gamifies your developer journey. Your commits materialize as **STR**, pull requests as **AGI**, and your overall GitHub operational activity is quantitatively ranked on a definitive scale from **E** to **EX**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/BillTheDev/git-profile-awaken&env=GITHUB_TOKEN&envDescription=GitHub%20Personal%20Access%20Token&envLink=https://github.com/settings/tokens)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

## ⚡ Quick Start

Add this to your GitHub profile `README.md` — replace `YOUR_GITHUB_USERNAME` with your actual username:

```md
![RPG Status](https://YOUR_DEPLOYED_URL/api?username=YOUR_GITHUB_USERNAME)
```

That's it. One line. Your profile now has an RPG Status Window.

---

## 🎮 Available Widgets

### Status Window *(main widget)*

The complete RPG character sheet — level, rank, all 6 core attributes, radar chart, mana bar, and job class.

```md
![Status](https://YOUR_DEPLOYED_URL/api?username=YOUR_GITHUB_USERNAME&widget=status)
```

### Active Quest

Shows your latest repository as an RPG quest with dynamic rank based on repo size.

```md
![Quest](https://YOUR_DEPLOYED_URL/api?username=YOUR_GITHUB_USERNAME&widget=quest)
```

### Passive Skills

Top 4 programming languages displayed as skill masteries with level indicators.

```md
![Skills](https://YOUR_DEPLOYED_URL/api?username=YOUR_GITHUB_USERNAME&widget=skill)
```

### Contribution Analysis

Weekly activity bar chart, streaks, daily average, and contribution grade.

```md
![Contributions](https://YOUR_DEPLOYED_URL/api?username=YOUR_GITHUB_USERNAME&widget=contribution)
```

### Individual Stat Runes

Single stat cards for any of the 6 core attributes.

```md
![STR](https://YOUR_DEPLOYED_URL/api?username=YOUR_GITHUB_USERNAME&widget=stat&target=STR)
![AGI](https://YOUR_DEPLOYED_URL/api?username=YOUR_GITHUB_USERNAME&widget=stat&target=AGI)
![INT](https://YOUR_DEPLOYED_URL/api?username=YOUR_GITHUB_USERNAME&widget=stat&target=INT)
![VIT](https://YOUR_DEPLOYED_URL/api?username=YOUR_GITHUB_USERNAME&widget=stat&target=VIT)
![LUK](https://YOUR_DEPLOYED_URL/api?username=YOUR_GITHUB_USERNAME&widget=stat&target=LUK)
![CHA](https://YOUR_DEPLOYED_URL/api?username=YOUR_GITHUB_USERNAME&widget=stat&target=CHA)
```

---

## 🎲 Core Attributes

| Code | Attribute | Source | What it measures |
|------|-----------|--------|-----------------|
| **STR** | Strength | Total Commits | Raw coding output |
| **AGI** | Agility | Pull Requests | Code review & collaboration speed |
| **INT** | Intelligence | Issues | Problem identification & analysis |
| **VIT** | Vitality | Repos Contributed To | Ecosystem involvement |
| **LUK** | Luck | Total Stars | Community recognition |
| **CHA** | Charisma | Followers | Developer influence |

**Rank Scale:** `E → D → C → B → A → S → SS → SSS → EX`

---

## 🎨 Themes

Add `&theme=THEME_NAME` to any widget URL. **21 themes available:**

| Theme | Inspiration | Theme | Inspiration |
|-------|-------------|-------|-------------|
| `solo_leveling` *(default)* | Solo Leveling | `cyberpunk` | Cyberpunk 2077 |
| `dracula` | Dracula IDE | `tokyonight` | Tokyo Night IDE |
| `monokai` | Monokai Pro | `gruvbox` | Gruvbox IDE |
| `nord` | Nord Theme | `synthwave` | Synthwave '84 |
| `matrix` | The Matrix | `hollow_knight` | Hollow Knight |
| `genshin_anemo` | Genshin Impact | `genshin_geo` | Genshin Impact |
| `genshin_electro` | Genshin Impact | `elden_ring` | Elden Ring |
| `nier` | NieR: Automata | `bloodborne` | Bloodborne |
| `valorant` | Valorant | `hextech` | League of Legends |
| `retrowave` | Retrowave | `abyssal` | Deep Ocean |
| `infernal` | Diablo | | |

**Example with theme:**

```md
![Status](https://YOUR_DEPLOYED_URL/api?username=YOUR_GITHUB_USERNAME&theme=cyberpunk)
```

---

## 🚀 Deploy to Vercel (Recommended)

**Step 1:** Fork this repository.

**Step 2:** Create a GitHub Personal Access Token:
  - Go to [github.com/settings/tokens](https://github.com/settings/tokens)
  - Click **"Generate new token (classic)"**
  - Select scopes: `read:user`, `repo` (for private repo stats)
  - Copy the token

**Step 3:** Deploy to Vercel:
  - Go to [vercel.com/new](https://vercel.com/new)
  - Import your forked repository
  - Add environment variable: `GITHUB_TOKEN` = your token from Step 2
  - Click **Deploy**

**Step 4:** Replace `YOUR_DEPLOYED_URL` in your profile README with your Vercel URL (e.g., `rpg-github-stats.vercel.app`).

Or use the one-click deploy button at the top of this README.

---

## 💻 Local Development

**Prerequisites:** Node.js 20+

```bash
# Clone
git clone https://github.com/BillTheDev/git-profile-awaken.git
cd git-profile-awaken

# Install
npm install

# Configure
cp .env.example .env
# Edit .env and add your GITHUB_TOKEN

# Run
npm run dev
```

Open `playground.html` in your browser to preview all widgets with live reload.

---

## 📡 API Reference

**Base URL:** `https://YOUR_DEPLOYED_URL/api`

### Query Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `username` | ✅ | — | GitHub username |
| `theme` | ❌ | `solo_leveling` | Theme name (see theme list) |
| `widget` | ❌ | `status` | Widget type: `status`, `quest`, `skill`, `stat`, `contribution` |
| `target` | ❌ | `STR` | Stat code for `widget=stat` (STR, AGI, INT, VIT, LUK, CHA) |
| `mode` | ❌ | — | Set `mortal` to disable admin overrides |
| `refresh` | ❌ | `false` | Set `true` to bypass 5-minute cache |

### Other Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /health` | System status (JSON) |
| `GET /themes` | List all available themes (JSON) |

### Response

All `/api` responses return `image/svg+xml` with status `200`. Errors are rendered as styled SVG images so they display correctly when embedded in Markdown.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20+ with native `node:http` |
| Language | TypeScript (strict mode) |
| Data | GitHub GraphQL API + REST Search API |
| Output | Pure SVG (zero external UI libraries) |
| Hosting | Vercel Serverless Functions |
| Architecture | Clean Architecture / Domain-Driven Design |

---

## 📁 Project Structure

```
├── api/
│   └── index.ts              → Vercel serverless entry point
├── src/
│   ├── domain/
│   │   └── types.ts          → Core interfaces & type definitions
│   ├── application/
│   │   ├── rpgSystem.ts      → RPG game logic (ranks, grades, classes)
│   │   └── dataProcessor.ts  → GitHub data → CharacterProfile transformer
│   ├── infrastructure/
│   │   ├── githubClient.ts   → GitHub API client with cache & deduping
│   │   └── sanitizer.ts      → XSS prevention & input validation
│   └── presentation/
│       ├── http/
│       │   └── router.ts     → HTTP routing & response handling
│       ├── svg/
│       │   ├── svgEngine.ts  → SVG primitives (radar chart, wrapper)
│       │   ├── widgetBuilders.ts → All widget renderers
│       │   └── errorSvg.ts   → RPG-styled error SVG generator
│       └── theme/
│           └── themes.ts     → 21 color themes
├── playground.html           → Local development preview UI
├── vercel.json               → Vercel routing config
└── package.json
```

---

## 🤝 Contributing

**Add a new theme:**

1. Open `src/presentation/theme/themes.ts`
2. Add a new entry to `THEMES` using `buildTheme(bg, panel, text, textMuted, primary, secondary, accent, border)`
3. Optionally override rank colors with the 9th parameter
4. Submit a PR

**Add a new widget:**

1. Create your builder function in `src/presentation/svg/widgetBuilders.ts`
2. Register it in the router switch statement in `src/presentation/http/router.ts`
3. Add the widget name to `VALID_WIDGETS`
4. Submit a PR

---

## 📄 License

MIT © [BillTheDev](www.billthedev.com)

---

<div align="center">

*"I alone level up."* — Sung Jinwoo

**[⬆ Back to Top](#-rpg-github-stats)**

</div>
