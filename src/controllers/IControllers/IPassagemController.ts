import { Request, Response, NextFunction } from 'express';

export default interface IPassagemController  {
  createPassagem(req: Request, res: Response, next: NextFunction);
  updatePassagem(req: Request, res: Response, next: NextFunction);
  listPassagens(req: Request, res: Response, next: NextFunction);
  listPisos(req: Request, res: Response, next: NextFunction);
  deletePassagem(req: Request, res: Response, next: NextFunction);
  listPassagensGeral(req: Request, res: Response, next: NextFunction);
}