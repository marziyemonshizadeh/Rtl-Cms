# Rtl-Cms refactor plan

Status: Numbered execution is paused at the user's request. The reference-table and page-folder alignment below supersedes the earlier table/folder targets. Prior numbered-step results remain as history; no later numbered step is marked complete by this separate request.

Reference: `/Users/mac/Desktop/untitled folder/Profs.Front`

Prepared from both local codebases on 2026-10-16. Visual targets below are based on the reference's source styles and components; browser screenshots still need to be compared in Step 1.

## Goal and working rules

Refactor this CMS toward Profs.Front's organization and Persian RTL dashboard UI, in small, independently verifiable steps.

- Execute **one numbered step per request**, unless the user explicitly requests multiple steps. Finish their checks and update this file before moving on.
- **Do not add unused modules, components, functions, dependencies, or placeholder directories.** Every addition must serve an existing requirement and be used in the running application by the end of the same step. A preview, test, barrel export, or possible future use alone does not count.
- Prefer editing or moving existing code. Extract shared code for actual repetition or a clear responsibility; keep simple one-off logic local. Do not add wrapper layers solely to resemble Profs.Front.
- Before finishing each step, check new exports, imports, files, and dependencies for actual callers. Remove unused additions immediately; do not defer them to Step 16.
- Do not add extra explanatory comments, commented-out code, or comments that restate the code. Use concise `#region` / `#endregion` markers only to organize meaningful sections in substantial files; avoid empty or unnecessary regions.
- Keep path aliases and centralized endpoints in scope: configure `@/` in both Vite and TypeScript in Step 3, and use `services/shared/endpoints.ts` from actual API callers in Step 7. Do not add unused aliases or endpoints.
- Keep the application runnable between steps. Use temporary compatibility exports when a move would otherwise require migrating every page.
- Keep TypeScript, React 18, React Router v6, Tailwind v3, Redux Toolkit, Axios, React Hook Form, Recharts, and React Toastify during this plan.
- Keep json-server, `db.json`, and `VITE_API_URL`. Preserve `/`, `/products`, `/users`, `/comments`, `/orders`, and `/discount`.
- Preserve Persian text, RTL, existing feature actions, and the `IsDarkMood` persistence key.
- Make file moves separately from visual changes where possible. Keep behavior corrections explicit in the relevant step.
- Use focused lint/TypeScript checks for changes. Do not run a full build or browser verification automatically for every step; run them when requested or needed for a specific issue. Keep verification reports brief and avoid repeated checks after they pass.
- There is no test suite. Use the manual acceptance checks below; adding a test framework is outside this plan.
- Do not commit automatically. Each step should leave a reviewable diff and a short verification report.
- End each step's final report with a recommended Conventional Commit message based on the actual changes. Update the suggested message at the end of that step to match its final scope; messages for unstarted steps are provisional. Return the message without creating a commit.

## What to adopt from Profs.Front

### Current reference alignment — 2026-10-18

- Follow `components/@base/Table/MetronicTable/` and the `TadvinHozeFarhangi` Page/List example under `FaaliyatOzvHeyatElmi/FarhangiEjtemaei/`.
- Replaced DataTable across Products, Users, Comments, Orders, and Discounts with a TypeScript/Tailwind v3 adaptation of that TanStack pattern: accessor/cell columns, TableRowActions markers, separate icon-action columns, search, pagination, sticky headers, row numbering, skeletons, and mobile cards. The table engine is the same `@tanstack/react-table` version range as the reference.
- Page modules own data/dialog coordination; List modules define columns/actions. Forms follow `AddFeature/AddFeature.tsx`, `AddFeature/Models/FeatureModel.ts`, and `AddFeature/Validation/FeatureSchema.ts`; details sit beside Page/List, and API modules remain in `api/`. Features without forms have no empty Add/Validation folders. Redux slices remain feature-local to preserve this CMS's state architecture.
- Search/pagination use URL parameters and filter/page the complete Redux lists locally; the reference's backend response envelopes and server-search contract are not imposed on json-server. Existing routes, actions, confirmation restrictions, and fixtures are retained.
- Removed obsolete entity-row components, shared DataTable, and the unused comment-modal wrapper. Numbered implementation remains paused.
- Verification: TypeScript and ESLint pass. No build, browser session, or integration probe was run for this request.

**Suggested commit message:**

```text
refactor(ui): adopt reference table and feature page structure
```

### Current UI request — 2026-10-16

- Replaced the shell with an RTL desktop sidebar that collapses to icons and persists its width preference. Mobile navigation uses a right-side shadcn sheet; links close the drawer, and resizing to desktop closes it.
- Added navbar breadcrumbs, a Persian date, an existing-product-form shortcut, a theme toggle, and a functional account dropdown linking to existing pages.
- Initialized shadcn using its Tailwind v3-compatible CLI and added only Button, Sheet, Dropdown Menu, and Tooltip. Removed generated components, exports, and variants with no callers. Updated Tailwind within v3 for the generated sizing utilities and used a compatible tailwind-merge version.
- Added the bundled Vazirmatn font, semantic light/dark colors, and consistent styling for existing cards, forms, tables, badges, and charts. The existing lime accent remains; the reference's blue theme and domain-specific UI were not copied.
- Limited theme changes to restoring the saved `IsDarkMood` value and applying the class to the document so new portal components follow it. The larger theme/store migration remains on hold.
- Preserved all routes, resource endpoints, fixtures, and CRUD handlers. No feature modules or additional providers were scaffolded.
- Verification: lint and build pass; all 19 new exports have actual application consumers, and the compiled CSS contains the RTL spacing, responsive sizing, font, and theme rules. Existing Browserslist and bundle-size warnings remain. Browser visual and interaction checks are unverified because Chrome access was not approved.
- Local serving check: `/`, `/products`, the stylesheet, App, Navbar, and Sidebar modules all returned HTTP 200 from Vite. The verification server was stopped afterward; generated build artifacts were removed from the source diff.

### Reference patterns

- `components/layout/`: a dedicated layout, sidebar, header, container, and breadcrumbs.
- `components/ui/`: small reusable primitives with consistent states and styling.
- `components/@base/`: application building blocks such as forms, tables, row actions, empty states, and confirmation dialogs.
- Page-local `api/`, forms, models/defaults, and validation, with separate `Page` and `List` components.
- `services/configs/`, `services/shared/`, and `services/providers/` for infrastructure.
- Semantic light/dark colors, blue primary actions (`#1379f0` in the reference), neutral surfaces, subtle borders, and an approximately 8px radius.
- A dark right sidebar, fixed header, mobile navigation drawer, consistent page spacing, and compact table actions.

Adapt the patterns to this smaller CMS. The reference has React 19, Router 7, Tailwind 4, JavaScript, React Query, OIDC, and a much larger alias/provider setup. Those are separate migration decisions, not requirements for matching its structure and UI. Keep Redux as the only owner of server records in this plan. A later React Query migration can be planned after this work is complete.

