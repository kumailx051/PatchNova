# React App

Minimal React project scaffolded with Vite and TypeScript.

## Deploying to Vercel

You can host this project on Vercel as `patchNova` (patchNova.vercel.app).

Option A — GitHub integration (recommended):
- In Vercel, import the repository `kumailx051/PatchNova`.
- Set the framework to Vite (it may be detected automatically).
- Build command: `npm run build`
- Output directory: `dist`
- Set the project name to `patchNova` to get `patchNova.vercel.app`.

Option B — Vercel CLI (quick deploy):
1. Install and login:
```bash
npm i -g vercel
vercel login
```
2. From the project root run:
```bash
npx vercel --prod --confirm --name patchNova
```

Notes:
- The repository has already been pushed to GitHub. If you prefer continuous deploys, enable GitHub integration in Vercel and set the project name to `patchNova`.
- If you want me to create the Vercel project via the Vercel API/CLI, provide a Vercel token or authorize the CLI on this machine.
