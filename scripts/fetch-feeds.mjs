// Pulls live data into src/data/generated/ before every build.
// - GitHub: public repos, recent public activity, contribution calendar (needs GITHUB_TOKEN)
// - Credly: badges, if profile.credly is set
// Every source fails soft: a network error leaves an empty feed rather than a broken build.

import { mkdir, writeFile } from 'node:fs/promises';
import { profile, hiddenRepos } from '../src/data/profile.ts';
import { summarizeEvents } from '../src/lib/github-events.js';

const OUT = new URL('../src/data/generated/', import.meta.url);
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const user = profile.github;

const gh = async (path) => {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'shreyam-site',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok) throw new Error(`GitHub ${path}: ${res.status}`);
  return res.json();
};

async function soft(label, fn, fallback) {
  try {
    return await fn();
  } catch (err) {
    console.warn(`[fetch-feeds] ${label} skipped: ${err.message}`);
    return fallback;
  }
}

async function repos() {
  const all = await gh(`/users/${user}/repos?per_page=100&sort=pushed`);
  return all
    .filter((r) => !r.fork && !r.private && !r.archived && !hiddenRepos.includes(r.name))
    .map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      homepage: r.homepage || null,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      topics: r.topics ?? [],
      pushedAt: r.pushed_at,
    }));
}

async function events() {
  return summarizeEvents(await gh(`/users/${user}/events/public?per_page=50`), user);
}

async function calendar() {
  if (!token) throw new Error('no GITHUB_TOKEN set');
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'User-Agent': 'shreyam-site' },
    body: JSON.stringify({
      query: `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{
        totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}`,
      variables: { login: user },
    }),
  });
  const json = await res.json();
  const cal = json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal) throw new Error(json.errors?.[0]?.message ?? 'empty response');
  const level = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
  return {
    total: cal.totalContributions,
    weeks: cal.weeks.map((w) =>
      w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: level[d.contributionLevel] ?? 0 })),
    ),
  };
}

async function credly() {
  if (!profile.credly) return [];
  const res = await fetch(`https://www.credly.com/users/${profile.credly}/badges.json`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`Credly: ${res.status}`);
  const { data = [] } = await res.json();
  return data.map((b) => ({
    name: b.badge_template?.name,
    issuer: b.issuer?.entities?.[0]?.entity?.name ?? b.badge_template?.issuer?.entities?.[0]?.entity?.name ?? 'Credly',
    date: b.issued_at_date ?? b.issued_at,
    url: `https://www.credly.com/badges/${b.id}`,
    image: b.image_url ?? b.badge_template?.image_url,
  }));
}

const [r, e, c, cr] = await Promise.all([
  soft('repos', repos, []),
  soft('events', events, []),
  soft('calendar', calendar, null),
  soft('credly', credly, []),
]);

await mkdir(OUT, { recursive: true });
await writeFile(
  new URL('github.json', OUT),
  JSON.stringify({ fetchedAt: new Date().toISOString(), repos: r, events: e, calendar: c }, null, 2),
);
await writeFile(new URL('credly.json', OUT), JSON.stringify(cr, null, 2));
console.log(`[fetch-feeds] ${r.length} repos, ${e.length} events, calendar: ${c ? c.total : 'none'}, ${cr.length} Credly badges`);
