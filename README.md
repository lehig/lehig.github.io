# Portfolio Landing Page (React)

This repository now uses React + Vite for a portfolio landing page.

## Local development

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Build production files: `npm run build`

## Deployment

Deployment is handled by GitHub Actions using `.github/workflows/publish.yml`.

On each push to `main`, the workflow:
1. Installs dependencies
2. Builds the React app
3. Deploys `dist/` to GitHub Pages

If this is your first deploy with this workflow, set your repository Pages source to **GitHub Actions** in repository settings.

## Legacy Quarto content

Previous Quarto content is kept under `zz_legacy/` for reference.
