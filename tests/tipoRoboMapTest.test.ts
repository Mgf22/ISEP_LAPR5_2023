import * as sinon from 'sinon';
import { TipoRobo } from '../src/domain/tipoRobo';

import { TipoRoboMap } from '../src/mappers/TipoRoboMap'
import { Tarefa } from '../src/domain/tarefa';


describe('tipoRobo map', () => {

    const dummyTarefa1 = Tarefa.create({
        tipoTarefa: "vigilancia"
    }).getValue();

    const dummyTarefa2 = Tarefa.create({
        tipoTarefa: "transporte"
    }).getValue();

    const tipoRobo = TipoRobo.create({
        designacao: "Polivalente",
        marca: "Marca 1",
        modelo: "Modelo 1",
        tarefas: [dummyTarefa1, dummyTarefa2]
    }).getValue();

    const expectedDTO = {
        domainId: 't12345',
        designacao: "Polivalente",
        marca: "Marca 1",
        modelo: "Modelo 1",
        tarefas: ["vigilancia","transporte"]
    };

    const expectedPersistence = {
        domainId: "t12345",
        designacao: "Polivalente",
        marca: "Marca 1",
        modelo: "Modelo 1",
        tarefas: ["vigilancia","transporte"]
    };

    const document = {
        domainId: "t12345",
        designacao: "Polivalente",
        marca: "Marca 1",
        modelo: "Modelo 1",
        tarefas: ["vigilancia","transporte"]
    }

    const expectedDomain = {
        estado: "inibido",
        designacao: "Polivalente",
        marca: "Marca 1",
        modelo: "Modelo 1",
        tarefas: ["vigilancia","transporte"]
    }


    afterEach(() => {
        sinon.restore();
    });

    // Foi necessário adicionar a linha de modificação do ID por este ser criado automáticamente aquando da criação.
    it("toDTO", () => {
        let actual = TipoRoboMap.toDTO(tipoRobo);
        actual.domainId = "t12345";
        sinon.assert.match(actual, expectedDTO);
    });

    it("toDomain", async () => {
        //sinon.assert.match(await RoboMap.toDomain(document), expectedDomain);
    });

    it("toPersistence", () => {
        let actual = TipoRoboMap.toPersistence(tipoRobo);
        actual.domainId = "t12345";
        sinon.assert.match(actual, expectedPersistence);
    });
})