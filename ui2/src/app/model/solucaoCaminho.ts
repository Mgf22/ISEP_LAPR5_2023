export interface SolucaoCaminho {

    _id: {
    value: string;
  };
  props: {
    caminhoEntrePisos : string[][];
    caminhoPorPiso: number[][];
  };
  _domainEvents: any[];
  }