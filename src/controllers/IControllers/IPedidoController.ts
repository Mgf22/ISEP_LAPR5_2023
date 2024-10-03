import { Request, Response, NextFunction } from 'express';

export default interface IPedidoController  {
  getAllPedidos(req: Request, res: Response, next: NextFunction);
  getAllPedidosPendentes(req: Request, res: Response, next: NextFunction);
  getPedidoById(req: Request, res: Response, next: NextFunction);
  criarPedido(req: Request, res: Response, next: NextFunction);
  aprovarPedido(req: Request, res: Response, next: NextFunction);
  recusarPedido(req: Request, res: Response, next: NextFunction);
}