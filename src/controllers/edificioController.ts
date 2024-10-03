import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IEdificioController from "./IControllers/IEdificioController";
import IEdificioService from '../services/IServices/IEdificioService';
import IEdificioDTO from '../dto/IEdificioDTO';

import { Result } from "../core/logic/Result";
import IDeleteEdificio from '../dto/IDeleteEdificio';
import IListMinMaxDTO from '../dto/IListMinMaxDTO';

@Service()
export default class EdificioController implements IEdificioController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.edificio.name) private edificioServiceInstance : IEdificioService
  ) {}

  public async createEdificio(req: Request, res: Response, next: NextFunction) {
    try {
      const a = req.body as IEdificioDTO;
      const edificioOrError = await this.edificioServiceInstance.createEdificio(req.body as IEdificioDTO) as Result<IEdificioDTO>;
        
      if (edificioOrError.isFailure) {
        return res.status(403).send("Erro: " + edificioOrError.errorValue());
      }

      const edificioDTO = edificioOrError.getValue();
      return res.json( edificioDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateEdificio(req: Request, res: Response, next: NextFunction) {
    try {
      const edificioOrError = await this.edificioServiceInstance.updateEdificio(req.body as IEdificioDTO) as Result<IEdificioDTO>;

      if (edificioOrError.isFailure) {
        return res.status(404).send("Erro: " + edificioOrError.errorValue());
      }

      const edificioDTO = edificioOrError.getValue();
      return res.json( edificioDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async listEdificios(req: Request, res: Response, next: NextFunction){
    try {
      const edificioOrError = await this.edificioServiceInstance.listEdificios() as Result<IEdificioDTO[]>;

      if (edificioOrError.isFailure) {
        return res.status(404).send("Erro: " + edificioOrError.errorValue());
      }

      const edificioDTO = edificioOrError.getValue();
      return res.json( edificioDTO ).status(200);
    }
    catch (e) {
      return next(e);
    }
  }
  public async deleteEdificio(req: Request, res: Response, next: NextFunction){
    try {
      const edificioOrError = await this.edificioServiceInstance.deleteEdificio(req.body as IDeleteEdificio) as Result<IEdificioDTO>;

      if (edificioOrError.isFailure) {
        return res.status(404).send("Erro: " + edificioOrError.errorValue());
      }

      const edificiosDTO = edificioOrError.getValue();
      return res.json( edificiosDTO ).status(200);
    }
    catch (e) {
      return next(e);
    }
  };

  public async listMinMax(req: Request, res: Response, next: NextFunction){
    const min = Number(req.params.min);
    const max = Number(req.params.max);
    const minMaxDTO: IListMinMaxDTO = { min, max };
    try {
      const edificioOrError = await this.edificioServiceInstance.listMinMax(minMaxDTO) as Result<IEdificioDTO[]>;

      if (edificioOrError.isFailure) {
        return res.status(404).send("Erro: " + edificioOrError.errorValue());
      }

      const edificioDTO = edificioOrError.getValue();
      return res.json( edificioDTO ).status(200)
    }
    catch (e) {
      return next(e);
    }
  };

}