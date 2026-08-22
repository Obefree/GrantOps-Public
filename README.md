# GrantOps Public

Public GitHub Pages dashboard generated from the private `Obefree/GrantOps` operating database.

## Minimal architecture

`Obefree/GrantOps` (private source of truth) → `scripts/export_public.py` → `data/public.json` in `Obefree/GrantOps-Public` → GitHub Pages.

No server, database, Vercel or paid hosting is required.

## Public site

The site contains:

- **Overview** — priority funding routes and technical-partner positioning;
- **Opportunities** — searchable/filterable grants, calls, partner searches and cascade routes;
- **IT company routes** — Digital Europe, Horizon Europe, Eurostars, Portugal 2030/COMPETE, EdTech, EIC and Erasmus+ routes;
- **Partners** — organisation-level collaboration pipeline and next actions;
- **Outreach** — sanitized organisation-level communication history;
- **Deadlines** — grant deadlines and dated partnership follow-ups.

Private contact IDs, personal contact details, owners, application/document IDs and internal notes are excluded by the export script.

## Automatic sync

The private repository contains `.github/workflows/sync-public.yml`.

On relevant changes to `main`, it:

1. runs `scripts/export_public.py`;
2. validates the generated JSON;
3. writes only `public-export/public.json` to `GrantOps-Public/data/public.json`;
4. commits the snapshot only when it changed.

For cross-repository write access, add one fine-grained GitHub token to the private `Obefree/GrantOps` repository as the Actions secret:

`GRANTOPS_PUBLIC_TOKEN`

The token only needs **Contents: Read and write** permission for `Obefree/GrantOps-Public`.

A temporary scheduled GrantOps Public Sync can maintain the public snapshot until this repository secret is configured; after the Git-native sync is active, that scheduled fallback can be disabled.

## GitHub Pages

`.github/workflows/pages.yml` validates `data/public.json` and deploys the static repository with the official GitHub Pages actions.

**Pages source is configured as GitHub Actions.** This commit intentionally triggers the initial deployment after enabling Pages.

Expected URL:

`https://obefree.github.io/GrantOps-Public/`
