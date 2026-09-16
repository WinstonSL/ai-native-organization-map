const modules = [
 {id:'workflow',n:'01',p:'P0',title:'Workflow & Process Redesign',q:'AI 到底接管哪些工作？',desc:'把传统流程重构成人 + Agent 的 AI-native workflow，而不仅仅是在旧流程上加一个聊天机器人。',concepts:['Agentic Workflow','Deterministic Workflow','Human-in-the-loop','Trigger','Checkpoint','Evaluator–Optimizer','Parallel / Sequential','Workflow Redesign'],tools:[['Taskade Genesis','从业务描述生成 App + Agent + Automation'],['CrewAI Flows','固定流程与 Agent Crew 混合'],['LangGraph','用 State / Node / Edge 编排流程'],['Microsoft Agent Framework','Agent + Workflow + Checkpoint + HITL']],learn:'重点学“固定流程 vs Agent 自主判断”的边界；学会把一个真实业务流程拆成：确定性规则、Agent 判断、人工审批、异常升级。'},
 {id:'context',n:'02',p:'P0',title:'Context & Memory',q:'AI 怎么知道该知道的东西？',desc:'从“知识库”升级为 Context Infrastructure：让 Agent 在正确时间拿到正确的组织知识、历史和状态。',concepts:['Context Engineering','Working Memory','Long-term Memory','Episodic Memory','Semantic Memory','RAG','State','Context Compression','Continual Learning'],tools:[['Letta','Stateful / Lifelong Agent 与长期状态'],['Mem0','面向 Agent 的 Memory Layer'],['LangGraph Memory','把状态与记忆放进 Agent workflow'],['企业知识库 / RAG','组织知识进入 Agent 的基础方式']],learn:'重点理解 Memory ≠ 聊天记录；以及“某个 Agent 在某个任务、某个时刻应该知道什么”这个 Context Engineering 问题。'},
 {id:'agent',n:'03',p:'P0',title:'Agent Architecture',q:'一个 Agent 到底怎么持续完成任务？',desc:'理解 Agent 的运行底盘：模型只是大脑，真正能工作还需要 Harness、工具、状态、沙箱与循环。',concepts:['Agent Loop','Plan–Act–Observe','Tool Use','Harness','Runtime','Sandbox','Skill','Computer Use','Session'],tools:[['DeepSeek Harness (DSH)','理解 Model + Harness 的好教材'],['LangGraph','低层 Agent / State 编排'],['Microsoft Agent Framework','企业 Agent Runtime / Workflow'],['Codex / Claude Code','观察成熟 Coding Agent 的实际工作方式']],learn:'不用钻源码，但必须真正理解 Agent Loop、Harness、Skill、Tool、Sandbox、Session 分别解决什么问题。'},
 {id:'tools',n:'04',p:'P0',title:'Tool & System Connectivity',q:'Agent 怎么连接组织已有系统？',desc:'Agent 真正进入企业，核心不是会聊天，而是能安全读取数据、调用能力、操作已有软件。',concepts:['MCP','Tool Calling','Connector','API','Resource','Authorization','Computer Use','MCP Server'],tools:[['MCP','Agent ↔ Tools / Data 的关键开放协议'],['MCP Server','把企业系统能力暴露给 Agent'],['Connectors','连接 Gmail / Drive / Slack / CRM 等'],['Computer Use','没有 API 时直接操作软件界面']],learn:'MCP 建议升为必修：搞懂 Host、Client、Server、Tool、Resource、Authorization；不要求你会写 Server。'},
 {id:'multi',n:'05',p:'P1',title:'Multi-Agent & Orchestration',q:'什么时候需要多个 Agent？',desc:'核心不是“多个 Agent 聊天”，而是 Delegation、Handoff、共享状态、Supervisor 与并行协作。',concepts:['Subagent','Supervisor','Router','Delegation','Handoff','Parallelization','Shared State','Orchestrator'],tools:[['LangGraph','图式多 Agent 编排'],['CrewAI','按角色建立 Agent Crew'],['Microsoft Agent Framework','多 Agent + Workflow'],['Moxt','在 Workspace 中观察多 Agent 协作']],learn:'最重要的问题不是“怎么做更多 Agent”，而是：什么时候一个 Agent + Skills 已经足够，什么时候拆分才真的提高质量或效率。'},
 {id:'a2a',n:'06',p:'P1',title:'Agent Interoperability',q:'不同 Agent 如何跨系统协作？',desc:'当 Agent 来自不同厂商、不同团队时，需要 Discovery、身份描述、任务委派与状态返回。',concepts:['A2A','Agent Card','Agent Discovery','Cross-agent Delegation','Interop','Remote Agent'],tools:[['A2A Protocol','重点理解 Agent ↔ Agent'],['MCP','与 A2A 对照：Agent ↔ Tools/Data'],['Agent Card','Agent 能力与身份的可发现描述'],['跨厂商 Agent 协作','关注协议而非单一平台']],learn:'先搞懂 MCP 与 A2A 的分工即可。A2A 属于观察中的关键协议，不必现在深入实现细节。'},
 {id:'workspace',n:'07',p:'P0',title:'Human-Agent Workspace',q:'人和 Agent 在哪里共同工作？',desc:'Workspace 不是 UI 外壳，而是共享 Context、文件、任务、状态、历史、权限与干预入口。',concepts:['Agent-native Workspace','Shared Context','Persistent Workspace','AI Teammate','Human-Agent Team','Agent Board','Shared Files'],tools:[['Moxt','典型 Agent-native Workspace'],['Meco','AI Coworker / 产品团队协作'],['Asana AI Teammates','从 Work Management 容纳 Agent'],['Multica','Human + Agent Work Management']],learn:'观察“如果 40% 团队成员是 Agent，Workspace 要怎么设计”：身份、任务、@、Inbox、共享历史、权限、状态、离职/下线。'},
 {id:'app',n:'08',p:'P1',title:'AI-native App / Living Software',q:'软件本身会不会变成 Agent 系统？',desc:'从固定逻辑的软件，走向 Memory + Intelligence + Execution 持续循环的“活软件”。',concepts:['Living Software','Agentic App','Memory → Intelligence → Execution','Generated Business System','Agent-native App'],tools:[['Taskade Genesis','最直观的 Living Software 样本'],['AI App Builder','观察 App + Database + Agent + Automation 的融合'],['Internal Tool Builder','企业内部系统的 Agent 化方向']],learn:'重点理解“在软件里加 AI”与“软件本身就是 Agentic System”的区别。'},
 {id:'gov',n:'09',p:'P0',title:'Governance',q:'Agent 被允许做什么？谁负责？',desc:'Agent 规模化以后必须像员工和软件资产一样被登记、授权、审计、审批和下线。',concepts:['Agent Identity','Permission','Owner','Agent Registry','Policy','Approval','Audit','Lifecycle','Shadow Agent'],tools:[['Microsoft Agent 365','Agent 身份、权限、治理、生命周期'],['Google Agent Registry','统一登记 Agents / Tools / Skills / MCP'],['Enterprise IAM','理解 Agent 如何进入企业身份体系'],['Approval Layer','高风险行为的人类审批机制']],learn:'这是与你职业方向非常匹配的一块。试着设计：Agent 创建、Owner、授权、敏感动作、审计、版本升级、撤权、下线的完整治理规则。'},
 {id:'ops',n:'10',p:'P0',title:'Evaluation & AgentOps',q:'怎么知道 Agent 干得好不好？',desc:'Agent 是概率系统，不能只看最终答案；还要看运行轨迹、工具调用、成本、失败率和人工纠正。',concepts:['Trace','Eval','Observability','Trajectory','Regression','Cost','Completion Rate','Escalation Rate','Human Correction'],tools:[['LangSmith','Trace / Eval / Monitor / Human Feedback'],['Arize Phoenix','LLM / Agent Observability'],['Braintrust','Evaluation、实验与生产质量'],['DSH Session Log','理解 Agent 运行轨迹与可追溯性']],learn:'学会设计 Agent 指标：成功率、人工接管率、错误类型、成本、延迟、越权、重复失败、用户纠正率。'},
 {id:'workforce',n:'11',p:'P1',title:'AI Workforce & Agent Management',q:'Agent 从工具变成“组织资源”后怎么管理？',desc:'Persistent AI Teammate、Agent Fleet、Role-based Agent 和 Control Plane 都在把 Agent 当成可长期运营的数字劳动力。',concepts:['AI Employee','AI Teammate','Agent Fleet','Agent Control Plane','Role-based Agent','Routine','Persistent Agent'],tools:[['Grok Bot','Role-centric / Persistent AI Teammate'],['Asana AI Teammates','Agent 进入真实工作管理系统'],['Multica','Human-Agent 任务与项目管理'],['CrewAI Enterprise','Agent Crew / 企业化管理思路']],learn:'重点区分 Task-centric Agent 和 Role-centric Agent；观察 Agent 是否拥有长期职责、Memory、Routine、Owner、权限和绩效。'},
 {id:'org',n:'12',p:'P0',title:'Organization Design & Transformation',q:'最终人的岗位和组织怎样改变？',desc:'这是最终目标：从部署 Agent 上升到重新设计岗位、决策权、管理跨度、Operating Model 与组织能力。',concepts:['AI-native Organization','Role Redesign','Decision Rights','Human-in-the-loop','Management Span','Operating Model','Organizational Feedback Loop'],tools:[['Microsoft Work Trend Index','观察 Human-Agent Team 与组织趋势'],['OpenAI 企业实践','观察 workflow design / governance / adoption'],['Anthropic 企业 Agent 案例','观察从单步到多阶段 Agent workflow'],['真实企业试点','最终必须回到业务流程与组织实践']],learn:'长期研究，不追求一次学完。你的最终专业能力应是：把 Workflow、Context、Agent、Workspace、Governance 组合成可运行的组织变革方案。'}
];

