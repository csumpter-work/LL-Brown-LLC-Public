import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = (path) => readFileSync(join(root, path), 'utf8');
const home = load('public/index.html');
const terms = load('public/payment-terms/index.html');
const css = load('public/styles.css');

test('homepage retains original design structure and style path', () => {
  for (const token of ['class="site-header"', 'class="hero"', 'hero-image', 'id="services"', 'class="service-list"', '/styles.css']) {
    assert.ok(home.includes(token), 'missing: ' + token);
  }
  assert.match(home, /Crane, rigging &amp; demolition|Crane, rigging & demolition/);
  assert.match(css, /\.hero\s*\{/);
  assert.ok(css.includes('--red:#e10613'));
  assert.ok(css.includes('--paper:#f4f1eb'));
});

test('original ChatGPT Site hostname is not required by public HTML', () => {
  assert.ok(!home.includes('ll-brown-4444.chatgpt.site'));
  assert.ok(!terms.includes('ll-brown-4444.chatgpt.site'));
});

test('customer chat remains linked; payment terms stay accessible', () => {
  assert.ok(home.includes('llbrown-customer-chat.llbrownllc.workers.dev'));
  assert.ok(terms.includes('llbrown-customer-chat.llbrownllc.workers.dev'));
  assert.ok(home.includes('/payment-terms'));
  assert.ok(terms.includes('ARTICLE 1'));
});

test('required public image assets are intact PNG files', () => {
  for (const name of ['ll-brown-logo.png', 'link-belt-atc-3275-demolition-hero.png']) {
    const path = join(root, 'public', name);
    assert.ok(statSync(path).size > 1000);
    assert.equal(readFileSync(path).subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  }
});
