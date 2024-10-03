import * as sinon from 'sinon';
import { Sala } from '../src/domain/sala';

import { SalaMap } from '../src/mappers/SalaMap'
import { CategoriaSala } from '../src/domain/categoriaSala';
import { Piso } from '../src/domain/piso';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Edificio } from '../src/domain/edificio';

describe('sala map', () => {


    const edificio = Edificio.create({
        dimensaoMaximaPiso: [100,100],
        descricaoEdificio: "Edificio Acolhe Malucos",
        nomeOpcionalEdificio: "Departamento de Engenharia Informática",
        codigoEdificio: CodigoEdificio.create("B").getValue(),
    }).getValue();

    const dummyPiso = Piso.create({
        "descricao": "Piso de gabinetes e aulas teórica-práticas",
        "designacao": "B3",
        "edificio": edificio
    }).getValue();

    const body = {
        descricaoSala: "Anfiteatro para palestras do núcleo de estudantes",
        categoriaSala: "anfiteatro",
        designacaoSala: "B301",
        piso: dummyPiso
    };

    const sala = Sala.create(body).getValue();

    const expectedDTO = {
        id: "t12345",
        descricao: "Anfiteatro para palestras do núcleo de estudantes",
        categoria: "anfiteatro",
        designacao: "B301",
        piso: "B3"
    };

    const expectedPersistence = {
        domainId: "t12345",
        descricaoSala: "Anfiteatro para palestras do núcleo de estudantes",
        categoriaSala: "anfiteatro",
        designacaoSala: "B301",
        piso: "B3"
    };

    const document = {
        domainId: "t12345",
        descricaoSala: "Anfiteatro para palestras do núcleo de estudantes",
        categoriaSala: "anfiteatro",
        designacaoSala: "B301",
        piso: "B3"
    }

    const expectedDomain = {
        descricaoSala: "Anfiteatro para palestras do núcleo de estudantes",
        categoriaSala: "anfiteatro",
        designacaoSala: "B301",
        piso: dummyPiso
    }


    afterEach(() => {
        sinon.restore();
    });

    // Foi necessário adicionar a linha de modificação do ID por este ser criado automáticamente aquando da criação.
    it("toDTO", () => {
        let actual = SalaMap.toDTO(sala);
        actual.id = "t12345";
        sinon.assert.match(actual, expectedDTO);
    });

    // TODO: Verificar como dar stub a um container.
    it("toDomain", async () => {
        //sinon.assert.match(await SalaMap.toDomain(document), expectedDomain);
    });

    it("toPersistence", () => {
        let actual = SalaMap.toPersistence(sala);
        actual.domainId = "t12345";
        sinon.assert.match(actual, expectedPersistence);
    });
})