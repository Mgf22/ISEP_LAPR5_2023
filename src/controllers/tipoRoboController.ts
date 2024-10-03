import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ITipoRoboController from "./IControllers/ITipoRoboController";
import ITipoRoboService from '../services/IServices/ITipoRoboService';
import ITipoRoboDTO from '../dto/ITipoRoboDTO';

import { Result } from "../core/logic/Result";
import IDeleteTipoRoboDTO from '../dto/IDeleteTipoRoboDTO';

@Service()
export default class TipoRoboController implements ITipoRoboController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.tipoRobo.name) private tipoRoboServiceInstance : ITipoRoboService
  ) {}

  public async createTipoRobo(req: Request, res: Response, next: NextFunction) {
    try {
      const tipoRoboOrError = await this.tipoRoboServiceInstance.createTipoRobo(req.body as ITipoRoboDTO) as Result<ITipoRoboDTO>;
        
      if (tipoRoboOrError.isFailure) {
        return res.status(403).send("Erro: " + tipoRoboOrError.errorValue());
      }

      const tipoRoboDTO = tipoRoboOrError.getValue();
      return res.json( tipoRoboDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateTipoRobo(req: Request, res: Response, next: NextFunction) {
    try {
      const tipoRoboOrError = await this.tipoRoboServiceInstance.updateTipoRobo(req.body as ITipoRoboDTO) as Result<ITipoRoboDTO>;

      if (tipoRoboOrError.isFailure) {
        return res.status(404).send("Erro: " + tipoRoboOrError.errorValue());
      }

      const elevadorDTO = tipoRoboOrError.getValue();
      return res.status(201).json( elevadorDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async deleteTipoRobo(req: Request, res: Response, next: NextFunction){
    try{
      const tipoRoboOrError = await this.tipoRoboServiceInstance.deleteTipoRobo(req.body as IDeleteTipoRoboDTO) as Result<ITipoRoboDTO>;

      if(tipoRoboOrError.isFailure){
        return res.status(404).send('Erro:' + tipoRoboOrError.errorValue());
      }

      const tipoRoboDTO = tipoRoboOrError.getValue();
      return res.json(tipoRoboDTO).status(200);
    }catch(e){
      return next(e);
    }
  }

  public async listTipoRobo(req: Request, res: Response, next: NextFunction){
    try {
      const tipoRoboOrError = await this.tipoRoboServiceInstance.listTipoRobo() as Result<ITipoRoboDTO[]>;

      if (tipoRoboOrError.isFailure) {
        return res.status(404).send("Erro: " + tipoRoboOrError.errorValue());
      }

      const tipoRoboDTO = tipoRoboOrError.getValue();
      return res.json( tipoRoboDTO ).status(200);
    }
    catch (e) {
      return next(e);
    }
  }
}