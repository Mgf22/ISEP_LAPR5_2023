import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IElevadorDTO from '../src/dto/IElevadorDTO';
import IEdificioDTO from '../src/dto/IEdificioDTO';
import IEdificioService from "../src/services/IServices/IEdificioService";
import EdificioController from "../src/controllers/edificioController";
import { Edificio } from '../src/domain/edificio';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Piso } from '../src/domain/piso';
import { Sala } from '../src/domain/sala';
import { CategoriaSala } from '../src/domain/categoriaSala';
import { Elevador } from '../src/domain/elevador';




describe('edificio controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function () {

		// Reset the container
		Container.reset();
		/*
		let mapaEdificioRepoClass = require("../src/repos/mapaEdificioRepo").default;
		let mapaEdificioRepoInstance = Container.get(mapaEdificioRepoClass);
		Container.set("MapaEdificioRepo", mapaEdificioRepoInstance);
		*/

		// EDIFICIO
		let edificioSchemaInstance = require("../src/persistence/schemas/edificioSchema").default;
		Container.set("edificioSchema", edificioSchemaInstance);

		let edificioRepoClass = require("../src/repos/edificioRepo").default;
		let edificioRepoInstance = Container.get(edificioRepoClass);
		Container.set("EdificioRepo", edificioRepoInstance);

		let edificioServiceClass = require("../src/services/edificioService").default;
		let edificioServiceInstance = Container.get(edificioServiceClass);
		Container.set("EdificioService", edificioServiceInstance);

	});


	afterEach(function () {
		sandbox.restore();
	});

	/*
	it('listElevadores de um edifício', async function () {
		let req: Partial<Request> = {};
		req.body = {
			"codigoEdificio": "B",
		};
		let res2: Partial<Response> = {};
		let response: IElevadorDTO[] = [
			{
				"id": "1234",
				"descricao": "Elevador super lento",
				"numeroSerie": "11111",
				"modelo": "Azal",
				"marca": "Otis",
				"pisosServidos": ["1", "2", "3"],
				"numeroIdentificativo": 100
			}
		];


		let res: Partial<Response> = {
			json: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let edificioServiceInstace = Container.get("EdificioService");

		const obj = sinon.stub(edificioServiceInstace, "listElevadores").resolves(Result.ok<IElevadorDTO[]>(response as IElevadorDTO[]));

		const ctrl = new EdificioController(edificioServiceInstace as IEdificioService);
		await ctrl.listElevadores(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(req.body));
		
	});
	*/

	
	it('createEdificio returns status 403 forbidden', async function () {
		let req: Partial<Request> = {};
		req.body = 'Já existe um edificio com o código 150'

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let edificioServiceInstance = Container.get("EdificioService");

		const obj = sinon.stub(edificioServiceInstance, "createEdificio").resolves(Result.fail<IEdificioDTO>(res as IEdificioDTO));


		const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);
		await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
		sinon.assert.calledWith(obj, "Já existe um edificio com o código 150");
	});




	it('createEdificio returns edificio json', async function () {
		let req: Partial<Request> = {};

		req.body = {
			"dimensaoMaximaPiso": [100, 100],
			"descricaoEdificio": "Edificio Acolhe Malucos",
			"nomeOpcionalEdificio": "Edificio Francisco",
			"codigoEdificio": "2324",
		};


		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let edificioServiceInstace = Container.get("EdificioService");

		const obj = sinon.stub(edificioServiceInstace, "createEdificio").returns(Result.ok<IEdificioDTO>(req.body as IEdificioDTO));

		const ctrl = new EdificioController(edificioServiceInstace as IEdificioService);
		await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(req.body));
	});


	it("updateEdificio returns status 404", async function () {
		let body = "Edificio não encontrado";

		let req: Partial<Request> = {};

		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let edificioServiceInstace = Container.get("EdificioService");

		const obj = sinon.stub(edificioServiceInstace, "updateEdificio").resolves(Result.fail<IEdificioDTO>("Edificio não encontrado"));

		const ctrl = new EdificioController(edificioServiceInstace as IEdificioService);
		await ctrl.updateEdificio(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledWith(obj, "Edificio não encontrado");

	});



	it("updateEdificio returns edificio json", async function () {
		let body = {
			"dimensaoMaximaPiso": [100, 100],
			"descricaoEdificio": "Edificio Acolhe Malucos",
			"nomeOpcionalEdificio": "Edificio Francisco",
			"codigoEdificio": "2324",
		};

		let req: Partial<Request> = {};

		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let edificioServiceInstace = Container.get("EdificioService");

		const obj = sinon.stub(edificioServiceInstace, "updateEdificio").returns(Result.ok<IEdificioDTO>(req.body as IEdificioDTO));

		const ctrl = new EdificioController(edificioServiceInstace as IEdificioService);
		await ctrl.updateEdificio(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match({
			"dimensaoMaximaPiso": [100, 100],
			"descricaoEdificio": "Edificio Acolhe Malucos",
			"nomeOpcionalEdificio": "Edificio Francisco",
			"codigoEdificio": "2324",
		}))
	});

	

	it('createEdificio: edificioController + edificioService integration test using spy on pisoService, success', async function () {
		// Arrange
		let body = {
			"dimensaoMaximaPiso" : [200,200],
			"descricaoEdificio" : "Edificio de Química",
			"nomeOpcionalEdificio" : "Edificio L",
			"codigoEdificio" : "L"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let edificioRepoInstance = Container.get("EdificioRepo");
		let edificioServiceInstance = Container.get("EdificioService");

		const e = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio de Química",
			"nomeOpcionalEdificio": "Edificio L",
			"codigoEdificio": CodigoEdificio.create("L").getValue(),
		}

		let dummyEdificio = Edificio.create(e).getValue();

		

		sinon.stub(edificioRepoInstance, "findByCodigo").resolves(null); // Não existe, logo retorna null.

		sinon.stub(edificioRepoInstance, "save").resolves(null);

		const edificioServiceSpy = sinon.spy(edificioServiceInstance, "createEdificio");

		const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

		// Act
		await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio de Química",
			"nomeOpcionalEdificio": "Edificio L",
			"codigoEdificio": "L"
		}));
		sinon.assert.calledOnce(edificioServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(edificioServiceSpy, sinon.match({ name: req.body.name }));
	});


	it('createEdificio: pisoController + pisoService integration test using spy on pisoService, unsuccess case, edificio code already in use', async function () {
		// Arrange
		let body = {
			"dimensaoMaximaPiso" : [200,200],
			"descricaoEdificio" : "Edificio de Química",
			"nomeOpcionalEdificio" : "Edificio L",
			"codigoEdificio" : "L"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let edificioRepoInstance = Container.get("EdificioRepo");

		const edificio = Edificio.create({
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio de Química",
			"nomeOpcionalEdificio": "Edificio L",
			"codigoEdificio": CodigoEdificio.create("L").getValue(),
		}).getValue();


		const edificio2 = Edificio.create({
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio de Limpezas",
			"nomeOpcionalEdificio": "Edificio L2",
			"codigoEdificio": CodigoEdificio.create("L").getValue(),
		}).getValue();



		sinon.stub(edificioRepoInstance, "findByCodigo").resolves(edificio);

		let edificioServiceInstance = Container.get("EdificioService");
		const edificioServiceSpy = sinon.spy(edificioServiceInstance, "createEdificio");

		const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

		// Act
		await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	});

	


	it('listEdificios: edificioController + edificioService integration test using spy on edificioService, success case', async function () {
        // Arrange
        let body = {
        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

		const edificio = Edificio.create({
			dimensaoMaximaPiso: [100,100],
			descricaoEdificio: "Edificio de Mecânica",
			nomeOpcionalEdificio: "Edificio G",
			codigoEdificio: CodigoEdificio.create("G").getValue()
		}).getValue();

		const edificio2 = Edificio.create({
			dimensaoMaximaPiso: [200,200],
			descricaoEdificio: "Edificio de Química",
			nomeOpcionalEdificio: "Edificio L",
			codigoEdificio: CodigoEdificio.create("L").getValue()
		}).getValue();

        let edificioRepoInstance = Container.get("EdificioRepo");

        sinon.stub(edificioRepoInstance, "findAll").resolves([edificio, edificio2]);

        let edificioServiceInstance = Container.get("EdificioService");
        const edificioServiceSpy = sinon.spy(edificioServiceInstance, "listEdificios");

        const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

        // Act
        await ctrl.listEdificios(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json);
    	sinon.assert.calledWith(res.json, 
        [
            {
                codigoEdificio: "G",
                descricaoEdificio: "Edificio de Mecânica",
                dimensaoMaximaPiso: [100, 100],
                id: sinon.match.string, // You don't need to match the specific ID
                nomeOpcionalEdificio: "Edificio G"
            },
            {
                codigoEdificio: "L",
                descricaoEdificio: "Edificio de Química",
                dimensaoMaximaPiso: [200, 200],
                id: sinon.match.string, // You don't need to match the specific ID
                nomeOpcionalEdificio: "Edificio L"
            }
        ]
    );
    	sinon.assert.calledOnce(edificioServiceSpy);
	});

	it('listEdificios: edificioController + edificioService integration test using spy on edificioService, unsuccess case no edifico created', async function () {
		// Arrange
		let body = {};
		let req: Partial<Request> = {};
		req.body = body;
	
		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };
	
		let edificioRepoInstance = Container.get("EdificioRepo");
		let edificioServiceInstance = Container.get("EdificioService");
	
		// Stub the findAll method to resolve with an empty array
		sinon.stub(edificioRepoInstance, "findAll").resolves(null);
	
		const edificioServiceSpy = sinon.spy(edificioServiceInstance, "listEdificios");
	
		const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);
	
		// Act
		await ctrl.listEdificios(<Request>req, <Response>res, <NextFunction>next);
	
		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledOnce(edificioServiceSpy); 
		//sinon.assert.calledWith(edificioServiceSpy, sinon.match({ name: req.body.name })); isto dá erro, pede que o listEdificios seja chamado com argumentos

	});
	it('updateEdificio: edificioController + edificioService integration test using spy on edificioService, success', async function () {
		// Arrange
		let body = {
			"codigoEdificio": "L",
			"descricaoEdificio": "Edificio de Culinária",
			"dimensaoMaximaPiso": [200, 200],
			"nomeOpcionalEdificio": "Edificio de Culinária",
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let edificioRepoInstance = Container.get("EdificioRepo");

		const m = {
			id: '12345',
			codigoEdificio: CodigoEdificio.create("L").getValue(),
			descricaoEdificio: "Edificio de Química",
			dimensaoMaximaPiso: [200, 200],
			nomeOpcionalEdificio: "Edificio L",
		};

		const n = {
			id: '12345',
			codigoEdificio: CodigoEdificio.create("L").getValue(),
			descricaoEdificio: "Edificio de Culinária",
			dimensaoMaximaPiso: [200, 200],
			nomeOpcionalEdificio: "Edificio de Culinária",
		};
		const edificio = Edificio.create(m).getValue();
		const newEdificio = Edificio.create(n).getValue();

		sinon.stub(edificioRepoInstance, "findByCodigo").resolves(edificio);

		sinon.stub(edificioRepoInstance, "save").resolves(newEdificio);

		let edificioServiceInstance = Container.get("EdificioService");
		const edificioServiceSpy = sinon.spy(edificioServiceInstance, "updateEdificio");

		const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

		// Act
		await ctrl.updateEdificio(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			codigoEdificio: "L",
			descricaoEdificio: "Edificio de Culinária",
			dimensaoMaximaPiso: [200, 200],
			nomeOpcionalEdificio: "Edificio de Culinária",
		}));

		// Ensure that the service method is called.
		sinon.assert.calledOnce(edificioServiceSpy);
		sinon.assert.calledWith(edificioServiceSpy, sinon.match({ name: req.body.name }));
	});
	
	
	
	


	
	it('updateEdificio: edificioController + edificioService integration test using spy on edificioService, unsuccess edificio already exists', async function () {
		// Arrange
		let body = {
			"codigoEdificio" : "G",
            "descricaoEdificio" : "Edificio de Mecânica",
            "dimensaoMaximaPiso" : [100, 100],
            "nomeOpcionalEdificio" : "Edificio G"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let edificioRepoInstance = Container.get("EdificioRepo");
		sinon.stub(edificioRepoInstance, "findByCodigo").returns(null);

		let edificioServiceInstance = Container.get("EdificioService");
		const edificioServiceSpy = sinon.spy(edificioServiceInstance, "updateEdificio");

		const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

		// Act
		await ctrl.updateEdificio(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledOnce(edificioServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(edificioServiceSpy, sinon.match({ name: req.body.name }));
	});
});