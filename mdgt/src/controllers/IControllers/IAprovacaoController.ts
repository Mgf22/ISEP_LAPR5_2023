import { Request, Response, NextFunction } from 'express';

export default interface IAprovacaoController  {
  aceitarRequisicao(req: Request, res: Response, next: NextFunction);
  recusarRequisicao(req: Request, res: Response, next: NextFunction);
  listarTarefasNaoAprovadas(req: Request, res: Response, next: NextFunction);
  listarPorEstado(req: Request, res: Response, next: NextFunction);
  listarPorTipoDispositivo(req: Request, res: Response, next: NextFunction);
  listarPorUtente(req: Request, res: Response, next: NextFunction);
  sequenciaTarefasAprovadas(req: Request, res: Response, next: NextFunction);
}