const products=[
 ['Moxt','Agent-native Workspace','Workspace / Multi-Agent','重点看共享 Context、Agent Board、持久项目空间与人-Agent协作。'],
 ['Meco','AI Coworker Workspace','Workspace / Organization','把 AI PM、AI Tech Lead 等角色当作团队成员。'],
 ['Asana AI Teammates','Human-Agent Work Management','Workspace / Governance','从传统工作管理系统向人+Agent共同工作转型。'],
 ['Multica','Human + Agent Project Management','Workspace / Control Plane','统一管理人、Agent、任务、状态与多种 Coding Agent。'],
 ['Taskade Genesis','AI-native App / Living Software','Workflow / App','用 Memory + Agent + Automation + UI 生成业务系统。'],
 ['DeepSeek Harness (DSH)','Agent Harness / Runtime','Agent Architecture','理解 Model + Harness、插件化、Session、Subagent 与 Workflow。'],
 ['LangGraph','Agent / Workflow Graph','Workflow / Multi-Agent','State、Node、Edge；适合理解可控 Agent workflow。'],
 ['CrewAI','Agent Crew + Flows','Workflow / Multi-Agent','角色化 Agent Crew 与更确定的 Flow 结合。'],
 ['Microsoft Agent Framework','Enterprise Agent Framework','Agent / Workflow','Agent、Workflow、Checkpoint、Human-in-the-loop 等。'],
 ['MCP','Agent ↔ Tools/Data Protocol','Connectivity','Agent 连接企业工具、数据和能力的关键协议。'],
 ['A2A','Agent ↔ Agent Protocol','Interoperability','跨 Agent 的发现、委派、协作与状态沟通。'],
 ['Letta','Stateful / Lifelong Agent','Memory','长期状态、Memory 与持续学习型 Agent。'],
 ['Mem0','Memory Layer','Memory','跨 Session / Agent 的持久化记忆层。'],
 ['LangSmith','Agent Observability / Eval','AgentOps','Trace、评估、监控、人工反馈。'],
 ['Arize Phoenix','LLM / Agent Observability','AgentOps','面向 Agent 的可观测性与分析。'],
 ['Braintrust','AI Evaluation Platform','AgentOps','评测、实验、回归与生产质量。'],
 ['Microsoft Agent 365','Agent Governance','Governance','身份、权限、Owner、风险、生命周期。'],
 ['Google Agent Registry','Agent Registry','Governance','统一登记 Agents、Tools、Skills、MCP 等。'],
 ['Grok Bot','Persistent AI Teammate','AI Workforce','把 Cloud Agent 封装为长期角色、Routine 与持久工作环境。']
];

