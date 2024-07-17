## Getting Started

### 構造説明

```bash
TRADER-NODEJS/
├── mysql/                    # MySQL関連のフォルダ
│   ├── tbl-csv/              # CSVファイルのフォルダ、複数のCSVデータファイルを含む
│   │   ├── reservation_manage.csv
│   │   ├── trader_portal_account_available_function_master.csv
│   │   ├── trader_portal_account_master.csv
│   │   ├── trader_portal_function_master.csv
│   │   ├── trader_portal_guidance_master.csv
│   │   ├── trader_portal_operation_history.csv
│   │   └── trader_portal_trader_master.csv
│   ├── Dockerfile            # MySQLイメージをビルドするためのDockerfile
│   └── init.sql              # データベース初期化用のSQLスクリプト
├── node_modules/             # npmでインストールされた依存パッケージ（自動生成）
├── src/                      # ソースコードのフォルダ
│   ├── config/               # 設定ファイルのフォルダ、データベース設定などを含む
│   │   └── db.ts             # データベース設定ファイル
│   ├── controllers/          # コントローラーフォルダ、ビジネスロジックを含む
│   │   └── operation-history-controller.ts
│   ├── middlewares/          # ミドルウェアのフォルダ、カスタムミドルウェアを含む
│   │   └── error-handler.ts  # グローバルエラーハンドラーミドルウェア
│   ├── modules/              # モジュールフォルダ、データベースの操作など
│   └── routes/               # ルーティングフォルダ、ルート定義を含む
│       └── history-routes.ts # 履歴関連のルート定義
├── .env                      # 環境変数ファイル
├── .gitignore                # Gitで無視するファイルやフォルダを定義するファイル
├── .prettierrc               # Prettierの設定ファイル
├── docker-compose.yml        # Docker Compose設定ファイル
├── Dockerfile                # アプリケーション用のDockerfile
├── package.json              # プロジェクトの依存パッケージとスクリプトを定義するファイル
├── package-lock.json         # 正確な依存関係のバージョンを記録するファイル
├── README.md                 # プロジェクトの概要と説明
├── tsconfig.json             # TypeScriptの設定ファイル
└── src/                      # ソースコードのフォルダ
    ├── app.ts                # アプリケーションのメインファイル
    └── main.ts               # エントリーポイント

```

### 起動

```bash
        docker-compose up --build

```

### URL

```bash
        http://localhost:3000/api/history/all
```
