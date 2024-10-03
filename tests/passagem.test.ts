import * as sinon from 'sinon';
import { Edificio } from '../src/domain/edificio';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Piso } from '../src/domain/piso';
import { Passagem } from '../src/domain/passagem';
import { Result } from '../src/core/logic/Result';

describe('Passagem', () => {


	const dummyEdificio = Edificio.create({
		codigoEdificio: CodigoEdificio.create("B").getValue(),
		nomeOpcionalEdificio: "Informatica",
		descricaoEdificio: "Grande",
		dimensaoMaximaPiso: [100,100]
	}).getValue();

	const dummyEdificio2 = Edificio.create({
		codigoEdificio: CodigoEdificio.create("H").getValue(),
		nomeOpcionalEdificio: "Fisica",
		descricaoEdificio: "Grande",
		dimensaoMaximaPiso: [100,100]
	}).getValue();

	const dummyPiso = Piso.create({
		"descricao": "Piso de gabinetes e aulas teórica-práticas",
		"designacao": "B3",
		"edificio": dummyEdificio
	}).getValue();

	const dummyPiso2 = Piso.create({
		"descricao": "Piso de gabinetes e aulas laboratoriais",
		"designacao": "H2",
		"edificio": dummyEdificio2
	}).getValue();

	const p = {
		designacao: "Passagem B para H",
		edificioA: dummyEdificio,
		edificioB: dummyEdificio2,
		pisoA: dummyPiso,
		pisoB: dummyPiso2

	};

    afterEach(() => {
        sinon.restore();
    });

    it('Passagem succeeds', () => {


        const passagem = Passagem.create(p);

        sinon.assert.match(passagem.getValue().designacao,"Passagem B para H");
		sinon.assert.match(passagem.getValue().edificioA.codigo,"B");
		sinon.assert.match(passagem.getValue().edificioB.codigo,"H");
		sinon.assert.match(passagem.getValue().pisoA.designacao,"B3");
		sinon.assert.match(passagem.getValue().pisoB.designacao,"H2");

    });

	it('designacao cant exceed 50 characters', () => {
		p.designacao = "edificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificio";
	
		sinon.assert.match(Result.fail<Passagem>("Designação do piso excede 50 caracteres"), Passagem.create(p));
	
		p.designacao = "Passagem B para H";
	  });
});