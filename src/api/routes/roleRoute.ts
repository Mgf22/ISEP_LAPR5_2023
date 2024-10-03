import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRoleController from '../../controllers/IControllers/IRoleController';

import config from "../../../config";
var authorize = require ("../middlewares/validateToken")


const route = Router();

export default (app: Router) => {
  app.use('/roles', route);

  const ctrl = Container.get(config.controllers.role.name) as IRoleController;

  route.get('/getAllRoles',
    celebrate({
      body: Joi.object({
      })
    }),
    (req, res, next) => ctrl.getAllRoles(req, res, next));

  route.post('/criarRole', authorize('GestorUtilizadores'),
    celebrate({
      body: Joi.object({
        name: Joi.string(),
      })
    }),
    (req, res, next) => ctrl.criarRole(req, res, next));

    route.get('/getRoleById/:id',
    celebrate({
      body: Joi.object({
      })
    }),
    (req, res, next) => ctrl.getRoleById(req, res, next));

  /*route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.updateRole(req, res, next) );*/
};