Do not copy university-specific pages, permissions, authentication configuration, backend response envelopes, or the reference's full component library. Its Tailwind v4 CSS syntax must be translated for this project's Tailwind v3 configuration. Keep this project's hook and TypeScript lint rules enabled.

## Baseline findings

Checks run before writing this plan:

- `npm run lint`: failed with **47 errors and 5 warnings**. Main causes: explicit `any`, boxed `Number`, `prefer-const`, and missing effect dependencies.
- `npm run build`: passed. Vite reported a bundle over 500 kB and an outdated Browserslist dataset.
- Working tree was clean before this document was created.

Problems observed in source that need explicit handling:

- `App.tsx` reads the theme from localStorage during rendering, while the Redux theme always starts as `false`.
- `DeleteModal` dispatches deletion as well as calling a parent callback that also dispatches it: one confirmation can send two DELETE requests.
- Several delete reducers call `.filter()` without assigning the result; discounts have no delete fulfillment handler.
- Fetch thunks catch errors without rejecting them, so failed requests can look fulfilled and loading/error handling is incomplete.
- Product creation/editing and confirmation updates do not consistently synchronize displayed records after success.
- Toast containers appear in pages, forms, and individual rows, and some success toasts appear before requests finish.
- Pages render row components inside mobile cards, but those components ignore `isMobile` and still return `<tr>`. They also mount toast containers alongside table rows.
- Product form types disagree with `models/productType.ts`; validation messages are attached to the wrong fields in the add form. Cancel buttons in product/user edit forms use `type="submit"`.

Treat these as acceptance targets, not reasons to rewrite everything in one step.

## Target structure

This is a guide to ownership, not a required list of files. Create only files needed by the current step and connect them to the running application immediately. Keep small components, defaults, and validation colocated when separate files add no value. Omit any suggested file that has no real consumer.

```text
src/
  main.tsx
  App.tsx
  routes/
    Router.tsx
    navigation.ts
  components/
    layout/
      Layout.tsx
      Header/
        Header.tsx
      Sidebar/
        Sidebar.tsx
        SidebarMenu.tsx
        SidebarItems.ts
    ui/
      Button.tsx
      Input.tsx
      Card.tsx
      Badge.tsx
      Dialog.tsx
      Sheet.tsx
    @base/
      PageTitle.tsx
      Breadcrumbs.tsx
      Form/
        FormField.tsx
      TableRowActions.tsx
      Table/
        MetronicTable/
          MetronicTable.tsx
          TableSkeleton.tsx
      Modal/
        ConfirmDialog.tsx
        DetailsDialog.tsx
      EmptyData/
        EmptyData.tsx
      ErrorState.tsx
    charts/
  pages/
    Home/
      HomePage.tsx
      data.ts
    Products/
      ProductsPage.tsx
      ProductsList.tsx
      api/productsApi.ts
      store/productsSlice.ts
      ProductDetails.tsx
      AddProduct/
        AddProduct.tsx
        Models/ProductModel.ts
        Validation/ProductSchema.ts
    Users/
    Comments/
    Orders/
    Discounts/
  services/
    configs/
      axios.ts
    shared/
      endpoints.ts
      apiError.ts
  redux/
    store.ts
    hooks.ts
    slices/
      themeSlice.ts
  hooks/
    usePaginationParams.ts
  styles/
    tokens.css
    layout.css
  assets/
  index.css
  vite-env.d.ts
```

Use PascalCase for component files and page directories; camelCase for helpers, API modules, hooks, and slices. Use `@/` for shared imports and relative imports within a page. Configure the alias in both Vite and TypeScript; avoid adding one alias per component.

Dependency direction: pages use shared components and services; shared components do not import page modules or Redux feature actions. API modules return typed data, slices own request state, and components own rendering and user interaction. Shared UI must not depend on the backend's entity types.

## Steps

### Step 1 — Record behavior and visual references

- [ ] Record the current actions actually available on each route. Products support add/edit/details/delete; users support edit/details/delete; comments support reading/confirmation/delete; orders and discounts support confirmation/cancellation and deletion subject to existing disabled states. Confirm these in the browser rather than relying on README claims.
- [x] Run the app with json-server. For local development use the installed version via `npx --no-install json-server --watch db.json --port 3000` in one terminal and `npm run dev` in another; Docker is an alternative.
- [ ] Capture current desktop/mobile, light/dark, table, and dialog screenshots. Save reference screenshots if Profs.Front can run with its required environment. If authentication/backend access prevents that, record the limitation and use its source as the visual reference.
- [x] Note reference paths: `src/components/layout/`, `src/components/ui/`, `src/components/@base/Table/MetronicTable/`, `src/index.css`, and the `PajuheshiMovazef` Page/List/api example under `src/pages/FaaliyatOzvHeyatElmi/Amouzeshi/`.
- [x] Back up `db.json` outside the tracked fixture before manual mutations and restore it after verification. Backup: `/private/tmp/rtl-cms-step1-db.json`. No mutations performed; original and backup verified identical.

**Done when:** route/action checklist and visual baseline are recorded, with any unavailable reference screens clearly identified.

#### Step 1 record — 2026-10-16

**Verified by HTTP:** Vite started at `http://127.0.0.1:5173`; all six route URLs returned HTTP 200. json-server started at `http://127.0.0.1:3000`; all five resource URLs returned HTTP 200. These checks verify serving and reachability, not React rendering or successful interactions.

**Source action inventory — browser confirmation pending:**

- `/`: monthly sales line chart, annual sales bar chart, and per-product radial chart using local fixture data. Shared sidebar navigation and theme toggle; no dashboard mutation controls.
- `/products`: inline creation form with name/image URL/price/count; list with details/edit/delete; edit submit/cancel and delete confirm/cancel. No search, pagination, or separate product details route.
- `/users`: list with details/edit/delete; edit customer/username/password/phone/email; edit submit/cancel and delete confirm/cancel. No creation control found in the current page.
- `/comments`: list, comment viewer, confirmation/cancellation, and delete confirm/cancel. Both comment viewing and deletion are disabled when `confirmation` is true; confirmation/cancellation remains enabled.
- `/orders`: list, details, confirmation/cancellation, and delete confirm/cancel. Deletion is disabled when confirmed. Details only changes CSS styling when confirmed; its button has no `disabled` attribute and still invokes the dialog.
- `/discount`: list, confirmation/cancellation, and delete confirm/cancel. Deletion is disabled when confirmed. API resource is `/discounts`; no add/edit/details control found.
- Existing details, edit, and comment-view dialogs register Escape handlers. Delete offers Yes/No buttons without an Escape handler. Browser focus, overlay dismissal, and rendered placement remain unverified.

