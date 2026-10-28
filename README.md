# shreyam — personal site

Personal website for Shreyam: industrial data, digital twins and AI in operations.
Built with [Astro](https://astro.build) and Tailwind CSS, hosted on GitHub Pages.

**Live:** https://shreyamkmr.github.io/shreyam/

## What updates itself

| Section | Source | How it updates |
| --- | --- | --- |
| GitHub repos and recent activity | GitHub API | Rebuilt daily at 05:17 UTC and on every push. The activity list also refreshes live in the visitor's browser. |
| Contribution heatmap | GitHub GraphQL | Daily. Shown once the last year has 25+ public contributions. To count private work, turn on **Settings → Profile → "Include private contributions on my profile"**. |
| Credly badges | Credly public API | Daily, once `credly` is set in `src/data/profile.ts`. |
| LinkedIn posts | `src/data/linkedin.json` | One click, see below. |
| Certifications | `src/data/certifications.json` + Credly | One click, see below. |

### Adding a LinkedIn post or certification

LinkedIn doesn't offer an API for reading your own posts, so each post is added by its link and shown using LinkedIn's official embed:

1. On LinkedIn, open the post → **⋯** → **Copy link to post**.
2. On GitHub, open this repo → **Actions** → **Add to website** → **Run workflow**.
3. Choose `linkedin-post`, paste the link, and run it. The site redeploys in about a minute.

For a certification, choose `certification` and fill in the name, issuer, date and verification link.
This works from the GitHub mobile app too.

From a terminal it's the same thing:

```bash
npm run add -- linkedin "https://www.linkedin.com/posts/..." "One-line summary"
npm run add -- certification "Azure Data Engineer Associate" "Microsoft" "2026-05-01" "https://learn.microsoft.com/..."
```

## Editing content

Everything written about you (bio, experience, projects, skills, awards) lives in
[`src/data/profile.ts`](src/data/profile.ts). Repos to keep off the GitHub section are listed in `hiddenRepos` there.

## Local development

Requires Node.js 22+.

```bash
npm install
npm run dev      # http://localhost:4321/shreyam
npm run build    # production build into dist/
```

Set `GITHUB_TOKEN` to include the contribution heatmap locally.

## Custom domain

To serve from your own domain, add it under **Settings → Pages → Custom domain**, then set the
`SITE` and `BASE` environment variables in `.github/workflows/deploy.yml` (for example `SITE=https://example.com`, `BASE=/`).
