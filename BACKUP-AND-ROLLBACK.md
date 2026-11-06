# Backup and rollback

The site as it stood before the Finish Line sprint (2026-11-05) is preserved at commit `687bb35`.

| Reference | Points to |
|---|---|
| Tag `backup/pre-finish-line-2026-11-05` | `687bb35` |
| Branch `backup/original-site-2026-11-05` | `687bb35` |
| Branch `sayable-website` | `687bb35` (unchanged) |
| Sprint branch | `sayable/premium-production-sprint-2026-11-05` |

There was no uncommitted work at the start of the sprint (`git status` was clean), so nothing needed a separate stash.

## Restore the original code

```sh
git switch sayable-website          # or: git switch -c restore backup/pre-finish-line-2026-11-05
```

## Restore the original live site

Production (`https://sayable-site.vercel.app`) was not redeployed during this sprint. Only a preview deployment was created. If production is ever changed and needs reverting, use `vercel rollback` or promote the earlier deployment from the Vercel dashboard.
