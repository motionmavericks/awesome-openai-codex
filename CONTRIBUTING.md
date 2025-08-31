## Contributing

Thanks for helping make Awesome OpenAI Codex better!

Before submitting, please:

- Follow the entry schema and category rules below.
- Add items to the correct `data/*.yml` file.
- Keep descriptions concise (≤200 chars), value-focused, and neutral.
- Use tags to help discovery (e.g., `cli`, `vscode`, `sdk`, `workflow`).
- Prefer official or well-maintained sources; avoid duplicates.

### Entry format (apply to all data/\*.yml)

```yaml
- name: Project Name
  link: https://example.com
  description: Brief, value-focused explanation (≤200 chars).
  tags: [cli, vscode, prompt]
  badge: '![Stars](https://img.shields.io/github/stars/org/repo?style=social)'
```

### Category rules

- `tools.yml`: SDKs, CLIs, libraries for building with OpenAI/Codex.
- `extensions.yml`: Editor plugins and IDE integrations.
- `workflows.yml`: Automations, templates, CI/CD and ops patterns.
- `resources.yml`: Guides, blogs, docs, examples, and tutorials.
- `showcases.yml`: Notable projects, demos, and products.

### PR checklist

- [ ] Added entry in the correct `data/*.yml`.
- [ ] Description ≤200 chars and objective.
- [ ] Included helpful tags (2–5) and a star badge if applicable.
- [ ] Ran `npm run build && npm run check` locally (no errors).
- [ ] Ensured alphabetical order within each section (by name).

### Local development

```bash
npm install
npm run build
npm run check
npm run format # optional
```

By contributing, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).
