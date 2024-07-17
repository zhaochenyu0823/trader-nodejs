# 公式の Node.js イメージをベースイメージとして使用
FROM node:14

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# package.json と package-lock.json（存在する場合）をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install && ls node_modules

# アプリケーションコードをコピー
COPY . .

# アプリケーションのポートを公開
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "start"]
