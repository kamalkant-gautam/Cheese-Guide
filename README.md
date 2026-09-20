# The Cheese Guide

An interactive, self-contained hospitality training guide covering 20 cheeses — their origin, milk source, texture, flavor, and best culinary use — plus a milk comparison, a cheese-making process diagram, a texture spectrum, and an A–Z glossary.

## Folder structure

```
cheese-guide/
├── index.html      → the page itself
├── css/
│   └── style.css   → all styling
├── js/
│   └── script.js   → interactivity (filters, scroll progress, Q&A form)
└── README.md
```

## Publishing on GitHub Pages

1. Create a new repository on GitHub and upload this whole `cheese-guide` folder to it (or push it with git).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch", choose your main branch and the `/ (root)` folder, then save.
4. GitHub will give you a live URL (usually `https://<your-username>.github.io/<repo-name>/`) within a minute or two.

## Setting up the Q&A / "Ask a question" button

The page has a floating Q&A button (next to the back-to-top button). Clicking it opens a small form — Name, Query, Send. Because a GitHub Pages site has no server of its own, the form needs a free third-party form endpoint to actually deliver and store submissions **privately, to you only**. The recommended option is **Formspree**:

1. Go to [formspree.io](https://formspree.io) and sign up for a free account (no credit card needed — the free tier covers 50 submissions/month).
2. Create a new form. Formspree will give you an endpoint that looks like:
   `https://formspree.io/f/abcdwxyz`
3. Open `js/script.js` and find this line near the top of the Q&A section:
   ```js
   const QA_FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
   ```
4. Replace `YOUR_FORM_ID` with your real endpoint from step 2, and save.
5. Every submission will now be emailed straight to the inbox you signed up with, and also saved in your private Formspree dashboard — visible only to you.

**Before you complete this setup**, the form still works as a safety net: it will automatically fall back to opening the visitor's email app with a pre-filled message addressed to you, so no query is ever lost.

## Design system

Fraunces (headings) + Karla (body), warm cream/gold/wax palette, tap-to-expand cheese cards, category filters, sticky nav, scroll progress bar, and custom inline SVG illustrations — consistent with the Tea, Coffee, and Pastry guides in this series.

---
Compiled by Kamal Kant Gautam
