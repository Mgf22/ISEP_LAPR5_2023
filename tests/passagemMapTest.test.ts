import * as sinon from 'sinon';
import { Passagem } from '../src/domain/passagem';
import { PassagemMap } from '../src/mappers/PassagemMap'
import { Elevador } from '../src/domain/elevador';
import { Piso } from '../src/domain/piso';
import { Sala } from '../src/domain/sala';
import { Edificio } from '../src/domain/edificio';
import { CategoriaSala } from '../src/domain/categoriaSala';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Container } from 'typedi';

describe('passagem map', () => {

    /////////////////////////
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

    //let containerClass = require("typedi");
    //let containerInstance = Container.get(containerClass);
    //Container.set("Container", containerInstance);
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
    /////////////////////////

    sinon.stub(Container, 'get')
        .withArgs('EdificioRepo').returns(edificioRepoInstance)
        .withArgs('PisoRepo').returns(pisoRepoInstance);

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

    const elevador = Elevador.create({
        descricao: "Elevador super rápido",
        numeroSerie: "11111",
        modelo: "Azur",
        marca: "Otis",
        pisosServidos: [dummyPiso, dummyPiso2],
        numeroIdentificativo: 155,
        edificio: edificio,
    });

    const edificio2 = Edificio.create({
        dimensaoMaximaPiso: [100,100],
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

    const elevador2 = Elevador.create({
        descricao: "Elevador super rápido",
        numeroSerie: "501230",
        modelo: "Azur",
        marca: "Otis",
        pisosServidos: [dummyPiso3, dummyPiso4],
        numeroIdentificativo: 199,
        edificio: edificio2,
    });

    const passagem = Passagem.create({
        designacao: "B2_C2",
        edificioA: edificio,
        edificioB: edificio2,
        pisoA: dummyPiso2,
        pisoB: dummyPiso4
    }).getValue();

    const expectedDTO = {
        designacao: "B2_C2",
        edificioA: "B",
        edificioB: "C",
        pisoA: "B2",
        pisoB: "C2"
    };

    const expectedPersistence = {
        domainId: "t12345",
        designacao: "B2_C2",
        edificioA: "B",
        edificioB: "C",
        pisoA: "B2",
        pisoB: "C2"
    };

    const document = {
        domainId: "t12345",
        designacao: "B2_C2",
        edificio1: "B",
        edificio2: "C",
        piso1: "B2",
        piso2: "J2"
    }

    const expectedDomain = {
        designacao: "B2_C2",
        edificio1: "B",
        edificio2: "C",
        piso1: "B2",
        piso2: "C2"
    }


    afterEach(() => {
        sinon.restore();
    });

    it("toDomain", async () => {

        // Necessidade de fazer stub.
        let edificioRepoInstace = Container.get("EdificioRepo");
        let pisoRepoInstace = Container.get("PisoRepo");

        /*
        const obj1 = sinon.stub(edificioRepoInstace, "findByCodigo")
            .onCall(0).resolves(edificio1.getValue())
            .onCall(1).resolves(edificio2.getValue());

        const obj2 = sinon.stub(pisoRepoInstace, "findByDesignacao")
            .onCall(0).resolves(dummyPiso1)
            .onCall(1).resolves(dummyPiso3);
        

        sinon.stub(containerInstance, "get")
        .onCall(0).returns(edificioRepoInstace)
        .onCall(1).returns(pisoRepoInstace);
        */

        //const result = await PassagemMap.toDomain(document);
        ///sinon.assert.match(result, expectedDomain);
        sinon.restore();
    });

    // Foi necessário adicionar a linha de modificação do ID por este ser criado automáticamente aquando da criação.
    it("toDTO", () => {
        let actual = PassagemMap.toDTO(passagem);
        actual.id = "t12345";
        sinon.assert.match(actual, expectedDTO);
    });

    it("toPersistence", () => {
        let actual = PassagemMap.toPersistence(passagem);
        actual.domainId = "t12345";
        sinon.assert.match(actual, expectedPersistence);
    });
})