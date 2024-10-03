import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPedidoController from "./IControllers/IPedidoController";
import IPedidoService from '../services/IServices/IPedidoService';
import IPedidoDTO from '../dto/IPedidoDTO';

import { Result } from "../core/logic/Result";
import ICreatingPedidoDTO from '../dto/ICreatingPedidoDTO';
import { Console } from 'console';
import { TextUtil } from '../utils/TextUtil';

@Service()
export default class PedidoController implements IPedidoController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.pedido.name) private pedidoServiceInstance: IPedidoService
  ) { }

  public async criarPedido(req: Request, res: Response, next: NextFunction) {
    try {
      
      const pedidoOrError = await this.pedidoServiceInstance.criarPedido(req.body as ICreatingPedidoDTO) as Result<IPedidoDTO>;
      
      let finalErr : string;

      if(pedidoOrError.error != null)
        finalErr = TextUtil.parseAuthAndAuthErrors(pedidoOrError.error);

      if (pedidoOrError.isFailure) {
        return res.status(403).send("Erro: " + finalErr);
      }

      const pedidoDTO = pedidoOrError.getValue();
      return res.json(pedidoDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async aprovarPedido(req: Request, res: Response, next: NextFunction){
    try {
      console.log(req.body);
      const pedidoOrError = await this.pedidoServiceInstance.aprovarPedido(req.params.id) as Result<IPedidoDTO>;
        
      if (pedidoOrError.isFailure) {
        return res.status(404).send("Erro: " + pedidoOrError.errorValue());
      }

      const pedidoDTO = pedidoOrError.getValue();
      return res.json( pedidoDTO ).status(200);
    }
    catch (e) {
      return next(e);
    }
  };

  public async recusarPedido(req: Request, res: Response, next: NextFunction){
    try {
      console.log(req.body);
      const pedidoOrError = await this.pedidoServiceInstance.recusarPedido(req.params.id) as Result<IPedidoDTO>;
        
      if (pedidoOrError.isFailure) {
        return res.status(404).send("Erro: " + pedidoOrError.errorValue());
      }

      const pedidoDTO = pedidoOrError.getValue();
      return res.json( pedidoDTO ).status(200);
    }
    catch (e) {
      return next(e);
    }
  };

  /*public async updatePedido(req: Request, res: Response, next: NextFunction) {
    try {
      const pedidoOrError = await this.pedidoServiceInstance.updatePedido(req.body as IPedidoDTO) as Result<IPedidoDTO>;

      if (pedidoOrError.isFailure) {
        return res.status(404).send();
      }

      const pedidoDTO = pedidoOrError.getValue();
      return res.status(201).json( pedidoDTO );
    }
    catch (e) {
      return next(e);
    }
  };*/

  public async getAllPedidos(req: Request, res: Response, next: NextFunction) {
    try {
      const pedidosOrError = await this.pedidoServiceInstance.getAllPedidos() as Result<IPedidoDTO[]>;

      if (pedidosOrError.isFailure) {
        return res.status(404).send("Erro: " + pedidosOrError.errorValue());
      }

      const pedidosDTO = pedidosOrError.getValue()
      return res.json(pedidosDTO).status(200);
    } catch (e) {
      return next(e);
    }
  };

  public async getAllPedidosPendentes(req: Request, res: Response, next: NextFunction) {
    try {
      const pedidosOrError = await this.pedidoServiceInstance.getAllPedidosPendentes() as Result<IPedidoDTO[]>;

      if (pedidosOrError.isFailure) {
        return res.status(404).send("Erro: " + pedidosOrError.errorValue());
      }

      const pedidosDTO = pedidosOrError.getValue()
      return res.json(pedidosDTO).status(200);
    } catch (e) {
      return next(e);
    }
  };

  public async getPedidoById(req: Request, res: Response, next: NextFunction) {
    try {
      const pedidosOrError = await this.pedidoServiceInstance.getPedidoById(req.params.id) as Result<IPedidoDTO>;

      if (pedidosOrError.isFailure) {
        return res.status(404).send("Erro: " + pedidosOrError.errorValue());
      }

      const pedidosDTO = pedidosOrError.getValue()
      return res.json(pedidosDTO).status(200);
    } catch (e) {
      return next(e);
    }
  };
}