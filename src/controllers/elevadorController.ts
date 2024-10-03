import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IElevadorController from "./IControllers/IElevadorController";
import IElevadorService from '../services/IServices/IElevadorService';
import IElevadorDTO from '../dto/IElevadorDTO';

import { Result } from "../core/logic/Result";
import IListElevadoresDTO from '../dto/IListElevadoresDTO';
import IDeleteElevador from '../dto/IDeleteElevador';

@Service()
export default class ElevadorController implements IElevadorController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.elevador.name) private elevadorServiceInstance : IElevadorService
  ) {}

  public async createElevador(req: Request, res: Response, next: NextFunction) {
    try {
      const elevadorOrError = await this.elevadorServiceInstance.createElevador(req.body as IElevadorDTO) as Result<IElevadorDTO>;
        
      if (elevadorOrError.isFailure) {
        return res.status(403).send("Erro: " + elevadorOrError.errorValue());
      }

      const elevadorDTO = elevadorOrError.getValue();
      return res.json( elevadorDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateElevador(req: Request, res: Response, next: NextFunction) {
    try {
      const elevadorOrError = await this.elevadorServiceInstance.updateElevador(req.body as IElevadorDTO) as Result<IElevadorDTO>;

      if (elevadorOrError.isFailure) {
        return res.status(404).send("Erro: " + elevadorOrError.errorValue());
      }

      const elevadorDTO = elevadorOrError.getValue();
      return res.json( elevadorDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async listElevadoresEdificio(req: Request, res: Response, next: NextFunction){
    const codigoEdificio = req.params.codigoEdificio;
    try {
      const elevadoresOrError = await this.elevadorServiceInstance.listElevadoresEdificio({codigoEdificio} as IListElevadoresDTO) as Result<IElevadorDTO[]>;

      if (elevadoresOrError.isFailure) {
        return res.status(404).send("Erro: " + elevadoresOrError.errorValue());
      }

      const elevadoresDTO = elevadoresOrError.getValue();
      return res.json( elevadoresDTO ).status(200);
    }
    catch (e) {
      return next(e);
    }
  };


  public async listElevadores(req: Request, res: Response, next: NextFunction){
    try {
      const elevadoresOrError = await this.elevadorServiceInstance.listElevadores() as Result<IElevadorDTO[]>;

      if (elevadoresOrError.isFailure) {
        return res.status(404).send("Erro: " + elevadoresOrError.errorValue());
      }

      const elevadoresDTO = elevadoresOrError.getValue();
      return res.json( elevadoresDTO ).status(200);
    }
    catch (e) {
      return next(e);
    }
  };

  public async deleteElevador(req: Request, res: Response, next: NextFunction){
    try {
      const elevadoresOrError = await this.elevadorServiceInstance.deleteElevador(req.body as IDeleteElevador) as Result<IElevadorDTO>;

      if (elevadoresOrError.isFailure) {
        return res.status(404).send("Erro: " + elevadoresOrError.errorValue());
      }

      const elevadoresDTO = elevadoresOrError.getValue();
      return res.json( elevadoresDTO ).status(200);
    }
    catch (e) {
      return next(e);
    }
  };
}