// Turns a raw GitHub event into a short human sentence.
// Shared by the build-time fetch and the in-browser live refresh.

const cap = (s = '') => s.charAt(0).toUpperCase() + s.slice(1);

function describe(e, user) {
  const p = e.payload ?? {};
  switch (e.type) {
    case 'PushEvent': {
      const n = p.size ?? p.commits?.length;
      const branch = p.ref?.replace('refs/heads/', '');
      return {
        verb: n ? `Pushed ${n} commit${n === 1 ? '' : 's'} to` : 'Pushed to',
        detail: p.commits?.at(-1)?.message?.split('\n')[0] ?? (branch ? `on ${branch}` : null),
      };
    }
    case 'CreateEvent':
      return p.ref_type === 'repository' ? { verb: 'Created repository' } : { verb: `Created ${p.ref_type} ${p.ref} in` };
    case 'ReleaseEvent':
      return { verb: `Released ${p.release?.tag_name ?? ''} of`, detail: p.release?.name };
    case 'PullRequestEvent':
      return {
        verb: `${p.action === 'closed' && p.pull_request?.merged ? 'Merged' : cap(p.action)} a pull request in`,
        detail: p.pull_request?.title,
      };
    case 'IssuesEvent':
      return { verb: `${cap(p.action)} an issue in`, detail: p.issue?.title };
    case 'PublicEvent':
      return { verb: 'Open-sourced' };
    case 'ForkEvent':
      return { verb: 'Forked' };
    case 'WatchEvent':
      return { verb: 'Starred' };
    default:
      return null;
  }
}

export function summarizeEvents(list, user, limit = 10) {
  return list
    .map((e) => {
      const d = describe(e, user);
      return (
        d && {
          verb: d.verb,
          detail: d.detail ?? null,
          repo: e.repo.name,
          url: `https://github.com/${e.repo.name}`,
          at: e.created_at,
        }
      );
    })
    .filter(Boolean)
    .slice(0, limit);
}
