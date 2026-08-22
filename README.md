# GrantOps Public

Public GitHub Pages view of the private `Obefree/GrantOps` operating database.

## What is here

- `index.html` — partner-facing funding and collaboration dashboard.
- `data/public.json` — public-safe snapshot generated from the private canonical database.
- `.github/workflows/pages.yml` — GitHub Pages deployment on every public-repository update.

The site currently provides:

- **Overview** — priority funding routes and technical-partner positioning;
- **Opportunities** — searchable/filterable grants, calls, partner searches and cascade routes;
- **IT company routes** — decision support for Digital Europe, Horizon Europe, Eurostars, Portugal 2030/COMPETE, EdTech, EIC and Erasmus+;
- **Partners** — organisation-level collaboration pipeline and next actions;
- **Outreach** — sanitized organisation-level communication history;
- **Deadlines** — grant deadlines and dated partnership follow-ups in one timeline.

Private contact IDs, personal contact details, owners, document IDs and internal notes are not exported.

## Automatic private → public sync

The private `Obefree/GrantOps` repository remains the source of truth. Its `scripts/export_public.py` defines the public export policy.

A scheduled GrantOps Public Sync reads the private canonical records and updates `data/public.json` in this public repository when public-safe data changes. This works without making the private repository public.

The private repository also contains `.github/workflows/sync-public.yml` as an optional Git-native cross-repository sync. If a fine-grained token named `GRANTOPS_PUBLIC_TOKEN` is configured later, that workflow can push the export immediately after private data changes. Without that token it safely skips the cross-repository push; the scheduled sync still maintains the site.

## GitHub Pages

The repository includes a GitHub Actions Pages deployment workflow. Pages must use **GitHub Actions** as the publishing source.

Intended public URL:

`https://obefree.github.io/GrantOps-Public/`
