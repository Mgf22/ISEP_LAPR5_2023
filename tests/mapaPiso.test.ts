import * as sinon from 'sinon';
import { Edificio } from '../src/domain/edificio'
import { error } from 'console';
import { Elevador } from '../src/domain/elevador';
import { Piso } from '../src/domain/piso';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Sala } from '../src/domain/sala';
import { CategoriaSala } from '../src/domain/categoriaSala';
import { MapaPiso } from '../src/domain/mapaPiso';


describe('MapaPiso', () => {

    afterEach(() => {
        sinon.restore();
    });

    const dummyEdificio = Edificio.create({
        codigoEdificio: CodigoEdificio.create("B").getValue(),
        nomeOpcionalEdificio: "Informatica",
        descricaoEdificio: "Grande",
        dimensaoMaximaPiso: [100,100]
      }).getValue();

    const bodypiso = {
        descricao: "Primeiro piso do edificio B",
        designacao: "Piso 1",
        edificio: dummyEdificio
    }

    const pisodummy = Piso.create(bodypiso);
    

    it('MapaPiso succeeds', () =>{

        let out : JSON = <JSON><unknown>{
            "A" : 1,
            "B" : 2
        };

      const body = {
       mapa : out ,
       piso : pisodummy.getValue()
      };

      

      // Venancio: Comentei isto para conseguir correr os testes.
        const mapaPiso = MapaPiso.create({
            mapa : body.mapa,
            piso : body.piso
        });

        sinon.assert.match(mapaPiso.getValue().mapa, out);
        sinon.assert.match(mapaPiso.getValue().piso.descricao, pisodummy.getValue().descricao);
    });
});