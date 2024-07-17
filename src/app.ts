import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import historyRoutes from './routes/history-routes';
import errorHandler from './middlewares/error-handler'; // グローバルエラーハンドラーをインポート

const app = express();

// ミドルウェアの設定
app.use(cors()); // CORSの設定
app.use(morgan('dev')); // ログ出力の設定
app.use(express.json()); // JSONリクエストボディのパース

// ルーティングの設定
app.use('/api/history', historyRoutes); // /api/history エンドポイントにルーティング

// グローバルエラーハンドラーの使用
app.use(errorHandler);

export default app;
