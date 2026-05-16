# Neuroscience PhD Homepage

This is a bilingual static personal homepage for neuroscience PhD applications. It is designed to work on GitHub Pages without a build step.

## Edit Your Content

Update `content.js` first. Most visible page content lives there:

- `profile`: name, email, application direction, contact links.
- `researchInterests`: research themes shown near the top.
- `projects`: featured research projects, proposals, code portfolios, or posters.
- `education`, `publications`, `awards`, `skills`: CV-style sections.
- `cvUrl`: language-specific paths for downloadable CV PDFs.

Each project can include future code or portfolio links:

```js
links: [
  {
    label: { en: "Code Repository", zh: "代码仓库" },
    href: "https://github.com/your-name/project",
  },
  {
    label: { en: "Poster", zh: "海报" },
    href: "assets/project-poster.pdf",
  },
]
```

Links with `"#"` are treated as placeholders and hidden from the page.

## Add Your CV

Place your CV PDFs at:

```text
assets/CV.pdf
assets/CV-ZH.pdf
```

Or update `cvUrl` in `content.js` if you prefer other filenames.

## Preview

Open `index.html` directly in a browser. No local server is required.

## Deploy to GitHub Pages

Push these files to a GitHub repository, then enable GitHub Pages from the repository settings. Use the repository root as the publishing source.
