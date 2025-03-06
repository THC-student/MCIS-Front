jinggai
项目描述
jinggai 是一个基于 Vue 3 的前端项目，使用了 Element Plus 和 Vue Router 等流行库，旨在提供一个高效、响应式的用户界面。
功能特点
用户界面: 使用 Element Plus 提供丰富的组件库，确保界面美观且易于使用。
路由管理: 采用 Vue Router 进行页面路由管理，支持多页面应用。
状态管理: 使用 Vuex 进行状态管理，方便组件间的数据共享。
API 请求: 使用 Axios 进行 HTTP 请求，与后端 API 进行交互。
数据可视化: 集成 ECharts 和 Chart.js，支持复杂的数据可视化需求。
响应式设计: 确保在不同设备上都能提供良好的用户体验。
技术栈
框架: Vue 3
UI 库: Element Plus
路由: Vue Router
状态管理: Vuex
HTTP 请求: Axios
数据可视化: ECharts, Chart.js
构建工具: Vite
样式预处理器: Less, Sass
类型检查: TypeScript
环境要求
Node.js (v14.x 或更高)
npm (v6.x 或更高)
安装和运行
克隆项目
bash
复制
git clone https://github.com/your-username/jinggai.git
cd jinggai
安装依赖
bash
复制
npm install
开发服务器
bash
复制
npm run dev
开发服务器会在 http://localhost:5173 启动，默认代理后端服务地址为 http://localhost:10010，如有变动需在 vite.config.js 中修改：
JavaScript
复制
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:10010',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
构建项目
bash
复制
npm run build
构建后的文件会输出到 dist 目录。
预览构建结果
bash
复制
npm run preview
项目结构
复制
jinggai/
├── node_modules/       # 依赖库
├── public/             # 静态资源
├── src/                # 源代码
│   ├── assets/         # 静态资源（图片、样式表等）
│   ├── components/     # 可复用组件
│   ├── views/          # 页面组件
│   ├── router/         # 路由配置
│   ├── store/          # 状态管理
│   ├── utils/          # 工具函数
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── vite.config.js      # Vite 配置文件
├── package.json        # 项目依赖和脚本
└── README.md           # 项目说明
贡献指南
欢迎 contribute 到本项目！请先阅读 贡献指南。
许可证
本项目采用 MIT 许可证。


项目对应后端地址：https://github.com/THC-student/MCIS-Backend
