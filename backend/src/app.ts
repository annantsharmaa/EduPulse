import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { config } from './config';
import { errorHandler } from './middleware/error-handler';
import { logger } from './utils/logger';
import { connectDB } from './config/database';
import { connectRedis } from './config/redis';
import routes from './routes';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: 'Too many requests',
});
app.use('/api', limiter);

app.use('/api/v1', routes);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

app.use(errorHandler);

const server = createServer(app);

const startServer = async () => {
  try {
    await connectDB();
    logger.info('✅ Database connected');
    await connectRedis();
    logger.info('✅ Redis connected');
    const PORT = config.port;
    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, closing server');
  server.close(() => process.exit(0));
});

export { app, server };