**Fixture baseline:** 7 products, 5 users, 4 comments, 4 orders, and 4 discounts. All confirmation-bearing records start unconfirmed, so confirmed-state behavior above is source evidence only. Product price/count values mix strings and numbers. Fixture SHA-256: `a15c37ca236d4dd6d01582ddf0205a8ff2867bb27cd9163d7c7bdec9b30cffb2`.

**Visual baseline from source — screenshots pending:**

- Current app: RTL grid layout, dark zinc sidebar, lime primary actions, white/zinc surfaces, responsive table-to-card markup, and a navbar with avatar/theme controls. Existing mobile row nesting and theme persistence issues remain recorded above.
- Reference: dark fixed right sidebar, fixed header with breadcrumbs/avatar, right-side mobile navigation sheet, blue `#1379f0` primary, neutral light/dark tokens, `0.5rem` radius, and Persian `iran-sans` font declaration. Layout CSS specifies 280px expanded/80px collapsed sidebar, 70px desktop/60px mobile header, and Layout caps content at 1580px.
- Keep the reference's source files listed in the checklist as the comparison target. Do not copy its domain-specific controls or unused modules.

**Browser blockers:** browser inventory exposed no connected browsers; both Chrome and in-app browser tab creation returned unavailable. Native Chrome access returned `Computer Use permissions are not granted`. No screenshots or browser interactions were completed. Enable Computer Use or connect a browser to finish desktop/mobile, light/dark, table, and dialog captures and confirm the action inventory.

**Reference runtime limitation:** Profs.Front has no installed `node_modules` in the supplied folder. Its app wraps pages in OIDC authentication and its configuration reads `VITE_AUTH_*` environment variables. No dependency installation, authentication, or reference runtime launch was attempted; reference screenshots are unavailable in this run.

**Verification rerun:** `npm run lint` still reports 47 errors and 5 warnings; `npm run build` passes with the existing Browserslist and bundle-size warnings. No baseline failures were fixed in Step 1. The local servers were stopped after HTTP verification.

**Scope during Step 1:** only this plan was edited. No application code was changed. Step 1 remains incomplete until browser checks are recorded; the user subsequently authorized proceeding with Steps 2 and 3.

**Suggested commit message:**

```text
docs: record CMS behavior and visual baseline
```

### Step 2 — Establish a passing lint baseline

Depends on Step 1.

- [x] Replace existing explicit `any` with model, thunk, event, chart-data, and callback types. Use the existing typed Redux hooks; keep behavior changes for later steps.
- [x] Replace boxed `Number` with `number`, fix `prefer-const`, and resolve effect dependencies without disabling rules.
- [x] Fix any TypeScript issues exposed by tighter types. Keep the current folder structure and UI for this step.
- [x] Run lint, then build, and record the results here.

**Done when:** lint has zero errors/warnings, build passes, and all six routes retain their existing behavior. Later steps must preserve this baseline.

**Step 2 result:** lint passes with zero errors/warnings; build passes. Request parameters, responses, modal callbacks, keyboard events, chart props, and list rows are typed. Product price/count types reflect the fixture's existing `number | string` values without data conversion. Fetch state types explicitly permit the existing `undefined` result from swallowed request failures; error handling and CRUD fixes remain in Step 7. Redux dispatch uses typed hooks, and fetch effects include `dispatch` in their dependencies. No lint rules were disabled or dependencies added.

**Suggested commit message:**

```text
refactor(types): establish a passing lint baseline
```

### Step 3 — Introduce application infrastructure and imports

Depends on Step 2.

- [x] Configure `@/` in `vite.config.ts` and `tsconfig.json` with matching resolution.
- [x] Move `Routes.tsx` to `routes/Router.tsx`; keep the existing `createBrowserRouter` approach and URL paths.
- [x] Keep the simple provider composition in `main.tsx`, preserving StrictMode and a single RouterProvider. Extract a provider module only if actual composition complexity requires it.
- [x] Separate typed hooks into `redux/hooks.ts`; update imports to avoid unnecessary component exports from the store module.
- [x] Move the Axios instance to `services/configs/axios.ts`, preserving `VITE_API_URL`. All callers migrated together, so no compatibility module is needed.

**Done when:** entry/provider imports resolve, navigation and direct reloads work, and lint/build pass. This step should have no intended visual change.

**Step 3 result:** shared imports use `@/`; Vite and TypeScript resolve it to `src/`. The router and Axios instance were moved, and typed hooks were extracted and connected to all existing callers. No provider wrapper, unused aliases, or compatibility exports were added. API region markers group the existing thunk declarations; endpoint centralization remains in Step 7.

**Combined verification:** lint passed, then build passed after each step. A TypeScript-based comparison confirmed unchanged rendered JSX in 22 existing components and unchanged route definitions. Source styles, assets, `db.json`, dependencies, and Axios settings are unchanged. Generated build artifacts were excluded from the source refactor diff. Existing Browserslist and bundle-size warnings remain. Browser navigation, reloads, and interaction checks remain unverified because of the Step 1 access limitation.

**Suggested commit message:**

```text
refactor(app): centralize routing and application infrastructure
```

### Step 4 — Make theme state consistent

Depends on Step 3.

- [x] Move the dark-mode slice to `redux/slices/themeSlice.ts` while retaining `state.darkmode.isDarkmode` during migration.
- [x] Initialize from `localStorage.getItem("IsDarkMood") === "true"`; keep reducers free of storage/DOM side effects.
- [x] Persist theme changes and apply `.dark` on `<html>`, including modal portals, using the existing application lifecycle or store subscription. Initialize the class early enough to avoid a visible wrong-theme flash. Extract a synchronization module only if it has a clear need.
- [x] Remove the render-time localStorage read and debug output in `App.tsx`.
- [x] Keep one Redux source of truth; do not add a competing theme context or change to `vite-theme`.

**Done when:** toggling works on the first click after reload, the preference persists, and page backgrounds, dialogs, and toasts use the same theme. Lint/build pass.

**Step 4 result — 2026-10-16:** moved the dark-mode slice and updated its store/navbar consumers; retained the `darkmode` reducer key, `isDarkmode` field, and `darkmode/toggleDarkmode` action type. Removed obsolete slice comments and the unused slice-object export. The existing guarded preference reader initializes the slice from `IsDarkMood`; its reducer only toggles state. Kept the existing pre-paint HTML bootstrap and application layout effect, splitting dark-mode synchronization from palette synchronization so changing one does not rewrite the other's preference. The earlier UI work had already removed App's render-time dark-mode storage read and debug output; its lazy sidebar-preference initializer remains unrelated. Existing palette selection remains a separate Redux preference, with no additional provider, synchronization module, dependency, or unused export added.

