import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRoboController from "./IControllers/IRoboController";
import IRoboService from '../services/IServices/IRoboService';
import IRoboDTO from '../dto/IRoboDTO';

import { Result } from "../core/logic/Result";
import IDeleteRoboDTO from '../dto/IDeleteRoboDTO';

@Service()
export default class RoboController implements IRoboController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.robo.name) private roboServiceInstance : IRoboService
  ) {}

  public async createRobo(req: Request, res: Response, next: NextFunction) {
    try {
      const roboOrError = await this.roboServiceInstance.createRobo(req.body as IRoboDTO) as Result<IRoboDTO>;
        
      if (roboOrError.isFailure) {
        return res.status(403).send("Erro: " + roboOrError.errorValue());
      }

      const roboDTO = roboOrError.getValue();
      return res.json( roboDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateRobo(req: Request, res: Response, next: NextFunction) {
    try {
      const roboOrError = await this.roboServiceInstance.updateRobo(req.body as IRoboDTO) as Result<IRoboDTO>;

      if (roboOrError.isFailure) {
        return res.status(404).send("Erro: " + roboOrError.errorValue());
      }

      const roboDTO = roboOrError.getValue();
      return res.status(201).json( roboDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async listRobos(req: Request, res: Response, next: NextFunction){
    try {
      const roboOrError = await this.roboServiceInstance.listRobos() as Result<IRoboDTO[]>;

      if (roboOrError.isFailure) {
        return res.status(404).send("Erro: " + roboOrError.errorValue());
      }

      const roboDTO = roboOrError.getValue();
      return res.json( roboDTO ).status(200);
    }
    catch (e) {
      return next(e);
    }
  }


  public async inhibitRobo(req: Request, res: Response, next: NextFunction) {
    try {
      const roboOrError = await this.roboServiceInstance.inhibitRobo(req.body as IRoboDTO) as Result<IRoboDTO>;

      if (roboOrError.isFailure) {
        return res.status(404).send("Erro: " + roboOrError.errorValue());
      }
      
      const roboDTO = roboOrError.getValue();
      return res.json(roboDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
    
  }

  public async deleteRobo(req: Request, res: Response, next: NextFunction){
    try{
      const roboOrError = await this.roboServiceInstance.deleteRobo(req.body as IDeleteRoboDTO) as Result<IRoboDTO>;

      if(roboOrError.isFailure){
        return res.status(404).send('Erro:' + roboOrError.errorValue());
      }

      const roboDTO = roboOrError.getValue();
      return res.json(roboDTO).status(200);
    }catch(e){
      return next(e);
    }
  }
}