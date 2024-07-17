import { Request, Response, NextFunction } from 'express';
import { getAllHistoryData } from '../modules/operation-history-model';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getAllHistoryData();
    res.json(data);
  } catch (err) {
    if (err instanceof Error) {
      next(new Error(`Failed to get history data: ${err.message}`));
    } else {
      next(new Error('An unknown error occurred'));
    }
  }
};