**Verification:** lint passes with zero errors/warnings, then build passes with the existing Browserslist and bundle-size warnings. A temporary in-memory runtime probe exercised the actual HTML bootstrap, preference helpers, slice, and App layout-effect callbacks across eight combinations of saved values (missing/true/false/invalid) and available/blocked storage. It verified initial class/state agreement, first and repeated toggles, persisted-value reinitialization, reducer purity, and palette preservation. Import review confirms both new slice exports have actual application callers and no imports of the old slice remain. Source review confirms page surfaces, modal portal surfaces, and Toastify colors inherit the root semantic tokens. Browser clicks, reloads, visual theme consistency, and absence of visible flash remain unverified: no connected browser was available and Chrome access returned `Computer Use was not approved to use Google Chrome`. No backend fixtures were changed. Step 5 was not started and no commit was created.

**Suggested commit message:**

```text
fix(theme): synchronize persisted theme state and root styles
```

### Step 5 — Add design tokens and UI primitives

Depends on Step 4.

- [x] Add semantic CSS variables for background, foreground, card, border, input, primary, muted, destructive, radius, and focus states in `styles/tokens.css`.
- [x] Map variables through `tailwind.config.js` using Tailwind v3-compatible syntax; keep existing utility classes working until their consumers migrate.
- [x] Extract typed Button, Input, Card, and Badge components only as needed, replacing real existing controls in the same step. Add only the variants and states those callers use; retain simple styling locally when a component adds no value.
- [x] Match the reference's blue actions, neutral surfaces, border treatment, and radius. Use a Persian-capable font available for this project, checking usage rights before copying reference font assets.
- [ ] Check contrast, keyboard focus, long Persian text, and both themes on existing screens or a temporary local preview removed before completion.

**Done when:** every new primitive is used by an existing screen, renders consistently, and has no unused props or variants. Lint/build pass. Introduce any new dependency only with a specific need, immediate application usage, and compatibility check for the retained stack.

**Step 5 result — 2026-10-16:** extracted shared semantic light/dark variables, font, radius, and focus-ring token into `styles/tokens.css`, imported by the application stylesheet. `styles/themes.css` now owns palette inputs; shared page/card surfaces are neutral, with subtle table borders and stronger input boundaries. Retained the existing Tailwind v3 semantic-color/opacity and radius mappings and legacy utility classes. Set the shared radius to 8px and applied it to cards, tables, mobile cards, inputs, and primary buttons. Blue is the default in CSS, the pre-paint HTML script, and Redux preference initialization; valid saved lime/orange/cherry/blue choices remain honored. The light blue action color is `#1065c9`, darker than the reference's `#1379f0` to maintain small-text contrast on hover. The existing bundled Vazirmatn font remains in use; its installed package license is SIL OFL 1.1, permitting embedding and redistribution. No reference font assets were copied.

**Application consumers:** added ref-forwarding Input for all 13 fields in product creation, product editing, and user editing; Card for all three dashboard chart cards; and Badge with only approved/pending variants for comments, orders, and discounts. Extended the existing Button with a destructive variant used by deletion confirmation and reused it for cancellation and product creation. Buttons allow wrapping and minimum heights for long labels; inputs retain registration refs, names, event handlers, defaults, and disabled attributes. Focus rings use the semantic color with a 2px width and offset. Every new component export and variant has running-application callers. No dependencies, routes, request handlers, or fixtures were changed; Step 6 was not started and no commit was created.

**Verification:** lint passes with zero errors/warnings, then build passes with the existing Browserslist and bundle-size warnings. Temporary source-level checks verified primitive rendering, input ref/event forwarding, disabled controls, and preservation of long Persian strings. Twelve saved-palette/bootstrap scenarios verified matching default and saved values, including blocked storage. Calculated contrast checks across all four palettes in both modes passed: checked text pairs (including primary/destructive hover colors and status badges) are at least 4.57:1; input/focus pairs are at least 3.57:1. Production CSS inspection confirms the shared 8px radius, light/dark tokens, input/card/badge styles, focus ring, and bundled Persian font. The final acceptance checkbox remains pending: these checks do not verify actual keyboard navigation, rendered Persian wrapping, or visual appearance in a browser. Chrome access was not approved earlier in this session, so browser checks remain unavailable.

**Suggested commit message:**

```text
refactor(ui): centralize design tokens and shared controls
```

### Step 6 — Build the responsive RTL layout

Depends on Step 5.

- [x] Extract Layout and move the existing header/sidebar into `components/layout/`; make `App.tsx` compose Layout and Outlet. Split SidebarMenu only when desktop navigation and the mobile drawer reuse it; use ordinary layout markup instead of adding a pass-through Container component.
- [x] Move menu items into typed configuration and share route metadata for labels/breadcrumbs. Keep `/discount` singular.
- [x] Use the reference's proportions as starting values: 280px desktop sidebar, 70px desktop header, 60px mobile header, and content capped around 1580px.
- [x] Implement fixed right navigation and header with matching content offsets. Use logical CSS properties for spacing and positioning.
- [x] Add a mobile drawer opening from the right, closing after navigation and on Escape. Keep focus inside it while open and restore focus to its trigger on close.
- [x] Keep layout UI state local unless it is shared; add only the settings this CMS needs.

**Done when:** all six routes fit at 375px, 768px, and 1440px; no content is hidden behind fixed UI; breadcrumbs and active links are correct; drawer keyboard behavior works; lint/build pass.

**Step 6 result — 2026-10-16:** added `components/layout/Layout.tsx`, moved Navbar to `components/layout/Header/Header.tsx`, and moved Sidebar to `components/layout/Sidebar/Sidebar.tsx`. Extracted SidebarMenu for the desktop sidebar and mobile drawer's shared navigation. App now composes Layout and Outlet while retaining the existing theme synchronization. Collapse/drawer state, preference persistence, route-change closure/scroll reset, and the breakpoint listener live in Layout. The existing navigation configuration now checks paths, labels, and icon types with TypeScript and continues to supply both menu labels and breadcrumbs. Header matching also handles trailing slashes; the brand uses an ordinary Link so only the menu item receives the active-page marker.

**Layout behavior:** `styles/layout.css` provides shared dimensions and matching logical offsets for a fixed right sidebar and fixed header: 280px expanded/80px collapsed sidebar, 70px desktop/60px mobile header, and a 1580px cap for header/content. Main content starts below the header; desktop header/content offsets change together with sidebar width. Reduced-motion styles disable layout transitions. The mobile drawer retains the existing Radix modal focus trap, Escape/overlay dismissal, title/description, scroll locking, and trigger-focus restoration; its logical positioning opens from the right in RTL, its width is capped for narrow viewports, and its height follows the dynamic viewport. Links (including the current route) and resizing to desktop close it. When desktop resizing hides the trigger, closing focuses main content instead. The mobile brand reserves space for the close button. Wide desktop tables can scroll horizontally rather than clipping columns. The header's unavailable `/profile` destination was corrected to the existing `/users` page with a matching Persian label and a fully clickable dropdown item; no profile route was added.

