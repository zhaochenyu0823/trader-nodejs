CREATE DATABASE IF NOT EXISTS trader CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE trader;

SET NAMES utf8mb4;
SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_database = utf8mb4;
SET character_set_results = utf8mb4;
SET character_set_server = utf8mb4;


CREATE TABLE IF NOT EXISTS reservation_manage (
  payment_number varchar(20) NOT NULL DEFAULT '' COMMENT '決済番号',
  trader_code char(3) NOT NULL DEFAULT '' COMMENT '事業者コード',
  transaction_id varchar(100) NOT NULL DEFAULT '' COMMENT 'トランザクションID',
  confirm_number varchar(6) NOT NULL DEFAULT '' COMMENT '確認番号',
  amount int(8) NOT NULL DEFAULT 0 COMMENT '支払金額',
  expires_at datetime(3) NOT NULL DEFAULT '1970-01-01 00:00:00.000' COMMENT '照会期限',
  payment_status_code char(1) NOT NULL DEFAULT '2' COMMENT '支払ステータスコード',
  inquiry_time datetime(3) NOT NULL DEFAULT '1970-01-01 00:00:00.000' COMMENT '照会日時',
  payment_time datetime(3) NOT NULL DEFAULT '1970-01-01 00:00:00.000' COMMENT '入金日時',
  notice_payment_received_time datetime(3) NOT NULL DEFAULT '1970-01-01 00:00:00.000' COMMENT '入金通知(対MMS)受信日時',
  notice_payment_to_trader_received_time datetime(3) NOT NULL DEFAULT '1970-01-01 00:00:00.000' COMMENT '入金通知(対事業者)結果受信日時',
  location_code char(3) NOT NULL DEFAULT '' COMMENT '収納機関コード',
  store_code varchar(10) NOT NULL DEFAULT '' COMMENT '店舗コード',
  is_stamp tinyint(1) NOT NULL DEFAULT 0 COMMENT '印紙フラグ',
  regist_time datetime(3) NOT NULL DEFAULT current_timestamp(3) COMMENT '登録日時',
  update_time datetime(3) NOT NULL DEFAULT current_timestamp(3) COMMENT '更新日時',
  PRIMARY KEY (payment_number),
  UNIQUE KEY reservation_manage_IX1 (payment_number,transaction_id),
  KEY reservation_manage_IX2 (trader_code,transaction_id),
  KEY reservation_manage_IX3 (trader_code,payment_status_code,regist_time),
  KEY reservation_manage_IX4 (trader_code,payment_status_code,update_time),
  KEY reservation_manage_IX5 (trader_code,payment_status_code,payment_time),
  KEY reservation_manage_IX6 (payment_status_code,expires_at),
  KEY reservation_manage_IX7 (payment_status_code,payment_time),
  KEY reservation_manage_IX8 (trader_code,payment_status_code,notice_payment_to_trader_received_time)
);

CREATE TABLE IF NOT EXISTS trader_portal_account_master (
  account_id varchar(40) NOT NULL DEFAULT '' COMMENT 'アカウントID',
  account_name varchar(40) NOT NULL DEFAULT '' COMMENT 'アカウント名',
  trader_code char(3) NOT NULL DEFAULT '' COMMENT '事業者コード',
  permission char(1) NOT NULL DEFAULT '' COMMENT '権限コード',
  displayable_max_rows INTEGER NOT NULL DEFAULT 10 COMMENT '表示可能最大行数',
  regist_time datetime(3) NOT NULL DEFAULT current_timestamp(3) COMMENT '登録日時',
  update_time datetime(3) COMMENT '更新日時',
  PRIMARY KEY (trader_code,account_id),
  UNIQUE KEY trader_portal_account_master_IX1 (trader_code,permission)
);

CREATE TABLE IF NOT EXISTS trader_portal_trader_master (
  trader_code char(3) NOT NULL DEFAULT '' COMMENT '事業者コード',
  trader_identifier varchar(64) NOT NULL DEFAULT '' COMMENT '事業者識別子',
  trader_name varchar(40) NOT NULL DEFAULT '' COMMENT '事業者名',
  PRIMARY KEY (trader_code),
  UNIQUE KEY trader_portal_trader_master_IX1 (trader_code,trader_identifier)
);

CREATE TABLE IF NOT EXISTS trader_portal_operation_history (
  trader_code char(3) NOT NULL DEFAULT '' COMMENT '事業者コード',
  account_id varchar(40) NOT NULL DEFAULT '' COMMENT 'アカウントID',
  screen_code varchar(40) NOT NULL DEFAULT '' COMMENT '画面コード',
  function_code varchar(40) NOT NULL DEFAULT '' COMMENT '機能コード',
  operation_time datetime(3) NOT NULL DEFAULT current_timestamp(3) COMMENT '操作時刻',
  screen_name varchar(100) NOT NULL DEFAULT '' COMMENT '画面名',
  function_name varchar(100) NOT NULL DEFAULT '' COMMENT '機能名',
  regist_time datetime(3) NOT NULL DEFAULT current_timestamp(3) COMMENT '登録日時',
  update_time datetime(3) COMMENT '更新日時',
  PRIMARY KEY (trader_code,account_id,screen_code,function_code,operation_time)
);

