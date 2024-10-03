/*import { Router} from 'express';
import { Container } from 'typedi';

import AuthService from '../../services/userService';
import  IUserDTO from '../../dto/IUserDTO';

import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import config from "../../../config";
import IUserController from '../../controllers/IControllers/IUserController';


//var user_controller = require('../../controllers/userController');

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  const ctrl = Container.get(config.controllers.user.name) as IUserController;

  route.post('/criarUser',
    celebrate({
      body: Joi.object({
        name: Joi.string(),
        email: Joi.string(),
        phoneNumber: Joi.string(),
        password: Joi.string(),
        roleId: Joi.number()
      })
    }),
    (req, res, next) => ctrl.criarUser(req, res, next));

    route.post('/criarUtente',
    celebrate({
      body: Joi.object({
        name: Joi.string(),
        email: Joi.string(),
        phoneNumber: Joi.string(),
        nif: Joi.string(),
        password: Joi.string(),
        roleId: Joi.number()
      })
    }),
    (req, res, next) => ctrl.criarUtente(req, res, next));


  // Verificar importante para adaptar

  /*route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body )

      try {
        const authServiceInstance = Container.get(AuthService);
        const userOrError = await authServiceInstance.SignUp(req.body as IUserDTO);

        if (userOrError.isFailure) {
          logger.debug(userOrError.errorValue())
          return res.status(401).send(userOrError.errorValue());
        }
    
        const {userDTO, token} = userOrError.getValue();

        return res.status(201).json({ userDTO, token });
      } catch (e) {
        //logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-In endpoint with body: %o', req.body)
      try {
        const { email, password } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const result = await authServiceInstance.SignIn(email, password);
        
        if( result.isFailure )
          return res.json().status(403);

        const { userDTO, token } = result.getValue();
        return res.json({ userDTO, token }).status(200);

      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
/*route.post('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger') as winston.Logger;
  logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
  try {
    //@TODO AuthService.Logout(req.user) do some clever stuff
    return res.status(200).end();
  } catch (e) {
    logger.error('🔥 error %o', e);
    return next(e);
  }
});

app.use('/users', route);

route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, user_controller.getMe);
*/
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';


import config from "../../../config";
import IUserController from '../../controllers/IControllers/IUserController';
var authorize = require ("../middlewares/validateToken")


const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  const ctrl = Container.get(config.controllers.user.name) as IUserController;

  route.post('/criarUser', authorize('GestorUtilizadores'),
    celebrate({
      body: Joi.object({
        name: Joi.string(),
        email: Joi.string(),
        phoneNumber: Joi.string(),
        password: Joi.string(),
        roleId: Joi.number()
      })
    }),
    (req, res, next) => ctrl.criarUser(req, res, next));

  route.post('/criarUtente',
    celebrate({
      body: Joi.object({
        name: Joi.string(),
        email: Joi.string(),
        phoneNumber: Joi.string(),
        nif: Joi.string(),
        password: Joi.string(),
        roleId: Joi.number()
      })
    }),
    (req, res, next) => ctrl.criarUtente(req, res, next));

  route.put('/updateUser', authorize('Utente'),
    celebrate({
      body: Joi.object({
        name: Joi.string(),
        phoneNumber: Joi.string(),
        nif: Joi.string(),
        password: Joi.string()
      })
    }),
    (req, res, next) => ctrl.updateUser(req, res, next));

    route.get('/getAllUsers',
    celebrate({
      body: Joi.object({
      })
    }),
    (req, res, next) => ctrl.getAllUsers(req, res, next));

    route.get('/getUserByEmail', authorize('Utente'),
    celebrate({
      body: Joi.object({
      })
    }),
    (req, res, next) => ctrl.getUserByEmail(req, res, next));

    route.delete('/deleteUser', authorize('Utente'),
    celebrate({
      body: Joi.object({
      })
    }),
    (req, res, next) => ctrl.deleteUser(req, res, next));

    route.get('/login/:email/:password',
    celebrate({
      body: Joi.object({
      })
    }),
    (req, res, next) => ctrl.login(req, res, next));

    route.get('/getCurrentUserRole',
    celebrate({
      body: Joi.object({

      })
    }),
    (req, res, next) => ctrl.getCurrentUserRole(req, res, next));
};