**Verification:** lint passes with zero errors/warnings, then build passes with the existing Browserslist and bundle-size warnings. Render checks passed for 44 combinations of all six routes, trailing slashes, collapsed/expanded navigation, and light/dark control state, checking active items, labels, and breadcrumbs. A temporary lifecycle probe verified saved collapse state, toggling/persistence, drawer open/close callbacks, same-route link closure, route-change closure/scroll reset, resize closure, both focus-restoration branches, the skip target, and listener cleanup. Production CSS checks passed for the dimensions and offset rules at 375px, 768px, and 1440px in expanded/collapsed states, content cap, drawer positioning/height, table overflow, and reduced motion. These are source/render/CSS checks, not browser measurements or actual key events. Browser inventory still lists no connected browsers; native Chrome access was not approved earlier. Visual fit, occlusion, real focus trapping/restoration, and Tab/Escape acceptance checks therefore remain pending. The pre-existing mobile row nesting issue remains scheduled for the shared-list migration.

**Scope review:** Layout, Header, Sidebar, SidebarMenu, and layout styles all have application consumers; old navbar/sidebar imports are gone. No unused exports, wrapper Container, providers, dependencies, routes, feature handlers, or fixtures were added. Router definitions, page code, backend records, Redux state, and theme behavior remain unchanged. Step 7 was not started and no commit was created.

**Suggested commit message:**

```text
refactor(layout): consolidate the responsive RTL application shell
```

### Step 7 — Standardize API contracts and request behavior

Depends on Step 6.

- [x] Create endpoint constants for `/products`, `/users`, `/comments`, `/orders`, and `/discounts` in `services/shared/endpoints.ts`.
- [x] Add typed per-page API modules. Move direct Axios calls out of rendering components; connect existing thunks and new mutation thunks to these functions.
- [x] Return response data rather than full Axios responses from thunks. Normalize errors and reject failed requests instead of swallowing them.
- [x] Add pending/fulfilled/rejected handling, distinguish empty data from failure, and clear pending flags on every outcome.
- [x] Fix delete state updates for all five resources. Update records or refetch after successful create/edit/confirmation changes, and await mutation completion before reporting success.
- [x] Remove one of the duplicate delete dispatches now; the parent action owns the request and the modal only confirms intent.
- [x] Centralize one ToastContainer at application level; remove per-page, per-form, and per-row containers. Keep request-specific success/error notifications in one place per operation.
- [x] Preserve json-server's actual response shape and fields. Do not adopt Profs.Front's `/api/v1/` base or `{ success, data, message }` assumptions. Retain existing PUT payload fields or deliberately use partial PATCH requests.

**Done when:** each action sends one mutation request, state updates without a page reload, failed requests never show success, and Redux receives serializable payloads. Check with the backend running and stopped, then run lint/build.

**Step 7 result — 2026-10-16:** added `services/shared/endpoints.ts`, `services/shared/apiError.ts`, and typed API modules under each existing page's `api/` directory. Every endpoint constant and API method has an active thunk consumer. Axios calls now stay in these modules; rendering components dispatch typed thunks. List thunks accept no URL parameter, return arrays, and reject with normalized Persian error strings. Mutations return response records or the deleted ID, never Axios response objects. The existing Axios base URL/configuration, json-server resource shapes, routes (including `/discount`), and fixtures remain unchanged. Product/user edits deliberately use PATCH for their editable fields; confirmation changes PATCH only `confirmation`, preserving all other server fields.

**State and interaction behavior:** all five slices now retain defined record arrays, list loading/error state, and per-record mutation pending/error state (plus product creation state). Fulfillment updates the current array immediately for every create/edit/confirmation/delete action; failures retain previous records. Pending flags clear on fulfilled and rejected actions. Thunk conditions suppress duplicate submissions and duplicate list requests, including immediate repeated dispatches; list reads and mutations for the same resource do not overlap, preventing a late list response from replacing a successful mutation. Mutations for separate records can still proceed independently. Pages distinguish errors from empty results and offer retry actions. Existing confirmation-dependent disabled controls now follow the updated Redux records immediately, and mutation controls disable while pending.

**Dialogs and notifications:** DeleteModal has no entity IDs, Redux imports, or delete actions; it receives a parent submit callback, pending flag, and error message. Only the parent sends the request, and failed deletion leaves the dialog open. Product creation/edit and user edit await `.unwrap()` before resetting inputs or closing; failed forms retain their values. Edit dismissal is guarded during submission. Product/user Cancel buttons were changed to `type="button"` in this step because retaining their submit behavior would issue unintended mutations during cancellation; the larger form consolidation and validation work remains in Steps 8/10/11. One application-level ToastContainer replaces all page/form/row containers. `redux/notifications.ts` uses the existing Redux Toolkit listener middleware to issue one success/error notification per completed mutation after reducers run; fetch errors remain in the page error state. Removed the unused users `addComment` action and obsolete exported slice objects while updating their modules.

**Verification:** lint passes with zero errors/warnings, then build passes with the existing Browserslist and bundle-size warnings. A temporary integration script used the actual Axios client, API modules, thunks, Redux store/listener middleware, and installed json-server against a disposable fixture. It checked all five list requests and all 11 mutation types, immediate pending state, duplicate dispatch suppression, one HTTP request/notification per successful mutation, post-reducer success notifications, immediate record updates, preservation of extra server fields through PATCH, confirmed-state deletion controls, parent delete callbacks, and the modal's single confirmation callback. HTTP 500, HTTP 404, and a stopped server produced rejected actions with cleared pending/loading flags and no success notification or record changes. Successful retries cleared list errors; empty arrays remained successful empty results. Callback probes verified failed creation/editing preserves input, failed edits stay open, and Cancel is not a submit control. Redux's serializability middleware reported no warnings. No test framework or dependency was added.

**Fixture and scope review:** the disposable verification database was `/private/tmp/rtl-cms-step7-nx61av/db.json`; the tracked fixture's SHA-256 remained unchanged. Local verification servers were stopped after checks. Source review confirms exactly one ToastContainer, notifications only in the listener middleware, no direct Axios calls in rendering components or slices, and actual consumers for every new module/export. Browser interaction/visual checks remain unverified under the previously recorded access limitation. Mobile `<tr>` nesting, dialog focus/accessibility consolidation, field validation/numeric normalization, and feature-folder migrations remain assigned to their later steps. Step 8 was not started and no commit was created.

**Suggested commit message:**

```text
fix(api): standardize request state and mutation handling
```

### Step 8 — Build shared forms and dialogs

Depends on Step 7.

