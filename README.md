# GrantOps Public

Public GitHub Pages view of the private `Obefree/GrantOps` operating database.

## What is here

- `index.html` — public partner/funding dashboard.
- `data/public.json` — public-safe snapshot exported from the private canonical database.
- `.github/workflows/pages.yml` — GitHub Pages deployment on every public update.

The site exposes funding opportunities, consortium routes, partner pipeline status and deadlines while excluding private contact IDs, personal contact details, owners and internal notes.

## Automatic private → public sync

The private `Obefree/GrantOps` repository contains:

- `scripts/export_public.py` — creates the sanitized JSON export;
- `.github/workflows/sync-public.yml` — runs after relevant private-data changes, once daily, or manually, then updates `data/public.json` in this repository.

### One-time credential required

Create a fine-grained GitHub personal access token that has **Contents: Read and write** access to `Obefree/GrantOps-Public` only. Save it in the private `Obefree/GrantOps` repository as an Actions secret named:

`GRANTOPS_PUBLIC_TOKEN`

After that, private GrantOps updates automatically refresh this public site without making the private repository public.

## GitHub Pages

Set the repository Pages source to **GitHub Actions** once. The intended URL is:

`https://obefree.github.io/GrantOps-Public/`