const conceptDefs = {
 'Agentic Workflow':'流程中部分步骤由 Agent 根据上下文动态决定下一步，而不是完全写死。',
 'Human-in-the-loop':'高风险或不确定步骤由人审批、纠正或接管。',
 'Context Engineering':'设计 Agent 在特定任务时应该看到哪些信息、以什么结构看到。',
 'RAG':'先从知识库检索相关内容，再交给模型生成或判断。',
 'Agent Loop':'Agent 反复经历观察 → 推理/计划 → 行动 → 再观察，直到完成或停止。',
 'Harness':'把模型变成可工作的 Agent 所需的工具、Session、沙箱、Memory、Loop 等运行层。',
 'MCP':'面向 Agent 连接工具和数据的开放协议。',
 'A2A':'面向 Agent 与 Agent 之间发现、委派和协作的协议。',
 'Skill':'可复用的专业能力或工作方法，可被 Agent 在合适任务中调用。',
 'Subagent':'被主 Agent 委派执行某个子任务的独立 Agent。',
 'Handoff':'把任务、责任和必要上下文从一个 Agent 转交给另一个 Agent。',
 'Orchestrator':'协调多个 Agent、工具和工作步骤的总控角色。',
 'Agent-native Workspace':'从一开始就假设人和 Agent 都是成员的工作空间。',
 'Agent Identity':'Agent 在企业中的独立身份，用于权限、审计、Owner 与生命周期管理。',
 'Agent Registry':'集中登记和管理组织内 Agent、工具、技能和端点。',
 'AgentOps':'围绕 Agent 的运行、质量、成本、监控、评测、版本和生命周期的运营体系。',
 'Trace':'记录一次 Agent 运行中模型、工具、子 Agent、输入输出等完整轨迹。',
 'Eval':'用系统化指标或测试集评价 Agent 的质量，而不是凭感觉。',
 'Persistent Agent':'长期存在、保留上下文/环境，并持续承担职责的 Agent。',
 'AI Teammate':'以团队成员/岗位而非一次任务执行器来设计的 Agent。',
 'Living Software':'数据、Agent 与自动化持续循环运行的软件形态，而非固定逻辑程序。',
 'Organizational Feedback Loop':'Agent 执行结果进入评估与知识系统，再反过来改进流程、Context 和 Agent。'
};

