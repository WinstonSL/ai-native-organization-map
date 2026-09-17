// app.js — 交互逻辑（渲染、路由、搜索、学习状态）。知识内容在 content.js。

let current='workflow';
let filter='all';
const grid=document.getElementById('moduleGrid');
const detail=document.getElementById('detailPanel');

// ===== “问 AI”：把当前概念的问题带到用户常用的 AI =====
// query:true 表示该站支持用网址参数自动带入问题；false 表示只能打开+粘贴。
const aiProviders={
  chatgpt:{name:'ChatGPT',url:'https://chatgpt.com/?q=',query:true},
  perplexity:{name:'Perplexity',url:'https://www.perplexity.ai/search?q=',query:true},
  kimi:{name:'Kimi',url:'https://www.kimi.com/',query:false},
  deepseek:{name:'DeepSeek',url:'https://chat.deepseek.com/',query:false},
  doubao:{name:'豆包',url:'https://www.doubao.com/chat/',query:false},
  tongyi:{name:'通义',url:'https://www.tongyi.com/',query:false},
};
function getAIPref(){
  try{return JSON.parse(localStorage.getItem('ai-pref')||'null');}catch(e){return null;}
}
function setAIPref(pref){localStorage.setItem('ai-pref',JSON.stringify(pref));}
function currentProvider(){
  const p=getAIPref();
  if(p&&p.custom&&p.customUrl) return {name:p.customName||'自定义 AI',url:p.customUrl,query:/\{q\}|[?&][^=]+=$/.test(p.customUrl),custom:true};
  if(p&&p.id&&aiProviders[p.id]) return aiProviders[p.id];
  return null; // 未设置
}
function buildAIQuestion(concept){
  const def=(typeof conceptDefs!=='undefined'&&conceptDefs[concept])?conceptDefs[concept]:'';
  return `我在学习“AI-Native Organization（AI 原生组织）”，遇到一个概念：【${concept}】。`+
    (def?`\n地图里的简要说明是：${def}`:'')+
    `\n请用通俗的方式帮我讲清楚：它是什么、为什么重要、在真实的 AI 产品或组织里怎么体现，并给一个具体例子。我是非技术背景，请尽量少用术语。`;
}
async function copyText(t){
  try{ if(navigator.clipboard&&navigator.clipboard.writeText){ await navigator.clipboard.writeText(t); return true; } }catch(e){}
  try{ const ta=document.createElement('textarea'); ta.value=t; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); const ok=document.execCommand('copy'); document.body.removeChild(ta); return ok; }catch(e){ return false; }
}
function toast(msg){
  let t=document.getElementById('toast');
  if(!t){ t=document.createElement('div'); t.id='toast'; document.body.appendChild(t); }
  t.textContent=msg; t.className='show';
  clearTimeout(toast._t); toast._t=setTimeout(()=>{t.className='';},3200);
}
async function askAI(concept){
  const prov=currentProvider();
  if(!prov){ openAISettings(concept); return; }
  const q=buildAIQuestion(concept);
  const copied=await copyText(q);
  let url=prov.url;
  if(prov.query){
    if(prov.custom&&url.includes('{q}')) url=url.replace('{q}',encodeURIComponent(q));
    else url=url+encodeURIComponent(q);
  }
  window.open(url,'_blank','noopener,noreferrer');
  toast(prov.query?`已打开 ${prov.name}，问题已自动带入${copied?'（也已复制到剪贴板）':''}`:`已打开 ${prov.name}，问题已复制到剪贴板，粘贴即可提问`);
}

