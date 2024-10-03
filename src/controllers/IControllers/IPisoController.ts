import { Request, Response, NextFunction } from 'express';

export default interface IPisoController  {
  createPiso(req: Request, res: Response, next: NextFunction);
  updatePiso(req: Request, res: Response, next: NextFunction);
  listPisos(req: Request, res: Response, next: NextFunction);
  deletePiso(req: Request, res: Response, next: NextFunction);
  listPisosGeral(req: Request, res: Response, next: NextFunction);
  listPisosGeral2(req: Request, res: Response, next: NextFunction);
}