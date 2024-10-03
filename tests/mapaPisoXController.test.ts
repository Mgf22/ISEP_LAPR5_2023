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
import IMapaPisoDTO from '../src/dto/IMapaPisoDTO';
import MapaPisoController from '../src/controllers/mapaPisoController';
import IMapaPisoService from '../src/services/IServices/IMapaPisoService';
import { create } from 'lodash';
import { MapaPiso } from '../src/domain/mapaPiso';




describe('mapaPiso controller', function () {
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

        //PISO
        let pisoSchemaInstance = require("../src/persistence/schemas/pisoSchema").default;
        Container.set("pisoSchema", pisoSchemaInstance);

        let pisoRepoClass = require("../src/repos/pisoRepo").default;
        let pisoRepoInstance = Container.get(pisoRepoClass);
        Container.set("PisoRepo", pisoRepoInstance);

        let pisoServiceClass = require("../src/services/pisoService").default;
		let pisoServiceInstance = Container.get(pisoServiceClass);
		Container.set("PisoService", pisoServiceInstance);


        //MAPA PISO
        let mapaPisoSchemaInstance = require("../src/persistence/schemas/mapaPisoSchema").default;
        Container.set("mapaPisoSchema", mapaPisoSchemaInstance);

        let mapaPisoRepoClass = require("../src/repos/mapaPisoRepo").default;
        let mapaPisoRepoInstance = Container.get(mapaPisoRepoClass);
        Container.set("MapaPisoRepo", mapaPisoRepoInstance);

        let mapaPisoServiceClass = require("../src/services/mapaPisoService").default;
        let mapaPisoServiceInstance = Container.get(mapaPisoServiceClass);
		Container.set("MapaPisoService", mapaPisoServiceInstance);

	});


	afterEach(function () {
		sandbox.restore();
	});

	/*
	it('createMapaPiso returns status 403 forbidden', async function () {
		let req: Partial<Request> = {};
		req.body = 'Este piso já tem uma atribuição de um mapa de piso'

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let mapaPisoServiceInstance = Container.get("MapaPisoService");

		const obj = sinon.stub(mapaPisoServiceInstance, "createMapaPiso").returns(Result.fail<IMapaPisoDTO>(res as IMapaPisoDTO));


		const ctrl = new MapaPisoController(mapaPisoServiceInstance as IMapaPisoService);
		await ctrl.createMapaPiso(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
		sinon.assert.calledWith(obj, "Este piso já tem uma atribuição de um mapa de piso");
	});




	it('createEdificio returns edificio json', async function () {
		let req: Partial<Request> = {};

		req.body = {
			"mapa" : "MAPA DE PISO 100 X 100 COM 5 ENTRADAS E 1 SAÍDA E COM UMA PROFUNDIDADE DE 2",
            "piso" : "Piso 4"
		};


		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let mapaPisoServiceInstace = Container.get("MapaPisoService");

		const obj = sinon.stub(mapaPisoServiceInstace, "createMapaPiso").returns(Result.ok<IMapaPisoDTO>(req.body as IMapaPisoDTO));

		const ctrl = new MapaPisoController(mapaPisoServiceInstace as IMapaPisoService);
		await ctrl.createMapaPiso(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(req.body));
	});

	*/

	it('createMapaPiso: mapaPisoController + mapaPisoService integration test using spy on mapaPisoService, success', async function () {
		// Arrange
		let body = {
			"mapa" : "MAPA DE PISO 100 X 100 COM 5 ENTRADAS E 1 SAÍDA E COM UMA PROFUNDIDADE DE 2",
            "piso" : "Piso 4"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let mapaPisoRepoInstance = Container.get("MapaPisoRepo");

		const e = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio de Química",
			"nomeOpcionalEdificio": "Edificio L",
			"codigoEdificio": CodigoEdificio.create("L").getValue(),
		}

		let dummyEdificio = Edificio.create(e).getValue();

        const bodypiso = {
            descricao: "Primeiro piso do edificio B",
            designacao: "Piso 4",
            edificio: dummyEdificio
        }
    
        const pisodummy = Piso.create(bodypiso).getValue();

		let out : JSON = <JSON><unknown>{
        "A" : 1,
        "B" : 2
    };

        const mapaPiso = MapaPiso.create({
            mapa: out,
            piso : pisodummy
        }).getValue();
		
		let pisoRepoInstance = Container.get("PisoRepo");

		sinon.stub(pisoRepoInstance, "findByDesignacao").resolves(pisodummy);

        sinon.stub(mapaPisoRepoInstance, "findByPiso").resolves(null);

		sinon.stub(mapaPisoRepoInstance, "save").resolves(null);

        let mapaPisoServiceInstance = Container.get("MapaPisoService");

		let mapaPisoServiceSpy = sinon.spy(mapaPisoServiceInstance, "createMapaPiso");

		const ctrl = new MapaPisoController(mapaPisoServiceInstance as IMapaPisoService);

		// Act
		await ctrl.createMapaPiso(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"mapa" : "MAPA DE PISO 100 X 100 COM 5 ENTRADAS E 1 SAÍDA E COM UMA PROFUNDIDADE DE 2",
            "piso" : "Piso 4"
		}));
		sinon.assert.calledOnce(mapaPisoServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(mapaPisoServiceSpy, sinon.match({ name: req.body.name }));
	});

	

	it('createPiso: mapaPisoController + mapaPisoService integration test using spy on mapaPisoService, unsuccess case, piso already has a map', async function () {
		// Arrange
		let body = {
			"mapa" : "MAPA DE PISO 100 X 100 COM 5 ENTRADAS E 1 SAÍDA E COM UMA PROFUNDIDADE DE 2",
            "piso" : "Piso 4"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let mapaPisoRepoInstance = Container.get("MapaPisoRepo");

		const e = {
			"dimensaoMaximaPiso": [200, 200],
			"descricaoEdificio": "Edificio de Química",
			"nomeOpcionalEdificio": "Edificio L",
			"codigoEdificio": CodigoEdificio.create("L").getValue(),
		}

		let dummyEdificio = Edificio.create(e).getValue();

        const bodypiso = {
            descricao: "Primeiro piso do edificio B",
            designacao: "Piso 4",
            edificio: dummyEdificio
        }
       
    
    
        const pisodummy = Piso.create(bodypiso).getValue();
        

		let out : JSON = <JSON><unknown>{
			"A" : 1,
			"B" : 2
		};

		let out2 : JSON = <JSON><unknown>{
			"A" : 3,
			"B" : 4
		};

        const mapaPiso1 = MapaPiso.create({
            mapa : out,
            piso : pisodummy
        }).getValue();

        const mapaPiso2 = MapaPiso.create({
            mapa: out2,
            piso : pisodummy
        }).getValue();
        

		sinon.stub(mapaPisoRepoInstance, "findByPiso").resolves(mapaPiso1); //insucesso porque o mapaPiso1 ja utiliza o mesmo piso

		let mapaPisoServiceInstance = Container.get("MapaPisoService");
		let mapaPisoServiceSpy = sinon.spy(mapaPisoServiceInstance, "createMapaPiso");

		const ctrl = new MapaPisoController(mapaPisoServiceInstance as IMapaPisoService);

		// Act
		await ctrl.createMapaPiso(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	});
	
    
});