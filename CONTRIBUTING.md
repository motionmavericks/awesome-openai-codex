# Contributing

Thanks for contributing! To add an item:

1. Edit the relevant YAML in `data/` using the schema:
   ```yml
   - name: Project Name
     link: https://example.com
     description: Brief, value-focused explanation (≤200 chars).
     tags: [cli, vscode, prompt]
     badge: '![Stars](https://img.shields.io/github/stars/org/repo?style=social)'
   ```
2. Run `npm run build` to update `README.md`.
3. Run `npm run check` and ensure all checks pass.
4. Submit a pull request with a clear description.

## PR Checklist

- [ ] Item follows the schema and fits the category.
- [ ] `npm run build` and `npm run check` have been run.
- [ ] Description is short, value-driven, and uses tags.
