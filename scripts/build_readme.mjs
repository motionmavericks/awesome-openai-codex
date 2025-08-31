import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';

const sections = [
  { key: 'tools', title: '🧰 Tools & SDKs' },
  { key: 'extensions', title: '🧩 Editors & Extensions' },
  { key: 'workflows', title: '⚙️ Workflows & Automation' },
  { key: 'resources', title: '📚 Guides & Learning' },
  { key: 'showcases', title: '🎯 Showcases' },
];

function renderItem(i) {
  const tags = (i.tags || []).map((t) => '`' + t + '`').join(' ');
  const badge = i.badge ? ` ${i.badge}` : '';
  return `- [${i.name}](${i.link})${badge} — ${i.description?.trim() || ''} ${tags}`.trim();
}

function renderSection(title, items) {
  if (!items?.length) return '';
  return `\n### ${title}\n\n${items.map(renderItem).join('\n')}\n`;
}

function readYaml(file) {
  const p = path.join('data', file);
  const raw = fs.readFileSync(p, 'utf8');
  return yaml.parse(raw) || [];
}

function toc(headings) {
  return headings
    .map(
      (h) =>
        `- [${h}](#${h
          .toLowerCase()
          .replace(/[^a-z0-9 ]/g, '')
          .replace(/ /g, '-')})`,
    )
    .join('\n');
}

const intro = fs.readFileSync('README.intro.md', 'utf8').trim();

const content = sections
  .map(({ key, title }) => renderSection(title, readYaml(`${key}.yml`)))
  .join('');

const headings = [
  'Awesome OpenAI Codex',
  'Table of Contents',
  'Getting Started',
  '🧰 Tools & SDKs',
  '🧩 Editors & Extensions',
  '⚙️ Workflows & Automation',
  '📚 Guides & Learning',
  '🎯 Showcases',
  'Contributing',
  'License',
];

const readme = `# Awesome OpenAI Codex
[![Awesome](https://awesome.re/badge.svg)](https://awesome.re) [![CI](https://img.shields.io/github/actions/workflow/status/openai/awesome-openai-codex/awesome-lint.yml?label=lint)](#)

${intro}

## Table of Contents
${toc(headings)}

## Getting Started
- Install Codex CLI, configure keys, and the VS Code extension.
- Explore example prompts and task breakdown patterns.

${content}
## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md). PRs welcome—follow the entry format.

## License
[MIT](LICENSE)
`;

fs.writeFileSync('README.md', readme);
console.log('README.md generated.');
