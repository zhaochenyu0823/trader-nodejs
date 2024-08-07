## Getting Started

### 構造説明

```bash
TRADER-NODEJS/
├── mysql/                    # MySQL関連のフォルダ
│   ├── tbl-csv/              # CSVファイルのフォルダ、複数のCSVデータファイルを含む
│   ├── Dockerfile            # MySQLイメージをビルドするためのDockerfile
│   └── init.sql              # データベース初期化用のSQLスクリプト
├── node_modules/             # npmでインストールされた依存パッケージ（自動生成）
├── src/                      # ソースコードのフォルダ
│   ├── config/
│   │   └── db.ts             # データベース設定ファイル
│   ├── controllers/          # コントローラー
│   │   └── operation-history-controller.ts
│   ├── middlewares/
│   │   └── error-handler.ts  # グローバルエラーハンドラーミドルウェア
│   ├── modules/              # モジュールフォルダ
│   └── routes/               # ルート
│   │    └── history-routes.ts #
│   ├── app.ts                # アプリケーションのメインファイル
│   └── main.ts               # エントリーポイント
├── .env                      # 環境変数ファイル
├── .gitignore                # Git
├── .prettierrc               # Prettierの設定ファイル
├── docker-compose.yml        # Docker Compose設定ファイル
├── Dockerfile                # アプリケーション用のDockerfile
├── package.json              # プロジェクトの依存パッケージとスクリプトを定義するファイル
├── package-lock.json         # プロジェクトの依存パッケージとスクリプトを定義するファイル
├── README.md                 # プロジェクトの概要と説明
├── tsconfig.json             # TypeScriptの設定ファイル


```

### 起動

```bash
        docker-compose up --build

```

### URL

```bash
        http://localhost:3000/api/history/all
```
