import connection from '../config/db';
import mysql from 'mysql2';

export interface OperationHistory {
  trader_code: string; // 事業者コード, CHAR(3)
  account_id: string; // アカウントID, VARCHAR(40)
  screen_code: string; // 画面コード, VARCHAR(40)
  function_code: string; // 機能コード, VARCHAR(40)
  operation_time: Date; // 操作時刻, datetime
  screen_name: string; // 画面名, VARCHAR(100)
  function_name: string; // 機能名, VARCHAR(100)
  regist_time: Date; // 登録日時, datetime
  regist_account: string; // 登録アカウント, VARCHAR(40)
}

export const getAllHistoryData = (callback: (err: mysql.QueryError | null, results?: OperationHistory[]) => void) => {
  connection.query('SELECT * FROM trader_portal_operation_history', (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results as OperationHistory[]);
  });
};
