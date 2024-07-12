import { Request, Response } from 'express';
import { getAllHistoryData } from '../modules/operation-history-model';

export const getAll = (req: Request, res: Response) => {
  getAllHistoryData((err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(data);
  });
};
