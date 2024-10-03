import * as sinon from 'sinon';
import { Tarefa } from '../src/domain/tarefa';
import { TipoRobo } from '../src/domain/tipoRobo';
import { Result } from '../src/core/logic/Result';

describe('TipoRobo', () => {

    afterEach(() => {
        sinon.restore();
    });

    const dummyTarefa1 = Tarefa.create({
        tipoTarefa: "vigilancia"
    }).getValue();

    const body = {
        "designacao": "Polivalente",
        "marca": "Marca 1",
        "modelo": "Modelo 1",
        "tarefas": [dummyTarefa1],
    };

    it('TipoRobo succeeds', () => {

        const tipoRobo = TipoRobo.create({
            designacao: body.designacao,
            marca: body.marca,
            modelo: body.modelo,
            tarefas: body.tarefas
        }).getValue();

        sinon.assert.match(tipoRobo.designacao,"Polivalente");
        sinon.assert.match(tipoRobo.marca,"Marca 1");
        sinon.assert.match(tipoRobo.modelo,"Modelo 1");
        sinon.assert.match(tipoRobo.tarefas,[dummyTarefa1]);
    })

    it('designacao cant exceed 25 characters', () => {
        body.designacao = "edificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificio";
    
        sinon.assert.match(Result.fail<TipoRobo>("Designação excede 25 carateres"), TipoRobo.create(body));
    
        body.designacao = "Polivalente";
      });
    
      it('marca cant exceed 50 characters', () => {
        body.marca = "edificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificio";
    
        sinon.assert.match(Result.fail<TipoRobo>("Marca excede 50 carateres"), TipoRobo.create(body));
    
        body.marca = "Marca 1";
      });

      it('modelo cant exceed 100 characters', () => {
        body.modelo = "edificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificio";
    
        sinon.assert.match(Result.fail<TipoRobo>("Modelo excede 100 carateres"), TipoRobo.create(body));
    
        body.modelo = "Modelo 1";
      });
})