import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import AprovacaoController from '../src/controllers/aprovacaoController';
import IAprovacaoService from '../src/services/IServices/IAprovacaoService';
import IAprovacaoDTO from '../src/dto/IAprovacaoDTO';
import { Tarefa } from '../src/domain/tarefa'
import { Aprovacao } from '../src/domain/aprovacao'
import IEstadoDTO from '../src/dto/IEstadoDTO';
import ISequenciaDTO from '../src/dto/ISequenciaDTO';

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

        // Aprovacao
        let aprovacaoSchemaInstance = require("../src/persistence/schemas/aprovacaoSchema").default;
        Container.set("aprovacaoSchema", aprovacaoSchemaInstance);

        let aprovacaoRepoClass = require("../src/repos/aprovacaoRepo").default;
        let aprovacaoRepoInstance = Container.get(aprovacaoRepoClass);
        Container.set("AprovacaoRepo", aprovacaoRepoInstance);

        let aprovacaoServiceClass = require("../src/services/aprovacaoService").default;
        let aprovacaoServiceInstance = Container.get(aprovacaoServiceClass);
        Container.set("AprovacaoService", aprovacaoServiceInstance);

    });

    afterEach(function () {
        sandbox.restore();
    });


    it('aprovacaoController for aprovar returns status 403 unsuccess case', async function () {
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

    it('aprovacaoController for rejeitar returns status 403 unsuccess case', async function () {
        let req: Partial<Request> = {};
        req.body = 'Erro: Tarefa não encontrada!'

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        const obj = sinon.stub(aprovacaoServiceInstace, "recusarRequisicao").resolves(Result.fail<IAprovacaoDTO>("Erro: Tarefa não encontrada!"));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.recusarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 403);
        sinon.assert.calledWith(obj, req.body);
    });

    it('aprovacaoController for aprovar returns status 200 success case', async function () {
        let req: Partial<Request> = {};
        req.body = {
            "estado": "aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1",
        };

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        let dto = req.body as IAprovacaoDTO;

        const obj = sinon.stub(aprovacaoServiceInstace, "aceitarRequisicao").resolves(Result.ok<IAprovacaoDTO>(dto));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.aceitarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(obj);
        sinon.assert.calledWith(obj, sinon.match(req.body));
    });

    it('aprovacaoController for rejeitar returns status 200 success case', async function () {
        let req: Partial<Request> = {};
        req.body = {
            "estado": "não aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1",
        };

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        let dto = req.body as IAprovacaoDTO;

        const obj = sinon.stub(aprovacaoServiceInstace, "recusarRequisicao").resolves(Result.ok<IAprovacaoDTO>(dto));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.recusarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(obj);
        sinon.assert.calledWith(obj, sinon.match(req.body));
    });

    it('aceitarRequisicao: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, unsuccess case tarefa already answered', async function () {
        // Arrange
        let body = {
            "estado": "aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1"
        };

        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy(),
            status: sinon.spy() // Spy on the status method
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");
        let tarefaRepoInstance = Container.get("TarefaRepo");

        const tarefa = Tarefa.create({
            "designacaoTarefa": "T2",
            "tipoTarefa": "pick up and delivery",
            "pontoInicial": "B203T",
            "pontoTermino": "C101T"
        }).getValue();

        const b = {
            estado: "aceite",
            requisitante: "João Dias",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        };

        const aprovacao = Aprovacao.create(b).getValue();

        sinon.stub(tarefaRepoInstance, "findByDesignacao").resolves(tarefa);

        sinon.stub(aprovacaoRepoInstance, "findByTarefaName").resolves(aprovacao);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "aceitarRequisicao");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.aceitarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        //sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 403);
    });

    it('aceitarRequisicao: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, unsuccess case tarefa doesnt exist', async function () {
        // Arrange
        let body = {
            "estado": "aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1"
        };

        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");
        let tarefaRepoInstance = Container.get("TarefaRepo");

        const tarefa = Tarefa.create({
            "designacaoTarefa": "T3",
            "tipoTarefa": "pick up and delivery",
            "pontoInicial": "B203T",
            "pontoTermino": "C101T"
        }).getValue();

        const b = {
            estado: "aceite",
            requisitante: "João Dias",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        };

        sinon.stub(tarefaRepoInstance, "findByDesignacao").resolves(null);
        sinon.stub(aprovacaoRepoInstance, "findByTarefaName").resolves(null);
        sinon.stub(aprovacaoRepoInstance, "save").resolves(null);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "aceitarRequisicao");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.aceitarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        //sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
		sinon.assert.calledOnce(aprovacaoServiceSpy);
		//sinon.assert.calledWith(aprovacaoServiceSpy, sinon.match({ name: req.body.name }));
    });


    it('aprovarRequisicao: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, success', async function () {
        // Arrange
        let body = {
            "estado": "aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1",
        };

        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");
        let tarefaRepoInstance = Container.get("TarefaRepo");

        const tarefa = Tarefa.create({
            "designacaoTarefa": "T1",
            "tipoTarefa": "pick up and delivery",
            "pontoInicial": "B203T",
            "pontoTermino": "C101T"
        }).getValue();

        const aprovacao = Aprovacao.create({
            estado: "",
            requisitante: "João Dias",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        }).getValue();

        sinon.stub(tarefaRepoInstance, "findByDesignacao").resolves(tarefa);

        sinon.stub(aprovacaoRepoInstance, "findByTarefaName").resolves(aprovacao);

        // Não interessa o que retorna o null, o serviço não dá uso e desta forma é possível assegurar que funciona corretamente.
        sinon.stub(aprovacaoRepoInstance, "save").resolves(aprovacao);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "aceitarRequisicao");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.aceitarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            "estado": "aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1",
        }));
        sinon.assert.calledOnce(aprovacaoServiceSpy);
        //sinon.assert.calledTwice(roleServiceSpy);
        sinon.assert.calledWith(aprovacaoServiceSpy, sinon.match({ name: req.body.name }));
    });

    it('recusarRequisicao: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, success', async function () {
        // Arrange
        let body = {
            "estado": "não aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1"
        };

        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");
        let tarefaRepoInstance = Container.get("TarefaRepo");

        const tarefa = Tarefa.create({
            "designacaoTarefa": "T1",
            "tipoTarefa": "pick up and delivery",
            "pontoInicial": "B203T",
            "pontoTermino": "C101T"
        }).getValue();

        const b = {
            estado: "",
            requisitante: "João Dias",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        };

        const aprovacao = Aprovacao.create(b).getValue();

        sinon.stub(tarefaRepoInstance, "findByDesignacao").resolves(tarefa);

        sinon.stub(aprovacaoRepoInstance, "findByTarefaName").resolves(aprovacao);

        // Não interessa o que retorna o null, o serviço não dá uso e desta forma é possível assegurar que funciona corretamente.
        sinon.stub(aprovacaoRepoInstance, "save").resolves(aprovacao);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "recusarRequisicao");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.recusarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            "estado": "não aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1"
        }));
        sinon.assert.calledOnce(aprovacaoServiceSpy);
        //sinon.assert.calledTwice(roleServiceSpy);
        sinon.assert.calledWith(aprovacaoServiceSpy, sinon.match({ name: req.body.name }));
    });

    it('aprovacaoController for listar tarefas por estado returns status 200 success case', async function () {
        let req: Partial<Request> = {};
        req.query = {
            "estado": "pendente",
        };

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        let dto = req.body as IEstadoDTO;

        const response = {
            "tipoDispositivo" : "Polivalente",
            "requisitante" : "exemplo@isep.ipp.pt",
            "estado" : "pendente",
            "tarefa" : "Entrega de canetas"
        }

        const obj = sinon.stub(aprovacaoServiceInstace, "listarPorEstado").resolves(Result.ok<IAprovacaoDTO[]>([response] as IAprovacaoDTO[]));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.listarPorEstado(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(obj);
    });

    it('aprovacaoController for listar tarefas aprovadas por estado returns status 404 unsuccess case', async function () {
        let req: Partial<Request> = {};
        req.query = {
            "estado": "pendente",
        };

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        const response = {
            "tipoDispositivo" : "Polivalente",
            "requisitante" : "exemplo@isep.ipp.pt",
            "estado" : "pendente",
            "tarefa" : "Entrega de canetas"
        }

        const obj = sinon.stub(aprovacaoServiceInstace, "listarPorEstado").resolves(Result.fail<IAprovacaoDTO[]>("Não existem tarefas com o tipo de dispositivo"));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.listarPorEstado(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 404);
        sinon.assert.calledWith(obj, req.query);
        
    });

    it('listarPorEstado: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, success', async function () {
        // Arrange
        let query = {
            "estado": "pendente",
        };

        let req: Partial<Request> = {};
        req.query = query;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");

        const tarefa = Tarefa.create({
            "designacaoTarefa": "T1",
            "tipoTarefa": "pick up & delivery",
            "pontoInicial": "B203T",
            "pontoTermino": "C101T"
        }).getValue();

        const b = {
            estado: "pendente",
            requisitante: "exemplo@isep.ipp.pt",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        };

        const aprovacao = Aprovacao.create(b).getValue();

        sinon.stub(aprovacaoRepoInstance, "listarPorEstado").resolves([aprovacao]);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "listarPorEstado");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.listarPorEstado(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match([{
            estado: "pendente",
            tipoDispositivo: "Polivalente",
            tarefa: "T1",
            requisitante: "exemplo@isep.ipp.pt",
        }]));
        //sinon.assert.calledOnce(aprovacaoServiceSpy);
        //sinon.assert.calledTwice(roleServiceSpy);
        //sinon.assert.calledWith(aprovacaoServiceSpy, sinon.match(req.query.name));
    });

    it('listarPorEstado: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, unsuccess case there is nothing to list', async function () {
        // Arrange
        let query = {
            "estado": "pendente",
        };

        let req: Partial<Request> = {};
        req.query = query;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");

        const tarefa = Tarefa.create({
            "designacaoTarefa": "T1",
            "tipoTarefa": "pick up & delivery",
            "pontoInicial": "B203T",
            "pontoTermino": "C101T"
        }).getValue();

        const b = {
            estado: "pendente",
            requisitante: "exemplo@isep.ipp.pt",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        };

        const aprovacao = Aprovacao.create(b).getValue();

        sinon.stub(aprovacaoRepoInstance, "listarPorEstado").resolves(null);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "listarPorEstado");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.listarPorEstado(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledOnce(aprovacaoServiceSpy);
    });


    /********************************************************************
     * /********************************************************************
     * Listagem por tipo de dispositivo
     * /********************************************************************
     /*********************************************************************/

    it('aprovacaoController for listar tarefas por tipo de dispositivo returns status 200 success case', async function () {
        let req: Partial<Request> = {};
        req.query = {
            "tipoDispositivo": "Polivalente",
        };

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        let dto = req.body as IEstadoDTO;

        const response = {
            "tipoDispositivo" : "Polivalente",
            "requisitante" : "exemplo@isep.ipp.pt",
            "estado" : "pendente",
            "tarefa" : "Entrega de canetas"
        }

        const obj = sinon.stub(aprovacaoServiceInstace, "listarPorTipoDispositivo").resolves(Result.ok<IAprovacaoDTO[]>([response] as IAprovacaoDTO[]));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.listarPorTipoDispositivo(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(obj);
    });

    it('aprovacaoController for listar tarefas por tipo de dispositivo returns status 404 unsuccess case', async function () {
        let req: Partial<Request> = {};
        req.query = {
            "tipoDispositivo": "Polivalente",
        };

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        const obj = sinon.stub(aprovacaoServiceInstace, "listarPorTipoDispositivo").resolves(Result.fail<IAprovacaoDTO[]>("Não existem tarefas com o tipo de dispositivo"));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.listarPorTipoDispositivo(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 404);
        sinon.assert.calledWith(obj, req.query);
        
    });

    it('listarPorTipoDispositivo: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, success', async function () {
        // Arrange
        let query = {
            "tipoDispositivo": "Polivalente",
        };

        let req: Partial<Request> = {};
        req.query = query;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");

        const tarefa = Tarefa.create({
            "designacaoTarefa": "T1",
            "tipoTarefa": "pick up & delivery",
            "pontoInicial": "B203T",
            "pontoTermino": "C101T"
        }).getValue();

        const b = {
            estado: "pendente",
            requisitante: "exemplo@isep.ipp.pt",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        };

        const aprovacao = Aprovacao.create(b).getValue();

        sinon.stub(aprovacaoRepoInstance, "listarPorTipoDispositivo").resolves([aprovacao]);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "listarPorTipoDispositivo");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.listarPorTipoDispositivo(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match([{
            estado: "pendente",
            tipoDispositivo: "Polivalente",
            tarefa: "T1",
            requisitante: "exemplo@isep.ipp.pt",
        }]));
    });

    it('listarPorTipoDispositivo: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, unsuccess case there is nothing to list', async function () {
        // Arrange
        let query = {
            "estado": "pendente",
        };

        let req: Partial<Request> = {};
        req.query = query;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");

        const tarefa = Tarefa.create({
            "designacaoTarefa": "T1",
            "tipoTarefa": "pick up & delivery",
            "pontoInicial": "B203T",
            "pontoTermino": "C101T"
        }).getValue();

        const b = {
            estado: "pendente",
            requisitante: "exemplo@isep.ipp.pt",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        };

        const aprovacao = Aprovacao.create(b).getValue();

        sinon.stub(aprovacaoRepoInstance, "listarPorTipoDispositivo").resolves(null);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "listarPorTipoDispositivo");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.listarPorTipoDispositivo(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledOnce(aprovacaoServiceSpy);
    });

    /********************************************************************
     * /********************************************************************
     * Listagem por utente
     * /********************************************************************
     /*********************************************************************/

     it('aprovacaoController for listar tarefas por utente returns status 200 success case', async function () {
        let req: Partial<Request> = {};
        req.query = {
            "utente": "exemplo@isep.ipp.pt",
        };

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        const response = {
            "tipoDispositivo" : "Polivalente",
            "requisitante" : "exemplo@isep.ipp.pt",
            "estado" : "pendente",
            "tarefa" : "Entrega de canetas"
        }

        const obj = sinon.stub(aprovacaoServiceInstace, "listarPorUtente").resolves(Result.ok<IAprovacaoDTO[]>([response] as IAprovacaoDTO[]));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.listarPorUtente(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(obj);
    });

    it('aprovacaoController for listar tarefas por utente returns status 404 unsuccess case', async function () {
        let req: Partial<Request> = {};
        req.query = {
            "utente": "exemplo@isep.ipp.pt",
        };

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        const obj = sinon.stub(aprovacaoServiceInstace, "listarPorUtente").resolves(Result.fail<IAprovacaoDTO[]>("Não existem tarefas com o tipo de dispositivo"));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.listarPorUtente(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 404);
        sinon.assert.calledWith(obj, req.query);
        
    });

    it('listarPorUtente: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, success', async function () {
        // Arrange
        let query = {
            "utente": "exemplo@isep.ipp.pt",
        };

        let req: Partial<Request> = {};
        req.query = query;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");

        const tarefa = Tarefa.create({
            "designacaoTarefa": "T1",
            "tipoTarefa": "pick up & delivery",
            "pontoInicial": "B203T",
            "pontoTermino": "C101T"
        }).getValue();

        const b = {
            estado: "pendente",
            requisitante: "exemplo@isep.ipp.pt",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        };

        const aprovacao = Aprovacao.create(b).getValue();

        sinon.stub(aprovacaoRepoInstance, "listarPorUtente").resolves([aprovacao]);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "listarPorUtente");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.listarPorUtente(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match([{
            estado: "pendente",
            tipoDispositivo: "Polivalente",
            tarefa: "T1",
            requisitante: "exemplo@isep.ipp.pt",
        }]));
    });

    it('listarPorUtente: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, unsuccess case there is nothing to list', async function () {
        // Arrange
        let query = {
            "utente": "exemplo@isep.ipp.pt",
        };

        let req: Partial<Request> = {};
        req.query = query;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");

        sinon.stub(aprovacaoRepoInstance, "listarPorUtente").resolves(null);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "listarPorUtente");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.listarPorUtente(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledOnce(aprovacaoServiceSpy);
    });


    /********************************************************************
     * /********************************************************************
     * Sequência de tarefas aprovadas.
     * /********************************************************************
     /*********************************************************************/


     it('aprovacaoController for sequencia tarefas aprovadas returns status 404 unsuccess case', async function () {
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        const obj = sinon.stub(aprovacaoServiceInstace, "sequenciaTarefasAprovadas").resolves(Result.fail<IAprovacaoDTO>("Erro: Tarefa não encontrada!"));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.sequenciaTarefasAprovadas(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 404);
    });


    it('aprovacaoController for sequencia tarefas aprovadas returns status 200 success case', async function () {
        let req: Partial<Request> = {};
        req.body = {

        };

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        let dto = {
            plano: ["T1", "T3", "T2"],
            tempo: 100,
            caminhoPorPiso: [[10, 11, 12], [23, 13]],
            caminhoEntrePisos: [["B1", "elev", "B3"]]
        } as ISequenciaDTO;

        const obj = sinon.stub(aprovacaoServiceInstace, "sequenciaTarefasAprovadas").resolves(Result.ok<ISequenciaDTO>(dto));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.sequenciaTarefasAprovadas(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(obj);
    });

    /********************************************************************************
     ********************************************************************************
     ********************************************************************************
     *************************** Teste ao requisito 470. ****************************
     ********************************************************************************
     ********************************************************************************
     ********************************************************************************/

     it('aprovacaoController for aprovar returns status 403 unsuccess case', async function () {
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

    it('aprovacaoController for rejeitar returns status 403 unsuccess case', async function () {
        let req: Partial<Request> = {};
        req.body = 'Erro: Tarefa não encontrada!'

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        const obj = sinon.stub(aprovacaoServiceInstace, "recusarRequisicao").resolves(Result.fail<IAprovacaoDTO>("Erro: Tarefa não encontrada!"));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.recusarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 403);
        sinon.assert.calledWith(obj, req.body);
    });

    it('aprovacaoController for aprovar returns status 200 success case', async function () {
        let req: Partial<Request> = {};
        req.body = {
            "estado": "aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1",
        };

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        let dto = req.body as IAprovacaoDTO;

        const obj = sinon.stub(aprovacaoServiceInstace, "aceitarRequisicao").resolves(Result.ok<IAprovacaoDTO>(dto));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.aceitarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(obj);
        sinon.assert.calledWith(obj, sinon.match(req.body));
    });

    it('aprovacaoController for rejeitar returns status 200 success case', async function () {
        let req: Partial<Request> = {};
        req.body = {
            "estado": "não aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1",
        };

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        let dto = req.body as IAprovacaoDTO;

        const obj = sinon.stub(aprovacaoServiceInstace, "recusarRequisicao").resolves(Result.ok<IAprovacaoDTO>(dto));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.recusarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(obj);
        sinon.assert.calledWith(obj, sinon.match(req.body));
    });

    it('aceitarRequisicao: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, unsuccess case tarefa already answered', async function () {
        // Arrange
        let body = {
            "estado": "aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1"
        };

        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");
        let tarefaRepoInstance = Container.get("TarefaRepo");

        const tarefa = Tarefa.create({
            "designacaoTarefa": "T2",
            "tipoTarefa": "pick up and delivery",
            "pontoInicial": "B203T",
            "pontoTermino": "C101T"
        }).getValue();

        const b = {
            estado: "aceite",
            requisitante: "João Dias",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        };

        const aprovacao = Aprovacao.create(b).getValue();

        sinon.stub(tarefaRepoInstance, "findByDesignacao").resolves(tarefa);

        sinon.stub(aprovacaoRepoInstance, "findByTarefaName").resolves(aprovacao);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "aceitarRequisicao");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.aceitarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 403);
    });

    it('aceitarRequisicao: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, unsuccess case tarefa doesnt exist', async function () {
        // Arrange
        let body = {
            "estado": "aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1"
        };

        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");
        let tarefaRepoInstance = Container.get("TarefaRepo");

        const tarefa = Tarefa.create({
            "designacaoTarefa": "T3",
            "tipoTarefa": "pick up and delivery",
            "pontoInicial": "B203T",
            "pontoTermino": "C101T"
        }).getValue();

        const b = {
            estado: "aceite",
            requisitante: "João Dias",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        };

        sinon.stub(tarefaRepoInstance, "findByDesignacao").resolves(null);
        sinon.stub(aprovacaoRepoInstance, "findByTarefaName").resolves(null);
        sinon.stub(aprovacaoRepoInstance, "save").resolves(null);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "aceitarRequisicao");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.aceitarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        //sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 403);
        sinon.assert.calledOnce(aprovacaoServiceSpy);
        //sinon.assert.calledWith(aprovacaoServiceSpy, sinon.match({ name: req.body.name }));
    });


    it('aprovarRequisicao: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, success', async function () {
        // Arrange
        let body = {
            "estado": "aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1",
        };

        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");
        let tarefaRepoInstance = Container.get("TarefaRepo");

        const tarefa = Tarefa.create({
            "designacaoTarefa": "T1",
            "tipoTarefa": "pick up and delivery",
            "pontoInicial": "B203T",
            "pontoTermino": "C101T"
        }).getValue();

        const aprovacao = Aprovacao.create({
            estado: "",
            requisitante: "João Dias",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        }).getValue();

        sinon.stub(tarefaRepoInstance, "findByDesignacao").resolves(tarefa);

        sinon.stub(aprovacaoRepoInstance, "findByTarefaName").resolves(aprovacao);

        // Não interessa o que retorna o null, o serviço não dá uso e desta forma é possível assegurar que funciona corretamente.
        sinon.stub(aprovacaoRepoInstance, "save").resolves(aprovacao);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "aceitarRequisicao");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.aceitarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            "estado": "aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1",
        }));
        sinon.assert.calledOnce(aprovacaoServiceSpy);
        //sinon.assert.calledTwice(roleServiceSpy);
        sinon.assert.calledWith(aprovacaoServiceSpy, sinon.match({ name: req.body.name }));
    });

    it('recusarRequisicao: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, success', async function () {
        // Arrange
        let body = {
            "estado": "não aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1"
        };

        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");
        let tarefaRepoInstance = Container.get("TarefaRepo");

        const tarefa = Tarefa.create({
            "designacaoTarefa": "T1",
            "tipoTarefa": "pick up and delivery",
            "pontoInicial": "B203T",
            "pontoTermino": "C101T"
        }).getValue();

        const b = {
            estado: "",
            requisitante: "João Dias",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        };

        const aprovacao = Aprovacao.create(b).getValue();

        sinon.stub(tarefaRepoInstance, "findByDesignacao").resolves(tarefa);

        sinon.stub(aprovacaoRepoInstance, "findByTarefaName").resolves(aprovacao);

        // Não interessa o que retorna o null, o serviço não dá uso e desta forma é possível assegurar que funciona corretamente.
        sinon.stub(aprovacaoRepoInstance, "save").resolves(aprovacao);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "recusarRequisicao");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.recusarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            "estado": "não aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1"
        }));
        sinon.assert.calledOnce(aprovacaoServiceSpy);
        //sinon.assert.calledTwice(roleServiceSpy);
        sinon.assert.calledWith(aprovacaoServiceSpy, sinon.match({ name: req.body.name }));
    });

    /********************************************************************************
     ********************************************************************************
     ********************************************************************************
     *************************** Teste ao requisito 480. ****************************
     ********************************************************************************
     ********************************************************************************
     ********************************************************************************/
    

    it('listarRequisicoesNaoAprovadas: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, success', async function () {
        // Arrange
        let body = {
        };

        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");
        let tarefaRepoInstance = Container.get("TarefaRepo");

        const tarefa = Tarefa.create({
            "designacaoTarefa": "T1",
            "tipoTarefa": "pick up and delivery",
            "pontoInicial": "B203T",
            "pontoTermino": "C101T"
        }).getValue();

        const aprovacao = Aprovacao.create({
            estado: "pendente",
            requisitante: "João Dias",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        }).getValue();

        const tarefa2 = Tarefa.create({
            "designacaoTarefa": "T2",
            "tipoTarefa": "pick up and delivery",
            "pontoInicial": "C103T",
            "pontoTermino": "C105T"
        }).getValue();

        const aprovacao2 = Aprovacao.create({
            estado: "pendente",
            requisitante: "Geremias da Silva",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        }).getValue();

        let aprovacoes : Aprovacao[] = [aprovacao, aprovacao2];

        sinon.stub(aprovacaoRepoInstance, "listarRequisicoesNaoAprovadas").resolves(aprovacoes);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "listarRequisicoesNaoAprovadas");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.listarTarefasNaoAprovadas(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match([sinon.match({
            "estado": "pendente",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1"
        }), sinon.match({
            "estado" : "pendente",
            "requisitante" : "Geremias da Silva",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T2"
        })]));
        sinon.assert.calledOnce(aprovacaoServiceSpy);
        //sinon.assert.calledTwice(roleServiceSpy);
        sinon.assert.calledWith(aprovacaoServiceSpy, sinon.match({ name: req.body.name }));
    });

});

