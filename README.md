# auto-forge2.0
Multi-Agent fullstack app generator powered by Xiaomi LLM
你给一份产品需求文档（PRD），AutoForge 调用小米大模型自动设计架构、生成前后端完整代码、编写测试、部署上线，并能在后续迭代中根据 Issue 自动修改代码并提交 PR，形成一个自进化的软件工厂。
业务价值巨大：小团队没有前端/后端人力时，AutoForge 可以直接把 PRD 变成应用，或者自动接 Issue 改代码。对内对外都有说服力。

Token 消耗合理且可度量：每生成一个功能页面，需调用 10~20 次大模型（架构设计、后端接口、前端组件、样式、测试、文档），单次生成消耗 5~15 万 Token。若每天自动处理 10 个模拟 Issue，日消耗轻松超过 500 万 Token，但这些消耗直接对应可交付的功能点，毫无浪费感。

全栈闭环可演示：生成的 App 直接部署在 GitHub Pages 上，评审人员可以当场体验由 AI 驱动的自动生成结果，远比 PPT 有冲击力。

“少消耗”+“高效率”的完美平衡：消耗 Token 是为了自动化让人不干的事，项目定位就是“用 Token 换人力时间”，所以每 1 个 Token 都有产出，不是空转。
[GitHub Repository: auto-forge]
│
├── .github/workflows/
│   ├── forge-app.yml           # 主流水线：根据需求生成完整应用并部署
│   ├── auto-fix.yml            # 自动处理Issue：分析→生成修复代码→PR
│   └── docs-dashboard.yml      # 仪表板更新（展示统计）
│
├── agent/                       # Python 多 Agent 协作引擎
│   ├── mi_llm.py                # 小米大模型统一接口（长上下文、并发）
│   ├── product_analyst.py       # 需求拆解 → 生成用户故事和功能列表
│   ├── architect.py             # 根据功能列表设计前后端模块、数据模型
│   ├── code_generator.py        # 按模块生成完整代码（后端+前端）
│   ├── test_generator.py        # 为每个模块生成 pytest / Cypress 测试
│   ├── code_reviewer.py         # 自我审查生成代码的质量和一致性
│   └── orchestrator.py          # 调度以上Agent，管理生成状态和版本
│
├── templates/                   # 生成代码的基础模板（React + FastAPI等）
│   ├── backend/
│   └── frontend/
│
├── forge-output/                # 生成的应用源码（被 .gitignore，运行时产出）
│
├── dashboard/                   # React 仪表板（展示 Token 消耗、应用列表、Issue 修复记录）
│   └── src/ ...
│
├── examples/                    # 示例需求文档（用户可直接体验）
│   └── todo-app-prd.md
│
├── config.yaml                  # 配置：小米API Key、默认技术栈、部署目标
└── README.md
AutoForge 的每个步骤都是真实的软件工程活动，单个应用生成流程如下：

需求分析（1次调用，2000 Token 输入 → 1000 Token 输出）

架构设计（1次长上下文调用，将需求 + 分析结果输入，输出模块图、数据表结构、API列表，约 4000 Token 输出）

模块级代码生成（每个功能模块调用 3~5 次：后端模型、API端点、业务逻辑；前端页面、组件、状态管理。一个中等应用约20个模块，调用 80 次，每次输入2000~4000 Token，输出1000~2000 Token，合计约 25万 Token）

测试生成（每个模块生成单元测试 + 端到端测试，又 40 次调用，约 12万 Token）

代码审查与修复（迭代 2 轮，每次审查全部生成代码，约 8万 Token）

文档自动生成（README、API 文档，约 2万 Token）
