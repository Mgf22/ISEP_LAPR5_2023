import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import ISalaService from "../src/services/IServices/ISalaService";
import SalaController from "../src/controllers/salaController";
import ISalaDTO from '../src/dto/ISalaDTO';
import { Sala } from '../src/domain/sala';
import { CategoriaSala } from '../src/domain/categoriaSala';
import { Edificio } from '../src/domain/edificio';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Piso } from '../src/domain/piso';

describe('sala controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function () {
		Container.reset();
		// PISO
		let pisoSchemaInstance = require("../src/persistence/schemas/pisoSchema").default;
		Container.set("pisoSchema", pisoSchemaInstance);

		let pisoRepoClass = require("../src/repos/pisoRepo").default;
		let pisoRepoInstance = Container.get(pisoRepoClass);
		Container.set("PisoRepo", pisoRepoInstance);

		let salaSchemaInstance = require("../src/persistence/schemas/salaSchema").default;
		Container.set("salaSchema", salaSchemaInstance);

		let salaRepoClass = require("../src/repos/salaRepo").default;
		let salaRepoInstance = Container.get(salaRepoClass);
		Container.set("SalaRepo", salaRepoInstance);

		let salaServiceClass = require("../src/services/salaService").default;
		let salaServiceInstance = Container.get(salaServiceClass);
		Container.set("SalaService", salaServiceInstance);
	});

	afterEach(function () {
		sandbox.restore();
	});

	it('createSala: returns status 403 forbidden', async function () {
		let req: Partial<Request> = {};
		req.body = 'Já existe uma sala com a designacao B310'

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let salaServiceInstace = Container.get("SalaService");

		const obj = sinon.stub(salaServiceInstace, "createSala").returns(Result.fail<ISalaDTO>("Já existe uma sala com a designacao B310"));

		const ctrl = new SalaController(salaServiceInstace as ISalaService);
		await ctrl.createSala(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
		sinon.assert.calledWith(obj, "Já existe uma sala com a designacao B310");
	});

	it('createSala: returns sala json', async function () {
		let req: Partial<Request> = {};
		req.body = {
			"descricao": "Anfiteatro para aulas teorico-práticas",
			"designacao": "B315",
			"categoria": "anfiteatro",
			"piso": "B1"
		};

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let salaServiceInstace = Container.get("SalaService");

		const obj = sinon.stub(salaServiceInstace, "createSala").returns(Result.ok<ISalaDTO>(req.body as ISalaDTO));

		const ctrl = new SalaController(salaServiceInstace as ISalaService);
		await ctrl.createSala(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(req.body));
	});

	/*
	it('createSala returns status 201', async function () {
		let req: Partial<Request> = {};
		req.body = {
			"descricao": "Anfiteatro para aulas teorico-práticas",
			"designacao": "B315",
			"categoria": "anfiteatro"
		};

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => {};

		let salaServiceInstace = Container.get("SalaService");

		const obj = sinon.stub(salaServiceInstace, "createSala").returns(Result.ok<ISalaDTO>(req.body as ISalaDTO));

		const ctrl = new SalaController(salaServiceInstace as ISalaService);
		await ctrl.createSala(<Request>req, <Response> res, <NextFunction> next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 201);
	});

	*/

	it('createSala: salaController + salaService integration test using spy on salaService, success', async function () {
		// Arrange
		let body = {
			"id": "123",
			"descricao": "Laboratório aulas prática-laboratoriais",
			"categoria": "laboratorio",
			"designacao": "B302",
			"piso": "B1"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let salaRepoInstance = Container.get("SalaRepo");
		let pisoRepoInstance = Container.get("PisoRepo");
		let salaServiceInstance = Container.get("SalaService");

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

		const sala = Sala.create({
			"descricaoSala": "Aula Teorico Pratica",
			"categoriaSala": "laboratorio",
			"designacaoSala": "B105",
			"piso": dummyPiso
		}).getValue();

		sinon.stub(salaRepoInstance, "findByDesignacao").resolves(null); // Não existe, logo retorna null.
		sinon.stub(pisoRepoInstance, "findByDesignacao").resolves(dummyPiso);

		sinon.stub(salaRepoInstance, "save").resolves(null);

		const salaServiceSpy = sinon.spy(salaServiceInstance, "createSala");

		const ctrl = new SalaController(salaServiceInstance as ISalaService);

		// Act
		await ctrl.createSala(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"descricao": "Laboratório aulas prática-laboratoriais",
			"categoria": "laboratorio",
			"designacao": "B302",
			"piso": "B1"
		}));
		sinon.assert.calledOnce(salaServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(salaServiceSpy, sinon.match({ name: req.body.name }));
	});



	it('createSala: salaController + salaService integration test using spy on salaService, unsuccess sala already exists', async function () {
		// Arrange
		let body = {
			"id": "123",
			"descricao": "Laboratório aulas prática-laboratoriais",
			"categoria": "laboratorio",
			"designacao": "B302"
		};

		let newBody = {
			"id": "123",
			"descricao": "Gabinete professor ABC",
			"categoria": "gabinete",
			"designacao": "B302"
		}

		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let salaRepoInstance = Container.get("SalaRepo");
		let pisoRepoInstance = Container.get("PisoRepo");
		let salaServiceInstance = Container.get("SalaService");

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

		const sala = Sala.create({
			"designacaoSala": "B101",
			"piso": dummyPiso,
			"categoriaSala": "laboratorio",
			"descricaoSala": "Sala para avaliações"
		});

		sinon.stub(salaRepoInstance, "findByDesignacao").resolves(sala);

		const salaServiceSpy = sinon.spy(salaServiceInstance, "createSala");

		const ctrl = new SalaController(salaServiceInstance as ISalaService);

		// Act
		await ctrl.createSala(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	});

	it('createSala: salaController + salaService integration test using spy on salaService, unsuccess piso doesnt exist', async function () {
		// Arrange
		let body = {
			"id": "123",
			"descricao": "Laboratório aulas prática-laboratoriais",
			"categoria": "laboratorio",
			"designacao": "B302"
		};

		let newBody = {
			"id": "123",
			"descricao": "Gabinete professor ABC",
			"categoria": "gabinete",
			"designacao": "B302"
		}

		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let salaRepoInstance = Container.get("SalaRepo");
		let pisoRepoInstance = Container.get("PisoRepo");
		let salaServiceInstance = Container.get("SalaService");

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

		const sala = Sala.create({
			"designacaoSala": "B101",
			"piso": dummyPiso,
			"categoriaSala": "laboratorio",
			"descricaoSala": "Sala para avaliações"
		});

		sinon.stub(salaRepoInstance, "findByDesignacao").resolves(null);

		sinon.stub(pisoRepoInstance, "findByDesignacao").resolves(null);

		const salaServiceSpy = sinon.spy(salaServiceInstance, "createSala");

		const ctrl = new SalaController(salaServiceInstance as ISalaService);

		// Act
		await ctrl.createSala(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	});

	it('salaController + salaService integration test using spy on salaService, success update test', async function () {

	});

	it('salaController + salaService integration test using spy on salaService, unsuccess update test sala doesnt exist', async function () {

	});

	it('salaController + salaService integration test using spy on salaService, unsuccess update test piso requested doesnt exist', async function () {

	});

});


