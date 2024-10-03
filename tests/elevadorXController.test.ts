import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IElevadorService from "../src/services/IServices/IElevadorService";
import ElevadorController from "../src/controllers/elevadorController";
import IElevadorDTO from '../src/dto/IElevadorDTO';
import { Elevador } from '../src/domain/elevador'
import { Edificio } from '../src/domain/edificio';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Piso } from '../src/domain/piso';

describe('elevador controller', function () {
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

		// ELEVADOR
		let elevadorSchemaInstance = require("../src/persistence/schemas/elevadorSchema").default;
		Container.set("elevadorSchema", elevadorSchemaInstance);

		let elevadorRepoClass = require("../src/repos/elevadorRepo").default;
		let elevadorRepoInstance = Container.get(elevadorRepoClass);
		Container.set("ElevadorRepo", elevadorRepoInstance);

		let elevadorServiceClass = require("../src/services/elevadorService").default;
		let elevadorServiceInstance = Container.get(elevadorServiceClass);
		Container.set("ElevadorService", elevadorServiceInstance);

	});

	afterEach(function () {
		sandbox.restore();
	});


	it('createElevator returns status 403 forbidden', async function () {
		let req: Partial<Request> = {};
		req.body = 'Já existe um elevador com o código 150'

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let elevadorServiceInstace = Container.get("ElevadorService");

		const obj = sinon.stub(elevadorServiceInstace, "createElevador").returns(Result.fail<IElevadorDTO>("Já existe um elevador com o código 150"));

		const ctrl = new ElevadorController(elevadorServiceInstace as IElevadorService);
		await ctrl.createElevador(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
		sinon.assert.calledWith(obj, "Já existe um elevador com o código 150");
	});

	it('createElevator returns elevador json', async function () {
		let req: Partial<Request> = {};
		req.body = {
			"descricao": "Elevador super rápido",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["B1"],
			"numeroIdentificativo": 100,
			"edificio": "B"

		};

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let elevadorServiceInstace = Container.get("ElevadorService");

		const obj = sinon.stub(elevadorServiceInstace, "createElevador").returns(Result.ok<IElevadorDTO>(req.body as IElevadorDTO));

		const ctrl = new ElevadorController(elevadorServiceInstace as IElevadorService);
		await ctrl.createElevador(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(req.body));
	});


	it("updateElevador returns status 404", async function () {
		let body = "Elevador não encontrado";

		let req: Partial<Request> = {};

		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let elevadorServiceInstace = Container.get("ElevadorService");

		const obj = sinon.stub(elevadorServiceInstace, "updateElevador").returns(Result.fail<IElevadorDTO>("Elevador não encontrado"));

		const ctrl = new ElevadorController(elevadorServiceInstace as IElevadorService);
		await ctrl.updateElevador(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledWith(obj, "Elevador não encontrado");

	});


	it("updateElevador returns elevador json", async function () {
		let body = {
			"id": "123",
			"descricao": "Elevador super lento",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["1", "2", "3"],
			"numeroIdentificativo": 100
		};

		let req: Partial<Request> = {};

		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let elevadorServiceInstace = Container.get("ElevadorService");

		const obj = sinon.stub(elevadorServiceInstace, "updateElevador").returns(Result.ok<IElevadorDTO>(req.body as IElevadorDTO));

		const ctrl = new ElevadorController(elevadorServiceInstace as IElevadorService);
		await ctrl.updateElevador(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match({
			"id": "123",
			"descricao": "Elevador super lento",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["1", "2", "3"],
			"numeroIdentificativo": 100
		}))
	});


	it('createElevador: elevadorController + elevadorService integration test using spy on elevadorService, success', async function () {
		// Arrange
		let body = {
			"id": "123",
			"descricao": "Elevador super lento",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["B1"],
			"numeroIdentificativo": 100,
			"edificio": "B"
		};

		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let elevadorRepoInstance = Container.get("ElevadorRepo");
		let pisoRepoInstance = Container.get("PisoRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");

		const edificio = Edificio.create({
			dimensaoMaximaPiso: [100,100],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
		}).getValue();

		const dummyPiso = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B1",
			"edificio": edificio
		}).getValue();

		const dummyPiso2 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "B2",
			"edificio": edificio
		}).getValue();

		const b = {
			id: 't12345',
			descricao: "Elevador super rápido",
			numeroSerie: "11111",
			modelo: "Azur",
			marca: "Otis",
			pisosServidos: [dummyPiso, dummyPiso2],
			numeroIdentificativo: 155,
			edificio: edificio,
		};

		const elevador = Elevador.create(b).getValue();

		sinon.stub(elevadorRepoInstance, "findByNumeroIdentificativo").resolves(null);

		sinon.stub(edificioRepoInstance, "findByCodigo").resolves(edificio);

		sinon.stub(pisoRepoInstance, "findByEdificio").resolves([dummyPiso, dummyPiso2]);

		// Não interessa o que retorna o null, o serviço não dá uso e desta forma é possível assegurar que funciona corretamente.
		sinon.stub(elevadorRepoInstance, "save").resolves(null);

		let elevadorServiceInstance = Container.get("ElevadorService");
		const elevadorServiceSpy = sinon.spy(elevadorServiceInstance, "createElevador");

		const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);

		// Act
		await ctrl.createElevador(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"descricao": "Elevador super lento",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["B1"],
			"numeroIdentificativo": 100,
			"edificio": "B"
		}));
		sinon.assert.calledOnce(elevadorServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(elevadorServiceSpy, sinon.match({ name: req.body.name }));
	});


	it('createElevador: elevadorController + elevadorService integration test using spy on elevadorService, unsuccess case elevador already exists', async function () {
		// Arrange
		let body = {
			"id": "123",
			"descricao": "Elevador super lento",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["B1"],
			"numeroIdentificativo": 100,
			"edificio": "B"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let elevadorRepoInstance = Container.get("ElevadorRepo");
		let pisoRepoInstance = Container.get("PisoRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");

		const edificio = Edificio.create({
			dimensaoMaximaPiso: [100,100],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
		}).getValue();

		const dummyPiso = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B1",
			"edificio": edificio
		}).getValue();

		const dummyPiso2 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "B2",
			"edificio": edificio
		}).getValue();

		const b = {
			id: 't12345',
			descricao: "Elevador super rápido",
			numeroSerie: "11111",
			modelo: "Azur",
			marca: "Otis",
			pisosServidos: [dummyPiso, dummyPiso2],
			numeroIdentificativo: 155,
			edificio: edificio,
		};

		const elevador = Elevador.create(b).getValue();

		sinon.stub(elevadorRepoInstance, "findByNumeroIdentificativo").resolves(elevador);

		let elevadorServiceInstance = Container.get("ElevadorService");
		const elevadorServiceSpy = sinon.spy(elevadorServiceInstance, "createElevador");

		const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);

		// Act
		await ctrl.createElevador(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	});

	it('createElevador: elevadorController + elevadorService integration test using spy on elevadorService, unsuccess case edificio doesnt exist', async function () {
		// Arrange
		let body = {
			"id": "123",
			"descricao": "Elevador super lento",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["B1"],
			"numeroIdentificativo": 100,
			"edificio": "B"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let elevadorRepoInstance = Container.get("ElevadorRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");

		sinon.stub(elevadorRepoInstance, "findByNumeroIdentificativo").resolves(null);

		sinon.stub(edificioRepoInstance, "findByCodigo").resolves(null);

		let elevadorServiceInstance = Container.get("ElevadorService");
		const elevadorServiceSpy = sinon.spy(elevadorServiceInstance, "createElevador");

		const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);

		// Act
		await ctrl.createElevador(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	});

	it('createElevador: elevadorController + elevadorService integration test using spy on elevadorService, unsuccess case pisosServidos dont belong/dont exist', async function () {
		// Arrange
		let body = {
			"id": "123",
			"descricao": "Elevador super lento",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["NON"],
			"numeroIdentificativo": 100,
			"edificio": "B"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let elevadorRepoInstance = Container.get("ElevadorRepo");
		let pisoRepoInstance = Container.get("PisoRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");

		const edificio = Edificio.create({
			dimensaoMaximaPiso: [100,100],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
		}).getValue();

		const dummyPiso = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B1",
			"edificio": edificio
		}).getValue();

		const dummyPiso2 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "B2",
			"edificio": edificio
		}).getValue();

		const b = {
			id: 't12345',
			descricao: "Elevador super rápido",
			numeroSerie: "11111",
			modelo: "Azur",
			marca: "Otis",
			pisosServidos: [dummyPiso, dummyPiso2],
			numeroIdentificativo: 155,
			edificio: edificio,
		};

		sinon.stub(elevadorRepoInstance, "findByNumeroIdentificativo").resolves(null);
		sinon.stub(edificioRepoInstance, "findByCodigo").resolves(edificio);
		sinon.stub(pisoRepoInstance, "findByEdificio").resolves([dummyPiso, dummyPiso2]);
		// Não interessa o que retorna o null, o serviço não dá uso e desta forma é possível assegurar que funciona corretamente.
		sinon.stub(elevadorRepoInstance, "save").resolves(null);

		let elevadorServiceInstance = Container.get("ElevadorService");
		const elevadorServiceSpy = sinon.spy(elevadorServiceInstance, "createElevador");

		const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);

		// Act
		await ctrl.createElevador(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	});

	it('updateElevador: elevadorController + elevadorService integration test using spy on elevadorService, success', async function () {
		// Arrange
		let body = {
			"id": "123",
			"descricao": "Elevador super LENTO",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["B1", "B2"],
			"numeroIdentificativo": 100,
			"edificio": "B"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let elevadorRepoInstance = Container.get("ElevadorRepo");
		let pisoRepoInstance = Container.get("PisoRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");

		const edificio = Edificio.create({
			dimensaoMaximaPiso: [100,100],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
		}).getValue();

		const dummyPiso = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B1",
			"edificio": edificio
		}).getValue();

		const dummyPiso2 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "B2",
			"edificio": edificio
		}).getValue();

		const b = {
			id: 't12345',
			descricao: "Elevador super rápido",
			numeroSerie: "11111",
			modelo: "Azur",
			marca: "Otis",
			pisosServidos: [dummyPiso, dummyPiso2],
			numeroIdentificativo: 155,
			edificio: edificio,
		};

		const b1 = {
			id: 't12345',
			descricao: "Elevador super rápido",
			numeroSerie: "11111",
			modelo: "Azur",
			marca: "Otis",
			pisosServidos: [dummyPiso, dummyPiso2],
			numeroIdentificativo: 155,
			edificio: edificio,
		};

		const elevador = Elevador.create(b).getValue();
		const newElevador = Elevador.create(b1).getValue();

		sinon.stub(elevadorRepoInstance, "findByNumeroIdentificativo").resolves(elevador);

		sinon.stub(edificioRepoInstance, "findByCodigo").resolves(edificio);

		sinon.stub(pisoRepoInstance, "findByEdificio").resolves([dummyPiso, dummyPiso2]);

		sinon.stub(elevadorRepoInstance, "save").resolves(null);

		let elevadorServiceInstance = Container.get("ElevadorService");
		const elevadorServiceSpy = sinon.spy(elevadorServiceInstance, "updateElevador");

		const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);

		// Act
		await ctrl.updateElevador(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"descricao": "Elevador super LENTO",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["B1", "B2"],
			"numeroIdentificativo": 100,
			"edificio": "B"
		}));
		sinon.assert.calledOnce(elevadorServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(elevadorServiceSpy, sinon.match({ name: req.body.name }));
	});

	it('updateElevador: elevadorController + elevadorService integration test using spy on elevadorService, unsuccess elevador doesnt exist', async function () {
		// Arrange
		let body = {
			"id": "123",
			"descricao": "Elevador super RÁPIDO",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["B1", "B2"],
			"numeroIdentificativo": 100,
			"edificio": "B"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let elevadorRepoInstance = Container.get("ElevadorRepo");
		sinon.stub(elevadorRepoInstance, "findByNumeroIdentificativo").returns(null);

		let elevadorServiceInstance = Container.get("ElevadorService");
		const elevadorServiceSpy = sinon.spy(elevadorServiceInstance, "updateElevador");

		const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);

		// Act
		await ctrl.updateElevador(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledOnce(elevadorServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(elevadorServiceSpy, sinon.match({ name: req.body.name }));
	});

	it('updateElevador: elevadorController + elevadorService integration test using spy on elevadorService, unsuccess new edificio doesnt exist', async function () {
		// Arrange
		let body = {
			"id": "123",
			"descricao": "Elevador super RÁPIDO",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["B1", "B2"],
			"numeroIdentificativo": 100,
			"edificio": "J"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };


		const edificio = Edificio.create({
			dimensaoMaximaPiso: [100,100],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
		}).getValue();

		const dummyPiso = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B1",
			"edificio": edificio
		}).getValue();

		const dummyPiso2 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "B2",
			"edificio": edificio
		}).getValue();

		const b = {
			id: 't12345',
			descricao: "Elevador super rápido",
			numeroSerie: "11111",
			modelo: "Azur",
			marca: "Otis",
			pisosServidos: [dummyPiso, dummyPiso2],
			numeroIdentificativo: 155,
			edificio: edificio,
		};

		const elevador = Elevador.create(b).getValue();

		let edificioRepoInstance = Container.get("EdificioRepo");
		let elevadorRepoInstance = Container.get("ElevadorRepo");

		sinon.stub(elevadorRepoInstance, "findByNumeroIdentificativo").resolves(elevador);
		sinon.stub(edificioRepoInstance, "findByCodigo").resolves(null);

		let elevadorServiceInstance = Container.get("ElevadorService");
		const elevadorServiceSpy = sinon.spy(elevadorServiceInstance, "updateElevador");

		const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);

		// Act
		await ctrl.updateElevador(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledOnce(elevadorServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(elevadorServiceSpy, sinon.match({ name: req.body.name }));
	});

	it('updateElevador: elevadorController + elevadorService integration test using spy on elevadorService, unsuccess new pisos dont belong to the new (or not) edificio', async function () {
		// Arrange
		let body = {
			"id": "123",
			"descricao": "Elevador super RÁPIDO",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["NON1", "NON2"],
			"numeroIdentificativo": 100,
			"edificio": "B"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };


		const edificio = Edificio.create({
			dimensaoMaximaPiso: [100,100],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
		}).getValue();

		const dummyPiso = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B1",
			"edificio": edificio
		}).getValue();

		const dummyPiso2 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "B2",
			"edificio": edificio
		}).getValue();

		const b = {
			id: 't12345',
			descricao: "Elevador super rápido",
			numeroSerie: "11111",
			modelo: "Azur",
			marca: "Otis",
			pisosServidos: [dummyPiso, dummyPiso2],
			numeroIdentificativo: 155,
			edificio: edificio,
		};

		const elevador = Elevador.create(b).getValue();

		let edificioRepoInstance = Container.get("EdificioRepo");
		let elevadorRepoInstance = Container.get("ElevadorRepo");
		let pisoRepoInstance = Container.get("PisoRepo");

		sinon.stub(elevadorRepoInstance, "findByNumeroIdentificativo").resolves(elevador);
		sinon.stub(edificioRepoInstance, "findByCodigo").resolves(edificio);
		sinon.stub(pisoRepoInstance, "findByEdificio").resolves([dummyPiso, dummyPiso2]);


		let elevadorServiceInstance = Container.get("ElevadorService");
		const elevadorServiceSpy = sinon.spy(elevadorServiceInstance, "updateElevador");

		const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);

		// Act
		await ctrl.updateElevador(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledOnce(elevadorServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(elevadorServiceSpy, sinon.match({ name: req.body.name }));
	});

	it('listElevadoresEdificio: elevadorController + elevadorService integration test using spy on elevadorService, success case', async function () {
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

		let elevadorRepoInstance = Container.get("ElevadorRepo");
		let elevadorServiceInstance = Container.get("ElevadorService");

		const edificio = Edificio.create({
			dimensaoMaximaPiso: [100,100],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
		}).getValue();

		const dummyPiso = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B1",
			"edificio": edificio
		}).getValue();

		const dummyPiso2 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "B2",
			"edificio": edificio
		}).getValue();

		const b = {
			id: 't12345',
			descricao: "Elevador super rápido",
			numeroSerie: "11111",
			modelo: "Azur",
			marca: "Otis",
			pisosServidos: [dummyPiso, dummyPiso2],
			numeroIdentificativo: 155,
			edificio: edificio,
		};

		sinon.stub(elevadorRepoInstance, "findByEdificio").resolves(Elevador.create(b).getValue());

		const edificioServiceSpy = sinon.spy(elevadorServiceInstance, "listElevadoresEdificio");

		const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);

		// Act
		//await ctrl.listElevadoresEdificio(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		/*sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match([sinon.match({
			descricao: "Elevador super rápido",
			numeroSerie: "11111",
			modelo: "Azur",
			marca: "Otis",
			pisosServidos: ["B1", "B2"],
			numeroIdentificativo: 155,
			edificio: "B",
		})]));
		sinon.assert.calledOnce(edificioServiceSpy);
		sinon.assert.calledWith(edificioServiceSpy, sinon.match({ name: req.body.name }));
		sinon.assert.calledOnce(edificioServiceSpy);
		sinon.assert.calledWith(edificioServiceSpy, sinon.match({ name: req.body.name }));*/
	});

	it('listElevadores: elevadorController + elevadorService integration test using spy on elevadorService, unsuccess case edificio without elevador', async function () {
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

		let elevadorRepoInstance = Container.get("ElevadorRepo");
		let elevadorServiceInstance = Container.get("ElevadorService");

		sinon.stub(elevadorRepoInstance, "findByEdificio").resolves(null);

		const elevadorServiceSpy = sinon.spy(elevadorServiceInstance, "listElevadoresEdificio");

		const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);

		// Act
		// await ctrl.listElevadoresEdificio(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		/*
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledOnce(elevadorServiceSpy);
		sinon.assert.calledWith(elevadorServiceSpy, sinon.match({ name: req.body.name }));
		*/
	});


});


