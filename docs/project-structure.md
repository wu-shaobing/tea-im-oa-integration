# 项目结构规则

本文档定义了茶叶批发OA-IM集成项目的目录结构和文件组织方式。

## 目录结构

项目采用模块化目录结构，支持多应用开发：

```
tea-im-oa-integration/
├── src/                      # 源代码目录
│   ├── apps/                 # IM应用集合
│   │   ├── order/            # 订单管理应用
│   │   ├── inventory/        # 库存管理应用
│   │   ├── approval/         # 审批流程应用
│   │   └── reports/          # 报表应用
│   ├── routes/               # API路由
│   ├── controllers/          # 控制器
│   ├── services/             # 服务层
│   ├── models/               # 数据模型
│   ├── utils/                # 工具函数
│   ├── middlewares/          # 中间件
│   ├── tasks/                # 计划任务
│   ├── templates/            # 消息模板
│   ├── config/               # 配置
│   ├── db/                   # 数据库
│   ├── queues/               # 消息队列
│   ├── app.js                # 应用程序
│   └── server.js             # 服务器启动
├── public/                   # 静态资源
├── mm-apps/                  # Mattermost应用前端
├── tests/                    # 测试
├── scripts/                  # 脚本工具
├── logs/                     # 日志文件
└── docs/                     # 项目文档
```

## 文件组织原则

1. **功能模块化:** 相关功能放在同一目录
2. **职责分离:** 控制器、服务、模型分离
3. **配置集中:** 配置参数集中管理
4. **路径别名:** 使用路径别名简化导入