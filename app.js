// app.js — 交互逻辑（渲染、路由、搜索、学习状态）。知识内容在 content.js。

let current='workflow';
let filter='all';
const grid=document.getElementById('moduleGrid');
const detail=document.getElementById('detailPanel');

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
  const deep=m.deep?`<div class="deep"><div class="deep-sec"><h5>深入理解</h5><p>${m.deep.intro}</p></div><div class="deep-sec"><h5>关键概念展开</h5><div class="deep-concepts">${m.deep.keyConcepts.map(c=>`<div class="deep-c"><b>${c[0]}</b><span>${c[1]}</span></div>`).join('')}</div></div>${m.deep.tools?`<div class="deep-sec"><h5>上手工具 / 产品 <em>（概念最终要落到工具上；链接均已核实可访问）</em></h5><div class="deep-tools">${m.deep.tools.map(t=>`<div class="deep-tool"><div class="deep-tool-h"><b>${t.name}</b><span class="deep-tool-links">${t.links.map(l=>`<a href="${l[1]}" target="_blank" rel="noopener noreferrer">${l[0]} ↗</a>`).join('')}</span></div><p class="deep-tool-o">${t.object}</p><p class="deep-tool-l"><strong>怎么上手：</strong>${t.learn}</p></div>`).join('')}</div></div>`:''}<div class="deep-sec"><h5>精选学习资料 <em>（链接均已核实可访问）</em></h5><div class="deep-links">${m.deep.links.map(l=>`<a class="deep-link" href="${l[1]}" target="_blank" rel="noopener noreferrer"><b>${l[0]} ↗</b><span>${l[2]}</span></a>`).join('')}</div></div><div class="deep-sec"><h5>建议学习路径</h5><ol class="deep-path">${m.deep.path.map(p=>`<li>${p}</li>`).join('')}</ol></div></div>`:`<div class="deep deep-empty">本模块的深度内容与学习资料正在逐步补充中。当前可先通过上方“关键范式 / 概念”和“代表工具 / 产品”建立整体认识。</div>`;
  detail.innerHTML=`<div class="detail"><div class="detail-head"><div><div class="eyebrow" style="color:#c7e4d8">MODULE ${m.n} · ${m.p}${(typeof moduleUpdated!=='undefined'&&moduleUpdated[m.id])?` · 最后更新 ${moduleUpdated[m.id]}`:''}</div><h3>${m.title}</h3><p>${m.q} —— ${m.desc}</p></div><div class="statusbox"><select id="statusSelect" aria-label="学习状态"><option ${status==='未开始'?'selected':''}>未开始</option><option ${status==='学习中'?'selected':''}>学习中</option><option ${status==='已掌握'?'selected':''}>已掌握</option></select></div></div><div class="detail-body"><div class="detail-col"><h5>关键范式 / 概念</h5><div class="concepts">${m.concepts.map(x=>`<span class="concept">${x}</span>`).join('')}</div></div><div class="detail-col"><h5>代表工具 / 产品</h5><div class="tools">${m.tools.map(t=>`<div class="tool"><b>${t[0]}</b><small>${t[1]}</small></div>`).join('')}</div></div><div class="study"><strong>你真正要学到什么：</strong> ${m.learn}</div>${deep}</div></div>`;
  document.getElementById('statusSelect').onchange=e=>localStorage.setItem('study-'+m.id,e.target.value);
}

function renderConcepts(term=''){
  const all=[...new Set(modules.flatMap(m=>m.concepts))];
  const q=term.trim().toLowerCase();
  const filtered=all.filter(c=>!q||c.toLowerCase().includes(q)||(conceptDefs[c]||'').toLowerCase().includes(q));
  document.getElementById('conceptGrid').innerHTML=filtered.map(c=>{const owner=modules.filter(m=>m.concepts.includes(c)).map(m=>m.title).slice(0,2).join(' / ');return `<div class="index-card"><h4>${c}</h4><p>${conceptDefs[c]||'建议先通过所属模块理解其在 Agent / 组织系统中的作用，再决定是否深挖技术实现。'}</p><div class="meta">归属：${owner}</div></div>`}).join('') || '<div class="empty" style="grid-column:1/-1">没有找到匹配概念。</div>';
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
renderModules();renderConcepts();renderProducts();routeFromHash();
