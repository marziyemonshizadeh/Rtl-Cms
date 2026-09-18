# AGENTS.md

## Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **State**: Redux Toolkit
- **Routing**: React Router v6
- **API**: Axios + json-server (local dev backend at `http://localhost:3000`)
- **Forms**: React Hook Form
- **Charts**: Recharts
- **UI Notifications**: React Toastify

## Key Commands
- `npm run dev` — start Vite dev server (port 5173)
- `npm run build` — typecheck + build (run before committing)
- `npm run lint` — ESLint with max-warnings 0 (must pass)
- `npm run docker:dev` — run app + json-server in Docker
- `npm run docker:dev:down` — stop Docker services

## Verification Order
Always run in this order before committing:
1. `npm run lint` (catches style + type errors via ESLint)
2. `npm run build` (includes TypeScript check + Vite build)

No test suite exists.

## Architecture Notes
- **RTL layout**: App uses `dir="rtl"` for right-to-left UI
- **Dark mode**: Stored in localStorage as `IsDarkMood` (note the capitalization); Redux state in `darkmode.isDarkmode`
- **Redux store**: `src/redux/store/` contains slices for users, products, comments, orders, discounts, darkmode
- **Pages structure**: Each major feature (users, products, comments, orders, discounts) has its own page directory
- **Models**: Type definitions in `src/models/` (userType, productType, commentType, orderType, discountType)
- **Components**: Reusable UI in `src/components/` — Modals (edit, delete, details, showComment), charts (line, bar, radial), sidebar, navbar, order, comment, errorBox

## Environment
- `.env` sets `VITE_API_URL=http://localhost:3000` (dev) — can switch to production URL
- No secrets in repo; `.env` is committed with safe defaults

## ESLint Rules
- React refresh exports warning allowed only for constant exports
- Strict TypeScript: no unused locals/parameters, no fallthrough cases
- Max warnings set to 0 — all warnings must be fixed

## Data Backend
- `json-server` serves `db.json` as mock REST API
- Docker Compose dev setup runs app + json-server together
- For local dev without Docker: json-server must run separately on port 3000
