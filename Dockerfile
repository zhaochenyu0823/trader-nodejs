# 公式の MySQL イメージをベースイメージとして使用
FROM mysql:8.0

# 環境変数を設定
ENV MYSQL_ROOT_PASSWORD=trader
ENV MYSQL_DATABASE=trader
ENV MYSQL_USER=trader
ENV MYSQL_PASSWORD=trader

# 初期化 SQL スクリプトをコンテナにコピー
COPY init.sql /docker-entrypoint-initdb.d/

# CSV ファイルをコンテナにコピー
COPY tbl-csv /var/lib/mysql-files/

# 権限を設定
RUN chmod -R 644 /var/lib/mysql-files
RUN chown -R mysql:mysql /var/lib/mysql-files
