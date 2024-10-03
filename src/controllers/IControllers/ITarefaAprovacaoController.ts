import { Request, Response, NextFunction } from 'express';

export default interface ITarefaAprovacaoController  {
  requisitar(req: Request, res: Response, next: NextFunction);
}