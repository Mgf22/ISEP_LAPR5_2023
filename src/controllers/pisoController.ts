import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPisoController from "./IControllers/IPisoController";
import IPisoService from '../services/IServices/IPisoService';
import IPisoDTO from '../dto/IPisoDTO';

import { Result } from "../core/logic/Result";
import IListMinMaxDTO from '../dto/IListMinMaxDTO';
import IListPisosDTO from '../dto/IListPisosDTO';
import IEdificioDTO from '../dto/IEdificioDTO';
import IDeletePisoDTO from '../dto/IDeletePisoDTO'
import IListPisoByEdificioDTO from '../dto/IListPisoByEdificioDTO';

@Service()
export default class PisoController implements IPisoController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.piso.name) private pisoServiceInstance : IPisoService
  ) {}

  public async createPiso(req: Request, res: Response, next: NextFunction) {
    try {
      const pisoOrError = await this.pisoServiceInstance.createPiso(req.body as IPisoDTO) as Result<IPisoDTO>;
        
      if (pisoOrError.isFailure) {
        return res.status(403).send("Erro: " + pisoOrError.errorValue());
      }

      const pisoDTO = pisoOrError.getValue();
      return res.json( pisoDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updatePiso(req: Request, res: Response, next: NextFunction) {
    try {
      const pisoOrError = await this.pisoServiceInstance.updatePiso(req.body as IPisoDTO) as Result<IPisoDTO>;

      if (pisoOrError.isFailure) {
        return res.status(404).send("Erro: " + pisoOrError.errorValue());
      }

      const pisoDTO = pisoOrError.getValue();
      return res.json( pisoDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async listPisos(req: Request, res: Response, next: NextFunction){
    const codigoEdificio = req.params.codigoEdificio;
    
    
    try {
      //const pisoOrError = await this.pisoServiceInstance.listPisos(req.body as IListPisosDTO) as Result<IPisoDTO[]>;

      const pisoOrError = await this.pisoServiceInstance.listPisos({codigoEdificio} as IListPisosDTO) as Result<IPisoDTO[]>;
      if (pisoOrError.isFailure) {
        return res.status(404).send("Erro: " + pisoOrError.errorValue());
      }

      const pisoDTO = pisoOrError.getValue();
      return res.json( pisoDTO ).status(200);
    }
    catch (e) {
      return next(e);
    }
  };

  public async deletePiso(req: Request, res: Response, next: NextFunction){
    try{
      const pisoOrError = await this.pisoServiceInstance.deletePiso(req.body as IDeletePisoDTO) as Result<IPisoDTO>;

      if(pisoOrError.isFailure){
        return res.status(404).send('Erro:' + pisoOrError.errorValue());
      }

      const pisoDTO = pisoOrError.getValue();
      return res.json(pisoDTO).status(200);
    }catch(e){
      return next(e);
    }
  }

  public async listPisosGeral(req: Request, res: Response, next: NextFunction){
    try {
      const pisoOrError = await this.pisoServiceInstance.listPisosGeral() as Result<IListPisoByEdificioDTO[]>;

      if (pisoOrError.isFailure) {
        return res.status(404).send("Erro: " + pisoOrError.errorValue());
      }

      const pisoDTO = pisoOrError.getValue();
      return res.json( pisoDTO ).status(200);
    }
    catch (e) {
      return next(e);
    }
  };

  public async listPisosGeral2(req: Request, res: Response, next: NextFunction){
    try {
      const pisoOrError = await this.pisoServiceInstance.listPisosGeral2() as Result<IPisoDTO[]>;

      if (pisoOrError.isFailure) {
        return res.status(404).send("Erro: " + pisoOrError.errorValue());
      }

      const pisoDTO = pisoOrError.getValue();
      return res.json( pisoDTO ).status(200);
    }
    catch (e) {
      return next(e);
    }
  };

}