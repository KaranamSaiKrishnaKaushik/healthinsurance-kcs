import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
const root = 'dist/healthinsurance-kcs/browser';
const html = readFileSync(`${root}/index.html`, 'utf8');
assert.match(html, /<app-root/);
assert.match(html, /property="og:title"/);
assert.match(html, /name="description"/);
for (const match of html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css))"/g)) {
  if (!match[1].startsWith('http')) assert.ok(existsSync(`${root}/${match[1]}`), `Missing ${match[1]}`);
}
const config = JSON.parse(readFileSync(`${root}/staticwebapp.config.json`, 'utf8'));
assert.equal(config.routes[0].rewrite, '/index.html');
assert.ok(readdirSync(root).some((file) => /^main-.*\.js$/.test(file)));
assert.ok(existsSync(`${root}/assets/favicon.svg`));
console.log('PASS: static entry point, metadata, bundles, assets and Azure configuration.');
