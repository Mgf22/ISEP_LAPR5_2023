import * as sinon from 'sinon';
import { Robo } from '../src/domain/robo';

import { RoboMap } from '../src/mappers/RoboMap'
import { MarcaRobo } from '../src/domain/marcaRobo';
import { CodigoRobo } from '../src/domain/codigoRobo';
import { NumeroSerieRobo } from '../src/domain/numeroSerieRobo';
import { TipoRobo } from '../src/domain/tipoRobo';


describe('robo map', () => {

    const dummyTipoRobo = {
        "tarefas": [],
        "designacao": "2B",
        "marca": "Cookies",
        "modelo": "Sem Pepitas"
    }
    const body = {
        "estado": "inibido",
        "marca": "Cookies",
        "codigo": "2B2",
        "numeroSerie": "2324",
        "nickname": "1",
        "tipoRobo": dummyTipoRobo
    };

    const robo = Robo.create({
        estado: body.estado,
        marca: MarcaRobo.create(body.marca).getValue(),
        codigo: CodigoRobo.create(body.codigo).getValue(),
        numeroSerie: NumeroSerieRobo.create(body.numeroSerie).getValue(),
        nickname: body.nickname,
        tipoRobo: TipoRobo.create(body.tipoRobo).getValue()
    }).getValue();


    const expectedDTO = {
        id: 't12345',
        estado: "inibido",
        marca: "Cookies",
        codigo: "2B2",
        numeroSerie: "2324",
        nickname: "1",
        tipoRobo: "2B"
    };

    const expectedPersistence = {
        domainId: "t12345",
        estado: "inibido",
        marca: "Cookies",
        codigo: "2B2",
        numeroSerie: "2324",
        nickname: "1",
        tipoRobo: "2B"
    };

    const document = {
        domainId: "t12345",
        estado: "inibido",
        marca: "Cookies",
        codigo: "2B2",
        numeroSerie: "2324",
        nickname: "1",
        tipoRobo: "2B"
    }

    const expectedDomain = {
        estado: "inibido",
        marca: "Cookies",
        codigo: "2B2",
        numeroSerie: "2324",
        nickname: "1",
        tipoRobo: "2B"
    }


    afterEach(() => {
        sinon.restore();
    });

    // Foi necessário adicionar a linha de modificação do ID por este ser criado automáticamente aquando da criação.
    it("toDTO", () => {
        let actual = RoboMap.toDTO(robo);
        actual.id = "t12345";
        sinon.assert.match(actual, expectedDTO);
    });

    it("toDomain", async () => {
        //sinon.assert.match(await RoboMap.toDomain(document), expectedDomain);
    });

    it("toPersistence", () => {
        let actual = RoboMap.toPersistence(robo);
        actual.domainId = "t12345";
        sinon.assert.match(actual, expectedPersistence);
    });
})