import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IMapaPisoService from '../services/IServices/IMapaPisoService';
import IMapaPisoController from './IControllers/IMapaPisoController';
import IMapaPisoDTO from '../dto/IMapaPisoDTO';
import IMazeDTO from '../dto/IMazeDTO';
import { Result } from '../core/logic/Result';
import IDeleteMapaPisoDTO from '../dto/IDeleteMapaPisoDTO';
import ICaminhoEntrePisosDTO from '../dto/ICaminhoEntrePisosDTO';
import ISolucaoCaminhoDTO from '../dto/ISolucaoCaminhoDTO'
import IListMapaPisoDTO from '../dto/IListMapaPisoDTO';
import IMapaJsonDTO from '../dto/IMapaJsonDTO';

@Service()
export default class MapaPisoController implements IMapaPisoController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.mapaPiso.name) private mapaPisoServiceInstance: IMapaPisoService
  ) { }


  public async createMapaPiso(req: Request, res: Response, next: NextFunction) {
    try {
      const mapaPisoOrError = await this.mapaPisoServiceInstance.createMapaPiso(req.body as IMapaPisoDTO) as Result<IMapaPisoDTO>;

      if (mapaPisoOrError.isFailure) {
        return res.status(403).send("Erro: " + mapaPisoOrError.errorValue());
      }

      const mapaPisoDTO = mapaPisoOrError.getValue();
      return res.json(mapaPisoDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  };


  public async loadMapaPiso(req: Request, res: Response, next: NextFunction) {
    try {
      const mapaPisoOrError = await this.mapaPisoServiceInstance.loadMapaPiso(req.body as IMapaPisoDTO) as Result<IMapaPisoDTO>;

      if (mapaPisoOrError.isFailure) {
        return res.status(404).send("Erro: " + mapaPisoOrError.errorValue());
      }

      const mapaPisoDTO = mapaPisoOrError.getValue();
      return res.json(mapaPisoDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async deleteMapaPiso(req: Request, res: Response, next: NextFunction) {
    try {
      const mapaPisoOrError = await this.mapaPisoServiceInstance.deleteMapaPiso(req.body as IDeleteMapaPisoDTO) as Result<IMapaPisoDTO>;

      if (mapaPisoOrError.isFailure) {
        return res.status(404).send('Erro:' + mapaPisoOrError.errorValue());
      }

      const mapaPisoDTO = mapaPisoOrError.getValue();
      return res.json(mapaPisoDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }


  public async listMapasPiso(req: Request, res: Response, next: NextFunction) {
    try {
      const mapaPisoOrError = await this.mapaPisoServiceInstance.listMapasPiso() as Result<IMazeDTO[]>;

      if (mapaPisoOrError.isFailure) {
        return res.status(404).send("Erro: " + mapaPisoOrError.errorValue());
      }

      const mapaPisoDTO = mapaPisoOrError.getValue();
      return res.json(mapaPisoDTO).status(200);
    }
    catch (e) {
      return next(e);
    }
  }

  public async caminhoEntrePisos(req: Request, res: Response, next: NextFunction) {
    const origem = String(req.params.origem);
    const destino = String(req.params.destino);

    const caminho: ICaminhoEntrePisosDTO = { origem, destino };
    try {
      //const caminhoEntrePisos = await this.mapaPisoServiceInstance.caminhoEntrePisos(req.body as ICaminhoEntrePisosDTO) as Result<ISolucaoCaminhoDTO>;
      const caminhoEntrePisos = await this.mapaPisoServiceInstance.caminhoEntrePisos(caminho) as Result<ISolucaoCaminhoDTO>;
      if (caminhoEntrePisos.isFailure) {
        return res.status(404).send('Erro:' + caminhoEntrePisos.errorValue());
      }

      const caminhoEntrePisosDTO = caminhoEntrePisos.getValue();
      return res.json(caminhoEntrePisosDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }

  public async listMapaPiso(req: Request, res: Response, next: NextFunction){
    const piso = req.params.piso;
    
    
    try {
      //const pisoOrError = await this.pisoServiceInstance.listPisos(req.body as IListPisosDTO) as Result<IPisoDTO[]>;

      const mapaPisoOrError = await this.mapaPisoServiceInstance.listMapaPiso({piso} as IListMapaPisoDTO) as Result<IMapaJsonDTO>;
      if (mapaPisoOrError.isFailure) {
        return res.status(404).send("Erro: " + mapaPisoOrError.errorValue());
      }

      const mapaPisoDTO = mapaPisoOrError.getValue();
      return res.json( mapaPisoDTO ).status(200);
    }
    catch (e) {
      return next(e);
    }
  };


}