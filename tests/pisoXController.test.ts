import 'reflect-metadata';

import * as sinon from 'sinon';
import { Result } from '../src/core/logic/Result';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import PisoController from "../src/controllers/pisoController";
import IPisoService from "../src/services/IServices/IPisoService";
import { Edificio } from '../src/domain/edificio';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Piso } from '../src/domain/piso';
import IPisoDTO from '../src/dto/IPisoDTO';

describe('piso controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function () {

		Container.reset();

		// EDIFICIO
		let edificioSchemaInstance = require("../src/persistence/schemas/edificioSchema").default;
		Container.set("edificioSchema", edificioSchemaInstance);

		let edificioRepoClass = require("../src/repos/edificioRepo").default;
		let edificioRepoInstance = Container.get(edificioRepoClass);
		Container.set("EdificioRepo", edificioRepoInstance);

		// PISO
		let pisoSchemaInstance = require("../src/persistence/schemas/pisoSchema").default;
		Container.set("pisoSchema", pisoSchemaInstance);

		let pisoRepoClass = require("../src/repos/pisoRepo").default;
		let pisoRepoInstance = Container.get(pisoRepoClass);
		Container.set("PisoRepo", pisoRepoInstance);

		let pisoServiceClass = require("../src/services/pisoService").default;
		let pisoServiceInstance = Container.get(pisoServiceClass);
		Container.set("PisoService", pisoServiceInstance);

	});

	afterEach(function () {
		sandbox.restore();
	});

	it('createPiso returns status 403 forbidden', async function () {
		let req: Partial<Request> = {};
		req.body = "Já existe um piso com a designaçao B1"

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let pisoServiceInstace = Container.get("PisoService");

		const obj = sinon.stub(pisoServiceInstace, "createPiso").returns(Result.fail<IPisoDTO>("Já existe um piso com a designaçao B1"));

		const ctrl = new PisoController(pisoServiceInstace as IPisoService);
		await ctrl.createPiso(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
		sinon.assert.calledWith(obj, "Já existe um piso com a designaçao B1");
	});

	it('createPiso returns piso json', async function () {
		let req: Partial<Request> = {};
		req.body = {
			"descricao": "Piso aulas praticas",
			"designacao": "B1",
			"edificio": "B"
		};

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let pisoServiceInstace = Container.get("PisoService");

		const obj = sinon.stub(pisoServiceInstace, "createPiso").returns(Result.ok<IPisoDTO>(req.body as IPisoDTO));

		const ctrl = new PisoController(pisoServiceInstace as IPisoService);
		await ctrl.createPiso(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(req.body));
	});

	it('createPiso: pisoController + pisoService integration test using spy on pisoService, success', async function () {
		// Arrange
		let body = {
			"descricao": "Piso aulas praticas",
			"designacao": "B1",
			"edificio": "B"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let edificioRepoInstance = Container.get("EdificioRepo");
		let pisoRepoInstance = Container.get("PisoRepo");
		let pisoServiceInstance = Container.get("PisoService");

		const e = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Acolhe Malucos",
			"nomeOpcionalEdificio": "Departamento de Engenharia Informática",
			"codigoEdificio": CodigoEdificio.create("B").getValue(),
		}

		let dummyEdificio = Edificio.create(e).getValue();

		const p = {
			descricao: "Piso de gabinetes e aulas teórica-práticas",
			designacao: "B1",
			edificio: dummyEdificio,
		}

		let piso = Piso.create(p).getValue();

		sinon.stub(pisoRepoInstance, "findByDesignacao").resolves(null); // Não existe, logo retorna null.
		sinon.stub(edificioRepoInstance, "findByCodigo").resolves(dummyEdificio);

		sinon.stub(pisoRepoInstance, "save").resolves(null);

		const pisoServiceSpy = sinon.spy(pisoServiceInstance, "createPiso");

		const ctrl = new PisoController(pisoServiceInstance as IPisoService);

		// Act
		await ctrl.createPiso(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			descricao: "Piso aulas praticas",
			designacao: "B1",
			edificio: "B"
		}));
		sinon.assert.calledOnce(pisoServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(pisoServiceSpy, sinon.match({ name: req.body.name }));
	});

	it('createPiso: pisoController + pisoService integration test using spy on pisoService, unsuccess case piso already exists', async function () {
		// Arrange
		let body = {
			"descricao": "Piso aulas praticas",
			"designacao": "B1",
			"edificio": "B"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let pisoRepoInstance = Container.get("PisoRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");

		const edificio = Edificio.create({
			dimensaoMaximaPiso: [100, 100],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
		}).getValue();

		const p = {
			id: 't12345',
			descricao: "Piso de gabinetes e aulas teórica-práticas",
			designacao: "B1",
			edificio: edificio
		};

		const piso = Piso.create(p).getValue();

		sinon.stub(pisoRepoInstance, "findByDesignacao").resolves(piso);

		let pisoServiceInstance = Container.get("PisoService");
		const pisoServiceSpy = sinon.spy(pisoServiceInstance, "createPiso");

		const ctrl = new PisoController(pisoServiceInstance as IPisoService);

		// Act
		await ctrl.createPiso(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	});

	it('createPiso: pisoController + pisoService integration test using spy on pisoService, unsuccess case edificio doesnt exist', async function () {
		// Arrange
		let body = {
			"descricao": "Piso aulas praticas",
			"designacao": "B1",
			"edificio": "B"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let pisoRepoInstance = Container.get("PisoRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");

		sinon.stub(pisoRepoInstance, "findByDesignacao").resolves(null);

		sinon.stub(edificioRepoInstance, "findByCodigo").resolves(null);

		let pisoServiceInstance = Container.get("PisoService");
		const pisoServiceSpy = sinon.spy(pisoServiceInstance, "createPiso");

		const ctrl = new PisoController(pisoServiceInstance as IPisoService);

		// Act
		await ctrl.createPiso(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	});

	it("updatePiso returns status 404", async function () {
		let body = "Piso não encontrado";

		let req: Partial<Request> = {};

		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let pisoServiceInstace = Container.get("PisoService");

		const obj = sinon.stub(pisoServiceInstace, "updatePiso").returns(Result.fail<IPisoDTO>("Piso não encontrado"));

		const ctrl = new PisoController(pisoServiceInstace as IPisoService);
		await ctrl.updatePiso(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledWith(obj, "Piso não encontrado");

	});


	it("updatePiso returns piso json", async function () {
		let body = {
			"descricao": "Piso aulas praticas",
			"designacao": "B1",
			"edificio": "B"
		};

		let req: Partial<Request> = {};

		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let pisoServiceInstace = Container.get("PisoService");

		const obj = sinon.stub(pisoServiceInstace, "updatePiso").returns(Result.ok<IPisoDTO>(req.body as IPisoDTO));

		const ctrl = new PisoController(pisoServiceInstace as IPisoService);
		await ctrl.updatePiso(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match({
			"descricao": "Piso aulas praticas",
			"designacao": "B1",
			"edificio": "B"
		}))
	});

	it('updatePiso: pisoController +pisoService integration test using spy on pisoService, success', async function () {
		// Arrange
		let body = {
			"descricao": "Piso aulas praticas",
			"designacao": "B1",
			"edificio": "B"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let pisoRepoInstance = Container.get("PisoRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");

		const edificio = Edificio.create({
			dimensaoMaximaPiso: [100, 100],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
		}).getValue();

		const b = {
			id: "t12345",
			descricao: "Piso de gabinetes e aulas teórica-práticas",
			designacao: "B1",
			edificio: edificio
		};

		const b1 = {
			id: "t12345",
			descricao: "Piso aulas praticas",
			designacao: "B1",
			edificio: edificio
		};

		const piso = Piso.create(b).getValue();
		const newPiso = Piso.create(b1).getValue();

		sinon.stub(pisoRepoInstance, "findByDesignacao").resolves(piso);

		sinon.stub(edificioRepoInstance, "findByCodigo").resolves(edificio);

		sinon.stub(pisoRepoInstance, "save").resolves(newPiso);

		let pisoServiceInstance = Container.get("PisoService");
		const pisoServiceSpy = sinon.spy(pisoServiceInstance, "updatePiso");

		const ctrl = new PisoController(pisoServiceInstance as IPisoService);

		// Act
		await ctrl.updatePiso(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"descricao": "Piso aulas praticas",
			"designacao": "B1",
			"edificio": "B"
		}));
		sinon.assert.calledOnce(pisoServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(pisoServiceSpy, sinon.match({ name: req.body.name }));
	});

	it('updatePiso: pisoController + pisoService integration test using spy on pisoService, unsuccess piso already exists', async function () {
		// Arrange
		let body = {
			"descricao": "Piso aulas praticas",
			"designacao": "B1",
			"edificio": "B"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let pisoRepoInstance = Container.get("PisoRepo");
		sinon.stub(pisoRepoInstance, "findByDesignacao").returns(null);

		let pisoServiceInstance = Container.get("PisoService");
		const pisoServiceSpy = sinon.spy(pisoServiceInstance, "updatePiso");

		const ctrl = new PisoController(pisoServiceInstance as IPisoService);

		// Act
		await ctrl.updatePiso(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledOnce(pisoServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(pisoServiceSpy, sinon.match({ name: req.body.name }));
	});

	it('updatePiso: pisoController + pisoService integration test using spy on pisoService, unsuccess edificio doesnt exist', async function () {
		// Arrange
		let body = {
			"descricao": "Piso aulas praticas",
			"designacao": "B1",
			"edificio": "J"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };


		const edificio = Edificio.create({
			dimensaoMaximaPiso: [100, 100],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
		}).getValue();

		const b = {
			descricao: "Piso de gabinetes e aulas teórica-práticas",
			designacao: "B1",
			edificio: edificio
		};

		const b1 = {
			descricao: "Piso aulas praticas",
			designacao: "B1",
			edificio: edificio
		};

		const piso = Piso.create(b).getValue();

		let pisoRepoInstance = Container.get("PisoRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");

		sinon.stub(pisoRepoInstance, "findByDesignacao").resolves(piso);
		sinon.stub(edificioRepoInstance, "findByCodigo").resolves(null);

		let pisoServiceInstance = Container.get("PisoService");
		const pisoServiceSpy = sinon.spy(pisoServiceInstance, "updatePiso");

		const ctrl = new PisoController(pisoServiceInstance as IPisoService);

		// Act
		await ctrl.updatePiso(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledOnce(pisoServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(pisoServiceSpy, sinon.match({ name: req.body.name }));
	});


	it('listPisos: pisoController + pisoService integration test using spy on pisoService, success case', async function () {
		// Arrange
		let body = {
			"codigoEdificio": "B",
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		//	

		const dummyEdificio = Edificio.create({
			"dimensaoMaximaPiso": [100, 100],
			"descricaoEdificio": "Edificio Acolhe Malucos",
			"nomeOpcionalEdificio": "Departamento de Engenharia Informática",
			"codigoEdificio": CodigoEdificio.create("B").getValue(),
		}).getValue();

		const dummyEdificio2 = Edificio.create({
			"dimensaoMaximaPiso": [100, 100],
			"descricaoEdificio": "Edificio Acolhe Malucos",
			"nomeOpcionalEdificio": "Departamento de Engenharia Informática",
			"codigoEdificio": CodigoEdificio.create("F").getValue(),
		}).getValue();

		const piso1 = {
			id: 't12345',
			descricao: "Piso de gabinetes e aulas teórica-práticas",
			designacao: "B1",
			edificio: dummyEdificio
		};

		const piso2 = {
			id: 't12345',
			descricao: "Piso de gabinetes e aulas laboratoriais",
			designacao: "B2",
			edificio: dummyEdificio
		};

		const piso3 = {
			id: 't12345',
			descricao: "Piso de gabinetes e aulas laboratoriais",
			designacao: "F2",
			edificio: dummyEdificio2
		};

		let pisos: Piso[] = [Piso.create(piso1).getValue(), Piso.create(piso2).getValue()];

		let pisoRepoInstance = Container.get("PisoRepo");

		sinon.stub(pisoRepoInstance, "findByEdificio").resolves(pisos);

		let pisoServiceInstance = Container.get("PisoService");
		const pisoServiceSpy = sinon.spy(pisoServiceInstance, "listPisos");

		const ctrl = new PisoController(pisoServiceInstance as IPisoService);

		// Act
		// await ctrl.listPisos(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		/*
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
			[sinon.match({
				descricao: "Piso de gabinetes e aulas teórica-práticas",
				designacao: "B1",
				edificio: "B"
			}), sinon.match({
				descricao: "Piso de gabinetes e aulas laboratoriais",
				designacao: "B2",
				edificio: "B"
			}
			)])
		);
		sinon.assert.calledOnce(pisoServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(pisoServiceSpy, sinon.match({ name: req.body.name }));
		*/
	});

	it('listPisos: pisoController + pisoService integration test using spy on pisoService, unsuccess case edificio without pisos', async function () {
		// Arrange
		let body = {
			"codigoEdificio": "B",
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let pisoRepoInstance = Container.get("PisoRepo");
		let pisoServiceInstance = Container.get("PisoService");

		sinon.stub(pisoRepoInstance, "findByEdificio").resolves(null);

		const pisoServiceSpy = sinon.spy(pisoServiceInstance, "listPisos");

		const ctrl = new PisoController(pisoServiceInstance as IPisoService);

		// Act
		// await ctrl.listPisos(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		/*
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledOnce(pisoServiceSpy);
		sinon.assert.calledWith(pisoServiceSpy, sinon.match({ name: req.body.name }));
		*/

	});

	/*it('listPisosMinMax: pisoController + pisoService integration test using spy on pisoService, success case', async function () {
		// Arrange
		let body = {
			"min": 2,
			"max": 4
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		//	

		const e1 = {
			id: 't12345',
			dimensaoMaximaPiso: [100, 100],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
		};

		const e2 = {
			id: 't12345',
			dimensaoMaximaPiso: [100, 100],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("F").getValue(),
		};

		let edificio1 = Edificio.create(e1).getValue();
		let edificio2 = Edificio.create(e2).getValue();

		let edificios: Edificio[] = [edificio1, edificio2];

		const piso1 = {
			id: 't12345',
			descricao: "Piso de gabinetes e aulas teórica-práticas",
			designacao: "B1",
			edificio: edificio1
		};

		const piso2 = {
			id: 't12345',
			descricao: "Piso de gabinetes e aulas laboratoriais",
			designacao: "B2",
			edificio: edificio1
		};

		const piso3 = {
			id: 't12345',
			descricao: "Piso de reuniões",
			designacao: "B3",
			edificio: edificio1
		};

		let pisos: Piso[] = [Piso.create(piso1).getValue(), Piso.create(piso2).getValue(), Piso.create(piso3).getValue()];

		let pisos2: Piso[] = [];
		let pisoRepoInstance = Container.get("PisoRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");
		let pisoServiceInstance = Container.get("PisoService");

		// sinon.stub(edificioRepoInstance, "findAll").resolves(edificios);
		// sinon.stub(pisoRepoInstance, "findByEdificio").onCall(0).resolves(pisos).onCall(1).resolves(pisos2);
		const pisoServiceSpy = sinon.spy(pisoServiceInstance, "listMinMax");

		const ctrl = new PisoController(pisoServiceInstance as IPisoService);

		// Act
		// await ctrl.listMinMax(<Request>req, <Response>res, <NextFunction>next);

		// Assert

		/*
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            [sinon.match({
				codigoEdificio: "B",
				descricaoEdificio: "Edificio Acolhe Malucos",
				dimensaoMaximaPiso: [100, 100],
				nomeOpcionalEdificio: "Departamento de Engenharia Informática"
        })])
        );
		sinon.assert.calledOnce(pisoServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(pisoServiceSpy);
		
	});*/

	/*
	it('listPisosMinMax: pisoController + pisoService integration test using spy on pisoService, unsuccess case no edificios', async function () {
		// Arrange
		let body = {
			"min": 1,
			"max": 2
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let edificioRepoInstance = Container.get("EdificioRepo");
		let pisoServiceInstance = Container.get("PisoService");

		sinon.stub(edificioRepoInstance, "findAll").resolves(null);

		const pisoServiceSpy = sinon.spy(pisoServiceInstance, "listMinMax");

		const ctrl = new PisoController(pisoServiceInstance as IPisoService);

		// Act
		//await ctrl.listMinMax(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		/*
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledOnce(pisoServiceSpy);
		sinon.assert.calledWith(pisoServiceSpy, sinon.match({ name: req.body.name }));
		

	});

	*/
});

