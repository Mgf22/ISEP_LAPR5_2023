import { Request, Response, NextFunction } from 'express';

export default interface ISalaController  {
  createSala(req: Request, res: Response, next: NextFunction);
  updateSala(req: Request, res: Response, next: NextFunction);
  listSalas(req: Request, res: Response, next: NextFunction);
  listSalasPiso(req: Request, res: Response, next: NextFunction);
}