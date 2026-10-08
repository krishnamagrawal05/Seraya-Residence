# 🌴 Seraya Residence — Island After Dark

A cinematic, single-page website concept for a private island residence in the Indian Ocean. It is built around quiet mornings, ocean light, warm evenings and unhurried days.

**🌐 Live demo:** [seraya-residence.netlify.app](https://seraya-residence.netlify.app/)

![Status](https://img.shields.io/badge/status-concept-8a7a5c)
![Type](https://img.shields.io/badge/type-frontend%20demo-08090c)
![Hosted on](https://img.shields.io/badge/hosted%20on-Netlify-00c7b7)

> **Note:** This is a fictional frontend demo. All rates, activities, products and island conditions are sample content. The booking form does not confirm a reservation or collect payment.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Residences](#residences)
- [Page Sections](#page-sections)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Design Notes](#design-notes)
- [Credits](#credits)
- [Disclaimer](#disclaimer)
- [Author](#author)

## Overview

Seraya Residence is a luxury-travel website concept with a dark, cinematic look. A full-screen resort video opens the page, followed by editorial storytelling that walks visitors through the island: where to stay, what to do, where to eat, and how to plan a visit. The theme colour is a deep near-black (`#08090c`) that gives the "island after dark" mood.

## Features

- **Cinematic hero:** looping resort video (`assets/resort.mp4`) with a sound on/off toggle
- **Sticky navigation:** quick links to Story, Stay, Experience, Dining, Wellness, Island and Shop, plus a "Plan stay" shortcut
- **Residence showcase:** four villa types with photos, sample nightly rates and a side-by-side comparison table
- **Day at Seraya:** a sample timeline from sunrise breakfast to cinema under the stars
- **Experiences:** seven activities, including reef discovery, sunrise kayak, jungle walk and yoga
- **Wellness menu:** simple rituals such as a garden facial, ocean-deck stretch and private meditation
- **Games pavilion:** table tennis, chess garden, board games, family game night and a private lounge
- **Dining at Tide House:** breakfast, lunch, snacks, dinner, desserts and a zero-proof sunset bar
- **Celebrations planner:** choose Birthday, Anniversary, Private Dinner or Private Event to see a sample concept
- **Interactive island map:** click a location to update the photo, description, opening hours and details in the panel
- **Gallery with lightbox:** click any image for a larger view
- **Journal:** short stories from the island that open in a reader overlay
- **Stay planner:** select a residence, dates and optional add-ons to see an illustrative total, then send a booking inquiry
- **Sustainability:** local-first kitchen, low-light nights, refill culture and garden habitat
- **Arrival journey:** a four-step sequence from touchdown to first sunset
- **Concept shop:** products with an "Add to bag" button and a live bag counter
- **Island conditions:** sample air, sea, wind and sunset readouts (not live weather)

## Residences

| Residence | View | Pool | Size | Sample rate |
|-----------|------|:----:|------|-------------|
| Ocean Garden Villa | Garden / ocean | — | 85 m² | $680 / night |
| Beachfront Pool Villa | Beach | ✓ | 120 m² | $920 / night |
| Sunset Residence | Sunset | ✓ | 165 m² | $1,280 / night |
| Seraya Grand Residence | Ocean | ✓ | 240 m² | $1,850 / night |

## Page Sections

| # | Section | Anchor |
|---|---------|--------|
| 01 | The Seraya Story | `#story` |
| 02 | Residences | `#residences` |
| 03 | Day at Seraya | |
| 04 | Experiences | `#experiences` |
| 05 | Wellness | `#wellness` |
| 06 | Games | |
| 07 | Dining | `#dining` |
| 08 | Celebrations | |
| 09 | The Island | `#island` |
| 10 | Gallery | |
| 11 | Journal | `#journal` |
| 12 | Stay Planner | `#planner` |
| 13 | Sustainability | |
| 14 | Arrival Journey | |
| 15 | Shop | `#shop` |
| 16 | Island Conditions | |

## Getting Started

Clone the repository:

```bash
git clone https://github.com/<your-username>/seraya-residence.git
cd seraya-residence
```

Open `index.html` directly in your browser, or serve the folder with a local static server:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then visit `http://localhost:8000`.

> Images are loaded from Unsplash, so an internet connection is needed to see them.

## Deployment

The site is a static frontend deployed on [Netlify](https://www.netlify.com/).

**Option 1: Git-based deploy**

1. Push the project to GitHub.
2. In Netlify, choose **Add new site → Import an existing project**.
3. Select your repository.
4. Leave the build command empty and set the publish directory to the project root.
5. Click **Deploy**.

**Option 2: Drag and drop**

1. Open [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag your project folder onto the page.

## Project Structure

```
seraya-residence/
├── index.html          # Main page
├── assets/
│   └── resort.mp4      # Hero background video
└── README.md
```

> Update this tree to match your actual files (separate CSS or JS files, for example).

## Design Notes

- **Mood:** dark, warm and editorial, with generous spacing
- **Theme colour:** `#08090c`
- **Typography:** serif display headings with italic accents, paired with small uppercase labels
- **Layout:** responsive, with a collapsible mobile menu
- **Imagery:** large photography with a full-bleed video hero

## Credits

- Photography from [Unsplash](https://unsplash.com/)
- Hero video: `assets/resort.mp4`

## Disclaimer

Seraya Residence is a fictional concept created for demonstration. It is not a real resort, and nothing on the site is an offer, a booking or a price commitment.

## Author

Made by [@your-username](https://github.com/your-username)

---

© 2026 Seraya Residence concept. Frontend demo.