CREATE TABLE IF NOT EXISTS trader_portal_function_master (
  trader_code char(3) NOT NULL DEFAULT '' COMMENT '事業者コード',
  screen_code varchar(40) NOT NULL DEFAULT '' COMMENT '画面コード',
  function_code varchar(40) NOT NULL DEFAULT '' COMMENT '機能コード',
  screen_name varchar(100) NOT NULL DEFAULT '' COMMENT '画面名',
  function_name varchar(100) NOT NULL DEFAULT '' COMMENT '機能名',
  permission varchar(10) NOT NULL DEFAULT 'MAUR' COMMENT '許容権限',
  regist_time datetime(3) NOT NULL DEFAULT current_timestamp(3) COMMENT '登録日時',
  update_time datetime(3) COMMENT '更新日時',
  PRIMARY KEY (trader_code,screen_code,function_code)
);

CREATE TABLE IF NOT EXISTS trader_portal_account_available_function_master (
  trader_code char(3) NOT NULL DEFAULT '' COMMENT '事業者コード',
  account_id varchar(40) NOT NULL DEFAULT '' COMMENT 'アカウントID',
  screen_code varchar(40) NOT NULL DEFAULT '' COMMENT '画面コード',
  function_code varchar(40) NOT NULL DEFAULT '' COMMENT '機能コード',
  is_available Boolean NOT NULL DEFAULT 0 COMMENT '利用有無',
  regist_time datetime(3) NOT NULL DEFAULT current_timestamp(3) COMMENT '登録日時',
  update_time datetime(3) COMMENT '更新日時',
  PRIMARY KEY (trader_code,account_id,screen_code,function_code)
);

CREATE TABLE IF NOT EXISTS trader_portal_guidance_master (
  trader_code CHAR(3) NOT NULL  DEFAULT '' COMMENT '事業者コード',
  guidance_code VARCHAR(40) NOT NULL DEFAULT '',
  title VARCHAR(128) NOT NULL DEFAULT '',
  message VARCHAR(1024) NOT NULL DEFAULT '',
  priority INTEGER(2) NOT NULL,
  display_from datetime NOT NULL,
  display_to datetime NOT NULL  COMMENT '事業者名',
  is_highlight BOOLEAN NOT NULL DEFAULT 0,
  PRIMARY KEY(trader_code,guidance_code),
  UNIQUE KEY trader_portal_guidance_master_PKC(trader_code,guidance_code),
  KEY trader_portal_guidance_master_IX1(priority)
);

-- 导入 CSV 文件到表中
LOAD DATA INFILE '/var/lib/mysql-files/reservation_manage.csv'  
INTO TABLE reservation_manage 
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES 
(payment_number, trader_code, transaction_id, confirm_number, amount, expires_at, payment_status_code, inquiry_time, payment_time, notice_payment_received_time, notice_payment_to_trader_received_time, location_code, store_code, is_stamp, regist_time, update_time);

LOAD DATA INFILE '/var/lib/mysql-files/trader_portal_account_master.csv' 
INTO TABLE trader_portal_account_master 
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES 
(account_id, account_name, trader_code, permission, displayable_max_rows, regist_time, update_time);

LOAD DATA INFILE '/var/lib/mysql-files/trader_portal_trader_master.csv' 
INTO TABLE trader_portal_trader_master 
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES 
(trader_code, trader_identifier, trader_name);

LOAD DATA INFILE '/var/lib/mysql-files/trader_portal_operation_history.csv' 
INTO TABLE trader_portal_operation_history 
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES 
(trader_code, account_id, screen_code, function_code, operation_time, screen_name, function_name, regist_time, update_time);

LOAD DATA INFILE '/var/lib/mysql-files/trader_portal_function_master.csv' 
INTO TABLE trader_portal_function_master 
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES 
(trader_code, screen_code, function_code, screen_name, function_name, permission, regist_time, update_time);

LOAD DATA INFILE '/var/lib/mysql-files/trader_portal_account_available_function_master.csv' 
INTO TABLE trader_portal_account_available_function_master 
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES 
(trader_code, account_id, screen_code, function_code, is_available, regist_time, update_time);

LOAD DATA INFILE '/var/lib/mysql-files/trader_portal_guidance_master.csv' 
INTO TABLE trader_portal_guidance_master 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n' 
IGNORE 1 LINES 
(trader_code, guidance_code, title, message, priority, display_from, display_to, is_highlight);
