import * as sinon from 'sinon';
import { Elevador } from '../src/domain/elevador'
import { error } from 'console';
import { Edificio } from '../src/domain/edificio';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Piso } from '../src/domain/piso';
import { Result } from '../src/core/logic/Result';

describe('Elevador', () => {

	const edificio = Edificio.create({
		dimensaoMaximaPiso: [100, 100],
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

	const body = {
		descricao: "Elevador super rápido",
		numeroSerie: "11111",
		modelo: "Azur",
		marca: "Otis",
		pisosServidos: [dummyPiso, dummyPiso2],
		numeroIdentificativo: 155,
		edificio: edificio,
	};

	const elevador = Elevador.create(body).getValue();

    afterEach(() => {
        sinon.restore();
    });

    it('Elevador succeeds', () => {


        sinon.assert.match(elevador.descricao, "Elevador super rápido");
        sinon.assert.match(elevador.numeroSerie, "11111");
        sinon.assert.match(elevador.modelo, "Azur");
        sinon.assert.match(elevador.marca, "Otis");
        sinon.assert.match(elevador.pisosServidos, [dummyPiso, dummyPiso2]);
        sinon.assert.match(elevador.numeroIdentificativo, 155);
		sinon.assert.match(elevador.edificio, edificio);
    });

    it('descricao cant exceed 250 characters', () => {
        body.descricao = "ElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevadorElevador";

		sinon.assert.match(Result.fail<Elevador>("Descrição excede 250 carateres"), Elevador.create(body));

		body.descricao = "Elevador super rápido";
    });

	/*it('numeroSerie not empty', () => {
        body.numeroSerie = "";

        sinon.assert.match(Result.fail<Elevador>, Elevador.create(body));

		body.numeroSerie = "11111";
    });
	*/
});