import { Request, Response, NextFunction } from 'express';

export default interface ITarefaController  {
    createTarefa(req: Request, res: Response, next: NextFunction);
    deleteTarefa(req: Request, res: Response, next: NextFunction);
    listTarefas(req: Request, res: Response, next: NextFunction);
}