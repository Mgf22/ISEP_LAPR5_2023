import { Request, Response, NextFunction } from 'express';

export default interface IUserController  {
  criarUser(req: Request, res: Response, next: NextFunction);
  criarUtente(req: Request, res: Response, next: NextFunction);
  updateUser(req: Request, res: Response, next: NextFunction);
  getAllUsers(req: Request, res: Response, next: NextFunction);
  getUserByEmail(req: Request, res: Response, next: NextFunction);
  deleteUser(req: Request, res: Response, next: NextFunction);
  login(req: Request, res: Response, next: NextFunction);
  getCurrentUserRole(req: Request, res: Response, next: NextFunction);
}