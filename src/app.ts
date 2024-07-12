import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import historyRoutes from './routes/history-routes';

const app = express();

// 中间件配置
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// 路由配置
app.use('/api/history', historyRoutes);
export default app;
