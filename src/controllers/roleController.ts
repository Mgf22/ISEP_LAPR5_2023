import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRoleController from "./IControllers/IRoleController";
import IRoleService from '../services/IServices/IRoleService';
import IRoleDTO from '../dto/IRoleDTO';

import { Result } from "../core/logic/Result";
import ICreatingRoleDTO from '../dto/ICreatingRoleDTO';
import { Console } from 'console';

@Service()
export default class RoleController implements IRoleController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.role.name) private roleServiceInstance: IRoleService
  ) { }

  public async criarRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleOrError = await this.roleServiceInstance.criarRole(req.body as ICreatingRoleDTO) as Result<IRoleDTO>;

      if (roleOrError.isFailure) {
        return res.status(403).send("Erro: " + roleOrError.errorValue());
      }

      const roleDTO = roleOrError.getValue();
      return res.json(roleDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  /*public async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleOrError = await this.roleServiceInstance.updateRole(req.body as IRoleDTO) as Result<IRoleDTO>;

      if (roleOrError.isFailure) {
        return res.status(404).send();
      }

      const roleDTO = roleOrError.getValue();
      return res.status(201).json( roleDTO );
    }
    catch (e) {
      return next(e);
    }
  };*/

  public async getAllRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const rolesOrError = await this.roleServiceInstance.getAllRoles() as Result<IRoleDTO[]>;

      if (rolesOrError.isFailure) {
        return res.status(404).send("Erro: " + rolesOrError.errorValue());
      }

      const rolesDTO = rolesOrError.getValue()
      return res.json(rolesDTO).status(200);
    } catch (e) {
      return next(e);
    }
  };

  public async getRoleById(req: Request, res: Response, next: NextFunction) {
    try {
      const rolesOrError = await this.roleServiceInstance.getRoleById(req.params.id) as Result<IRoleDTO>;

      if (rolesOrError.isFailure) {
        return res.status(404).send("Erro: " + rolesOrError.errorValue());
      }

      const rolesDTO = rolesOrError.getValue()
      return res.json(rolesDTO).status(200);
    } catch (e) {
      return next(e);
    }
  };
}