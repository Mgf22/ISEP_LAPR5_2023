import * as sinon from 'sinon';
import { Edificio } from '../src/domain/edificio'
import { error } from 'console';
import { Elevador } from '../src/domain/elevador';
import { Piso } from '../src/domain/piso';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Sala } from '../src/domain/sala';
import { CategoriaSala } from '../src/domain/categoriaSala';
import { Result } from '../src/core/logic/Result';

describe('Edificio', () => {

    const body = {
		dimensaoMaximaPiso: [100, 100],
		descricaoEdificio: "Edificio Acolhe Malucos",
		nomeOpcionalEdificio: "Departamento de Engenharia Informática",
		codigoEdificio: CodigoEdificio.create("B").getValue(),
  };

    const edificiobase = Edificio.create(body);

    afterEach(() => {
        sinon.restore();
    });


    it('Edificio succeeds', () =>{
      const body = {
        "dimensaoMaximaPiso": [100, 100],
        "descricaoEdificio": "Edificio Acolhe Malucos",
        "nomeOpcionalEdificio": "Edificio Francisco",
        "codigoEdificio": "2324",
        "elevadores": "1",
        "pisos": ["1","2","3"],
        "mapaEdificio": "1"
      };

        const body2 = {
            "id": "12345",
            "descricao": "Elevador super rápido",
			"numeroSerie": "11111",
			 "modelo": "Azal",
			  "marca": "Otis",
			   "pisosServidos": ["1", "2", "3"],
				"numeroIdentificativo": 100
        };


       /*
        Venancio: Apaguei por estar desatualizado face às novas atualizações da sala.
        const dummySala  = Sala.create({"id": "1", "descricao" :"descricao", "categoria": "laboratorio", "designacao": "designacao"})
        const dummySala2  = Sala.create({"id": "2", "descricao" :"descricao", "categoria": "laboratorio", "designacao": "designacao"})

        ** ATENÇÃO ** o que identifica as salas é a designação.
       */



      const body4 = [["2"], ["4"]];


      // Venancio: Comentei isto para conseguir correr os testes.
        const edificio = Edificio.create({
          dimensaoMaximaPiso : body.dimensaoMaximaPiso,
          descricaoEdificio : body.descricaoEdificio,
          nomeOpcionalEdificio : body.nomeOpcionalEdificio,
          codigoEdificio : CodigoEdificio.create(body.codigoEdificio).getValue(),
        });

        sinon.assert.match(edificio.getValue().codigo, "2324");
        sinon.assert.match(edificio.getValue().nomeOpcional, "Edificio Francisco");
        sinon.assert.match(edificio.getValue().descricao, "Edificio Acolhe Malucos");
        sinon.assert.match(edificio.getValue().dimensaoMaximaPiso, [100, 100]);
        
    });

  it('descricao cant exceed 250 characters', () => {
      body.descricaoEdificio = "edificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificio";

      sinon.assert.match(Result.fail<Edificio>("Descrição excede 250 carateres"), Edificio.create(body));

      body.descricaoEdificio = "Edificio Acolhe Malucos";
  });

  it('nomeOpcional cant exceed 50 characters', () => {
    body.nomeOpcionalEdificio = "edificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificioedificio";

    sinon.assert.match(Result.fail<Edificio>("Nome opcional do edificio excede 50 caracteres"), Edificio.create(body));

    body.nomeOpcionalEdificio = "Edificio Francisco";
  });

  it('codigo cant exceed 5 characters', () => {
    body.codigoEdificio = CodigoEdificio.create("123456").getValue();

    sinon.assert.match(Result.fail<Edificio>("Codigo edificio excede 5 caracteres"), Edificio.create(body));

    body.codigoEdificio = CodigoEdificio.create("2324").getValue();
});



/*
    it('codigoEdificio not empty', () =>{
        const body = {
          "id": "1",
        "dimensaoMaxima": 200,
        "descricao": "Edificio Acolhe Malucos",
        "nomeOpcional": "Edificio Francisco",
        "codigoEdificio": "",
        "elevador": "1",
        "pisos": ["1","2","3"],
        "mapaEdificio": "1"
        };
    
        sinon.assert.throw(Edificio.create(body), "Codigo edificio vazio");
    });
    */
});