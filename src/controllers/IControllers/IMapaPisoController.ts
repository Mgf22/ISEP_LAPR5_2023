import { Request, Response, NextFunction } from 'express';

export default interface IMapaPisoController  {
    createMapaPiso(req: Request, res: Response, next: NextFunction);
    loadMapaPiso(req: Request, res: Response, next: NextFunction);
    deleteMapaPiso(req: Request, res: Response, next: NextFunction);
    listMapasPiso(req: Request, res: Response, next: NextFunction);
    caminhoEntrePisos(req: Request, res: Response, next: NextFunction);
    listMapaPiso(req: Request, res: Response, next: NextFunction);
}