import { Request, Response, NextFunction } from 'express';

export default interface IRoleController  {
  criarRole(req: Request, res: Response, next: NextFunction);
  getRoleById(req: Request, res: Response, next: NextFunction);
  //updateRole(req: Request, res: Response, next: NextFunction);
  getAllRoles(req: Request, res: Response, next: NextFunction);
}