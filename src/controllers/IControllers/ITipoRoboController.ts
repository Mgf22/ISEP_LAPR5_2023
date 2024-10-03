import { Request, Response, NextFunction } from 'express';

export default interface ITipoRoboController  {
  createTipoRobo(req: Request, res: Response, next: NextFunction);
  updateTipoRobo(req: Request, res: Response, next: NextFunction);
  deleteTipoRobo(req: Request, res: Response, next: NextFunction);
  listTipoRobo(req: Request, res: Response, next: NextFunction);
}