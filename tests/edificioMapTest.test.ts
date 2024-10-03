import * as sinon from 'sinon';
import { Edificio } from '../src/domain/edificio';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { EdificioMap } from '../src/mappers/EdificioMap'


describe('edificio map', () => {
        const body = {
            "dimensaoMaximaPiso": [100, 100],
            "descricaoEdificio": "Edificio Acolhe Malucos",
            "nomeOpcionalEdificio": "Edificio Francisco",
            "codigoEdificio": "2324",
          };
        


      const edificio = Edificio.create({
        dimensaoMaximaPiso : body.dimensaoMaximaPiso,
        descricaoEdificio : body.descricaoEdificio,
        nomeOpcionalEdificio : body.nomeOpcionalEdificio,
        codigoEdificio : CodigoEdificio.create(body.codigoEdificio).getValue(),
      }).getValue();



    const expectedDTO = {
        id: "1",
        dimensaoMaximaPiso: [100, 100],
        descricaoEdificio: "Edificio Acolhe Malucos",
        nomeOpcionalEdificio: "Edificio Francisco",
        codigoEdificio: "2324",
    };

    const expectedPersistence = {
        codigo: "2324",
        descricao: "Edificio Acolhe Malucos",
        dimensaoMaximaPiso: [100, 100],
        domainId: "123".toString(),
        id: "1",
        nomeOpcional: "Edificio Francisco",
    };

    const document = {
        id: "1",
        dimensaoMaximaPiso: [100, 100],
        descricao: "Edificio Acolhe Malucos",
        nomeOpcional: "Edificio Francisco",
        codigoEdificio: "2324",
    }

    const expectedDomain = {
        id: "1",
        dimensaoMaximaPiso: [100, 100],
        descricao: "Edificio Acolhe Malucos",
        nomeOpcional: "Edificio Francisco",
        codigoEdificio: "2324",
    }


    afterEach(() => {
        sinon.restore();
    });

    it("toDTO", () => {
        let actual = EdificioMap.toDTO(edificio);
        actual.id = "1";

        sinon.assert.match(actual, expectedDTO);
    });

    it("toDomain", async () => {
        //sinon.assert.match(await EdificioMap.toDomain(document), expectedDomain);
    });

    it("toPersistence", () => {
        let actual = EdificioMap.toPersistence(edificio);
        actual.domainId = "123";
        actual.id = "1";
        sinon.assert.match(actual, expectedPersistence);
    });
})
