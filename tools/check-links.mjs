#!/usr/bin/env node
// check-links.mjs — 链接健康检查
//
// 作用：从 content.js 抽出所有外部链接，逐个访问，报告哪些失效。
// 何时用：更新内容后、或想定期体检时，手动运行。它不会自动定时打扰你。
//
// 运行： node tools/check-links.mjs
// 需要： Node 18+（自带 fetch），且运行环境能访问外网。
// 退出码：全部可达=0；有失效或可疑=1（方便未来接入自动化时判断）。

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(root, 'content.js');
const TIMEOUT_MS = 30000;

const raw = await readFile(CONTENT, 'utf8');
// 抽取所有 http(s) 链接并去重
const urls = [...new Set((raw.match(/https?:\/\/[^'"\s]+/g) || []))].sort();

if (urls.length === 0) {
  console.log('未在 content.js 中找到任何外部链接。');
  process.exit(0);
}

console.log(`共发现 ${urls.length} 个外部链接，开始检查……\n`);

async function check(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    // 先用 GET（部分站点对 HEAD 返回异常状态），跟随重定向
    const res = await fetch(url, { method: 'GET', redirect: 'follow', signal: ctrl.signal });
    clearTimeout(timer);
    return { url, status: res.status, finalUrl: res.url, ok: res.status >= 200 && res.status < 400 };
  } catch (e) {
    clearTimeout(timer);
    return { url, status: 0, finalUrl: '', ok: false, error: e.name === 'AbortError' ? '超时' : e.message };
  }
}

const results = await Promise.all(urls.map(check));

const good = results.filter(r => r.ok);
const bad = results.filter(r => !r.ok);

for (const r of results) {
  const mark = r.ok ? '✅' : '❌';
  const redir = r.finalUrl && r.finalUrl !== r.url ? `  → ${r.finalUrl}` : '';
  const err = r.error ? `  (${r.error})` : '';
  console.log(`${mark} [${r.status || '---'}] ${r.url}${redir}${err}`);
}

console.log(`\n结果：${good.length} 个可达，${bad.length} 个需处理。`);
if (bad.length) {
  console.log('\n需处理的链接（请在 content.js 中修正或替换，修正后重新运行本脚本）：');
  bad.forEach(r => console.log(`  - ${r.url}  [${r.status || r.error || '失败'}]`));
  process.exit(1);
}
process.exit(0);
