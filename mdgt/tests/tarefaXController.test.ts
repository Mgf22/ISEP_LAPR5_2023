import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import AprovacaoController from '../src/controllers/aprovacaoController';
import IAprovacaoService from '../src/services/IServices/IAprovacaoService';
import IAprovacaoDTO from '../src/dto/IAprovacaoDTO';

describe('aprovacao controller', function () {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {

        Container.reset();

        // Tarefa
        let tarefaSchemaInstance = require("../src/persistence/schemas/tarefaSchema").default;
        Container.set("tarefaSchema", tarefaSchemaInstance);

        let tarefaRepoClass = require("../src/repos/tarefaRepo").default;
        let tarefaRepoInstance = Container.get(tarefaRepoClass);
        Container.set("TarefaRepo", tarefaRepoInstance);

        let tarefaServiceClass = require("../src/services/tarefaService").default;
        let tarefaServiceInstance = Container.get(tarefaServiceClass);
        Container.set("TarefaService", tarefaServiceInstance);

        // Aprovacao
        let aprovacaoSchemaInstance = require("../src/persistence/schemas/aprovacaoSchema").default;
        Container.set("aprovacaoSchema", aprovacaoSchemaInstance);

        let aprovacaoRepoClass = require("../src/repos/aprovacaoRepo").default;
        let aprovacaoRepoInstance = Container.get(aprovacaoRepoClass);
        Container.set("AprovacaoRepo", aprovacaoRepoInstance);

        

    });

    afterEach(function () {
        sandbox.restore();
    });


    it('tarefaController for aprovar returns status 403 unsuccess case', async function () {
        let req: Partial<Request> = {};
        req.body = 'Erro: Tarefa não encontrada!'

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        const obj = sinon.stub(aprovacaoServiceInstace, "aceitarRequisicao").resolves(Result.fail<IAprovacaoDTO>("Erro: Tarefa não encontrada!"));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.aceitarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 403);
        sinon.assert.calledWith(obj, req.body);
    });

});