- [x] Consolidate repeated field labels/errors into FormField only where existing forms reuse it. Use Input with React Hook Form registration and numeric conversion; add specialized input wrappers only when current forms require shared behavior. Do not add an unused textarea or selector.
- [x] Consolidate existing dialogs and the mobile drawer using only the primitives/wrappers needed by current callers. Wire replacements into existing forms and dialogs in this step; avoid duplicate layers with identical responsibilities.
- [x] Implement focus management, Escape, accessible title/description, background interaction blocking, and scroll locking. Make dismissal behavior deliberate while submitting.
- [x] Keep dialogs independent of entity fields and Redux actions. Pass typed children/data and callbacks from the feature.
- [x] Keep compatibility wrappers for the old modal imports until each page migrates.

**Done when:** migrated forms/dialogs use every new addition in the running application, support keyboard-only use, restore focus, match both themes, and show pending/error behavior clearly. Lint/build pass.

**Step 8 result — 2026-10-16:** added `components/@base/Form/FormField.tsx` and integrated it with all 13 existing inputs in product creation, product editing, and user editing. Each field now has a visible Persian label, a unique React-generated input/error ID, linked `htmlFor`/`aria-describedby`, and `aria-invalid` when validation fails. Cloning the existing Input preserves React Hook Form refs, names, and handlers. Required fields have native required semantics and field-specific Persian messages; `noValidate` keeps validation messages under React Hook Form control. Product price/count fields use `type="number"` and `valueAsNumber`; prices must be finite/nonnegative and counts nonnegative integers. Creation/edit payloads are numeric for those fields, while existing mixed string/number fixture reads remain unchanged for the later product migration. Correct field/error associations and Persian messages were completed here as part of integrating FormField; the shared ProductForm and read normalization remain in Step 10. Invalid input borders and focus rings use destructive tokens with explicit CSS selectors compatible with Tailwind v3.

**Dialog consolidation:** added `components/ui/dialog.tsx`, sharing Radix Root/Trigger/Title/Description and one portal/overlay/content/close implementation between modal dialogs and the existing Sheet. The Sheet is now a placement adapter; its Layout/Header consumers and resize-focus behavior remain connected. The existing ModalsTemplate owns common modal titles/descriptions, controlled dismissal, and focus restoration. All four legacy modal import paths remain in use as compatibility wrappers. DetailsModal now accepts typed label/value items supplied by Products/Users/Orders, and the comment viewer accepts feature-provided children. No shared dialog imports entity models, pages, or Redux actions. Removed manual window Escape listeners, duplicate ReactDOM portals, legacy modal debug output, and the unused `#modal` HTML mount. User details labels now match the existing name/username/password values; password visibility is unchanged. Order details no longer render duplicate cells caused by overlapping entity flags.

**Interaction behavior:** the existing Radix modal mode supplies focus trapping, Escape/overlay dismissal, background interaction blocking, accessible title/description IDs, and scroll locking. Pending edit/delete dialogs block Escape, outside interaction, and the close control; their existing request controls remain disabled, errors stay visible, and failed submissions retain input/open dialogs. Feature buttons focus themselves before opening a modal so the template can restore the correct origin. If that control is removed, disabled, or hidden (for example after deletion/resizing), focus falls back to the existing main-content target. Dialog close controls follow content in DOM order; edit forms start with an input and deletion confirmation presents cancellation before its destructive button. Centered dialogs have bounded viewport height and scrolling, with wrapping for long Persian details/comments and preserved comment line breaks. Both placements use existing semantic light/dark colors.

**Verification:** lint passes with zero errors/warnings, then build passes with the existing Browserslist and bundle-size warnings. A temporary render/validation/callback probe exercised the actual installed React Hook Form `setValue`/`handleSubmit` paths: valid decimal prices/integer counts and zero values convert to numbers; blank/nonfinite/negative prices and blank/negative/fractional counts fail validation; all five user fields retain required validation and phone values remain strings. Feature callbacks received numeric product payloads, retained input on failed requests, and kept pending controls disabled. Render checks verified 13 unique label/error associations, described-by composition, and preservation of Input refs. Dialog callback checks covered both placements, pending/idle Escape and outside-interaction guards, disabled close controls, forwarded refs, title/description wrapper composition, focus restoration to a visible origin, and main-content fallback for removed/disabled/hidden origins. Production CSS inspection verified destructive invalid-field focus styles, bounded dialog height, scrolling, and portal color tokens. An initial unsupported Tailwind ARIA variant was replaced with explicit selectors before the passing checks.

**Acceptance limitation and scope review:** browser inventory still exposes no connected browser, and native Chrome access was not approved earlier. These checks do not establish actual browser Tab/Escape behavior, focus trapping/restoration, scroll locking, mobile fit, or light/dark visual appearance; those acceptance checks remain pending. All six new exports have application consumers, both content placements are used, and no unused fields/variants, textarea, selector, dependency, provider, or test framework was added. API modules, endpoints, Redux request logic, routes, and `db.json` are unchanged. Existing mobile row nesting and the shared list/table pattern remain in Step 9. Step 9 was not started and no commit was created.

**Suggested commit message:**

```text
refactor(ui): consolidate accessible forms and dialogs
```

### Step 9 — Build the shared list/table pattern

Depends on Step 8.

- [x] Extract repeated list/table behavior into a typed DataTable and integrate it into the existing Products page in this step. Extract row actions, loading, empty/error, and title components only where current usage justifies separate components; reuse Button for actions.
- [x] Start with columns, row identifiers, title/toolbar, row actions, and loading/empty/error states. Keep feature-specific rules in the page.
- [x] Support semantic desktop tables and mobile cards using the same record/action configuration. Never put `<tr>` inside a `<div>` or a toast container inside table markup.
- [x] Add localized action labels, destructive styling, confirmation, keyboard access, and pending/disabled states.
- [x] Keep sorting/search/pagination out of the initial extraction unless needed to preserve an existing behavior. They can be a later enhancement; do not copy the reference's full MetronicTable implementation.

**Done when:** the running Products page uses the shared pattern, every new helper/component has a real caller, narrow layouts and error/empty/loading states render correctly, and lint/build pass. A standalone preview does not satisfy integration.

**Step 9 implementation — 2026-10-18:** added `components/@base/Table/DataTable.tsx` and connected it directly to the existing Products route. Its generic column definition, record identifiers, title/toolbar, action renderer, loading, empty, error, and retry props all have application callers. The Products page supplies its existing image/name/price/count fields, product count toolbar, Redux state, retry dispatch, and feature actions. State/title rendering stays in DataTable; it reuses the existing ErrorBox and Button rather than adding single-use wrappers. No sorting, search, pagination, dependency, or feature-folder migration was added.

**Responsive markup and actions:** one semantic table becomes bordered cards below the existing 768px breakpoint through CSS display rules. Explicit table/row/cell roles preserve the intended semantics when display changes; column scopes, cell header references, an accessible table title, and mobile field labels describe the same records. Each record has one action/form/dialog owner across viewport sizes, eliminating the previous duplicate mobile rendering and `<tr>`-inside-`<div>` nesting. The existing product component now renders `ProductActions` inside the action cell, using compact native Button controls with Persian labels, focus rings, pending disablement, a named action group, and destructive delete styling. Existing details/edit/delete dialogs, focus-on-open callbacks, confirmation, request handling, failed-input retention, and pending dismissal guards remain connected. Images use product names as alternative text. Price/count reads and payload behavior remain unchanged for Step 10.

