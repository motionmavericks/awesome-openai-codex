import fs from 'node:fs';
import path from 'node:path';
import childProcess from 'node:child_process';
import yaml from 'yaml';
import GitHubSlugger from 'github-slugger';

const sections = [
  { key: 'tools', title: '🧰 Tools & SDKs' },
  { key: 'extensions', title: '🧩 Editors & Extensions' },
  { key: 'workflows', title: '⚙️ Workflows & Automation' },
  { key: 'resources', title: '📚 Guides & Learning' },
  { key: 'showcases', title: '🎯 Showcases' },
];

function ensurePunctuation(text) {
  if (!text) return '';
  const t = text.trim();
  return /[.!?]$/.test(t) ? t : t + '.';
}

function renderItem(i) {
  const tags = (i.tags || []).map((t) => '`' + t + '`').join(' ');
  const badge = i.badge ? ` ${i.badge}` : '';
  const desc = ensurePunctuation(i.description || '');
  const tagText = tags ? ` ${tags}.` : '';
  return `<!-- prettier-ignore -->\n- [${i.name}](${i.link})${badge} - ${desc}${tagText}`.trim();
}

function renderSection(title, items) {
  if (!items?.length) return '';
  return `\n## ${title}\n\n${items.map(renderItem).join('\n')}\n`;
}

function readYaml(file) {
  const p = path.join('data', file);
  const raw = fs.readFileSync(p, 'utf8');
  return yaml.parse(raw) || [];
}

function toc(headings) {
  const slugger = new GitHubSlugger();
  slugger.reset();
  return headings.map((h) => `- [${h}](#${slugger.slug(h)})`).join('\n');
}

function getRepoSlug() {
  if (process.env.GITHUB_REPOSITORY) return process.env.GITHUB_REPOSITORY; // owner/repo
  try {
    const url = childProcess
      .execSync('git remote get-url origin', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    if (!url) throw new Error('no remote');
    // https://github.com/owner/repo.git or git@github.com:owner/repo.git
    const matchHttps = url.match(/github\.com[:/](.+?)\.git$/);
    if (matchHttps) return matchHttps[1];
    const matchShort = url.match(/github\.com[:/](.+)$/);
    if (matchShort) return matchShort[1];
  } catch {}
  return 'OWNER/awesome-openai-codex';
}

const repoSlug = getRepoSlug();
const intro = fs.readFileSync('README.intro.md', 'utf8').trim();

const content = sections
  .map(({ key, title }) => renderSection(title, readYaml(`${key}.yml`)))
  .join('');

const headings = [
  'Getting Started',
  '🧰 Tools & SDKs',
  '🧩 Editors & Extensions',
  '⚙️ Workflows & Automation',
  '📚 Guides & Learning',
  '🎯 Showcases',
];

const readme = `# Awesome OpenAI Codex [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![CI](https://img.shields.io/github/actions/workflow/status/${repoSlug}/awesome-lint.yml?label=lint)](https://github.com/${repoSlug}/actions)

${intro}

## Contents
${toc(headings)}

## Getting Started
- Install Codex CLI, configure keys, and the VS Code extension.
- Explore example prompts and task breakdown patterns.

${content}
## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md). PRs welcome—follow the entry format.
`;

fs.writeFileSync('README.md', readme);
console.log('README.md generated.');
