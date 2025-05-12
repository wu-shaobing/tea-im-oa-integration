# 技术栈规则

本文档定义了茶叶批发OA-IM集成项目使用的技术栈、框架、库和工具。

## 核心技术栈

### 后端技术

| 技术/框架 | 版本 | 用途 |
|----------|-----|-----|
| Node.js | v16+ LTS | 运行环境 |
| Express.js | v4.18+ | Web框架 |
| SQLite | v3.40+ | 轻量级数据库(<500用户) |
| PostgreSQL | v14+ (可选) | 大型部署数据库(>500用户) |
| Sequelize | v6+ | ORM框架 |
| better-queue | v3+ | 内存消息队列 |
| Bull+Redis | v4+ (可选) | 分布式消息队列 |
| jsonwebtoken | v9+ | JWT认证 |
| winston | v3+ | 日志管理 |
| helmet | v6+ | 安全HTTP头 |
| node-cron | v3+ | 定时任务 |

### 前端技术 (Mattermost应用)

| 技术/框架 | 版本 | 用途 |
|----------|-----|-----|
| Mattermost App Framework | v1+ | 应用框架 |
| React | v17+ | UI框架 |
| Bootstrap | v5+ | CSS框架 |
| Axios | v1+ | HTTP客户端 |
| Chart.js | v3+ | 图表库 |

### 外部系统集成

**Mattermost集成:**
1. Mattermost Apps Framework
2. Mattermost REST API
3. Mattermost入站Webhook
4. Mattermost出站Webhook

## 技术选型理由

### 为什么选择Node.js和Express?

1. **非阻塞I/O:** 适合处理大量并发请求
2. **JavaScript全栈:** 前后端使用同一语言
3. **丰富的生态系统:** npm提供大量可用的库和工具
4. **轻量级:** 适合构建微服务架构
5. **适合实时应用:** 天然支持WebSocket等实时通信

### 为什么选择SQLite作为初始数据库?

1. **零配置:** 不需要独立的数据库服务
2. **可靠性:** 单文件数据库，易于备份和恢复
3. **性能:** 对于小型部署(<500用户)性能足够
4. **嵌入式:** 不需要额外的服务器资源
5. **无需DBA:** 简化运维要求