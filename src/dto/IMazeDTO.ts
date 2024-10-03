
export default interface IMazeDTO {
    piso: string;
    largura: number;
    profundidade: number;
    mapa: number[][];
    saidas: number[][];
    elevador: number[][];
    saidaLocalizacao: number[];
  }
  