**Verification:** `npm run lint` passes with zero errors/warnings, followed by a passing `npm run build`; the existing Browserslist and bundle-size warnings remain. A temporary render/callback probe exercised the actual Products page, DataTable, ProductActions, and deletion confirmation with fixture data and controlled Redux hooks. It verified seven rows/action owners, five columns, populated/loading/empty/error states, retry dispatch and pending disablement, native action button types, focus/open callbacks, one delete dispatch per confirmation, and dialog retention after failure. HTML parsing verified valid table ancestry, unique IDs, and resolved heading/header references. Production CSS inspection verified mobile block/grid rules, desktop table rules at 768px, semantic colors, destructive colors, and keyboard focus rings. These probes do not establish browser layout, accessibility-tree behavior, keyboard interactions, or HTTP request counts; the existing Step 7 backend verification is unchanged.

**Acceptance limitation and scope review:** browser inventory again returned no connected browsers; requesting native Chrome access returned `Computer Use was not approved to use Google Chrome`. Checks at 375px/768px/1440px, light/dark appearance, keyboard navigation, and resize/focus behavior remain pending browser acceptance. Both new exports and every DataTable prop have real application consumers; shared code imports no feature models, API modules, or Redux actions. Only DataTable, the existing Products page/action component, and this plan were changed for Step 9. Existing README edits were left intact. Routes, API/store logic, dependencies, and `db.json` are unchanged; the fixture SHA-256 remains `a15c37ca236d4dd6d01582ddf0205a8ff2867bb27cd9163d7c7bdec9b30cffb2`. Step 10 was not started and no commit was created.

**Suggested commit message:**

```text
refactor(products): use shared responsive data table

- Extract typed columns, row identifiers, and list states into DataTable
- Replace duplicate product layouts with one responsive table
- Preserve dialogs and pending actions while fixing invalid mobile nesting
```

### Step 10 — Migrate Products as the complete example

Depends on Step 9.

- [x] Move the product page, list, model, slice, API, form, and details UI into `pages/Products/` following the target structure.
- [x] Make ProductsPage own data/loading/error/dialog coordination and ProductsList own display. Reuse one ProductForm for create/edit with typed defaults and validation rules.
- [x] Keep price/count numeric at the form/API boundary; inspect existing fixture values and normalize reads if necessary without silently rewriting `db.json`.
- [x] Correct field-specific error messages; use Persian messages. Reset forms and close dialogs only after success; use `type="button"` for Cancel.
- [x] Match the reference's page title, add action, card/table treatment, compact row actions, and responsive presentation. Keep inline add versus dialog placement consistent with the Step 1 visual decision.
- [x] Remove old product components/model/slice only when all callers use the new files.

**Done when:** list, create, edit, details, delete, cancel, invalid input, failed requests, and repeated submissions work on desktop/mobile in both themes. New/edited/deleted products appear correctly immediately. Lint/build pass.

**Step 10 implementation — 2026-10-18:** consolidated Products under `pages/Products/` with ProductsPage, ProductsList, `api/productsApi.ts`, `store/productsSlice.ts`, `models/product.ts`, and feature-local ProductForm/ProductDetails. Router, store assembly, and notification listeners use the migrated modules. The case-only folder rename is recorded in Git so imports resolve on case-sensitive systems. Old product component, form, model, slice, and page paths have no remaining callers or compatibility exports.

**Ownership and forms:** ProductsPage owns fetching, request state, selected record ID, and one active details/edit/delete dialog outside the table. It resolves the selected record from current Redux data. ProductsList renders the shared DataTable and native action buttons from page callbacks, preserving one row/action group per record across layouts. A shared ProductForm serves inline creation and modal editing with four explicit typed defaults, excluding record IDs and extra server fields. Required messages remain field-specific Persian; price must be finite/nonnegative and count a nonnegative integer. React Hook Form converts numeric inputs and disables the fieldset while submitting. Creation resets only after success; edit closes only after the awaited update succeeds; rejection retains input and the open dialog. Cancel is a non-submit control. A new, used slice action clears a completed mutation's error before opening another product dialog, preventing a failed deletion message from appearing in a fresh edit dialog; pending requests are preserved.

**Numeric data and presentation:** inspected all seven fixtures and confirmed valid numeric strings/numbers. API list/create/update responses normalize price/count to numbers while preserving other response fields; nonfinite values reject instead of entering Redux. Numeric form payloads continue to use POST/PATCH and centralized resource endpoints. The page now has a Persian management title and an add action linking to the existing inline form, retaining its placement. Existing semantic cards, shared responsive table, compact actions, confirmation dialogs, and pending/error controls remain in use; list/details format numbers with `fa-IR` and show the existing تومان currency. No fixture values, routes, backend field names, dependencies, or other feature modules were changed.

**Verification:** lint passes with zero errors/warnings, followed by a passing build with the existing Browserslist and bundle-size warnings. Temporary React/RHF render and callback probes verified both form modes, four labelled fields/default keys, ID/extra-field exclusion, numeric conversion including zero, invalid/blank/negative/nonfinite prices and fractional counts, Persian validation messages, success-only reset/closure, failure retention, Cancel behavior, pending dismissal guards, row-action focus/open callbacks, clearing stale errors before selection, list states/retry, and page-owned dialogs outside the table. A targeted reducer probe verified error clearing without changing records or pending requests. Actual Axios, API modules, thunks, application store, listener middleware, and json-server were exercised against `/private/tmp/rtl-cms-step10-api-iUZX9t/db.json`: numeric reads and writes, immediate create/edit/delete state updates, preserved PATCH fields, duplicate suppression with one HTTP request/notification, post-reducer success notifications, HTTP 500/404/offline errors, retry, empty results, and serializability checks passed. Read normalization did not rewrite the copied fixture. Vite returned HTTP 200 for all six routes and the migrated runtime modules; that establishes serving/import reachability, not browser rendering. Verification servers were stopped afterward.

**Acceptance limitation and scope review:** browser inventory still returned no connected browsers; the earlier native Chrome approval limitation remains. Actual desktop/mobile checks at 375px/768px/1440px, light/dark appearance, anchor navigation, keyboard focus/trapping/restoration, resize behavior, and console checks remain pending. All seven feature modules, their exports, API methods, and component props have application consumers. No placeholder module, dependency, provider, test framework, or shared-component feature dependency was added. `db.json` retains SHA-256 `a15c37ca236d4dd6d01582ddf0205a8ff2867bb27cd9163d7c7bdec9b30cffb2`. Step 11 was not started and the agent created no commit.

**Suggested commit message:**

