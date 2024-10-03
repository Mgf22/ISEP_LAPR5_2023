import * as sinon from 'sinon';
import { Edificio } from '../src/domain/edificio'
import { error } from 'console';
import { Elevador } from '../src/domain/elevador';
import { Piso } from '../src/domain/piso';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Sala } from '../src/domain/sala';
import { CategoriaSala } from '../src/domain/categoriaSala';
import { Robo } from '../src/domain/robo';
import { MarcaRobo } from '../src/domain/marcaRobo';
import { CodigoRobo } from '../src/domain/codigoRobo';
import { NumeroSerieRobo } from '../src/domain/numeroSerieRobo';
import { TipoRobo } from '../src/domain/tipoRobo';

describe('Robo', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('Robo succeeds', () =>{
		
		const tipoRobo = {
			"tarefas" : [],
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
        "tipoRobo": tipoRobo
      };

        const robo = Robo.create({
          estado : body.estado,
          marca: MarcaRobo.create(body.marca).getValue(),
          codigo: CodigoRobo.create(body.codigo).getValue(),
          numeroSerie: NumeroSerieRobo.create(body.numeroSerie).getValue(),
          nickname: body.nickname,
          tipoRobo: TipoRobo.create(body.tipoRobo).getValue()
        });

        sinon.assert.match(robo.getValue().codigo.value, "2B2");
        sinon.assert.match(robo.getValue().estado, "inibido");
        sinon.assert.match(robo.getValue().marca.value, "Cookies");
        sinon.assert.match(robo.getValue().numeroSerie.value, "2324");
        sinon.assert.match(robo.getValue().nickname, "1");
        sinon.assert.match(robo.getValue().tipoRobo, tipoRobo);
        
        
    })
    /*
    it('codigoRobo excede 30 carateres', () => {
		const tipoRobo = {
		"tarefas" : [],
		"designacao": "2B",
		"marca": "Cookies",
		"modelo": "Sem Pepitas"
		}
        const body = {
	"estado": "inibido",
	"marca": "Cookies",
	"codigo": "2B2ujsigdobnugiojbsdsjkbdgdsujbgdskjuhbdjshkbg",
	"numeroSerie": "2324",
	"nickname": "1",
	"tipoRobo": tipoRobo
    };
  const robo = Robo.create({
	estado : body.estado,
	marca: MarcaRobo.create(body.marca).getValue(),
	codigo: CodigoRobo.create(body.codigo).getValue(),
	numeroSerie: NumeroSerieRobo.create(body.numeroSerie).getValue(),
	nickname: body.nickname,
	tipoRobo: TipoRobo.create(body.tipoRobo).getValue()
  });
    const codigoResult = CodigoRobo.create(body.codigo);
    sinon.assert.throw(codigoResult.error, "Código excedeu 30 caracteres");
	})
	*/
})



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
