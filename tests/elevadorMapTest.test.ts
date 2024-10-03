import * as sinon from 'sinon';
import { Elevador } from '../src/domain/elevador';

import { ElevadorMap } from '../src/mappers/ElevadorMap'
import { Edificio } from '../src/domain/edificio';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Piso } from '../src/domain/piso';

describe('elevador map', () => {



    const edificio = Edificio.create({
        dimensaoMaximaPiso: [100, 100],
        descricaoEdificio: "Edifício para aulas, seminários e reuniões",
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

    const body = {
        id: 't12345',
        descricao: "Elevador super rápido",
        numeroSerie: "11111",
        modelo: "Azur",
        marca: "Otis",
        pisosServidos: [dummyPiso, dummyPiso2],
        numeroIdentificativo: 155,
        edificio: edificio,
    };

    const elevador = Elevador.create(body).getValue();

    const expectedDTO = {
        id: 't12345',
        descricao: "Elevador super rápido",
        numeroSerie: "11111",
        modelo: "Azur",
        marca: "Otis",
        pisosServidos: ["B1", "B2"],
        numeroIdentificativo: 155,
        edificio: "B"
    };

    const expectedPersistence = {
        domainId: "t12345",
        descricao: "Elevador super rápido",
        numeroSerie: "11111",
        marca: "Otis",
        modelo: "Azur",
        pisosServidos: ["B1", "B2"],
        numeroIdentificativo: 155,
        edificio: "B"
    };

    const document = {
        domainId: "t12345",
        descricao: "Elevador super rápido",
        numeroSerie: "11111",
        marca: "Azur",
        modelo: "Otis",
        pisosServidos: ["B1", "B2"],
        numeroIdentificativo: 155,
        edificio: "B"
    }

    const expectedDomain = {
        descricao: "Elevador super rápido",
        numeroSerie: "11111",
        marca: "Azur",
        modelo: "Otis",
        pisosServidos: ["1", "2"],
        numeroIdentificativo: 155,
        edificio: "B"
    }


    afterEach(() => {
        sinon.restore();
    });

    // Foi necessário adicionar a linha de modificação do ID por este ser criado automáticamente aquando da criação.
    it("toDTO", () => {
        let actual = ElevadorMap.toDTO(elevador);
        actual.id = "t12345";
        sinon.assert.match(actual, expectedDTO);
    });

    it("toDomain", async () => {
        //sinon.assert.match(await ElevadorMap.toDomain(document), expectedDomain);
    });

    it("toPersistence", () => {
        let actual = ElevadorMap.toPersistence(elevador);
        actual.domainId = "t12345";
        sinon.assert.match(actual, expectedPersistence);
    });
})