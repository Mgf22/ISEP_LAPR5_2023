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
import { PisoMap } from '../src/mappers/PisoMap';

describe('piso map', () => {

    const dummyEdificio = Edificio.create({
        dimensaoMaximaPiso: [100,100],
        descricaoEdificio: "Edificio Acolhe Malucos",
        nomeOpcionalEdificio: "Departamento de Engenharia Informática",
        codigoEdificio: CodigoEdificio.create("B").getValue(),
    }).getValue();

    const piso = Piso.create({
        "descricao": "Piso de gabinetes e aulas teórica-práticas",
        "designacao": "B1",
        "edificio": dummyEdificio
    }).getValue();

    const expectedDTO = {
        id: 't12345',
        descricao: "Piso de gabinetes e aulas teórica-práticas",
        designacao: "B1",
        edificio: "B"
    };

    const expectedPersistence = {
        domainId: "t12345",
        descricao: "Piso de gabinetes e aulas teórica-práticas",
        designacao: "B1",
        edificio: "B"
    };

    const document = {
        domainId: "t12345",
        descricao: "Piso de gabinetes e aulas teórica-práticas",
        designacao: "B1",
        edificio: "B"
    }

    const expectedDomain = {
        descricao: "Piso de gabinetes e aulas teórica-práticas",
        designacao: "B1",
        edificio: "B"
    }


    afterEach(() => {
        sinon.restore();
    });

    it("toDTO", () => {
        let actual = PisoMap.toDTO(piso);
        actual.id = "t12345";
        sinon.assert.match(actual, expectedDTO);
    });

    it("toDomain", async () => {
        //sinon.assert.match(await ElevadorMap.toDomain(document), expectedDomain);
    });

    it("toPersistence", () => {
        let actual = PisoMap.toPersistence(piso);
        actual.domainId = "t12345";
        sinon.assert.match(actual, expectedPersistence);
    });
})