# Visitor Stats Demo

This repository contains a simple static site that can be hosted with GitHub Pages.

## Features
- Displays the current time updated every second.
- Shows visitor IP address and location using the free ipapi.co service.
- Includes a placeholder Google Tag Manager snippet (replace `GTM-XXXX` with your ID).

## Deploying to GitHub Pages
1. Create a repository named `<username>.github.io` (replace `<username>` with your GitHub handle) and push these files to the `main` branch.
2. Ensure GitHub Pages is enabled from the **main** branch in the repository settings.
3. The site will be served from `https://<username>.github.io/`.
4. Optionally, keep the included GitHub Actions workflow (`.github/workflows/pages.yml`) to automatically deploy whenever you push changes.

Replace `GTM-XXXX` in `index.html` with your own Google Tag Manager ID to enable tracking.
