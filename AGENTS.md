# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains the React + TypeScript application (`App.tsx`, `main.tsx`, `components/`).
- `public/` stores static assets served by Vite.
- `index.html` is the Vite entry HTML template.
- `dist/` is the production build output (generated).
- `image/` and `metadata.json` hold project media and metadata used by the app.

## Build, Test, and Development Commands
- `npm install` installs dependencies.
- `npm run dev` starts the Vite dev server on port 3000.
- `npm run build` creates a production build in `dist/`.
- `npm run preview` serves the production build locally.
- `npm run lint` runs TypeScript type-checking (`tsc --noEmit`).
- `npm run clean` removes the `dist/` directory.

## Coding Style & Naming Conventions
- Use 2-space indentation and modern ES module syntax.
- Prefer single quotes for imports/strings (match current files).
- React components use PascalCase filenames (e.g., `DocumentPreview.tsx`).
- Keep component props/types in `src/types.ts` or alongside the component when specific.
- Use the `@/` path alias when it improves clarity (root-relative).

## Testing Guidelines
- No automated test framework is configured yet.
- Rely on `npm run lint` plus manual verification in `npm run dev`.
- If tests are added, co-locate them with components and use `*.test.tsx` naming.

## Commit & Pull Request Guidelines
- Git history is minimal; one commit uses `feat:` while others are unstructured.
- Prefer Conventional Commits going forward (e.g., `feat: add export options`).
- PRs should include a concise summary, testing steps, and screenshots for UI changes.

## Configuration & Secrets
- Create `.env.local` and set `GEMINI_API_KEY` before running locally.
- Do not commit secrets or local environment files.
