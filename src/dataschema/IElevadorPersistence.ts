
export interface IElevadorPersistence {
    domainId: string;
    descricao : string;
    numeroSerie : string;
    modelo : string;
    marca : string;
    pisosServidos : string[]; // Designações dos pisos.
    numeroIdentificativo : number;
    edificio : string; // Código do edificio.
  }