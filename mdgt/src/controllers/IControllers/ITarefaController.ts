import { Request, Response, NextFunction } from 'express';

export default interface ITarefaController  {
  requisitar(req: Request, res: Response, next: NextFunction);
}