```text
refactor(products): colocate feature modules and share product form

- Move Products page, API, slice, model, and UI into the feature folder
- Share the create/edit form and centralize dialog coordination
- Normalize numeric responses and clear stale dialog errors
```

### Step 11 — Migrate Users

Depends on Step 10.

- [ ] Apply the validated Page/List/api/store/models/form pattern under `pages/Users/`.
- [ ] Replace duplicated desktop/mobile markup and feature-specific use of generic details modal flags.
- [ ] Preserve existing user fields, IDs, and edit/details/delete behavior; ensure Cancel never submits and failed edits retain input.
- [ ] Use the shared controls for email/phone/password editing while keeping API field names unchanged. Leave any password-display policy change as a separately agreed behavior change.
- [ ] Remove old user files and update imports when unused. Do not add user creation merely because the old README mentions it; verify the actual baseline.

**Done when:** user list, details, edit, delete, cancel, and error handling pass the same visual/interaction checks as Products. Lint/build pass.

**Suggested commit message:**

```text
refactor(users): migrate to shared feature and table patterns
```

### Step 12 — Migrate Comments

Depends on Step 11.

- [ ] Move comments into `pages/Comments/` with Page/List/api/store/models and a feature-local comment viewer.
- [ ] Use shared table/cards, status badges, row actions, confirm dialog, and loading/empty/error states.
- [ ] Preserve confirmation/cancellation and deletion restrictions. Show full long comments in an accessible dialog without breaking RTL layout.
- [ ] Synchronize the confirmation state and disabled actions immediately after successful mutation; retain previous state on failure.
- [ ] Remove old comment components/model/slice and comment-modal wrapper once unused.

**Done when:** read comment, confirm/cancel, allowed/blocked delete, and failed mutations behave correctly on both layouts/themes. Lint/build pass.

**Suggested commit message:**

```text
refactor(comments): migrate to shared feature and table patterns
```

### Step 13 — Migrate Orders

Depends on Step 12.

- [ ] Move orders into `pages/Orders/` using the same pattern and shared list/status/actions.
- [ ] Preserve customer/product/date/time/price/discount fields and existing confirmation-dependent disabled actions.
- [ ] Update confirmation/cancellation and delete state after success; prevent duplicate submissions and premature toasts.
- [ ] Share number/currency formatting where useful without changing underlying values or stored dates.
- [ ] Remove old order components/model/slice when unused.

**Done when:** confirmation/cancellation, deletion restrictions, pending/error behavior, and price/date display work in desktop/mobile and both themes. Lint/build pass.

**Suggested commit message:**

```text
refactor(orders): migrate to shared feature and table patterns
```

### Step 14 — Migrate Discounts

Depends on Step 13.

- [ ] Move discounts into `pages/Discounts/` using the shared pattern, while retaining the `/discount` route and `/discounts` endpoint.
- [ ] Preserve discount code, percentage, date, admin, product, and confirmation fields.
- [ ] Verify confirmation/cancellation and deletion restrictions use current state, not stale row data.
- [ ] Remove old discount components/model/slice when unused.

**Done when:** status changes and allowed deletion update immediately and failures retain prior state; route, responsive UI, themes, lint, and build pass.

**Suggested commit message:**

```text
refactor(discounts): migrate to shared feature and table patterns
```

### Step 15 — Align the dashboard and charts

Depends on Step 14.

- [ ] Move Home to `pages/Home/HomePage.tsx` and its fixture data from `datas.ts` to `pages/Home/data.ts`.
- [ ] Keep Recharts and existing datasets; type chart props and share formatting where appropriate.
- [ ] Align chart cards, headings, spacing, tooltips, axes, and colors with the new tokens and layout.
- [ ] Make chart containers responsive, keeping Persian labels readable in both themes. Preserve the existing information rather than adding invented live metrics.

**Done when:** all existing charts and labels work at target viewport widths and in both themes; lint/build pass.

**Suggested commit message:**

```text
refactor(dashboard): align charts with shared layout and theme
```

### Step 16 — Remove migration leftovers and document the result

Depends on Step 15.

- [ ] Remove obsolete `components/Modals/`, `modalsTemplate/`, entity-row folders, `src/models/`, `src/redux/store/`, and compatibility exports only after verifying no imports remain.
- [ ] Remove unused legacy CSS classes, debug logs, commented experiments, and obsolete assets/dependencies based on actual usage. Preserve README screenshot assets unless updating their references too.
- [ ] Keep only shared theme state under `redux/slices/`; assemble feature reducers in `redux/store.ts` with selectors/imports updated consistently.
- [ ] Review the build's bundle warning. Introduce route-level lazy loading if useful, without breaking route error/loading UI; verify the resulting chunks rather than hiding warnings by raising limits.
- [ ] Update README and AGENTS.md to match the final structure, commands, and page-creation conventions. Replace the README's obsolete completion status and verify feature claims.
- [ ] Run the full manual checks below, then lint and build. Record remaining warnings or limitations and mark completed steps in this file.

**Done when:** only the new structure is in use, documentation matches it, all six routes and existing actions pass, and lint/build pass.

**Suggested commit message:**

```text
refactor(app): remove migration leftovers and update documentation
```

## Manual checks for each affected feature

- Directly open and reload its route; navigate from the sidebar; verify active item and breadcrumbs.
- Check at 375px, 768px, and 1440px in light and dark mode; reload with a saved dark preference.
- Check loading, empty, populated, and API-failure states. Use local request blocking or a disposable fixture for empty data rather than deleting the tracked dataset.
- Open/close details and forms with mouse and keyboard. Verify focus restoration, Escape, long content, scroll, and RTL.
- Submit invalid data; cancel; submit valid data; simulate failure; click twice while pending.
- Confirm deletion sends exactly one DELETE request. Verify successful changes immediately appear and failed changes leave existing data intact.
- Check mobile actions perform the same operations as desktop; inspect for invalid DOM nesting and console errors.
- Restore verification fixture changes before reviewing the diff.
- Verify every newly added module, component, function, prop, variant, and dependency has a real application use. Remove unused additions before completing the step.

## How to request the next step

Start with:

> Implement Step 1 from REFACTOR_PLAN.md only. Record the baseline, update its checkboxes, and end the final report with the recommended commit message. Do not start later steps or commit automatically.

For each implementation step after that:

> Implement Step N from REFACTOR_PLAN.md only. Read the completed steps first, keep existing routes and behavior except the listed fixes, and add no unused modules, components, functions, or dependencies. Integrate every addition into the running application in this step. Run lint then build, check for unused additions, update the checkboxes, and report changed files and verification results. Update the step's suggested commit message to match the actual changes and return it at the end of the final report. Do not start Step N+1 or commit automatically.

If a step reveals a new dependency or blocker, record it under that step and split the work into smaller substeps before expanding the scope. Mark a checkbox only after the corresponding work and verification are complete.
