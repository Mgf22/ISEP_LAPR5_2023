import { Request, Response, NextFunction } from 'express';

export default interface IElevadorController  {
  createElevador(req: Request, res: Response, next: NextFunction);
  updateElevador(req: Request, res: Response, next: NextFunction);
  listElevadoresEdificio(req: Request, res: Response, next: NextFunction);
  listElevadores(req: Request, res: Response, next: NextFunction);
  deleteElevador(req: Request, res: Response, next: NextFunction);
}