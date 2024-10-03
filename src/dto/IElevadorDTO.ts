
export default interface IElevadorDTO {
    id: string;
    descricao: string;
    numeroSerie: string;
    modelo: string;
    marca: string;
    pisosServidos: string[]; // string[]: designações (únicas) de pisos.
    numeroIdentificativo: number;
    edificio: string; // código edificio.
  }
  