function openAISettings(pendingConcept){
  const pref=getAIPref()||{};
  const opts=Object.entries(aiProviders).map(([id,p])=>`<option value="${id}" ${pref.id===id&&!pref.custom?'selected':''}>${p.name}${p.query?'（自动带入问题）':'（打开后粘贴）'}</option>`).join('');
  const wrap=document.createElement('div');
  wrap.className='modal-mask'; wrap.id='aiModal';
  wrap.innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="选择常用 AI">
    <h3>选择你常用的 AI</h3>
    <p class="modal-sub">选一个 AI 助手。点概念旁的“问 AI”时，会把问题自动复制到剪贴板并打开它；支持的还会自动把问题填进去。设置只保存在你当前浏览器。</p>
    <label class="modal-label">预设 AI</label>
    <select id="aiSelect">${opts}</select>
    <label class="modal-label"><input type="checkbox" id="aiCustomChk" ${pref.custom?'checked':''}/> 使用自定义网址（高级）</label>
    <div id="aiCustomBox" style="${pref.custom?'':'display:none'}">
      <input id="aiCustomName" class="modal-input" placeholder="名称（如 公司内部 AI）" value="${pref.customName||''}"/>
      <input id="aiCustomUrl" class="modal-input" placeholder="网址；如需自动带入问题，用 {q} 占位，如 https://ai.example.com/?q={q}" value="${pref.customUrl||''}"/>
    </div>
    <div class="modal-btns">
      <button class="pillbtn" id="aiCancel">取消</button>
      <button class="pillbtn primary" id="aiSave">保存${pendingConcept?'并提问':''}</button>
    </div>
  </div>`;
  document.body.appendChild(wrap);
  const chk=wrap.querySelector('#aiCustomChk'), box=wrap.querySelector('#aiCustomBox');
  chk.onchange=()=>{box.style.display=chk.checked?'':'none';};
  const close=()=>wrap.remove();
  wrap.onclick=e=>{if(e.target===wrap)close();};
  wrap.querySelector('#aiCancel').onclick=close;
  wrap.querySelector('#aiSave').onclick=()=>{
    const custom=chk.checked;
    const np={id:wrap.querySelector('#aiSelect').value,custom,customName:wrap.querySelector('#aiCustomName').value.trim(),customUrl:wrap.querySelector('#aiCustomUrl').value.trim()};
    if(custom&&!np.customUrl){toast('请填写自定义网址，或取消勾选');return;}
    setAIPref(np); close();
    if(pendingConcept) askAI(pendingConcept);
    else toast('已保存常用 AI 设置');
  };
}

function renderModules(term=''){
  const q=term.trim().toLowerCase();
  const list=modules.filter(m=> (filter==='all'||m.p===filter) && (!q || JSON.stringify(m).toLowerCase().includes(q)) );
  grid.innerHTML=list.length?list.map(m=>`<article class="module" data-id="${m.id}" tabindex="0" role="button" aria-label="模块 ${m.n}：${m.title}"><span class="prio">${m.p}</span><div class="num">MODULE ${m.n}</div><h4>${m.title}</h4><p>${m.q}</p><div class="tagrow">${m.concepts.slice(0,3).map(x=>`<span class="tag">${x}</span>`).join('')}</div></article>`).join(''):`<div class="empty" style="grid-column:1/-1">没有找到匹配内容。</div>`;
  document.querySelectorAll('.module').forEach(el=>{
    const open=()=>{location.hash=el.dataset.id;};
    el.onclick=open;
    el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}};
  });
}

function renderDetail(){
  const m=modules.find(x=>x.id===current) || modules[0];
  const status=localStorage.getItem('study-'+m.id)||'未开始';
  const deep=m.deep?`<div class="deep"><div class="deep-sec"><h5>深入理解</h5><p>${m.deep.intro}</p></div><div class="deep-sec"><h5>关键概念展开</h5><div class="deep-concepts">${m.deep.keyConcepts.map(c=>`<div class="deep-c"><div class="deep-c-h"><b>${c[0]}</b><button class="askbtn sm" data-concept="${String(c[0]).replace(/"/g,'&quot;')}" aria-label="就「${c[0]}」向 AI 提问">🤖 问 AI</button></div><span>${c[1]}</span></div>`).join('')}</div></div>${m.deep.tools?`<div class="deep-sec"><h5>上手工具 / 产品 <em>（概念最终要落到工具上；链接均已核实可访问）</em></h5><div class="deep-tools">${m.deep.tools.map(t=>`<div class="deep-tool"><div class="deep-tool-h"><b>${t.name}</b><span class="deep-tool-links">${t.links.map(l=>`<a href="${l[1]}" target="_blank" rel="noopener noreferrer">${l[0]} ↗</a>`).join('')}</span></div><p class="deep-tool-o">${t.object}</p><p class="deep-tool-l"><strong>怎么上手：</strong>${t.learn}</p></div>`).join('')}</div></div>`:''}<div class="deep-sec"><h5>精选学习资料 <em>（链接均已核实可访问）</em></h5><div class="deep-links">${m.deep.links.map(l=>`<a class="deep-link" href="${l[1]}" target="_blank" rel="noopener noreferrer"><b>${l[0]} ↗</b><span>${l[2]}</span></a>`).join('')}</div></div><div class="deep-sec"><h5>建议学习路径</h5><ol class="deep-path">${m.deep.path.map(p=>`<li>${p}</li>`).join('')}</ol></div></div>`:`<div class="deep deep-empty">本模块的深度内容与学习资料正在逐步补充中。当前可先通过上方“关键范式 / 概念”和“代表工具 / 产品”建立整体认识。</div>`;
  detail.innerHTML=`<div class="detail"><div class="detail-head"><div><div class="eyebrow" style="color:#c7e4d8">MODULE ${m.n} · ${m.p}${(typeof moduleUpdated!=='undefined'&&moduleUpdated[m.id])?` · 最后更新 ${moduleUpdated[m.id]}`:''}</div><h3>${m.title}</h3><p>${m.q} —— ${m.desc}</p></div><div class="statusbox"><select id="statusSelect" aria-label="学习状态"><option ${status==='未开始'?'selected':''}>未开始</option><option ${status==='学习中'?'selected':''}>学习中</option><option ${status==='已掌握'?'selected':''}>已掌握</option></select></div></div><div class="detail-body"><div class="detail-col"><h5>关键范式 / 概念</h5><div class="concepts">${m.concepts.map(x=>`<span class="concept">${x}</span>`).join('')}</div></div><div class="detail-col"><h5>代表工具 / 产品</h5><div class="tools">${m.tools.map(t=>`<div class="tool"><b>${t[0]}</b><small>${t[1]}</small></div>`).join('')}</div></div><div class="study"><strong>你真正要学到什么：</strong> ${m.learn}</div>${deep}</div></div>`;
  document.getElementById('statusSelect').onchange=e=>localStorage.setItem('study-'+m.id,e.target.value);
  detail.querySelectorAll('.askbtn').forEach(b=>b.onclick=()=>askAI(b.dataset.concept));
}

function renderConcepts(term=''){
  const all=[...new Set(modules.flatMap(m=>m.concepts))];
  const q=term.trim().toLowerCase();
  const filtered=all.filter(c=>!q||c.toLowerCase().includes(q)||(conceptDefs[c]||'').toLowerCase().includes(q));
  document.getElementById('conceptGrid').innerHTML=filtered.map(c=>{const owner=modules.filter(m=>m.concepts.includes(c)).map(m=>m.title).slice(0,2).join(' / ');return `<div class="index-card"><h4>${c}</h4><p>${conceptDefs[c]||'建议先通过所属模块理解其在 Agent / 组织系统中的作用，再决定是否深挖技术实现。'}</p><div class="meta">归属：${owner}</div><button class="askbtn" data-concept="${c.replace(/"/g,'&quot;')}" aria-label="就「${c}」向 AI 提问">🤖 问 AI</button></div>`}).join('') || '<div class="empty" style="grid-column:1/-1">没有找到匹配概念。</div>';
  document.querySelectorAll('#conceptGrid .askbtn').forEach(b=>b.onclick=()=>askAI(b.dataset.concept));
}
function renderProducts(term=''){
  const q=term.trim().toLowerCase();
  const list=products.filter(p=>!q||p.join(' ').toLowerCase().includes(q));
  document.getElementById('productGrid').innerHTML=list.map(p=>`<div class="index-card"><h4>${p[0]}</h4><p><b>${p[1]}</b><br>${p[3]}</p><div class="meta">学习位置：${p[2]}</div></div>`).join('') || '<div class="empty" style="grid-column:1/-1">没有找到匹配产品。</div>';
}
function showView(id){
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===id));
  document.querySelectorAll('.navbtn').forEach(b=>b.classList.toggle('active',b.dataset.view===id));
  if(id==='detail') renderDetail();
}

// hash 路由：#<模块id> 打开该模块详情；#<视图id> 切到该视图；其它回总地图。
const viewIds=['overview','detail','journey','concepts','products','lens'];
function routeFromHash(){
  const h=decodeURIComponent(location.hash.replace(/^#/,'')).trim();
  if(modules.some(m=>m.id===h)){ current=h; showView('detail'); }
  else if(viewIds.includes(h)){ showView(h); }
  else { showView('overview'); }
}
window.addEventListener('hashchange',routeFromHash);
document.querySelectorAll('.navbtn').forEach(b=>b.onclick=()=>{location.hash=b.dataset.view;});
document.querySelectorAll('.pillbtn').forEach(b=>b.onclick=()=>{document.querySelectorAll('.pillbtn').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;renderModules(document.getElementById('search').value);});
document.getElementById('search').addEventListener('input',e=>{renderModules(e.target.value);renderConcepts(e.target.value);renderProducts(e.target.value);});
const aiBtn=document.getElementById('aiSettingsBtn'); if(aiBtn) aiBtn.onclick=()=>openAISettings(null);
renderModules();renderConcepts();renderProducts();routeFromHash();
