import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupRoutes } from './routes/index.js';
import { setupMiddlewares } from './middlewares/index.js';
import { initDatabase } from './db/index.js';
import { setupTasks } from './tasks/index.js';
import { logger } from './utils/logger.js';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 基础中间件
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 设置自定义中间件
setupMiddlewares(app);

// 设置路由
setupRoutes(app);

// 错误处理中间件
app.use((err, req, res, next) => {
  logger.error('服务器错误:', err);
  res.status(500).json({
    status: 'error',
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 初始化数据库
initDatabase()
  .then(() => {
    // 启动服务器
    app.listen(PORT, () => {
      logger.info(`服务器已启动: http://localhost:${PORT}`);
      
      // 设置定时任务
      setupTasks();
    });
  })
  .catch((error) => {
    logger.error('数据库初始化失败:', error);
    process.exit(1);
  });

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  logger.error('未捕获的异常:', error);
});

// 处理未处理的Promise拒绝
process.on('unhandledRejection', (reason, promise) => {
  logger.error('未处理的Promise拒绝:', reason);
});

export default app;