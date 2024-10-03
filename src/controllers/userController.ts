import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IUserController from "./IControllers/IUserController";
import IUserService from '../services/IServices/IUserService';
import IUserDTO from '../dto/IUserDTO';

import { Result } from "../core/logic/Result";
import ICreatingUserDTO from '../dto/ICreatingUserDTO';
import { Console } from 'console';
import IUpdateUserDTO from '../dto/IUpdateUserDTO';
var jwt = require('jsonwebtoken');

@Service()
export default class UserController implements IUserController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.user.name) private userServiceInstance: IUserService
  ) { }

  public async criarUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.criarUser(req.body as ICreatingUserDTO) as Result<IUserDTO>;

      if (userOrError.isFailure) {
        return res.status(403).send("Erro: " + userOrError.errorValue());
      }

      const userDTO = userOrError.getValue();
      return res.json(userDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async criarUtente(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.criarUtente(req.body as ICreatingUserDTO) as Result<IUserDTO>;

      if (userOrError.isFailure) {
        return res.status(403).send("Erro: " + userOrError.errorValue());
      }

      const userDTO = userOrError.getValue();
      return res.json(userDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const decodedToken = jwt.decode(token) as { [key: string]: any };
      const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      const userOrError = await this.userServiceInstance.updateUser(email, req.body as IUpdateUserDTO) as Result<IUserDTO>;
      
      if (userOrError.isFailure) {
        return res.status(404).send("Erro: " + userOrError.errorValue());
      }

      const userDTO = userOrError.getValue();
      return res.json(userDTO).status(200);
    }
    catch (e) {
      return next(e);
    }
  };

  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.getAllUsers() as Result<IUserDTO[]>;

      if (userOrError.isFailure) {
        return res.status(404).send("Erro: " + userOrError.errorValue());
      }

      const usersDTO = userOrError.getValue()
      return res.json(usersDTO).status(200);
    } catch (e) {
      return next(e);
    }
  };

  public async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const decodedToken = jwt.decode(token) as { [key: string]: any };
      const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      const usersOrError = await this.userServiceInstance.getUserByEmail(email) as Result<IUserDTO>;

      if (usersOrError.isFailure) {
        return res.status(404).send("Erro: " + usersOrError.errorValue());
      }

      const usersDTO = usersOrError.getValue()
      return res.json(usersDTO).status(200);
    } catch (e) {
      return next(e);
    }
  };

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const decodedToken = jwt.decode(token) as { [key: string]: any };
      const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      const usersOrError = await this.userServiceInstance.deleteUser(email) as Result<IUserDTO>;
      
      if (usersOrError.isFailure) {
        return res.status(404).send("Erro: " + usersOrError.errorValue());
      }

      const usersDTO = usersOrError.getValue()
      return res.json(usersDTO).status(200);
    } catch (e) {
      return next(e);
    }
  };

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const usersOrError = await this.userServiceInstance.login(req.params.email, req.params.password) as Result<IUserDTO>;

      if (usersOrError.isFailure) {
        return res.status(404).send("Erro: " + usersOrError.errorValue());
      }

      const usersDTO = usersOrError.getValue()
      return res.json(usersDTO).status(200);
    } catch (e) {
      return next(e);
    }
  };

  public async getCurrentUserRole(req: Request, res: Response, next: NextFunction){
    try{
      const token = req.headers.authorization?.split(' ')[1];
      const decodedToken = jwt.decode(token) as { [key: string]: any };
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return res.json({"role" : role}).status(200);
    }catch(e){
      return next(e);
    }
  }
  /*
  exports.getMe = async function(req, res: Response) {
    
      // NB: a arquitetura ONION não está a ser seguida aqui
  
      const userRepo = Container.get(config.repos.user.name) as IUserRepo
  
      if( !req.token || req.token == undefined )
          return res.json( new Error("Token inexistente ou inválido")).status(401);
  
      const user = await userRepo.findById( req.token.id );
      if (!user)
          return res.json( new Error("Utilizador não registado")).status(401);
  
      const userDTO = UserMap.toDTO( user ) as IUserDTO;
      return res.json( userDTO ).status(200);
  }
  */
}