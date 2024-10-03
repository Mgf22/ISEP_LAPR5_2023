import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPedidoController from '../../controllers/IControllers/IPedidoController';
var authorize = require ("../middlewares/validateToken")


import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/pedidos', route);

    const ctrl = Container.get(config.controllers.pedido.name) as IPedidoController;

    route.get('/getAllPedidos', authorize('GestorUtilizadores'),
        celebrate({
            body: Joi.object({
            })
        }),
        (req, res, next) => ctrl.getAllPedidos(req, res, next));

    route.get('/getAllPedidosPendentes', authorize('GestorUtilizadores'),
        celebrate({
            body: Joi.object({
            })
        }),
        (req, res, next) => ctrl.getAllPedidosPendentes(req, res, next));

    route.get('/getPedidoById/:id', authorize('GestorUtilizadores'),
        celebrate({
            body: Joi.object({
            })
        }),
        (req, res, next) => ctrl.getPedidoById(req, res, next));

    route.post('/criarPedido',
        celebrate({
            body: Joi.object({
                name: Joi.string(),
                email: Joi.string(),
                phoneNumber: Joi.string(),
                nif: Joi.string(),
                password: Joi.string()
            })
        }),
        (req, res, next) => ctrl.criarPedido(req, res, next));


    route.patch('/aprovarPedido/:id',
        celebrate({
            body: Joi.object({
            })
        }),
        (req, res, next) => ctrl.aprovarPedido(req, res, next));

    route.patch('/recusarPedido/:id',
        celebrate({
            body: Joi.object({
            })
        }),
        (req, res, next) => ctrl.recusarPedido(req, res, next));




    /*route.put('',
      celebrate({
        body: Joi.object({
          id: Joi.string().required(),
          name: Joi.string().required()
        }),
      }),
      (req, res, next) => ctrl.updateRole(req, res, next) );*/
};