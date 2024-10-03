import { Repo } from "../../core/infra/Repo";
import { Passagem } from "../../domain/passagem";
import { PassagemId } from "../../domain/passagemId";

export default interface IPassagemRepo extends Repo<Passagem> {
  save(passagem: Passagem): Promise<Passagem>;
  findByDomainId (passagemId: PassagemId | string): Promise<Passagem>;
  listPassagensBetween(codigoEdificioA : string, codigoEdificioB : string): Promise<Passagem[]>;
  listPassagens(codigoEdificio: string): Promise<Passagem[]>;
  findByDesignacao(designacao: string): Promise<Passagem>;
  delete(passagem: Passagem ): Promise<Passagem>;
  listPassagensGeral(): Promise<Passagem[]>;
}