let current='workflow';
let filter='all';
const grid=document.getElementById('moduleGrid');
const detail=document.getElementById('detailPanel');

function renderModules(term=''){
  const q=term.trim().toLowerCase();
  const list=modules.filter(m=> (filter==='all'||m.p===filter) && (!q || JSON.stringify(m).toLowerCase().includes(q)) );
  grid.innerHTML=list.length?list.map(m=>`<article class="module" data-id="${m.id}"><span class="prio">${m.p}</span><div class="num">MODULE ${m.n}</div><h4>${m.title}</h4><p>${m.q}</p><div class="tagrow">${m.concepts.slice(0,3).map(x=>`<span class="tag">${x}</span>`).join('')}</div></article>`).join(''):`<div class="empty" style="grid-column:1/-1">没有找到匹配内容。</div>`;
  document.querySelectorAll('.module').forEach(el=>el.onclick=()=>{current=el.dataset.id;showView('detail');renderDetail();});
}

function renderDetail(){
  const m=modules.find(x=>x.id===current) || modules[0];
  const status=localStorage.getItem('study-'+m.id)||'未开始';
  detail.innerHTML=`<div class="detail"><div class="detail-head"><div><div class="eyebrow" style="color:#c7e4d8">MODULE ${m.n} · ${m.p}</div><h3>${m.title}</h3><p>${m.q} —— ${m.desc}</p></div><div class="statusbox"><select id="statusSelect"><option ${status==='未开始'?'selected':''}>未开始</option><option ${status==='学习中'?'selected':''}>学习中</option><option ${status==='已掌握'?'selected':''}>已掌握</option></select></div></div><div class="detail-body"><div class="detail-col"><h5>关键范式 / 概念</h5><div class="concepts">${m.concepts.map(x=>`<span class="concept">${x}</span>`).join('')}</div></div><div class="detail-col"><h5>代表工具 / 产品</h5><div class="tools">${m.tools.map(t=>`<div class="tool"><b>${t[0]}</b><small>${t[1]}</small></div>`).join('')}</div></div><div class="study"><strong>你真正要学到什么：</strong> ${m.learn}</div></div></div>`;
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
document.querySelectorAll('.navbtn').forEach(b=>b.onclick=()=>showView(b.dataset.view));
document.querySelectorAll('.pillbtn').forEach(b=>b.onclick=()=>{document.querySelectorAll('.pillbtn').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;renderModules(document.getElementById('search').value);});
document.getElementById('search').addEventListener('input',e=>{renderModules(e.target.value);renderConcepts(e.target.value);renderProducts(e.target.value);});
renderModules();renderDetail();renderConcepts();renderProducts();
