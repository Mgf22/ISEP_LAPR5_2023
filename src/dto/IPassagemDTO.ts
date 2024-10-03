
export default interface IPassagemDTO {
    id: string;
    designacao: string; // identificador de passagem.
    edificioA: string; // string: código edificio
    edificioB: string; // string: código edificio
    pisoA: string; // string: designação (única) 
    pisoB: string; // string: designação (única) edificio
  }
  