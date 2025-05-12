# 茶叶批发OA-IM集成项目

基于Mattermost平台的茶叶批发企业运营管理系统，整合订单管理、库存管理、审批流程和报表应用。

## 项目概述

本项目旨在为茶叶批发企业提供集成化的IM交互式运营管理平台，基于Mattermost协作平台构建，让企业内部沟通与业务流程高度融合，提高运营效率。

### 核心功能

- **订单管理**：从IM平台直接创建、跟踪和管理茶叶批发订单
- **库存管理**：多仓库库存追踪，自动库存类型转换，库存预警
- **审批流程**：基于IM的一键审批，审批路由自动判断
- **报表分析**：销售数据、库存状态可视化展示
- **提成管理**：根据库存类型自动计算业务员提成

## 技术架构

本项目采用"IM为中心"的架构模式，包含以下核心组件：

- **Mattermost平台**：提供用户界面和交互基础
- **OA-IM集成服务**：基于Node.js的后端服务
- **数据库**：SQLite(小型部署)或PostgreSQL(大型部署)
- **消息队列**：better-queue或Bull+Redis

详细技术栈请查看[技术栈规则](docs/tech-stack.md)。

## 开发指南

### 系统要求

- Node.js v16+
- npm 8+
- Mattermost 服务器 v7.1+

### 本地开发

```bash
# 克隆项目
git clone https://github.com/wu-shaobing/tea-im-oa-integration.git
cd tea-im-oa-integration

# 安装依赖
npm install

# 运行开发服务器
npm run dev
```

### 项目结构

请参考[项目结构规则](docs/project-structure.md)了解详细的目录结构。

## 相关文档

- [核心组件规则](docs/core-components.md)
- [核心功能实现规则](docs/core-functionality.md)
- [工作流程规则](docs/workflow.md)
- [技术栈规则](docs/tech-stack.md)

## 贡献指南

欢迎为本项目做出贡献！请先阅读[工作流程规则](docs/workflow.md)中的开发工作流章节。

## 许可证

MIT