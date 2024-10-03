import * as sinon from 'sinon';
import { Edificio } from '../src/domain/edificio'
import { Piso } from '../src/domain/piso';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Result } from '../src/core/logic/Result';

describe('Piso', () => {

  const dummyEdificio = Edificio.create({
    codigoEdificio: CodigoEdificio.create("B").getValue(),
    nomeOpcionalEdificio: "Informatica",
    descricaoEdificio: "Grande",
    dimensaoMaximaPiso: [100,100]
  }).getValue();


  const p = {
    descricao: "Primeiro piso do edificio B",
    designacao: "Piso 1",
    edificio: dummyEdificio
  };

  afterEach(() => {
    sinon.restore();
  });

  it('Piso succeeds', () => {


    const piso = Piso.create(p);

    sinon.assert.match(piso.getValue().descricao, "Primeiro piso do edificio B");
    sinon.assert.match(piso.getValue().designacao, "Piso 1");
    sinon.assert.match(piso.getValue().edificio.codigo, "B");
  });

  it('descricao cant exceed 250 characters', () => {
    p.descricao = "edificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificio";

    sinon.assert.match(Result.fail<Piso>("Descrição excede 250 carateres"), Piso.create(p));

    p.descricao = "Primeiro piso do edificio B";
  });

  it('designacao cant exceed 50 characters', () => {
    p.designacao = "edificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificio";

    sinon.assert.match(Result.fail<Piso>("Designação do piso excede 50 caracteres"), Piso.create(p));

    p.designacao = "Piso 1";
  });


});