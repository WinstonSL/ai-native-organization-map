// content.js — 学习地图的全部知识内容（数据，不含交互逻辑）
// 更新知识请阅读 docs/CONTENT_UPDATE_GUIDE.md，并遵守 AGENTS.md 的内容编辑标准。

const modules = [
 {id:'workflow',n:'01',p:'P0',title:'Workflow & Process Redesign',q:'AI 到底接管哪些工作？',desc:'把传统流程重构成人 + Agent 的 AI-native workflow，而不仅仅是在旧流程上加一个聊天机器人。',concepts:['Agentic Workflow','Deterministic Workflow','Human-in-the-loop','Trigger','Checkpoint','Evaluator–Optimizer','Parallel / Sequential','Workflow Redesign'],tools:[['Taskade Genesis','从业务描述生成 App + Agent + Automation'],['CrewAI Flows','固定流程与 Agent Crew 混合'],['LangGraph','用 State / Node / Edge 编排流程'],['Microsoft Agent Framework','Agent + Workflow + Checkpoint + HITL']],learn:'重点学“固定流程 vs Agent 自主判断”的边界；学会把一个真实业务流程拆成：确定性规则、Agent 判断、人工审批、异常升级。',deep:{
   intro:'很多组织的第一反应是“在原来的流程上加一个 AI 助手”——报销流程不变，只是多一个能问答的机器人。这几乎不会带来真正的效率提升，因为瓶颈往往不在“回答问题”，而在流程本身的结构。AI-native 的做法是反过来问：如果一部分判断和执行可以交给 Agent，这条流程本来应该长什么样？于是流程被拆成三种角色分工——确定性规则（该写死的写死）、Agent 判断（需要理解上下文、灵活处理的交给 Agent）、人类把关（高风险、不可逆、需要担责的留给人）。这一章是整张地图的起点：先想清楚“工作怎么重新分配”，后面的 Context（Agent 要知道什么）、Agent 架构（谁来执行）、治理（谁来负责）才有意义。',
   keyConcepts:[
    ['确定性流程 vs Agentic 流程','确定性流程每一步都写死、结果可预测，适合规则清晰、不容出错的环节（如金额校验、审批路由）；Agentic 流程让 Agent 根据上下文临场决定下一步，适合难以穷举规则的环节（如归类模糊工单、起草回复）。真实流程通常是两者混合，关键是想清楚每一步该用哪种。'],
    ['Human-in-the-loop（人在环中）','把高风险、不可逆或需要担责的步骤保留给人审批或纠正，例如大额支付、对外发布、删除数据。它不是“AI 不够好才加人”，而是有意的风险设计：让 Agent 处理量，让人守住关键闸口。'],
    ['Trigger 与 Checkpoint','Trigger 是流程的起点——定时、收到消息、状态变化或人工发起；Checkpoint 是流程中的检查点，用来保存状态、插入人工确认，或在出错时回退恢复。设计流程时先问：什么触发它？哪里需要能停下来检查？'],
    ['Evaluator–Optimizer 模式','一个 Agent 负责产出、另一个负责评估并提改进意见，循环迭代直到达标。适合质量要求高、一次难做对的任务（如文案、代码、方案），是把“Agent 会犯错”变成“Agent 能自我改进”的常用结构。'],
   ],
   links:[
    ['Anthropic · Building Effective Agents','https://www.anthropic.com/engineering/building-effective-agents','入门必读。用最朴素的语言讲清 workflow 与 agent 的区别，以及几种常见编排模式（prompt chaining、routing、parallelization、evaluator-optimizer）。适合先建立整体心智。'],
    ['OpenAI · A Practical Guide to Building Agents (PDF)','https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf','面向落地的实践指南，讲什么任务适合交给 Agent、如何设计护栏与人工介入。偏“怎么做”，适合读完上一篇后看。'],
    ['LangGraph · Workflows 教程','https://langchain-ai.github.io/langgraph/tutorials/workflows/','动手教程。把上面的编排模式用代码跑一遍，能直观理解“确定性 vs Agent 判断”在工程上如何实现。看不懂代码也能读懂结构。'],
    ['CrewAI · Flows 文档','https://docs.crewai.com/concepts/flows','另一种视角：把固定流程（Flow）与角色化 Agent 结合。对照 LangGraph 看，能体会不同框架对“流程编排”的不同理解。'],
   ],
   path:[
    '先读 Anthropic《Building Effective Agents》，建立 workflow vs agent 的整体概念，不用记术语。',
    '再读 OpenAI 实践指南，重点看“什么任务适合 Agent”和“哪里必须留人”。',
    '挑一个你熟悉的真实流程（如请假、报销、工单处理），亲手把它拆成：确定性规则 / Agent 判断 / 人工把关。',
    '有余力再翻 LangGraph 或 CrewAI 教程，看这些拆分在工程上怎么落地——理解结构即可，不必会写。',
   ],
   tools:[
    {name:'LangGraph',object:'一等对象是「流程图」——用 State（状态）、Node（节点）、Edge（边）把 Agent 工作流画成一张可控的图。',links:[['官网','https://www.langchain.com/langgraph'],['文档','https://langchain-ai.github.io/langgraph/']],learn:'最适合理解“确定性 vs Agent 判断”如何在工程上落地。先跑官方 quickstart，重点体会 State 怎么在节点间流动、条件边怎么决定下一步。'},
    {name:'CrewAI',object:'一等对象是「角色化的 Agent Crew + Flow」——给每个 Agent 分配角色（如研究员、审稿人），再用 Flow 把固定流程和 Agent 判断结合。',links:[['官网','https://www.crewai.com/'],['Flows 文档','https://docs.crewai.com/concepts/flows']],learn:'和 LangGraph 对照着看，体会“按角色组队”与“按图编排”两种不同思路。适合喜欢从“团队分工”角度理解多步流程的人。'},
    {name:'Microsoft Agent Framework',object:'一等对象是「企业级 Agent + Workflow」——把 Agent、工作流、Checkpoint、人工介入打包成面向企业的框架。',links:[['官方文档','https://learn.microsoft.com/en-us/agent-framework/']],learn:'关注它怎么把 Checkpoint（检查点）和 Human-in-the-loop（人工介入）作为一等能力内建——这正是本模块“哪里留人、哪里能回退”的工程答案。'},
    {name:'Taskade Genesis',object:'一等对象是「生成出来的业务系统」——用一句业务描述生成 App + Agent + Automation，是“流程重构”最直观的样本。',links:[['官网','https://www.taskade.com/'],['帮助中心','https://help.taskade.com/']],learn:'不用写代码就能体验“描述业务 → 得到一个含 Agent 和自动化的系统”。适合先建立感性认识：AI-native 流程长什么样。'},
   ]
  }},
 {id:'context',n:'02',p:'P0',title:'Context & Memory',q:'AI 怎么知道该知道的东西？',desc:'从“知识库”升级为 Context Infrastructure：让 Agent 在正确时间拿到正确的组织知识、历史和状态。',concepts:['Context Engineering','Working Memory','Long-term Memory','Episodic Memory','Semantic Memory','RAG','State','Context Compression','Continual Learning'],tools:[['Letta','Stateful / Lifelong Agent 与长期状态'],['Mem0','面向 Agent 的 Memory Layer'],['LangGraph Memory','把状态与记忆放进 Agent workflow'],['企业知识库 / RAG','组织知识进入 Agent 的基础方式']],learn:'重点理解 Memory ≠ 聊天记录；以及“某个 Agent 在某个任务、某个时刻应该知道什么”这个 Context Engineering 问题。',deep:{
   intro:'很多人把“给 AI 喂知识”理解成建一个知识库让它检索（RAG）。但组织里的真问题是：同一个 Agent，在处理这个客户、这张工单、这一刻，到底该看到哪些信息？看多了浪费上下文、泄露越权数据；看少了判断出错。这就是 Context Engineering——不是“存了多少知识”，而是“在正确时间把正确的上下文送到正确的 Agent 面前”。记忆也不止聊天记录：有正在用的短期工作记忆、跨任务的长期记忆、关于“发生过什么”的情节记忆、关于“事实规则”的语义记忆。把 Context 当作组织基础设施来设计，是 Agent 能在企业里持续可靠工作的前提，也是它和上一章 Workflow、下一章 Agent 架构的连接点。',
   keyConcepts:[
    ['Context Engineering（上下文工程）','设计 Agent 在某个具体任务、具体时刻应该看到哪些信息、以什么结构看到。它比“建知识库”更进一步：关注时机、权限、相关性，而不只是“有没有存”。'],
    ['四类记忆','工作记忆（当前任务临时用）、长期记忆（跨任务保存）、情节记忆（发生过什么事）、语义记忆（事实与规则）。设计记忆系统时先分清你要的是哪一类，而不是一股脑塞进一个向量库。'],
    ['RAG 与它的边界','先检索再生成，是最常见的“给模型补充知识”的方式。但它擅长“找相关片段”，不擅长“记住状态、跨会话延续”，后者要靠专门的记忆层。'],
    ['State（状态）','Agent 或流程在某一刻的完整状态，用于中断后恢复、或在多步任务中保持连贯。是记忆之外常被忽视、却决定 Agent 能否“接着干”的东西。'],
   ],
   tools:[
    {name:'Letta',object:'一等对象是「有状态的长期 Agent」——把记忆和状态做成 Agent 的持久属性，让它跨会话“记得”。',links:[['官网','https://www.letta.com/'],['文档','https://docs.letta.com/']],learn:'重点体会“Agent 自己管理记忆”是什么意思：它如何决定记住什么、遗忘什么。适合理解长期记忆不是无限堆历史。'},
    {name:'Mem0',object:'一等对象是「记忆层」——一个可插到各种 Agent 上、跨 Session/Agent 共享的持久记忆组件。',links:[['官网','https://mem0.ai/'],['文档','https://docs.mem0.ai/']],learn:'看它如何把“记忆”抽象成独立一层：写入、检索、更新。对照 Letta，体会“内建记忆”与“外挂记忆层”两种思路。'},
    {name:'LangGraph Memory',object:'一等对象是「工作流里的状态与记忆」——把 State 和记忆作为图的一部分显式管理。',links:[['记忆概念文档','https://langchain-ai.github.io/langgraph/concepts/memory/']],learn:'适合理解短期状态（一次运行内）和长期记忆（跨运行）在工程上如何分开处理。'},
   ],
   links:[
    ['Anthropic · Building Effective Agents','https://www.anthropic.com/engineering/building-effective-agents','虽是 Agent 通论，但其中关于给 Agent 什么上下文的讨论，是理解 Context Engineering 的好起点。'],
    ['Chip Huyen · Agents','https://huyenchip.com/2025/01/07/agents.html','一篇高质量长文，系统讲 Agent 的记忆、规划、工具，帮你把 Context/Memory 放进整体图景。'],
   ],
   path:[
    '先分清四类记忆的区别，用自己的话各举一个工作中的例子。',
    '读 Chip Huyen 的 Agents 长文中关于 memory/planning 的部分，建立整体认识。',
    '拿 Mem0 或 Letta 的 quickstart 跑一次，观察“写入记忆 → 下次对话它记得”这个闭环。',
    '回到你的业务：想一个场景，列出“这个 Agent 此刻必须知道的 5 条上下文”，体会 Context Engineering。',
   ]
  }},
 {id:'agent',n:'03',p:'P0',title:'Agent Architecture',q:'一个 Agent 到底怎么持续完成任务？',desc:'理解 Agent 的运行底盘：模型只是大脑，真正能工作还需要 Harness、工具、状态、沙箱与循环。',concepts:['Agent Loop','Plan–Act–Observe','Tool Use','Harness','Runtime','Sandbox','Skill','Computer Use','Session'],tools:[['DeepSeek Harness (DSH)','理解 Model + Harness 的好教材'],['LangGraph','低层 Agent / State 编排'],['Microsoft Agent Framework','企业 Agent Runtime / Workflow'],['Codex / Claude Code','观察成熟 Coding Agent 的实际工作方式']],learn:'不用钻源码，但必须真正理解 Agent Loop、Harness、Skill、Tool、Sandbox、Session 分别解决什么问题。',deep:{
   intro:'一个常见误解是“模型越强，Agent 就越能干”。但模型本身只是“大脑”——它不能记住上一步、不能调用工具、不能安全地跑代码。真正让它变成能持续完成任务的 Agent，靠的是外面那层“运行底盘”：一个循环让它反复“观察→计划→行动→再观察”（Agent Loop），一套工具让它能查资料、写文件、调 API（Tool Use），一个沙箱让它安全地执行（Sandbox），一份会话状态让它记得进展（Session），以及可复用的技能包（Skill）。这层底盘就是 Harness / Runtime。理解这一章，你就能看懂“为什么同样的模型，装进不同的 Agent 产品能力差别巨大”——差在底盘，不在大脑。它承接上一章的 Context（底盘怎么喂上下文），也为多 Agent、治理打基础。',
   keyConcepts:[
    ['Agent Loop（智能体循环）','Agent 反复经历“观察 → 推理/计划 → 行动 → 再观察”，直到任务完成或触发停止条件。这是 Agent 区别于“一问一答”的根本：它能多步、能纠错、能坚持到底。'],
    ['Harness / Runtime（运行底盘）','把模型变成能工作的 Agent 所需的一切：工具接入、会话管理、沙箱、记忆、循环控制。同一个模型换个更好的 Harness，表现天差地别。'],
    ['Tool Use / Sandbox','工具让 Agent 突破“只会说话”，去真正查数据、执行操作；沙箱让这些执行被隔离，跑坏了不影响真实系统。企业落地尤其看重沙箱。'],
    ['Skill 与 Session','Skill 是可复用的专业能力/工作方法，Agent 在合适任务时调用；Session 是一次完整工作过程的上下文与状态载体，决定它能否“接着上次继续”。'],
   ],
   tools:[
    {name:'Claude Code',object:'一等对象是「会自己干活的编码 Agent」——一个成熟的 Harness 样本，能看到 Agent Loop、工具、Skill 在真实产品里怎么协同。',links:[['官方文档','https://docs.claude.com/en/docs/claude-code/overview'],['最佳实践','https://www.anthropic.com/engineering/claude-code-best-practices']],learn:'不用学写代码，观察它“接到任务→自己读文件→改→验证”的循环，是理解 Agent Loop 与 Harness 最直观的活教材。'},
    {name:'LangGraph',object:'一等对象是「底层的 Agent/状态图」——用 State、Node、Edge 显式搭出 Agent 的循环与控制流。',links:[['官网','https://www.langchain.com/langgraph'],['底层概念文档','https://langchain-ai.github.io/langgraph/concepts/low_level/']],learn:'适合把“Agent Loop、状态、工具调用”从抽象概念落到可见结构。看懂 State 怎么流动即可。'},
    {name:'Microsoft Agent Framework',object:'一等对象是「企业级 Agent Runtime」——把 Agent、工作流、检查点、人工介入打包成运行底盘。',links:[['官方文档','https://learn.microsoft.com/en-us/agent-framework/']],learn:'关注企业视角的 Harness 长什么样：会话、状态、可恢复、可介入，这些正是本章 Session/Checkpoint 的落地。'},
   ],
   links:[
    ['Anthropic · Building Effective Agents','https://www.anthropic.com/engineering/building-effective-agents','讲清 Agent 与 workflow 的区别、常见循环模式，是理解“底盘”的最佳入门。'],
    ['Chip Huyen · Agents','https://huyenchip.com/2025/01/07/agents.html','系统梳理 Agent 的规划、工具、执行，帮你把 Harness/Loop/Tool 串成整体。'],
   ],
   path:[
    '先读 Anthropic《Building Effective Agents》，建立 Agent Loop 的直觉。',
    '用一句话分别解释 Harness、Skill、Tool、Sandbox、Session 各解决什么问题（讲不清就再读）。',
    '观察 Claude Code 跑一个真实任务的过程，对照上面五个词看它们如何出现。',
    '有余力翻 LangGraph 底层概念文档，看这些在工程上如何被显式建模。',
   ]
  }},
 {id:'tools',n:'04',p:'P0',title:'Tool & System Connectivity',q:'Agent 怎么连接组织已有系统？',desc:'Agent 真正进入企业，核心不是会聊天，而是能安全读取数据、调用能力、操作已有软件。',concepts:['MCP','Tool Calling','Connector','API','Resource','Authorization','Computer Use','MCP Server'],tools:[['MCP','Agent ↔ Tools / Data 的关键开放协议'],['MCP Server','把企业系统能力暴露给 Agent'],['Connectors','连接 Gmail / Drive / Slack / CRM 等'],['Computer Use','没有 API 时直接操作软件界面']],learn:'MCP 建议升为必修：搞懂 Host、Client、Server、Tool、Resource、Authorization；不要求你会写 Server。',deep:{
   intro:'Agent 真正进入企业，难点从来不是“会聊天”，而是“能不能安全地读到公司的数据、调用公司的系统”。你的 CRM、邮箱、数据库、内部工具，Agent 得连得上、还不能越权。MCP（Model Context Protocol）就是为此而生的开放协议：它规定了 Agent（Host/Client）如何统一地连接各种系统（Server），获取数据（Resource）和调用能力（Tool），并处理授权（Authorization）。可以类比 USB——以前每个设备一种接口，有了统一标准后，插上就能用。理解这一章，你就理解了“Agent 从玩具到生产力”的关键一跃：它不再困在对话框里，而是能操作真实系统。这一章往上接 Agent 架构（Agent 靠 Harness 调工具），往下连治理（连得上之后，谁批准它访问什么）。',
   keyConcepts:[
    ['MCP 的角色划分','Host（Agent 所在的应用）、Client（发起连接的一方）、Server（把某个系统能力暴露出来的一方）。搞懂这三者的关系，就懂了 MCP 的骨架。'],
    ['Tool 与 Resource','Tool 是 Agent 可调用的“动作”（发邮件、查订单）；Resource 是可读取的“数据/内容”（文件、记录）。一个动、一个读，是 Server 暴露给 Agent 的两类东西。'],
    ['Authorization（授权）','决定某个 Agent 被允许连什么、读什么、做什么。这是 MCP 在企业里能不能用的关键——它直接连到下一章的治理。'],
    ['为什么它重要','没有统一协议时，每接一个系统都要定制开发；MCP 让“接入”变成可复用的标准件，大幅降低 Agent 进入企业系统的成本。'],
   ],
   tools:[
    {name:'MCP（Model Context Protocol）',object:'一等对象是「Agent↔工具/数据的开放协议」——统一 Agent 连接外部系统的方式。',links:[['官网/文档','https://modelcontextprotocol.io/'],['规范','https://modelcontextprotocol.io/specification'],['发布公告','https://www.anthropic.com/news/model-context-protocol']],learn:'必修。读“introduction”搞懂 Host/Client/Server/Tool/Resource 五个词的关系；不要求你会写 Server，但要能画出这张连接图。'},
    {name:'Claude Code（MCP 的真实使用者）',object:'一等对象是「会用 MCP 连外部系统的编码 Agent」——观察 MCP 在真实产品里怎么被配置和调用。',links:[['MCP 使用文档','https://docs.claude.com/en/docs/claude-code/overview']],learn:'看一个成熟 Agent 如何“挂上”一个 MCP Server 然后调用它的 Tool，把协议从抽象变具体。'},
    {name:'LangGraph（工具调用视角）',object:'一等对象是「把工具调用编进工作流」——理解 Tool Calling 在 Agent 流程中的位置。',links:[['官网','https://www.langchain.com/langgraph'],['文档','https://langchain-ai.github.io/langgraph/']],learn:'对照 MCP 看：MCP 解决“连接标准”，框架解决“何时调用哪个工具”。两者配合才是完整链路。'},
   ],
   links:[
    ['MCP 官方 Introduction','https://modelcontextprotocol.io/introduction','最权威的入门。把五个核心角色一次讲清，读完就能建立正确心智。'],
    ['Anthropic · MCP 发布公告','https://www.anthropic.com/news/model-context-protocol','从“为什么需要它”的角度讲 MCP 的动机，适合先读这篇建立 why。'],
   ],
   path:[
    '先读 MCP 发布公告，搞懂“为什么需要一个统一协议”。',
    '再读官方 Introduction，画出 Host / Client / Server / Tool / Resource 的关系图。',
    '想一个你公司的系统（如工单系统），设想“如果给它做一个 MCP Server，会暴露哪些 Tool 和 Resource”。',
    '有余力看 Claude Code 如何挂载并调用一个 MCP Server，把协议落到实操。',
   ]
  }},
 {id:'multi',n:'05',p:'P1',title:'Multi-Agent & Orchestration',q:'什么时候需要多个 Agent？',desc:'核心不是“多个 Agent 聊天”，而是 Delegation、Handoff、共享状态、Supervisor 与并行协作。',concepts:['Subagent','Supervisor','Router','Delegation','Handoff','Parallelization','Shared State','Orchestrator'],tools:[['LangGraph','图式多 Agent 编排'],['CrewAI','按角色建立 Agent Crew'],['Microsoft Agent Framework','多 Agent + Workflow'],['Moxt','在 Workspace 中观察多 Agent 协作']],learn:'最重要的问题不是“怎么做更多 Agent”，而是：什么时候一个 Agent + Skills 已经足够，什么时候拆分才真的提高质量或效率。'},
 {id:'a2a',n:'06',p:'P1',title:'Agent Interoperability',q:'不同 Agent 如何跨系统协作？',desc:'当 Agent 来自不同厂商、不同团队时，需要 Discovery、身份描述、任务委派与状态返回。',concepts:['A2A','Agent Card','Agent Discovery','Cross-agent Delegation','Interop','Remote Agent'],tools:[['A2A Protocol','重点理解 Agent ↔ Agent'],['MCP','与 A2A 对照：Agent ↔ Tools/Data'],['Agent Card','Agent 能力与身份的可发现描述'],['跨厂商 Agent 协作','关注协议而非单一平台']],learn:'先搞懂 MCP 与 A2A 的分工即可。A2A 属于观察中的关键协议，不必现在深入实现细节。'},
 {id:'workspace',n:'07',p:'P0',title:'Human-Agent Workspace',q:'人和 Agent 在哪里共同工作？',desc:'Workspace 不是 UI 外壳，而是共享 Context、文件、任务、状态、历史、权限与干预入口。',concepts:['Agent-native Workspace','Shared Context','Persistent Workspace','AI Teammate','Human-Agent Team','Agent Board','Shared Files'],tools:[['Moxt','典型 Agent-native Workspace'],['Meco','AI Coworker / 产品团队协作'],['Asana AI Teammates','从 Work Management 容纳 Agent'],['Multica','Human + Agent Work Management']],learn:'观察“如果 40% 团队成员是 Agent，Workspace 要怎么设计”：身份、任务、@、Inbox、共享历史、权限、状态、离职/下线。',deep:{
   intro:'当团队里既有人也有 Agent，他们在哪里一起工作？如果答案还是“人在 A 工具、Agent 在对话框”，协作就是断裂的。Agent-native Workspace 的核心观点是：Workspace 不是给人看的界面外壳，而是人和 Agent 共享的“工作现场”——同一份文件、同一批任务、同一条历史、同一套权限，人能 @ Agent、Agent 能把结果交回来、人能随时介入纠正。这一章把前面几章“落地”了：Context 在这里共享、Agent 在这里被指派、治理在这里施加。判断一个协作产品是不是真的 Agent-native，就看它有没有认真回答：Agent 有没有身份？能不能被分配任务？出了错人怎么接管？它“下线”时会发生什么？',
   keyConcepts:[
    ['Agent-native Workspace','从设计之初就假设人和 Agent 都是成员的工作空间，而不是事后塞进一个聊天机器人。共享上下文、任务、状态是它的基本盘。'],
    ['Shared Context / Shared Files','人和 Agent 看到同一份上下文和文件，才谈得上真正协作。这是 Workspace 区别于“各自的 AI 助手”的关键。'],
    ['AI Teammate（AI 队友）','把 Agent 当团队成员而非一次性工具：它有身份、能被 @、能领任务、有 Inbox、留下可追溯的工作记录。'],
    ['干预与下线','人能随时介入、纠正、接管；Agent 能被“下线”。这两件事决定了 Workspace 是否可控——也直接连到治理章。'],
   ],
   tools:[
    {name:'Meco',object:'一等对象是「AI Coworker」——把 AI PM、AI Tech Lead 等角色当作产品团队的成员。',links:[['官网','https://meco.app/']],learn:'观察它如何把 Agent 表达成“同事”而不是“功能”：角色、职责、协作方式。体会 AI Teammate 的产品化。'},
    {name:'Multica',object:'一等对象是「人 + Agent 的工作/项目管理」——统一管理人、多种 Agent、任务与状态。',links:[['官网','https://www.multica.ai/']],learn:'重点看它如何在一个空间里同时调度人和多个 Coding Agent，理解“共享任务与状态”的实际形态。'},
    {name:'Asana AI Teammates',object:'一等对象是「工作管理系统里的 Agent」——从成熟的 Work Management 向人+Agent 协作演进。',links:[['AI 产品页','https://asana.com/product/ai'],['官网','https://asana.com/']],learn:'观察一个传统工作管理巨头如何把 Agent 接入既有的任务/项目模型，体会“存量系统 Agent 化”的路径。'},
   ],
   links:[
    ['Anthropic · Building Effective Agents','https://www.anthropic.com/engineering/building-effective-agents','理解 Agent 能力边界，有助于判断 Workspace 该把哪些工作交给 Agent、哪些留给人。'],
    ['LangGraph · Multi-agent 概念','https://langchain-ai.github.io/langgraph/concepts/multi_agent/','Workspace 里常是多个 Agent 协作，这篇帮你理解协作背后的编排结构。'],
   ],
   path:[
    '先想清楚一个问题：如果你的团队 40% 是 Agent，日常协作界面需要哪些要素？（身份、任务、@、Inbox、历史、权限、下线）',
    '逐个体验 Meco / Multica / Asana AI，对照上面的清单看它们各自答了哪些、缺了哪些。',
    '总结每个产品的“一等对象”：是 Coworker、还是 Task/Project、还是 Work Management。',
    '记下你认为“真正 Agent-native”必须具备、但现有产品还没做好的一点。',
   ]
  }},
 {id:'app',n:'08',p:'P1',title:'AI-native App / Living Software',q:'软件本身会不会变成 Agent 系统？',desc:'从固定逻辑的软件，走向 Memory + Intelligence + Execution 持续循环的“活软件”。',concepts:['Living Software','Agentic App','Memory → Intelligence → Execution','Generated Business System','Agent-native App'],tools:[['Taskade Genesis','最直观的 Living Software 样本'],['AI App Builder','观察 App + Database + Agent + Automation 的融合'],['Internal Tool Builder','企业内部系统的 Agent 化方向']],learn:'重点理解“在软件里加 AI”与“软件本身就是 Agentic System”的区别。'},
 {id:'gov',n:'09',p:'P0',title:'Governance',q:'Agent 被允许做什么？谁负责？',desc:'Agent 规模化以后必须像员工和软件资产一样被登记、授权、审计、审批和下线。',concepts:['Agent Identity','Permission','Owner','Agent Registry','Policy','Approval','Audit','Lifecycle','Shadow Agent'],tools:[['Microsoft Agent 365','Agent 身份、权限、治理、生命周期'],['Google Agent Registry','统一登记 Agents / Tools / Skills / MCP'],['Enterprise IAM','理解 Agent 如何进入企业身份体系'],['Approval Layer','高风险行为的人类审批机制']],learn:'这是与你职业方向非常匹配的一块。试着设计：Agent 创建、Owner、授权、敏感动作、审计、版本升级、撤权、下线的完整治理规则。',deep:{
   intro:'一两个 Agent 时，治理不是问题；几百个 Agent 在公司里跑起来时，治理就是生死问题。每个 Agent 能访问什么数据、能执行什么操作、由谁负责、出了事怎么追溯、不用了怎么下线——这些如果没人管，就会出现“影子 Agent”：没人登记、没有 Owner、权限不明，却在真实系统里动数据。所以成熟组织把 Agent 当成“员工 + 软件资产”的混合体来治理：像员工一样有身份和 Owner，像软件一样要登记、授权、审计、版本管理和退役。这一章和你的职业方向高度契合——它不是技术炫技，而是把前面几章（能连系统、能自主行动的 Agent）装进企业可控的框架里。往前接工具连接（连上之后谁批准），往后连 AgentOps（治理需要可观测来支撑）。',
   keyConcepts:[
    ['Agent Identity（身份）','Agent 在企业里的独立身份，是权限、审计、Owner、生命周期管理的基础。没有身份，一切治理无从谈起。'],
    ['Owner 与 Permission','每个 Agent 都要有负责人（Owner）和明确的权限边界（能访问什么、能做什么）。这是防止“无主 Agent 乱跑”的第一道防线。'],
    ['Registry 与 Approval','Agent Registry 统一登记组织内的 Agent/工具/技能；高风险动作（大额、对外、删数据）走人工审批（Approval）。'],
    ['Lifecycle 与 Shadow Agent','Agent 有创建→上线→升级→撤权→下线的完整生命周期；脱离这套管理的就是“影子 Agent”，是重大风险点。'],
   ],
   tools:[
    {name:'Microsoft Agent 365 / Copilot Studio',object:'一等对象是「受治理的企业 Agent」——把身份、权限、Owner、风险、生命周期作为一等能力。',links:[['Copilot Studio 文档','https://learn.microsoft.com/en-us/microsoft-copilot-studio/'],['Agent Framework 文档','https://learn.microsoft.com/en-us/agent-framework/']],learn:'观察一个企业平台如何把 Agent 纳入既有的身份与权限体系（像管员工账号一样管 Agent），这正是本章的核心命题。'},
    {name:'Google Agent 生态 / ADK',object:'一等对象是「可登记、可编排的 Agent 与工具」——统一登记与构建 Agent 的方向。',links:[['ADK 文档','https://google.github.io/adk-docs/']],learn:'关注“统一登记 Agents/Tools/Skills”的思路，对照理解 Registry 在治理里的作用。'},
    {name:'A2A Protocol（治理相邻）',object:'一等对象是「跨 Agent 的身份与协作协议」——Agent Card 描述身份与能力，是跨系统治理的基础件。',links:[['官网','https://a2a-protocol.org/']],learn:'看 Agent Card 如何把“一个 Agent 是谁、能做什么”标准化——这正是跨组织治理与发现的前提。'},
   ],
   links:[
    ['Anthropic · Building Effective Agents','https://www.anthropic.com/engineering/building-effective-agents','理解 Agent 的自主性与风险来源，才能设计出恰当的审批与权限边界。'],
    ['Microsoft Agent Framework 文档','https://learn.microsoft.com/en-us/agent-framework/','从企业框架视角看 Checkpoint、人工介入如何内建，是治理落地的具体参照。'],
   ],
   path:[
    '结合你的职业方向，试着为“一个 Agent”设计完整治理规则：创建、Owner、授权、敏感动作审批、审计、升级、撤权、下线。',
    '读 Microsoft 365 Agents 产品页，看企业平台把哪些治理能力做成了标准功能。',
    '理解“影子 Agent”为什么危险，列出你所在组织可能出现影子 Agent 的场景。',
    '把治理和上一章“工具连接的授权”连起来想：连得上 + 谁批准，才是完整的企业级 Agent。',
   ]
  }},
 {id:'ops',n:'10',p:'P0',title:'Evaluation & AgentOps',q:'怎么知道 Agent 干得好不好？',desc:'Agent 是概率系统，不能只看最终答案；还要看运行轨迹、工具调用、成本、失败率和人工纠正。',concepts:['Trace','Eval','Observability','Trajectory','Regression','Cost','Completion Rate','Escalation Rate','Human Correction'],tools:[['LangSmith','Trace / Eval / Monitor / Human Feedback'],['Arize Phoenix','LLM / Agent Observability'],['Braintrust','Evaluation、实验与生产质量'],['DSH Session Log','理解 Agent 运行轨迹与可追溯性']],learn:'学会设计 Agent 指标：成功率、人工接管率、错误类型、成本、延迟、越权、重复失败、用户纠正率。',deep:{
   intro:'传统软件是确定的：同样的输入给同样的输出，测试通过就放心。Agent 不是——它是概率系统，同样的任务这次做对、下次可能翻车。所以你不能只看“最后那个答案对不对”，而要看它整个运行轨迹：调了哪些工具、走了哪些弯路、花了多少钱和时间、哪一步出的错、人有没有介入纠正。这就是 AgentOps：像运维一条生产线一样运营 Agent——用 Trace 看清过程，用 Eval 系统化地评质量，用监控盯住成本和失败率。没有这一层，Agent 上了生产就是黑盒，你不知道它好不好、也不知道它悄悄变差了（回归）。这一章是治理的“眼睛”：治理定规则，AgentOps 提供看清是否被遵守的可观测能力。',
   keyConcepts:[
    ['Trace 与 Trajectory','Trace 记录一次运行中模型、工具、子 Agent 的完整轨迹；Trajectory 是它经过的步骤序列。看答案只知对错，看轨迹才知“为什么错、在哪错”。'],
    ['Eval（评估）','用系统化的指标或测试集评价 Agent 质量，而不是凭感觉“看起来还行”。这是 Agent 能否持续改进的基础。'],
    ['关键指标','完成率、人工接管率（Escalation）、错误类型、成本、延迟、越权、重复失败、用户纠正率。设计对的指标，比堆更多功能更重要。'],
    ['Regression（回归）','新版本让原本正常的能力变差。因为 Agent 是概率系统，回归尤其隐蔽，必须靠 Eval 定期跑才能发现。'],
   ],
   tools:[
    {name:'LangSmith',object:'一等对象是「Agent 的 Trace 与评估」——记录运行轨迹、跑评估、监控、收集人工反馈。',links:[['官网','https://www.langchain.com/langsmith'],['文档','https://docs.smith.langchain.com/']],learn:'最直观的 AgentOps 入门。跑一个 Agent 并在 LangSmith 里看它的完整 Trace，你会立刻理解“看轨迹”和“看答案”的差别。'},
    {name:'Arize Phoenix',object:'一等对象是「LLM/Agent 可观测性」——面向 Agent 的运行观测与分析，开源可自托管。',links:[['官网','https://phoenix.arize.com/'],['文档','https://docs.arize.com/phoenix']],learn:'关注它如何把一次次运行汇总成可分析的数据，帮你发现“哪类任务经常失败”。'},
    {name:'Braintrust',object:'一等对象是「AI 评测平台」——评测、实验、回归与生产质量管理。',links:[['官网','https://www.braintrust.dev/']],learn:'重点体会 Eval 怎么做成一个持续流程：建测试集、跑分、比较版本、防回归。'},
   ],
   links:[
    ['Hamel · Your AI Product Needs Evals','https://hamel.dev/blog/posts/evals/','被广泛推荐的实战文，讲清“为什么必须做 Eval、怎么做”。非工程背景也能读懂核心观点。'],
    ['Anthropic · Building Effective Agents','https://www.anthropic.com/engineering/building-effective-agents','其中对 Agent 不确定性的讨论，是理解“为什么要观测和评估”的基础。'],
   ],
   path:[
    '先接受一个前提：Agent 是概率系统，不能只看最终答案。',
    '读 Hamel 的 Evals 一文，理解“为什么必须系统化评估”。',
    '在 LangSmith 里跑一个 Agent，看它的完整 Trace，体会“看过程”的价值。',
    '为你关心的一个 Agent 任务，亲手列出 5 个该监控的指标（如完成率、接管率、成本）。',
   ]
  }},
 {id:'workforce',n:'11',p:'P1',title:'AI Workforce & Agent Management',q:'Agent 从工具变成“组织资源”后怎么管理？',desc:'Persistent AI Teammate、Agent Fleet、Role-based Agent 和 Control Plane 都在把 Agent 当成可长期运营的数字劳动力。',concepts:['AI Employee','AI Teammate','Agent Fleet','Agent Control Plane','Role-based Agent','Routine','Persistent Agent'],tools:[['Grok Bot','Role-centric / Persistent AI Teammate'],['Asana AI Teammates','Agent 进入真实工作管理系统'],['Multica','Human-Agent 任务与项目管理'],['CrewAI Enterprise','Agent Crew / 企业化管理思路']],learn:'重点区分 Task-centric Agent 和 Role-centric Agent；观察 Agent 是否拥有长期职责、Memory、Routine、Owner、权限和绩效。'},
 {id:'org',n:'12',p:'P0',title:'Organization Design & Transformation',q:'最终人的岗位和组织怎样改变？',desc:'这是最终目标：从部署 Agent 上升到重新设计岗位、决策权、管理跨度、Operating Model 与组织能力。',concepts:['AI-native Organization','Role Redesign','Decision Rights','Human-in-the-loop','Management Span','Operating Model','Organizational Feedback Loop'],tools:[['Microsoft Work Trend Index','观察 Human-Agent Team 与组织趋势'],['OpenAI 企业实践','观察 workflow design / governance / adoption'],['Anthropic 企业 Agent 案例','观察从单步到多阶段 Agent workflow'],['真实企业试点','最终必须回到业务流程与组织实践']],learn:'长期研究，不追求一次学完。你的最终专业能力应是：把 Workflow、Context、Agent、Workspace、Governance 组合成可运行的组织变革方案。',deep:{
   intro:'这是整张地图的终点，也是你专业价值的落点。前面几章解决“Agent 怎么工作、怎么协作、怎么被治理”，但真正的组织变革问题是：当 Agent 成为能干活的组织成员，人的岗位该怎么重新设计？哪些决策还归人、哪些可交给 Agent？管理者带的“下属”里有 Agent，管理跨度怎么变？流程、决策权、运营模式（Operating Model）会如何重构？注意一个陷阱：AI-native Organization 不等于“上了很多 Agent”，而是组织的运作方式本身被重新设计。这一章没有标准答案、也不追求一次学完——它要求你把 Workflow、Context、Agent、Workspace、Governance 这些拼图组合成“某个真实业务/组织能跑起来的变革方案”。这正是从“会用 Agent”到“能设计 AI-native 组织”的跃迁。',
   keyConcepts:[
    ['AI-native Organization','从流程、岗位到治理都以“人 + Agent 协作”为前提重新设计的组织，而不是在旧组织上加 AI 工具。判断标准是“运作方式变没变”，不是“用了多少 AI”。'],
    ['Role Redesign / Decision Rights','当 Agent 承担部分工作，人的岗位职责要重新划分；同时明确哪些决策由人拍板、哪些可交给 Agent（决策权分配）。'],
    ['Management Span（管理跨度）','管理者能有效带领的对象数量，在“下属含 Agent”时会改变——可能更大，也可能因监督成本而受限。'],
    ['Operating Model / Feedback Loop','组织如何组织资源、流程与人+Agent 持续交付价值；以及 Agent 的执行结果如何回流到评估与知识系统，反过来改进流程（组织反馈闭环）。'],
   ],
   tools:[
    {name:'Microsoft Work Trend Index',object:'一等对象是「组织趋势观察」——大规模调研数据，观察 Human-Agent Team 与工作方式变化。（研究材料，非动手工具）',links:[['官网','https://www.microsoft.com/en-us/worklab/work-trend-index']],learn:'看真实数据里“人和 Agent 协作”正在如何改变工作，而不是停留在想象。适合做组织判断的证据来源。'},
    {name:'Anthropic Research',object:'一等对象是「Agent 落地与影响的研究」——观察企业从单步到多阶段 Agent workflow 的演进。（研究材料）',links:[['研究页','https://www.anthropic.com/research']],learn:'关注其中关于 Agent 在真实工作中如何被采用、带来什么变化的讨论，为组织设计提供一手参照。'},
    {name:'Google ADK',object:'一等对象是「构建与编排 Agent 的框架」——从工程侧理解“组织级 Agent 能力”如何被搭起来。',links:[['文档','https://google.github.io/adk-docs/']],learn:'把组织愿景落到“Agent 实际怎么被构建和编排”，避免变革方案停留在 PPT 层面。'},
   ],
   links:[
    ['Microsoft Work Trend Index','https://www.microsoft.com/en-us/worklab/work-trend-index','用调研数据支撑你对“组织如何变”的判断，是难得的实证材料。'],
    ['Anthropic · Building Effective Agents','https://www.anthropic.com/engineering/building-effective-agents','回到 Agent 能力的本质，避免组织设计脱离“Agent 真正能干什么”。'],
   ],
   path:[
    '先明确一个判断标准：AI-native 不是“用了多少 Agent”，而是“运作方式变没变”。',
    '读 Microsoft Work Trend Index，用数据感受人-Agent 协作正在带来的真实变化。',
    '挑一个你熟悉的岗位或流程，尝试重新设计：哪些交给 Agent、哪些留给人、决策权怎么分。',
    '把前面 6 章（Workflow/Context/Agent/Workspace/Governance/AgentOps）拼成一份“某业务的 AI-native 变革草案”——这就是你的专业能力成品。',
   ]
  }}
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
 'Organizational Feedback Loop':'Agent 执行结果进入评估与知识系统，再反过来改进流程、Context 和 Agent。',
 'Deterministic Workflow':'每一步都被规则写死、结果可预测的流程，不依赖 Agent 临场判断。',
 'Trigger':'触发流程或 Agent 开始工作的事件，如定时、消息、状态变化或人工发起。',
 'Checkpoint':'流程中的检查点，用于保存状态、人工确认或在出错时回退与恢复。',
 'Evaluator–Optimizer':'一个 Agent 产出结果、另一个负责评估并给出改进意见的迭代模式。',
 'Parallel / Sequential':'任务是并行同时做还是按顺序逐步做，是流程编排的基本选择。',
 'Workflow Redesign':'围绕人 + Agent 的新能力重新设计流程，而不是在旧流程上加 AI。',
 'Working Memory':'Agent 当前任务里正在使用的短期上下文，类似人脑的临时记忆。',
 'Long-term Memory':'跨任务、跨会话长期保存并可被反复调用的知识与经验。',
 'Episodic Memory':'关于“发生过什么事”的记忆，如某次任务的具体经过与结果。',
 'Semantic Memory':'关于“事实与概念”的记忆，如业务规则、定义、结构化知识。',
 'State':'Agent 或流程在某一时刻的完整状态数据，用于继续执行或恢复。',
 'Context Compression':'在上下文窗口有限时，把长历史压缩成要点以保留关键信息。',
 'Continual Learning':'Agent 从新经验中持续更新知识或行为，而不是训练完就固定。',
 'Plan–Act–Observe':'Agent 循环的核心步骤：先计划、再行动、再观察结果并调整。',
 'Tool Use':'Agent 调用外部工具（搜索、代码、API 等）来完成靠模型本身做不到的事。',
 'Runtime':'真正让 Agent 跑起来的运行环境，管理会话、状态、工具与执行循环。',
 'Sandbox':'隔离的安全执行环境，让 Agent 运行代码或操作时不影响真实系统。',
 'Computer Use':'在没有 API 时，Agent 直接像人一样操作图形界面（点击、输入）。',
 'Session':'一次完整的 Agent 工作过程，包含其上下文、状态与执行轨迹。',
 'Tool Calling':'模型按结构化格式请求调用某个工具并接收返回结果的机制。',
 'Connector':'把 Agent 接入具体外部系统（如 Gmail、Drive、CRM）的连接件。',
 'API':'系统对外暴露能力的标准接口，是 Agent 读写数据、调用功能的基础。',
 'Resource':'MCP 中 Server 暴露给 Agent 读取的数据或内容（文件、记录等）。',
 'Authorization':'授权机制：决定某个 Agent 被允许访问哪些数据、执行哪些操作。',
 'MCP Server':'按 MCP 协议把某个系统的工具和数据暴露给 Agent 的服务端。',
 'Supervisor':'负责统筹、分派并监督多个下级 Agent 的主控 Agent。',
 'Router':'根据任务类型把请求分发到合适 Agent 或流程分支的调度角色。',
 'Delegation':'把某个子任务及必要上下文交给另一个 Agent 去执行。',
 'Parallelization':'把可拆分的工作同时交给多个 Agent 并行处理以提高效率。',
 'Shared State':'多个 Agent 共同读写的一份状态，用于协作时保持信息一致。',
 'Agent Card':'描述一个 Agent 身份、能力和调用方式的标准化清单，便于被发现。',
 'Agent Discovery':'在系统中找到可用 Agent 及其能力的机制，是跨 Agent 协作前提。',
 'Cross-agent Delegation':'把任务从一个厂商/系统的 Agent 委派给另一个的能力。',
 'Interop':'不同来源的 Agent 能相互理解、协作的互操作性。',
 'Remote Agent':'运行在其他系统或厂商处、通过协议被远程调用的 Agent。',
 'Shared Context':'人与 Agent 共同可见、共同使用的上下文（文件、任务、历史等）。',
 'Persistent Workspace':'长期存在、保留项目状态与历史的工作空间，而非一次性会话。',
 'Human-Agent Team':'把人和 Agent 当作同一个团队的成员来组织与协作。',
 'Agent Board':'展示各 Agent 当前任务、状态与进度的看板式界面。',
 'Shared Files':'人与 Agent 都能读写的共享文件区，是协作的物质载体。',
 'Agentic App':'以 Agent 为核心运行逻辑的应用，而非固定流程的传统软件。',
 'Memory → Intelligence → Execution':'活软件的循环：记忆积累 → 智能判断 → 执行动作，再回流。',
 'Generated Business System':'由 AI 根据业务描述生成的、含数据与自动化的完整系统。',
 'Agent-native App':'从设计之初就假设 Agent 是主要使用者/执行者的应用形态。',
 'Permission':'规定某个 Agent 能访问什么、能做什么的权限设置。',
 'Owner':'对某个 Agent 负责的人或团队，承担其行为与后果。',
 'Policy':'约束 Agent 行为的规则集合，如可用工具、禁止动作、审批要求。',
 'Approval':'高风险动作在执行前必须由人类批准的控制环节。',
 'Audit':'完整记录 Agent 做过什么、以便事后追溯与问责。',
 'Lifecycle':'Agent 从创建、上线、升级到停用/下线的完整生命周期管理。',
 'Shadow Agent':'未登记、无 Owner、脱离治理的“影子 Agent”，是重要风险点。',
 'Observability':'能看清 Agent 内部运行（调用、轨迹、成本、错误）的可观测能力。',
 'Trajectory':'一次 Agent 运行经过的完整步骤序列，用于分析质量与失败原因。',
 'Regression':'新版本导致原本正常的能力变差，需用回归测试及早发现。',
 'Cost':'一次 Agent 运行消耗的资源与费用（Token、调用、时间等）。',
 'Completion Rate':'Agent 独立成功完成任务的比例，是核心质量指标之一。',
 'Escalation Rate':'Agent 无法处理而升级给人工的比例，反映其自主能力边界。',
 'Human Correction':'人工对 Agent 输出的纠正，既是质量信号也是改进来源。',
 'AI Employee':'被当作长期数字员工、拥有职责与权限来管理的 Agent。',
 'Agent Fleet':'一个组织里成规模运行、需统一管理的一批 Agent。',
 'Agent Control Plane':'统一管理、调度、监控与治理大量 Agent 的控制平面。',
 'Role-based Agent':'围绕某个岗位/角色设计、承担长期职责的 Agent，而非一次性任务。',
 'Routine':'Agent 反复执行的固定职责或例行工作流程。',
 'AI-native Organization':'从流程、岗位到治理都以“人 + Agent 协作”为前提设计的组织。',
 'Role Redesign':'当 Agent 承担部分工作后，对人的岗位职责重新划分与设计。',
 'Decision Rights':'明确哪些决策由人拍板、哪些可交给 Agent 的决策权分配。',
 'Management Span':'一个管理者能有效带领的对象数量，在人 + Agent 下会改变。',
 'Operating Model':'组织如何组织资源、流程与人 + Agent 来持续交付价值的方式。'

};

// 每个模块的最后更新日期（YYYY-MM-DD）。更新某模块内容后，把对应日期改为当天。
const moduleUpdated={workflow:'2026-09-16',context:'2026-09-16',agent:'2026-09-16',tools:'2026-09-16',multi:'2026-09-16',a2a:'2026-09-16',workspace:'2026-09-16',app:'2026-09-16',gov:'2026-09-16',ops:'2026-09-16',workforce:'2026-09-16',org:'2026-09-16'};
