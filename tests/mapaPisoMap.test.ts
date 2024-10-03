
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
import { MapaPiso } from '../src/domain/mapaPiso';
import {MapaPisoMap} from '../src/mappers/MapaPisoMap';

describe('mapaPiso Map', () => {

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

    let out : JSON = <JSON><unknown>{
        "A" : 1,
        "B" : 2
    };

    const mapaPiso = MapaPiso.create({
        mapa: out,
        piso : piso
    }).getValue();

    const expectedDTO = {
        id: 't12345',
        mapa: out,
    };

    const expectedPersistence = {
        domainId: "t12345",
        mapa: out
    };

    const document = {
        domainId: "t12345",
        descricao: "Piso de gabinetes e aulas teórica-práticas",
        designacao: "B1",
        edificio: "B"
    }

    const expectedDomain = {
        mapa: "mapa do piso"
    }


    afterEach(() => {
        sinon.restore();
    });

    it("toDTO", () => {
        let actual = MapaPisoMap.toDTO(mapaPiso);
        actual.id = "t12345";
        sinon.assert.match(actual, expectedDTO);
    });

    it("toDomain", async () => {
        //sinon.assert.match(await ElevadorMap.toDomain(document), expectedDomain);
    });

    it("toPersistence", () => {
        let actual = MapaPisoMap.toPersistence(mapaPiso);
        actual.domainId = "t12345";
        sinon.assert.match(actual, expectedPersistence);
    });
})
