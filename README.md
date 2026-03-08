# ⏳ Timely — Countdown Collection

A polished, single-page countdown tracker built with **React + Vite + Tailwind CSS**. Create, manage, and visualize countdowns to the moments that matter — deadlines, trips, launches, and celebrations.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)

---

## 🚀 Live Demo

Deployed on **Netlify** — [View Live](https://tymely.netlify.app)

---

## ✨ Features

- **CRUD Operations** — Create, edit, and delete countdowns with a modal form
- **Live Timers** — Every countdown ticks in real-time (days, hours, minutes, seconds)
- **Urgency System** — Countdowns are automatically categorized by time remaining:
  - 🔴 **Imminent** (< 24 hours) — buzzing alarm icon + red digit pulse
  - 🟡 **Soon** (< 7 days) — buzzing alarm icon with yellow glow
  - 🟣 **Upcoming** (< 30 days)
  - ⚪ **Distant** (30+ days)
  - ⚫ **Passed** — expired countdowns
- **Filter Bar** — Horizontal urgency filter pills with color-coded dots and live counts
- **Stacked Card Deck** — Active countdown displayed as a card stack with smooth CSS transitions
- **Scroll-Linked Navigation** — Scrolling the right panel syncs the active card on the left via IntersectionObserver
- **Scroll Dot Indicators** — Fixed position dots showing which countdown is active
- **Mobile Responsive** — Collapses to a single-column layout with compact cards on screens < 768px
- **LocalStorage Persistence** — All countdowns survive page refreshes
- **Toast Notifications** — Confirmation toast appears after creating a countdown
- **Emoji Support** — Quick-pick emoji grid in the creation modal
- **Keyboard Accessible** — Escape key closes the modal
- **Animated Empty State** — Sand timer with JS-driven animation and flip cycle

---

## 🏗️ Architecture

```
src/
├── components/
│   ├── Header.jsx            # Sticky header with logo + "New Countdown" button
│   ├── EmptyState.jsx        # Animated sand timer + CTA (shown when no countdowns)
│   ├── FilterBar.jsx         # Horizontal urgency category filter pills
│   ├── CountdownCard.jsx     # Individual card with live timer, urgency badge, alarm icon
│   ├── CountdownLayout.jsx   # Split-pane layout (stacked deck + scroll track + mobile)
│   ├── CountdownModal.jsx    # Create/Edit modal with validation + emoji picker
│   └── Toast.jsx             # Bottom-right confirmation toast
├── hooks/
│   ├── useCountdowns.js      # CRUD state + localStorage sync
│   ├── useCountdownTimer.js  # Per-card 1-second interval timer
│   ├── useIntersectionActive.js  # Scroll-aware active index via IntersectionObserver
│   ├── useModal.js           # Modal open/close/mode state
│   └── useToast.js           # Auto-dismissing toast state
├── utils/
│   ├── storage.js            # localStorage read/write helpers
│   └── timeUtils.js          # Time remaining, urgency, progress, sorting, formatting
├── constants/
│   └── urgency.js            # Urgency tier colors and labels
├── App.jsx                   # Root — wires hooks, filters, and renders layout
├── main.jsx                  # React 18 createRoot entry point
└── index.css                 # CSS variables, Tailwind directives, animations
```

---

## 🎨 Design Choices & Rationale

### Why Tailwind v3 (PostCSS) instead of v4 (Vite plugin)

The BUILD spec called for `@tailwindcss/vite` (Tailwind v4), but I chose **Tailwind v3 with PostCSS** because:

- v3 has a much larger ecosystem of examples and community support
- The `tailwind.config.js` file gives explicit, readable control over the design tokens
- v4 was still relatively new at the time and had fewer plugin compatibility guarantees

### Why Montserrat Alternates instead of Cabinet Grotesk

Cabinet Grotesk is a premium font available on Fontshare, not Google Fonts. To keep the project dependency-free and ensure reliable loading, I switched to **Montserrat Alternates** — a Google Font with a similar geometric, modern character that fits the brand personality.

### Why blue (`#2563EB`) instead of purple (`#5C35CC`) for the primary color

I shifted the palette from purple to **blue (Tailwind's Blue-600)** for better contrast ratios and a more universally professional look. The warm beige background pairs naturally with a cool blue accent.

### Why merge StackedDeck + ScrollSection into CountdownLayout

The spec split this into three files. I consolidated them into a single `CountdownLayout.jsx` because:

- The sub-components (`ScrollTrackItem`, `ScrollDots`, `MobileLayout`) are tightly coupled to the layout logic
- Reduces import chains and makes the scroll/intersection logic easier to follow in one place
- Each sub-component is still a separate function — just colocated

### Rebranding to "timely"

Changed the logo from "countdown" to **"timely"** — a shorter, catchier name that reflects the product's purpose while being more brandable.

---

## 🔧 What I'd Improve With More Time

1. **Drag-to-reorder** — Allow users to manually reorder countdowns instead of only sorting by target date
2. **Categories / Tags** — Let users assign custom labels (e.g., "Work", "Personal") beyond urgency tiers
3. **Recurring countdowns** — Support repeating events like weekly meetings or annual birthdays
4. **Share links** — Generate a shareable URL for a specific countdown
5. **Push notifications** — Browser notification when a countdown hits zero
6. **Dark mode** — Complete dark theme toggle using CSS custom property overrides
7. **Accessibility audit** — Full ARIA labels, focus trapping in the modal, screen reader testing
8. **Unit tests** — Jest + React Testing Library for hooks (especially `useCountdownTimer` and `useCountdowns`)
9. **Transition polish** — Animate the filter bar state changes and add exit animations for deleted cards
10. **PWA support** — Service worker + manifest for installable offline-capable app

---

## ⚡ Challenges Faced

- **Sand timer animation** — Getting the SVG path morphing to look like realistic sand draining required extensive tweaking of quadratic Bézier control points and synchronizing the top drain with the bottom fill
- **IntersectionObserver sensitivity** — The initial scroll-linked card transitions felt too jumpy. Solved by widening section padding (140px) and narrowing the observer's rootMargin trigger zone from 20% to 14% of the viewport
- **Date input cross-browser quirks** — Date string parsing with `new Date("2026-03-08T23:59")` behaves differently on iOS Safari. Switched to explicit `new Date(year, month-1, day, hour, minute)` constructor to avoid timezone/parsing issues
- **Tailwind v3 vs v4 decision** — Had to weigh spec compliance against practical stability. Chose v3 and documented the deviation
- **Font availability** — Cabinet Grotesk (spec font) isn't on Google Fonts. Evaluated alternatives and landed on Montserrat Alternates for its similar geometric weight and free availability

---

## ⏱️ Time Spent

| Phase                                             | Approx. Time    |
| ------------------------------------------------- | --------------- |
| Project setup & configuration                     | ~30 min         |
| Utilities, constants, hooks                       | ~1 hr           |
| Core components (Card, Layout, Modal, EmptyState) | ~3 hrs          |
| Styling, animations, sand timer                   | ~2 hrs          |
| Filter bar implementation                         | ~45 min         |
| Alarm icons & urgency effects                     | ~30 min         |
| Scroll spacing fixes                              | ~20 min         |
| Mobile responsive layout                          | ~1 hr           |
| Testing, debugging, polish                        | ~1 hr           |
| Documentation                                     | ~30 min         |
| **Total**                                         | **~10.5 hours** |

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
git clone https://github.com/INIstheguyy/Inioluwa-countdown-assessment.git
cd countdown-app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📦 Tech Stack

| Tool                                                                                          | Purpose                       |
| --------------------------------------------------------------------------------------------- | ----------------------------- |
| [React 18](https://react.dev)                                                                 | UI framework                  |
| [Vite 6](https://vitejs.dev)                                                                  | Build tool & dev server       |
| [Tailwind CSS 3.4](https://tailwindcss.com)                                                   | Utility-first CSS             |
| [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)          | Client-side persistence       |
| [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) | Scroll-linked card activation |
| [crypto.randomUUID()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)     | Unique countdown IDs          |
| [Netlify](https://netlify.com)                                                                | Deployment                    |
