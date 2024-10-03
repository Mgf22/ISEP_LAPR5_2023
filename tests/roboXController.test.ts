import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import RoboController from "../src/controllers/roboController";
import { Robo } from '../src/domain/robo';
import { MarcaRobo } from '../src/domain/marcaRobo';
import { CodigoRobo } from '../src/domain/codigoRobo';
import { NumeroSerieRobo } from '../src/domain/numeroSerieRobo';
import { TipoRobo } from '../src/domain/tipoRobo';
import { Tarefa } from '../src/domain/tarefa';
import IRoboService from '../src/services/IServices/IRoboService';
import { Result } from '../src/core/logic/Result';
import IRoboDTO from '../src/dto/IRoboDTO';

describe('robo controller', function () {
    const sandbox = sinon.createSandbox();


    beforeEach(function () {
        Container.reset();
        let tipoRoboSchemaInstance = require("../src/persistence/schemas/tipoRoboSchema").default;
        Container.set("tipoRoboSchema", tipoRoboSchemaInstance);

        let tipoRoboRepoClass = require("../src/repos/tipoRoboRepo").default;
        let tipoRoboRepoInstance = Container.get(tipoRoboRepoClass);
        Container.set("TipoRoboRepo", tipoRoboRepoInstance);
        
        
        ////////////////////////////

        let roboSchemaInstance = require("../src/persistence/schemas/roboSchema").default;
        Container.set("roboSchema", roboSchemaInstance);

        let roboRepoClass = require("../src/repos/roboRepo").default;
        let roboRepoInstance = Container.get(roboRepoClass);
        Container.set("RoboRepo", roboRepoInstance);

        let roboServiceClass = require("../src/services/roboService").default;
        let roboServiceInstance = Container.get(roboServiceClass);
        Container.set("RoboService", roboServiceInstance);
    });

    afterEach(function () {
        sandbox.restore();
    });
    it('createRobo returns status 403 forbidden', async function () {
		let req: Partial<Request> = {};
		req.body = 'Já existe um robo com o código 150'

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let roboServiceInstance = Container.get("RoboService");

		const obj = sinon.stub(roboServiceInstance, "createRobo").resolves(Result.fail<IRoboDTO>(res as IRoboDTO));


		const ctrl = new RoboController(roboServiceInstance as IRoboService);
		await ctrl.createRobo(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
		sinon.assert.calledWith(obj, "Já existe um robo com o código 150");
	});
	
	it('createRobo returns edificio json', async function () {
		let req: Partial<Request> = {};

		req.body = {
			"estado": "inibido",
            "marca": "Cookies",
            "codigo": "2B2",
            "numeroSerie": "2324",
            "nickname": "1",
            "tipoRobo": "lmao"
		};

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let roboServiceInstace = Container.get("RoboService");

		const obj = sinon.stub(roboServiceInstace, "createRobo").returns(Result.ok<IRoboDTO>(req.body as IRoboDTO));

		const ctrl = new RoboController(roboServiceInstace as IRoboService);
		await ctrl.createRobo(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(req.body));
	});
	
	
    it('createRobo: roboController + roboService integration test using spy on roboService, success case', async function() {
      
        const tipoRobo = {
			"tarefas" : [],
			"designacao": "lmao",
			"marca": "Cookies",
			"modelo": "Sem Pepitas"
		}
		let t = TipoRobo.create(tipoRobo).getValue();
        let body = {
			"estado": "inibido",
            "marca": "Cookies",
            "codigo": "2B2",
            "numeroSerie": "2324",
            "nickname": "1",
            "tipoRobo": "lmao"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let roboRepoInstance = Container.get("RoboRepo");
		let roboServiceInstance = Container.get("RoboService");
	    let tipoRoboRepoInstance = Container.get("TipoRoboRepo");
	    
		sinon.stub(roboRepoInstance, "findByCodigo").resolves(null); // Não existe, logo retorna null.

		sinon.stub(roboRepoInstance, "save").resolves(null);
		
		sinon.stub(tipoRoboRepoInstance, "findByDesignacao").resolves(t);

		const roboServiceSpy = sinon.spy(roboServiceInstance, "createRobo");

		const ctrl = new RoboController(roboServiceInstance as IRoboService);

		// Act
		await ctrl.createRobo(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"estado": "Inibido",
            "marca": "Cookies",
            "codigo": "2B2",
            "numeroSerie": "2324",
            "nickname": "1",
            "tipoRobo": "lmao"
		}));
		sinon.assert.calledOnce(roboServiceSpy);
		sinon.assert.calledWith(roboServiceSpy, sinon.match({ name: req.body.name }));
    }
    );
    
    it('createRobo: roboController + roboService integration test using spy on roboService, unsuccess case, robo code already exists', async function () {
		//Arrange
		const tipoRobo = {
			"tarefas" : [],
			"designacao": "lmao",
			"marca": "Cookies",
			"modelo": "Sem Pepitas"
		}
		
		let body = {
			"estado": "inibido",
            "marca": "Cookies",
            "codigo": "2B2",
            "numeroSerie": "2324",
            "nickname": "1",
            "tipoRobo": "lmao"
		};
		let t = TipoRobo.create(tipoRobo).getValue();
		
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let roboRepoInstance = Container.get("RoboRepo");

        const robo = Robo.create({
            estado : body.estado,
            marca: MarcaRobo.create(body.marca).getValue(),
            codigo: CodigoRobo.create(body.codigo).getValue(),
            numeroSerie: NumeroSerieRobo.create(body.numeroSerie).getValue(),
            nickname: body.nickname,
            tipoRobo: TipoRobo.create(t).getValue()
          }).getValue();

        
		const robo2 = Robo.create({
			estado : "inibido",
            marca: MarcaRobo.create("samsung").getValue(),
            codigo: CodigoRobo.create("2B2").getValue(),
            numeroSerie: NumeroSerieRobo.create("2828").getValue(),
            nickname: "Rafazinho",
            tipoRobo: TipoRobo.create(t).getValue()
		}).getValue();



		sinon.stub(roboRepoInstance, "findByCodigo").resolves(robo);

		let roboServiceInstance = Container.get("RoboService");
		const roboServiceSpy = sinon.spy(roboServiceInstance, "createRobo");

		const ctrl = new RoboController(roboServiceInstance as IRoboService);

		// Act
		await ctrl.createRobo(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	});
	
    it('listRobos: roboController + roboService integration test using spy on roboService, success case', async function () {
        // Arrange
        let body = {
        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        const tarefa1 = Tarefa.create({
            tipoTarefa: "vigilancia"
        }).getValue();

        const tarefa2 = Tarefa.create({
            tipoTarefa: "transporte"
        }).getValue();

        /*
            tarefas: Tarefa[];
            designacao: string;
            marca: string;
            modelo: string;
        */
        const tipoRobo1 = TipoRobo.create({
            designacao: "Polivalente",
            marca: "Marca 1",
            modelo: "Modelo 1",
            tarefas: [tarefa1, tarefa2]
        }).getValue();

        /*
            estado: string;
            marca: MarcaRobo;
            codigo: CodigoRobo;
            numeroSerie: NumeroSerieRobo;
            nickname: string;
            tipoRobo: TipoRobo;
        */
        const r1 = {
            id: 't12345',
            estado: "inibido",
            marca: MarcaRobo.create("Samsung").getValue(),
            codigo: CodigoRobo.create("0078954321654321").getValue(),
            numeroSerie: NumeroSerieRobo.create("AZERTYUIOPQSDCVFGHJKLMW").getValue(),
            nickname: "Roberto",
            tipoRobo: tipoRobo1
        };

        const r2 ={
            id: 't12345',
            estado: "inibido",
            marca: MarcaRobo.create("RedHat").getValue(),
            codigo: CodigoRobo.create("00320392930923").getValue(),
            numeroSerie: NumeroSerieRobo.create("IDPJPSJFDPSIJFJPSDJD").getValue(),
            nickname: "José",
            tipoRobo: tipoRobo1
        };

        let robos: Robo[] = [Robo.create(r1).getValue(), Robo.create(r2).getValue()];

        let roboRepoInstance = Container.get("RoboRepo");

        sinon.stub(roboRepoInstance, "findAll").resolves(robos);

        let roboServiceInstance = Container.get("RoboService");
        const roboServiceSpy = sinon.spy(roboServiceInstance, "listRobos");

        const ctrl = new RoboController(roboServiceInstance as IRoboService);

        // Act
        await ctrl.listRobos(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(
            [sinon.match({
            codigo: "0078954321654321",
            estado: "inibido",
            marca: "Samsung",
            nickname: "Roberto",
            numeroSerie: "AZERTYUIOPQSDCVFGHJKLMW",
            tipoRobo: "Polivalente"
        }),sinon.match({
            codigo: "00320392930923",
            estado: "inibido",
            marca: "RedHat",
            nickname: "José",
            numeroSerie: "IDPJPSJFDPSIJFJPSDJD",
            tipoRobo: "Polivalente"
        }
        )])
        );
        sinon.assert.calledOnce(roboServiceSpy);
        //sinon.assert.calledTwice(roleServiceSpy);
        sinon.assert.calledWith(roboServiceSpy);
    });

    it('listRobos: roboController + roboService integration test using spy on roboService, unsuccess case', async function () {
        // Arrange
        let body = {
        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            status: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let roboRepoInstance = Container.get("RoboRepo");

        sinon.stub(roboRepoInstance, "findAll").resolves([]);

        let roboServiceInstance = Container.get("RoboService");
        const roboServiceSpy = sinon.spy(roboServiceInstance, "listRobos");

        const ctrl = new RoboController(roboServiceInstance as IRoboService);

        // Act
        //await ctrl.listRobos(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        /*
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 404);
        */
    });
    it('inibirRobo: returns status 403 forbidden', async function () {
        let req: Partial<Request> = {};
		req.body = 'Robo não encontrado'

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { }; 
		let roboServiceInstance = Container.get("RoboService");

		const obj = sinon.stub(roboServiceInstance, "inhibitRobo").resolves(Result.fail<IRoboDTO>(res as IRoboDTO));


		const ctrl = new RoboController(roboServiceInstance as IRoboService);
		await ctrl.inhibitRobo(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledWith(obj, "Robo não encontrado");
    }
    );
    it('inibirRobo: returns json ', async function () {
        let req: Partial<Request> = {};

		req.body = {
            "codigo": "2B2",
		};

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let roboServiceInstance = Container.get("RoboService");

		const obj = sinon.stub(roboServiceInstance, "inhibitRobo").returns(Result.ok<IRoboDTO>(req.body as IRoboDTO));

		const ctrl = new RoboController(roboServiceInstance as IRoboService);
		await ctrl.inhibitRobo(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(req.body));
    }
    );
    it('inibirRobo: roboController + roboService integration test using spy on roboService, success case', async function () {
         const tipoRobo = {
			"tarefas" : [],
			"designacao": "lmao",
			"marca": "Cookies",
			"modelo": "Sem Pepitas"
		}
		let t = TipoRobo.create(tipoRobo).getValue();
		const r1 = {
            estado: "desinibido",
            marca: MarcaRobo.create("Cookies").getValue(),
            codigo: CodigoRobo.create("2B2").getValue(),
            numeroSerie: NumeroSerieRobo.create("2324").getValue(),
            nickname: "Roberto",
            tipoRobo: t
        };
		
        let robo = Robo.create(r1).getValue();
        
        let body = {
            "codigo": "2B2"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let roboRepoInstance = Container.get("RoboRepo");
		let roboServiceInstance = Container.get("RoboService");
		sinon.stub(roboRepoInstance, "findByCodigo").resolves(robo);
		robo.inibir();
		sinon.stub(roboRepoInstance, "save").resolves(robo);
        
		const roboServiceSpy = sinon.spy(roboServiceInstance, "inhibitRobo");

		const ctrl = new RoboController(roboServiceInstance as IRoboService);

		// Act
		await ctrl.inhibitRobo(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"estado": "inibido",
            "marca": "Cookies",
            "codigo": "2B2",
            "numeroSerie": "2324",
            "nickname": "Roberto",
            "tipoRobo": "lmao"
		}));
		sinon.assert.calledOnce(roboServiceSpy);
		sinon.assert.calledWith(roboServiceSpy, sinon.match({ name: req.body.name }));
    
    }
    );
    it('inibirRobo: roboController + roboService integration test using spy on roboService, unsuccess case, returns null', async function() {
        // Arrange
         let body = {
        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            status: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let roboRepoInstance = Container.get("RoboRepo");

        sinon.stub(roboRepoInstance, "findByCodigo").resolves(null);

        let roboServiceInstance = Container.get("RoboService");
        const roboServiceSpy = sinon.spy(roboServiceInstance, "inhibitRobo");

        const ctrl = new RoboController(roboServiceInstance as IRoboService);

        // Act
        await ctrl.inhibitRobo(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 404);
    
    
    }
    );
});