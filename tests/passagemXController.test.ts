import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IPassagemService from "../src/services/IServices/IPassagemService";
import PassagemController from "../src/controllers/passagemController";
import IPassagemDTO from '../src/dto/IPassagemDTO';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Edificio } from '../src/domain/edificio';
import { Piso } from '../src/domain/piso';
import { Passagem } from '../src/domain/passagem';


describe('passagem controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function () {
		Container.reset();
		let passagemSchemaInstance = require("../src/persistence/schemas/passagemSchema").default;
		Container.set("passagemSchema", passagemSchemaInstance);

		let passagemRepoClass = require("../src/repos/passagemRepo").default;
		let passagemRepoInstance = Container.get(passagemRepoClass);
		Container.set("PassagemRepo", passagemRepoInstance);

		////////////////////////////
		// Repo + schema edifício.
		let edificioSchemaInstance = require("../src/persistence/schemas/edificioSchema").default;
		Container.set("edificioSchema", edificioSchemaInstance);

		let edificioRepoClass = require("../src/repos/edificioRepo").default;
		let edificioRepoInstance = Container.get(edificioRepoClass);
		Container.set("EdificioRepo", edificioRepoInstance);
		////////////////////////////

		////////////////////////////
		// Repo + schema piso.
		let pisoSchemaInstance = require("../src/persistence/schemas/pisoSchema").default;
		Container.set("pisoSchema", pisoSchemaInstance);

		let pisoRepoClass = require("../src/repos/pisoRepo").default;
		let pisoRepoInstance = Container.get(pisoRepoClass);
		Container.set("PisoRepo", pisoRepoInstance);
		////////////////////////////

		let passagemServiceClass = require("../src/services/passagemService").default;
		let passagemServiceInstance = Container.get(passagemServiceClass);
		Container.set("PassagemService", passagemServiceInstance);
	});

	afterEach(function () {
		sandbox.restore();
	});

	it('createPassagem returns status 403 forbidden', async function () {
		let req: Partial<Request> = {};
		req.body = "Já existe uma passagem com a designaçao B2_H2"

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let passagemServiceInstace = Container.get("PassagemService");

		const obj = sinon.stub(passagemServiceInstace, "createPassagem").returns(Result.fail<IPassagemDTO>("Já existe uma passagem com a designaçao B2_H2"));

		const ctrl = new PassagemController(passagemServiceInstace as IPassagemService);
		await ctrl.createPassagem(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
		sinon.assert.calledWith(obj, "Já existe uma passagem com a designaçao B2_H2");
	});

	it('createPassagem returns piso json', async function () {
		let req: Partial<Request> = {};
		req.body = {
			"designacao": "Passagem B2_H2",
			"edificioA": "B",
			"edificioB": "H",
			"pisoA": "Piso 2",
			"pisoB": "Piso 2"
		};

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let passagemServiceInstace = Container.get("PassagemService");

		const obj = sinon.stub(passagemServiceInstace, "createPassagem").returns(Result.ok<IPassagemDTO>(req.body as IPassagemDTO));

		const ctrl = new PassagemController(passagemServiceInstace as IPassagemService);
		await ctrl.createPassagem(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(req.body));
	});

	it('createPassagem: passagemController + passagemService integration test using spy on passagemService, success', async function () {
		// Arrange
		let body = {
			"designacao": "Passagem B2_H2",
			"edificioA": "H",
			"edificioB": "B",
			"pisoA": "H2",
			"pisoB": "B2"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");
		let pisoRepoInstance = Container.get("PisoRepo");
		let passagemServiceInstance = Container.get("PassagemService");

		const e1 = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Quimica",
			"nomeOpcionalEdificio": "Departamento de Engenharia Quimica",
			"codigoEdificio": CodigoEdificio.create("H").getValue(),
		}

		const e2 = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Informatica",
			"nomeOpcionalEdificio": "Departamento de Engenharia Informática",
			"codigoEdificio": CodigoEdificio.create("B").getValue(),
		}

		let dummyEdificio = Edificio.create(e1).getValue();
		let dummyEdificio2 = Edificio.create(e2).getValue();

		const p1 = {
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "H2",
			"edificio": dummyEdificio,
		}

		const p2 = {
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B2",
			"edificio": dummyEdificio2,
		}

		let dummyPiso = Piso.create(p1).getValue();
		let dummyPiso2 = Piso.create(p2).getValue();

		const pa = {
			id:"t123",
			designacao: "Passagem B2_H2",
			edificioA: dummyEdificio,
			edificioB: dummyEdificio2,
			pisoA: dummyPiso,
			pisoB: dummyPiso2,
		}

		let passagem = Passagem.create(pa).getValue();

		sinon.stub(passagemRepoInstance, "findByDesignacao").resolves(null); // Não existe, logo retorna null.
		sinon.stub(edificioRepoInstance, "findByCodigo").onCall(0).resolves(dummyEdificio).onCall(1).resolves(dummyEdificio2);
		sinon.stub(pisoRepoInstance, "findByDesignacao").onCall(0).resolves(dummyPiso).onCall(1).resolves(dummyPiso2);
	

		sinon.stub(passagemRepoInstance, "save").resolves(null);

		const passagemServiceSpy = sinon.spy(passagemServiceInstance, "createPassagem");

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

		// Act
		await ctrl.createPassagem(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			designacao: "Passagem B2_H2",
			edificioA: "H",
			edificioB: "B",
			pisoA: "H2",
			pisoB: "B2"
		}));
		sinon.assert.calledOnce(passagemServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(passagemServiceSpy, sinon.match({ name: req.body.name }));
	});

	it('createPassagem: passagemController + passagemService integration test using spy on passagemService, unsuccess case passagem already exists', async function () {
		// Arrange
		let body = {
			"designacao": "Passagem B2_H2",
			"edificioA": "B",
			"edificioB": "H",
			"pisoA": "Piso 2",
			"pisoB": "Piso 2"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");
		let pisoRepoInstance = Container.get("PisoRepo");

		const e1 = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Quimica",
			"nomeOpcionalEdificio": "Departamento de Engenharia Quimica",
			"codigoEdificio": CodigoEdificio.create("H").getValue(),
		}

		const e2 = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Informatica",
			"nomeOpcionalEdificio": "Departamento de Engenharia Informática",
			"codigoEdificio": CodigoEdificio.create("B").getValue(),
		}

		let dummyEdificio = Edificio.create(e1).getValue();
		let dummyEdificio2 = Edificio.create(e2).getValue();

		const p1 = {
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "H2",
			"edificio": dummyEdificio,
		}

		const p2 = {
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B2",
			"edificio": dummyEdificio2,
		}

		let dummyPiso = Piso.create(p1).getValue();
		let dummyPiso2 = Piso.create(p2).getValue();

		const pa = {
			designacao: "Passagem B2_H2",
			edificioA: dummyEdificio,
			edificioB: dummyEdificio2,
			pisoA: dummyPiso,
			pisoB: dummyPiso2,
		}

		let passagem = Passagem.create(pa).getValue();

		sinon.stub(passagemRepoInstance, "findByDesignacao").resolves(passagem); 

		let passagemServiceInstance = Container.get("PassagemService");
		const passagemServiceSpy = sinon.spy(passagemServiceInstance, "createPassagem");

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

		// Act
		await ctrl.createPassagem(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	});

	it('createPassagem: passagemController + passagemService integration test using spy on passagemService, unsuccess case edificioA equals edificioB', async function () {
		// Arrange
		let body = {
			"designacao": "Passagem B2_H2",
			"edificioA": "B",
			"edificioB": "H",
			"pisoA": "Piso 2",
			"pisoB": "Piso 2"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");
		let pisoRepoInstance = Container.get("PisoRepo");

		const e1 = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Quimica",
			"nomeOpcionalEdificio": "Departamento de Engenharia Quimica",
			"codigoEdificio": CodigoEdificio.create("B").getValue(),
		}

		const e2 = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Informatica",
			"nomeOpcionalEdificio": "Departamento de Engenharia Informática",
			"codigoEdificio": CodigoEdificio.create("B").getValue(),
		}

		let dummyEdificio = Edificio.create(e1).getValue();
		let dummyEdificio2 = Edificio.create(e2).getValue();

		const p1 = {
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "H2",
			"edificio": dummyEdificio,
		}

		const p2 = {
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B2",
			"edificio": dummyEdificio2,
		}

		let dummyPiso = Piso.create(p1).getValue();
		let dummyPiso2 = Piso.create(p2).getValue();

		const pa = {
			designacao: "Passagem B2_H2",
			edificioA: dummyEdificio,
			edificioB: dummyEdificio2,
			pisoA: dummyPiso,
			pisoB: dummyPiso2,
		}

		let passagem = Passagem.create(pa).getValue();

		sinon.stub(passagemRepoInstance, "findByDesignacao").resolves(null); // Não existe, logo retorna null.
		sinon.stub(edificioRepoInstance, "findByCodigo").onCall(0).resolves(dummyEdificio).onCall(1).resolves(dummyEdificio2); 
		sinon.stub(pisoRepoInstance, "findByDesignacao").onCall(0).resolves(dummyPiso).onCall(1).resolves(dummyPiso2);

		let passagemServiceInstance = Container.get("PassagemService");
		const passagemServiceSpy = sinon.spy(passagemServiceInstance, "createPassagem");

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

		// Act
		await ctrl.createPassagem(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	});

	it('createPassagem: passagemController + passagemService integration test using spy on passagemService, unsuccess case pisoA equals pisoB', async function () {
		// Arrange
		let body = {
			"designacao": "Passagem B2_H2",
			"edificioA": "B",
			"edificioB": "H",
			"pisoA": "Piso 2",
			"pisoB": "Piso 2"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");
		let pisoRepoInstance = Container.get("PisoRepo");

		const e1 = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Quimica",
			"nomeOpcionalEdificio": "Departamento de Engenharia Quimica",
			"codigoEdificio": CodigoEdificio.create("H").getValue(),
		}

		const e2 = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Informatica",
			"nomeOpcionalEdificio": "Departamento de Engenharia Informática",
			"codigoEdificio": CodigoEdificio.create("B").getValue(),
		}

		let dummyEdificio = Edificio.create(e1).getValue();
		let dummyEdificio2 = Edificio.create(e2).getValue();

		const p1 = {
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B2",
			"edificio": dummyEdificio,
		}

		const p2 = {
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B2",
			"edificio": dummyEdificio2,
		}

		let dummyPiso = Piso.create(p1).getValue();
		let dummyPiso2 = Piso.create(p2).getValue();

		const pa = {
			designacao: "Passagem B2_H2",
			edificioA: dummyEdificio,
			edificioB: dummyEdificio2,
			pisoA: dummyPiso,
			pisoB: dummyPiso2,
		}

		let passagem = Passagem.create(pa).getValue();

		sinon.stub(passagemRepoInstance, "findByDesignacao").resolves(null); // Não existe, logo retorna null.
		sinon.stub(edificioRepoInstance, "findByCodigo").onCall(0).resolves(dummyEdificio).onCall(1).resolves(dummyEdificio2); 
		sinon.stub(pisoRepoInstance, "findByDesignacao").onCall(0).resolves(dummyPiso).onCall(1).resolves(dummyPiso2);

		let passagemServiceInstance = Container.get("PassagemService");
		const passagemServiceSpy = sinon.spy(passagemServiceInstance, "createPassagem");

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

		// Act
		await ctrl.createPassagem(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	});

	it('createPassagem: passagemController + passagemService integration test using spy on passagemService, unsuccess case piso does not belong to edificio', async function () {
		// Arrange
		let body = {
			"designacao": "Passagem B2_H2",
			"edificioA": "B",
			"edificioB": "H",
			"pisoA": "Piso 2",
			"pisoB": "Piso 2"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");
		let pisoRepoInstance = Container.get("PisoRepo");

		const e1 = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Quimica",
			"nomeOpcionalEdificio": "Departamento de Engenharia Quimica",
			"codigoEdificio": CodigoEdificio.create("H").getValue(),
		}

		const e2 = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Informatica",
			"nomeOpcionalEdificio": "Departamento de Engenharia Informática",
			"codigoEdificio": CodigoEdificio.create("B").getValue(),
		}

		let dummyEdificio = Edificio.create(e1).getValue();
		let dummyEdificio2 = Edificio.create(e2).getValue();

		const p1 = {
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B2",
			"edificio": dummyEdificio2,
		}

		const p2 = {
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B2",
			"edificio": dummyEdificio2,
		}

		let dummyPiso = Piso.create(p1).getValue();
		let dummyPiso2 = Piso.create(p2).getValue();

		const pa = {
			designacao: "Passagem B2_H2",
			edificioA: dummyEdificio,
			edificioB: dummyEdificio2,
			pisoA: dummyPiso,
			pisoB: dummyPiso2,
		}

		let passagem = Passagem.create(pa).getValue();

		sinon.stub(passagemRepoInstance, "findByDesignacao").resolves(null); // Não existe, logo retorna null.
		sinon.stub(edificioRepoInstance, "findByCodigo").onCall(0).resolves(dummyEdificio).onCall(1).resolves(dummyEdificio2); 
		sinon.stub(pisoRepoInstance, "findByDesignacao").onCall(0).resolves(dummyPiso).onCall(1).resolves(dummyPiso2);

		let passagemServiceInstance = Container.get("PassagemService");
		const passagemServiceSpy = sinon.spy(passagemServiceInstance, "createPassagem");

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

		// Act
		await ctrl.createPassagem(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	});

	it('listPassagensBetween: passagemController + passagemService integration test using spy on passagemService, success case', async function () {
		// Arrange
		let body = {
			"codigoEdificioA": "B",
			"codigoEdificioB": "J"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		//	

		const edificio1 = Edificio.create({
			dimensaoMaximaPiso: [100, 100],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
		}).getValue();

		const dummyPiso = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B1",
			"edificio": edificio1
		}).getValue();

		const dummyPiso2 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "B2",
			"edificio": edificio1
		}).getValue();

		//

		const edificio2 = Edificio.create({
			dimensaoMaximaPiso: [100, 100],
			descricaoEdificio: "Edificio principal de engenharia civil",
			nomeOpcionalEdificio: "Departamento de Engenharia Civil",
			codigoEdificio: CodigoEdificio.create("C").getValue(),
		}).getValue();

		const dummyPiso3 = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "C1",
			"edificio": edificio2
		}).getValue();

		const dummyPiso4 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "C2",
			"edificio": edificio2
		}).getValue();

		const passagem = Passagem.create({
			designacao: "B2_C2",
			edificioA: edificio1,
			edificioB: edificio2,
			pisoA: dummyPiso2,
			pisoB: dummyPiso4
		}).getValue();

		let passagens: Passagem[] = [passagem];

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");


		sinon.stub(edificioRepoInstance, "findByCodigo")
			.onCall(0).resolves(edificio1)
			.onCall(1).resolves(edificio2);

		sinon.stub(passagemRepoInstance, "listPassagensBetween").resolves(passagens);

		let passagemServiceInstance = Container.get("PassagemService");
		const passagemServiceSpy = sinon.spy(passagemServiceInstance, "listPassagens");

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

		// Act
		await ctrl.listPassagens(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match([sinon.match({
			"designacao": "B2_C2",
			"edificioB": "C",
			"edificioA": "B",
			"pisoB": "C2",
			"pisoA": "B2"
		})]));
		sinon.assert.calledOnce(passagemServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(passagemServiceSpy, sinon.match({ name: req.body.name }));
	});

	it('listPassagensBetween: passagemController + passagemService integration test using spy on passagemService, building not found case 1', async function () {
		// Arrange
		let body = {
			"codigoEdificioA": "B",
			"codigoEdificioB": "C"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };


		const edificio1 = Edificio.create({
			dimensaoMaximaPiso: [100, 100],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
		}).getValue();

		const dummyPiso = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B1",
			"edificio": edificio1
		}).getValue();

		const dummyPiso2 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "B2",
			"edificio": edificio1
		}).getValue();

		//


		const edificio2 = Edificio.create({
			dimensaoMaximaPiso: [100, 100],
			descricaoEdificio: "Edificio principal de engenharia civil",
			nomeOpcionalEdificio: "Departamento de Engenharia Civil",
			codigoEdificio: CodigoEdificio.create("C").getValue(),
		}).getValue();

		const dummyPiso3 = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "C1",
			"edificio": edificio2
		}).getValue();

		const dummyPiso4 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "C2",
			"edificio": edificio2
		}).getValue();

		const passagem = Passagem.create({
			designacao: "B2_C2",
			edificioA: edificio1,
			edificioB: edificio2,
			pisoA: dummyPiso2,
			pisoB: dummyPiso4
		}).getValue();

		let passagens: Passagem[] = [passagem];

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");

		sinon.stub(edificioRepoInstance, "findByCodigo").onCall(0).resolves(edificio1).onCall(1).resolves(null);

		sinon.stub(passagemRepoInstance, "listPassagensBetween").returns(new Promise<Passagem[]>((resolve, reject) => {
			resolve(passagens)
		}));

		let passagemServiceInstance = Container.get("PassagemService");
		const passagemServiceSpy = sinon.spy(passagemServiceInstance, "listPassagens");

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

		// Act
		await ctrl.listPassagens(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
	});

	it('listPassagensBetween: passagemController + passagemService integration test using spy on passagemService, building not found case 2', async function () {
		// Arrange
		let body = {
			"codigoEdificioA": "B",
			"codigoEdificioB": "C"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		const edificio2 = Edificio.create({
			dimensaoMaximaPiso: [100, 100],
			descricaoEdificio: "Edificio principal de engenharia civil",
			nomeOpcionalEdificio: "Departamento de Engenharia Civil",
			codigoEdificio: CodigoEdificio.create("C").getValue(),
		}).getValue();

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");

		sinon.stub(edificioRepoInstance, "findByCodigo").onCall(0).resolves(null).onCall(1).resolves(edificio2);

		let passagemServiceInstance = Container.get("PassagemService");
		const passagemServiceSpy = sinon.spy(passagemServiceInstance, "listPassagens");

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

		// Act
		await ctrl.listPassagens(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
	});

	it('listPassagensBetween: passagemController + passagemService integration test using spy on passagemService, not found any passagem', async function () {
		// Arrange
		let body = {
			"codigoEdificioA": "B",
			"codigoEdificioB": "J"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		//	

		const edificio1 = Edificio.create({
			dimensaoMaximaPiso: [100, 100],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
		}).getValue();


		const edificio2 = Edificio.create({
			dimensaoMaximaPiso: [100, 100],
			descricaoEdificio: "Edificio principal de engenharia civil",
			nomeOpcionalEdificio: "Departamento de Engenharia Civil",
			codigoEdificio: CodigoEdificio.create("C").getValue(),
		}).getValue();

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");


		sinon.stub(edificioRepoInstance, "findByCodigo")
			.onCall(0).resolves(edificio1)
			.onCall(1).resolves(edificio2);

		let empty: Piso[] = [];
		sinon.stub(passagemRepoInstance, "listPassagensBetween").resolves(empty);

		let passagemServiceInstance = Container.get("PassagemService");
		const passagemServiceSpy = sinon.spy(passagemServiceInstance, "listPassagens");

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

		// Act
		await ctrl.listPassagens(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
	});


	it('listPassagens entre edifícios', async function () {
		let req: Partial<Request> = {};
		req.body = {
			"codigoEdificioA": "B",
			"codigoEdificioB": "H"
		};
		let res2: Partial<Response> = {};
		let response: IPassagemDTO[] = [
			{
				"id": "1",
				"designacao": "ABC",
				"edificioA": "1",
				"edificioB": "2",
				"pisoA": "2",
				"pisoB": "1"
			},
			{
				"id": "2",
				"designacao": "DEF",
				"edificioA": "1",
				"edificioB": "2",
				"pisoA": "3",
				"pisoB": "2"
			}
		];



		let res: Partial<Response> = {
			json: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let passagemServiceInstace = Container.get("PassagemService");

		const obj = sinon.stub(passagemServiceInstace, "listPassagens").returns(Result.ok<IPassagemDTO[]>(response as IPassagemDTO[]));

		const ctrl = new PassagemController(passagemServiceInstace as IPassagemService);
		// await ctrl.listPassagens(<Request>req, <Response>res, <NextFunction>next);

		// sinon.assert.calledOnce(obj);
		// sinon.assert.calledWith(obj, sinon.match(req.body));
	});

	//Teste US220 Caso de Sucesso
	it('listPisos com passagens:  passagemController + passagemService integration test using spy on passagemService, success case ', async function () {
		let body = {
			"codigoEdificio": "B"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		//	

		const edificio1 = Edificio.create({
			dimensaoMaximaPiso: [100, 100],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
		}).getValue();

		const dummyPiso = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B1",
			"edificio": edificio1
		}).getValue();

		const dummyPiso2 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "B2",
			"edificio": edificio1

		}).getValue();

		//

		const edificio2 = Edificio.create({
			dimensaoMaximaPiso: [100, 100],
			descricaoEdificio: "Edificio principal de engenharia civil",
			nomeOpcionalEdificio: "Departamento de Engenharia Civil",
			codigoEdificio: CodigoEdificio.create("C").getValue(),
		}).getValue();

		const dummyPiso3 = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "C1",
			"edificio": edificio2
		}).getValue();

		const dummyPiso4 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "C2",
			"edificio": edificio2
		}).getValue();

		const passagem = Passagem.create({
			designacao: "B2_C2",
			edificioA: edificio1,
			edificioB: edificio2,
			pisoA: dummyPiso2,
			pisoB: dummyPiso4
		}).getValue();

		let passagens: Passagem[] = [passagem];

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");

		sinon.stub(edificioRepoInstance, "findByCodigo").resolves(edificio1);

		sinon.stub(passagemRepoInstance, "listPassagens").resolves(passagens);

		let passagemServiceInstance = Container.get("PassagemService");
		const passagemServiceSpy = sinon.spy(passagemServiceInstance, "listPisos");

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

		// Act
		// await ctrl.listPisos(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		/*
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match([sinon.match({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "B2",
			"edificio": edificio1.codigo,
		})]));
		sinon.assert.calledOnce(passagemServiceSpy);
		sinon.assert.calledWith(passagemServiceSpy, sinon.match({ name: req.body.name }));
		*/
	})
	

	//Teste para US220 Building Not Found
	it('listPisos com Passagem: passagemController + passagemService integration test using spy on passagemService, building not found', async function () {
		let body = {
			"codigoEdificio": "B",
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };


		const edificio1 = Edificio.create({
			dimensaoMaximaPiso: [200, 200],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
		}).getValue();

		const dummyPiso = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B1",
			"edificio": edificio1
		}).getValue();

		const dummyPiso2 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "B2",
			"edificio": edificio1
		}).getValue();

		//


		const edificio2 = Edificio.create({
			dimensaoMaximaPiso: [200, 200],
			descricaoEdificio: "Edificio principal de engenharia civil",
			nomeOpcionalEdificio: "Departamento de Engenharia Civil",
			codigoEdificio: CodigoEdificio.create("C").getValue(),
		}).getValue();

		const dummyPiso3 = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "C1",
			"edificio": edificio2
		}).getValue();

		const dummyPiso4 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "C2",
			"edificio": edificio2
		}).getValue();

		const passagem = Passagem.create({
			designacao: "B2_C2",
			edificioA: edificio1,
			edificioB: edificio2,
			pisoA: dummyPiso2,
			pisoB: dummyPiso4
		}).getValue();

		let passagens: Passagem[] = [passagem];

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");

		sinon.stub(edificioRepoInstance, "findByCodigo").resolves(null);

		sinon.stub(passagemRepoInstance, "listPassagens").returns(new Promise<Passagem[]>((resolve, reject) => {
			resolve(passagens)
		}));

		let passagemServiceInstance = Container.get("PassagemService");
		const passagemServiceSpy = sinon.spy(passagemServiceInstance, "listPisos");

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

		// Act
		// await ctrl.listPisos(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		// sinon.assert.calledOnce(res.status);
		// sinon.assert.calledWith(res.status, 404);
	});

	//Teste para US220 passagem not found 
	it('listPisos com Passagem: passagemController + passagemService integration test using spy on passagemService, passagem not found', async function () {
		let body = {
			"codigoEdificio": "B"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		const edificio1 = Edificio.create({
			dimensaoMaximaPiso: [200, 200],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
		}).getValue();

		const edificio2 = Edificio.create({
			dimensaoMaximaPiso: [200, 200],
			descricaoEdificio: "Edificio principal de engenharia civil",
			nomeOpcionalEdificio: "Departamento de Engenharia Civil",
			codigoEdificio: CodigoEdificio.create("C").getValue(),
		}).getValue();

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");


		sinon.stub(edificioRepoInstance, "findByCodigo").resolves(edificio1);

		let empty: Piso[] = [];
		sinon.stub(passagemRepoInstance, "listPassagens").resolves(empty);

		let passagemServiceInstance = Container.get("PassagemService");
		const passagemServiceSpy = sinon.spy(passagemServiceInstance, "listPisos");

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

		// Act
		// await ctrl.listPisos(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		// sinon.assert.calledOnce(res.status);
		// sinon.assert.calledWith(res.status, 404);
	});

	//list pisos com passagem US220
	it('listPisos com passagens entre edificios', async function () {
		let req: Partial<Request> = {};
		req.body = {
			"codigoEdificio": "B"
		};
		let res2: Partial<Response> = {};
		let response: IPassagemDTO[] = [
			{
				"id": "1",
				"designacao": "ABC",
				"edificioA": "1",
				"edificioB": "2",
				"pisoA": "2",
				"pisoB": "1"
			},
			{
				"id": "2",
				"designacao": "DEF",
				"edificioA": "1",
				"edificioB": "2",
				"pisoA": "3",
				"pisoB": "2"
			}
		];



		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let passagemServiceInstance = Container.get("PassagemService");

		const obj = sinon.stub(passagemServiceInstance, "listPisos").returns(Result.ok<IPassagemDTO[]>(response as IPassagemDTO[]));

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);
		// await ctrl.listPisos(<Request>req, <Response>res, <NextFunction>next);

		// sinon.assert.calledOnce(obj);
		// sinon.assert.calledWith(obj, sinon.match(req.body));
	});
	
	it('updatePassagem returns status 403 forbidden', async function () {
		let req: Partial<Request> = {};
		req.body = "Passagem não encontrada"

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let passagemServiceInstace = Container.get("PassagemService");

		const obj = sinon.stub(passagemServiceInstace, "updatePassagem").returns(Result.fail<IPassagemDTO>("Passagem não encontrada"));

		const ctrl = new PassagemController(passagemServiceInstace as IPassagemService);
		await ctrl.updatePassagem(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
		sinon.assert.calledWith(obj, "Passagem não encontrada");
	});
	
	it('updatePassagem returns piso json', async function () {
		let req: Partial<Request> = {};
		req.body = {
			"designacao": "Passagem B2_H2",
			"edificioA": "B",
			"edificioB": "H",
			"pisoA": "Piso 2",
			"pisoB": "Piso 2"
		};

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let passagemServiceInstace = Container.get("PassagemService");

		const obj = sinon.stub(passagemServiceInstace, "updatePassagem").returns(Result.ok<IPassagemDTO>(req.body as IPassagemDTO));

		const ctrl = new PassagemController(passagemServiceInstace as IPassagemService);
		await ctrl.updatePassagem(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(req.body));
	});
	
	it('updatePassagem: passagemController + passagemService integration test using spy on passagemService, success', async function () {
		// Arrange
		let body = {
			"designacao": "Passagem B2_H2",
			"edificioA": "H",
			"edificioB": "B",
			"pisoA": "H2",
			"pisoB": "B2"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");
		let pisoRepoInstance = Container.get("PisoRepo");
		let passagemServiceInstance = Container.get("PassagemService");

		const e1 = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Quimica",
			"nomeOpcionalEdificio": "Departamento de Engenharia Quimica",
			"codigoEdificio": CodigoEdificio.create("H").getValue(),
		}

		const e2 = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Informatica",
			"nomeOpcionalEdificio": "Departamento de Engenharia Informática",
			"codigoEdificio": CodigoEdificio.create("B").getValue(),
		}

		let dummyEdificio = Edificio.create(e1).getValue();
		let dummyEdificio2 = Edificio.create(e2).getValue();

		const p1 = {
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "H2",
			"edificio": dummyEdificio,
		}

		const p2 = {
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B2",
			"edificio": dummyEdificio2,
		}

		let dummyPiso = Piso.create(p1).getValue();
		let dummyPiso2 = Piso.create(p2).getValue();

		const pa = {
			id:"t123",
			designacao: "Passagem B2_H2",
			edificioA: dummyEdificio,
			edificioB: dummyEdificio2,
			pisoA: dummyPiso,
			pisoB: dummyPiso2,
		}

		let passagem = Passagem.create(pa).getValue();

		sinon.stub(passagemRepoInstance, "findByDesignacao").resolves(passagem);
		sinon.stub(edificioRepoInstance, "findByCodigo").onCall(0).resolves(dummyEdificio).onCall(1).resolves(dummyEdificio2);
		sinon.stub(pisoRepoInstance, "findByDesignacao").onCall(0).resolves(dummyPiso).onCall(1).resolves(dummyPiso2);
	

		sinon.stub(passagemRepoInstance, "save").resolves(passagem);

		const passagemServiceSpy = sinon.spy(passagemServiceInstance, "updatePassagem");

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

		// Act
		await ctrl.updatePassagem(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			designacao: "Passagem B2_H2",
			edificioA: "H",
			edificioB: "B",
			pisoA: "H2",
			pisoB: "B2"
		}));
		sinon.assert.calledOnce(passagemServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(passagemServiceSpy, sinon.match({ name: req.body.name }));
	});
	
	it('updatePassagem: passagemController + passagemService integration test using spy on passagemService, unsuccess case edificioA equals edificioB', async function () {
		// Arrange
		let body = {
			"designacao": "Passagem B2_H2",
			"edificioA": "B",
			"edificioB": "H",
			"pisoA": "Piso 2",
			"pisoB": "Piso 2"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");
		let pisoRepoInstance = Container.get("PisoRepo");

		const e1 = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Quimica",
			"nomeOpcionalEdificio": "Departamento de Engenharia Quimica",
			"codigoEdificio": CodigoEdificio.create("B").getValue(),
		}

		const e2 = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Informatica",
			"nomeOpcionalEdificio": "Departamento de Engenharia Informática",
			"codigoEdificio": CodigoEdificio.create("B").getValue(),
		}

		let dummyEdificio = Edificio.create(e1).getValue();
		let dummyEdificio2 = Edificio.create(e2).getValue();

		const p1 = {
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "H2",
			"edificio": dummyEdificio,
		}

		const p2 = {
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B2",
			"edificio": dummyEdificio2,
		}

		let dummyPiso = Piso.create(p1).getValue();
		let dummyPiso2 = Piso.create(p2).getValue();

		const pa = {
			designacao: "Passagem B2_H2",
			edificioA: dummyEdificio,
			edificioB: dummyEdificio2,
			pisoA: dummyPiso,
			pisoB: dummyPiso2,
		}

		let passagem = Passagem.create(pa).getValue();

		sinon.stub(passagemRepoInstance, "findByDesignacao").resolves(passagem); 
		sinon.stub(edificioRepoInstance, "findByCodigo").onCall(0).resolves(dummyEdificio).onCall(1).resolves(dummyEdificio2); 
		sinon.stub(pisoRepoInstance, "findByDesignacao").onCall(0).resolves(dummyPiso).onCall(1).resolves(dummyPiso2);

		let passagemServiceInstance = Container.get("PassagemService");
		const passagemServiceSpy = sinon.spy(passagemServiceInstance, "updatePassagem");

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

		// Act
		await ctrl.updatePassagem(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	});
	
	it('updatePassagem: passagemController + passagemService integration test using spy on passagemService, unsuccess case pisoA equals pisoB', async function () {
		// Arrange
		let body = {
			"designacao": "Passagem B2_H2",
			"edificioA": "B",
			"edificioB": "H",
			"pisoA": "Piso 2",
			"pisoB": "Piso 2"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");
		let pisoRepoInstance = Container.get("PisoRepo");

		const e1 = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Quimica",
			"nomeOpcionalEdificio": "Departamento de Engenharia Quimica",
			"codigoEdificio": CodigoEdificio.create("H").getValue(),
		}

		const e2 = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Informatica",
			"nomeOpcionalEdificio": "Departamento de Engenharia Informática",
			"codigoEdificio": CodigoEdificio.create("B").getValue(),
		}

		let dummyEdificio = Edificio.create(e1).getValue();
		let dummyEdificio2 = Edificio.create(e2).getValue();

		const p1 = {
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B2",
			"edificio": dummyEdificio,
		}

		const p2 = {
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B2",
			"edificio": dummyEdificio2,
		}

		let dummyPiso = Piso.create(p1).getValue();
		let dummyPiso2 = Piso.create(p2).getValue();

		const pa = {
			designacao: "Passagem B2_H2",
			edificioA: dummyEdificio,
			edificioB: dummyEdificio2,
			pisoA: dummyPiso,
			pisoB: dummyPiso2,
		}

		let passagem = Passagem.create(pa).getValue();

		sinon.stub(passagemRepoInstance, "findByDesignacao").resolves(passagem);
		sinon.stub(edificioRepoInstance, "findByCodigo").onCall(0).resolves(dummyEdificio).onCall(1).resolves(dummyEdificio2); 
		sinon.stub(pisoRepoInstance, "findByDesignacao").onCall(0).resolves(dummyPiso).onCall(1).resolves(dummyPiso2);

		let passagemServiceInstance = Container.get("PassagemService");
		const passagemServiceSpy = sinon.spy(passagemServiceInstance, "updatePassagem");

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

		// Act
		await ctrl.updatePassagem(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	});
	
	it('updatePassagem: passagemController + passagemService integration test using spy on passagemService, unsuccess case passagem does not exist', async function () {
		// Arrange
		let body = {
			"designacao": "Passagem B2_H2",
			"edificioA": "B",
			"edificioB": "H",
			"pisoA": "Piso 2",
			"pisoB": "Piso 2"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");
		let pisoRepoInstance = Container.get("PisoRepo");

		const e1 = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Quimica",
			"nomeOpcionalEdificio": "Departamento de Engenharia Quimica",
			"codigoEdificio": CodigoEdificio.create("H").getValue(),
		}

		const e2 = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio Informatica",
			"nomeOpcionalEdificio": "Departamento de Engenharia Informática",
			"codigoEdificio": CodigoEdificio.create("B").getValue(),
		}

		let dummyEdificio = Edificio.create(e1).getValue();
		let dummyEdificio2 = Edificio.create(e2).getValue();

		const p1 = {
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B2",
			"edificio": dummyEdificio2,
		}

		const p2 = {
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B2",
			"edificio": dummyEdificio2,
		}

		let dummyPiso = Piso.create(p1).getValue();
		let dummyPiso2 = Piso.create(p2).getValue();

		const pa = {
			designacao: "Passagem B2_H2",
			edificioA: dummyEdificio,
			edificioB: dummyEdificio2,
			pisoA: dummyPiso,
			pisoB: dummyPiso2,
		}

		let passagem = Passagem.create(pa).getValue();

		sinon.stub(passagemRepoInstance, "findByDesignacao").resolves(null);
		sinon.stub(edificioRepoInstance, "findByCodigo").onCall(0).resolves(dummyEdificio).onCall(1).resolves(dummyEdificio2); 
		sinon.stub(pisoRepoInstance, "findByDesignacao").onCall(0).resolves(dummyPiso).onCall(1).resolves(dummyPiso2);

		let passagemServiceInstance = Container.get("PassagemService");
		const passagemServiceSpy = sinon.spy(passagemServiceInstance, "updatePassagem");

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

		// Act
		await ctrl.updatePassagem(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	}); 
	
});