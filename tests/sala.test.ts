import * as sinon from 'sinon';
import { Edificio } from '../src/domain/edificio'
import { Piso } from '../src/domain/piso';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Result } from '../src/core/logic/Result';
import { Sala } from '../src/domain/sala';

describe('Sala', () => {

    const dummyEdificio = Edificio.create({
        "dimensaoMaximaPiso": [100,100],
        "descricaoEdificio": "Edificio Acolhe Malucos",
        "nomeOpcionalEdificio": "Departamento de Engenharia Informática",
        "codigoEdificio": CodigoEdificio.create("B").getValue(),
    }).getValue();

    const dummyPiso = Piso.create({
        "descricao": "Piso de gabinetes e aulas teórica-práticas",
        "designacao": "B3",
        "edificio": dummyEdificio
    }).getValue();

    const s = {
        descricaoSala: "Anfiteatro para palestras do núcleo de estudantes",
        categoriaSala: "anfiteatro",
        designacaoSala: "B301",
        piso: dummyPiso
    };

  afterEach(() => {
    sinon.restore();
  });

  it('sala succeeds', () => {
    const sala = Sala.create(s).getValue();
    sinon.assert.match(sala.descricao, "Anfiteatro para palestras do núcleo de estudantes");
    sinon.assert.match(sala.categoria, "anfiteatro");
    sinon.assert.match(sala.designacao, "B301");
    sinon.assert.match(sala.piso.designacao, "B3");
  });

  it('descricao cant exceed 250 characters', () => {
    s.descricaoSala = "edificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificio";

    sinon.assert.match(Result.fail<Sala>("Descrição excede 250 carateres"), Sala.create(s));

    s.descricaoSala = "Anfiteatro para palestras do núcleo de estudantes";
  });

  it('designacao cant exceed 50 characters', () => {
    s.designacaoSala = "edificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificio";

    sinon.assert.match(Result.fail<Sala>("Designacao excede 50 caracteres"), Sala.create(s));

    s.designacaoSala = "B301";
  });


});