import { Service, Inject } from 'typedi';
import config from "../../config";
import IPassagemDTO from '../dto/IPassagemDTO';
import { Passagem } from "../domain/passagem";
import IPassagemRepo from '../services/IRepos/IPassagemRepo';
import IPassagemService from './IServices/IPassagemService';
import { Result } from "../core/logic/Result";
import { PassagemMap } from "../mappers/PassagemMap";
import IEdificioRepo from './IRepos/IEdificioRepo';
import { PassagemId } from '../domain/passagemId';
import IPisoRepo from './IRepos/IPisoRepo';
import IListPassagensEntreEdificiosDTO from '../dto/IListPassagensEntreEdificiosDTO';
import IListPisosComPassagemDTO from '../dto/IListPisosComPassagemDTO';
import IPisoDTO from '../dto/IPisoDTO';
import { Piso } from '../domain/piso';
import { PisoId } from '../domain/pisoId';
import passagemSchema from '../persistence/schemas/passagemSchema';
import { PisoMap } from '../mappers/PisoMap';
import IDeletePassagem from '../dto/IDeletePassagemDTO';
import IDeletePassagemDTO from '../dto/IDeletePassagemDTO';

@Service()
export default class PassagemService implements IPassagemService {
  constructor(
    @Inject(config.repos.passagem.name) private passagemRepo: IPassagemRepo,
    @Inject(config.repos.edificio.name) private edificioRepo: IEdificioRepo,
    @Inject(config.repos.piso.name) private pisoRepo: IPisoRepo
  ) { }

  public async getPassagem(passagemId: string): Promise<Result<IPassagemDTO>> {
    return null;
  }


  public async createPassagem(passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>> {
    try {

      const passagem = await this.passagemRepo.findByDesignacao(passagemDTO.designacao);

      if (passagem != null)
        return Result.fail<IPassagemDTO>("Passagem com a designacao " + passagemDTO.designacao + " já existe!");

      const edificioA = await this.edificioRepo.findByCodigo(passagemDTO.edificioA);
      const edificioB = await this.edificioRepo.findByCodigo(passagemDTO.edificioB);
      const pisoA = await this.pisoRepo.findByDesignacao(passagemDTO.pisoA);
      const pisoB = await this.pisoRepo.findByDesignacao(passagemDTO.pisoB);

      if (edificioA.codigo === edificioB.codigo || pisoA.designacao === pisoB.designacao)
        return Result.fail<IPassagemDTO>("Origem e destino dos parâmetros não podem ser os mesmos");

      if (pisoA.edificio.codigo != edificioA.codigo || pisoB.edificio.codigo != edificioB.codigo)
      return Result.fail<IPassagemDTO>("Piso A tem de pertencer ao edificio A e o piso B tem de pertencer ao edificio B");

      // Agora é fazer ao contrário, piso.edificio == edificioOrigem?
      //if(edificioOrigem.pisos.includes(pisoOrigem) && edificioDestino.pisos.includes(pisoDestino))
      //return Result.fail<IPassagemDTO>("Piso A tem de pertencer ao edificio A e o piso B tem de pertencer ao edificio B");

      const passagemOrError = Passagem.create({
        designacao: passagemDTO.designacao,
        edificioA: edificioA,
        edificioB: edificioB,
        pisoA: pisoA,
        pisoB: pisoB
      });// await Passagem.create( passagemDTO ); // Venancio: alterei o create do passagem, vamos tentar utilizar o que está neste momento em todas as classes (pelo menos as que tenham atributos objetos).

      if (passagemOrError.isFailure) {
        return Result.fail<IPassagemDTO>(passagemOrError.errorValue());
      }

      const passagemResult = passagemOrError.getValue();

      await this.passagemRepo.save(passagemResult);

      const passagemDTOResult = PassagemMap.toDTO(passagemResult) as IPassagemDTO;
      return Result.ok<IPassagemDTO>(passagemDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async updatePassagem(passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>> {
    try {
      const passagem = await this.passagemRepo.findByDesignacao(passagemDTO.designacao);
      const edificioA = await this.edificioRepo.findByCodigo(passagemDTO.edificioA);
      const edificioB = await this.edificioRepo.findByCodigo(passagemDTO.edificioB);
      const pisoA = await this.pisoRepo.findByDesignacao(passagemDTO.pisoA);
      const pisoB = await this.pisoRepo.findByDesignacao(passagemDTO.pisoB);
      
    if (edificioA.codigo === edificioB.codigo || pisoA.designacao === pisoB.designacao)
    return Result.fail<IPassagemDTO>("Origem e destino dos parâmetros não podem ser os mesmos");

    if (pisoA.edificio.codigo != edificioA.codigo || pisoB.edificio.codigo != edificioB.codigo)
    return Result.fail<IPassagemDTO>("Piso A tem de pertencer ao edificio A e o piso B tem de pertencer ao edificio B");

      if (passagem === null) {
        return Result.fail<IPassagemDTO>("Passagem não encontrada");
      }
      else {
        passagem.edificioA = edificioA;
        passagem.edificioB = edificioB;
        passagem.pisoA = pisoA;
        passagem.pisoB = pisoB;
        await this.passagemRepo.save(passagem);

        const passagemDTOResult = PassagemMap.toDTO(passagem) as IPassagemDTO;
        return Result.ok<IPassagemDTO>(passagemDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }
  // codigoEdificioA: string, codigoEdificioB: string
  public async listPassagens(edificios: IListPassagensEntreEdificiosDTO): Promise<Result<IPassagemDTO[]>> {
    try {

      if(edificios.codigoEdificioA == edificios.codigoEdificioB)
        return Result.fail<IPassagemDTO[]>("Não existem passagens para o próprio edifício.");

      const edificioADoc = await this.edificioRepo.findByCodigo(edificios.codigoEdificioA);

      if (edificioADoc == null)
        return Result.fail<IPassagemDTO[]>("O código " + edificios.codigoEdificioA + " é inválido");

      const edificioBDoc = await this.edificioRepo.findByCodigo(edificios.codigoEdificioB);
      if (edificioBDoc == null)
        return Result.fail<IPassagemDTO[]>("O código " + edificios.codigoEdificioB + " é inválido");

      const passagensResult = await this.passagemRepo.listPassagensBetween(edificioADoc.codigo, edificioBDoc.codigo);

      if (passagensResult.length == 0)
        return Result.fail<IPassagemDTO[]>("Não existem passagens entre o edifício "
          + edificios.codigoEdificioA + " e o edifício " + edificios.codigoEdificioB);

      let passagensResultDTO: IPassagemDTO[] = [];

      passagensResult.forEach(p => passagensResultDTO.push(PassagemMap.toDTO(p) as IPassagemDTO));

      return Result.ok<IPassagemDTO[]>(passagensResultDTO)
    } catch (e) {
      throw e;
    }
  }

  //codigoEdificioA
  public async listPisos(edificio: IListPisosComPassagemDTO): Promise<Result<IPisoDTO[]>> {
    try {
      
      const edificioP = await this.edificioRepo.findByCodigo(edificio.codigoEdificio);

      if (edificioP == null)
        return Result.fail<IPisoDTO[]>("O código do edifício " + edificio.codigoEdificio + " é inválido");
        
      const passagemResult = await this.passagemRepo.listPassagens(edificioP.codigo);
      if (passagemResult.length == 0)
        return Result.fail<IPisoDTO[]>("Não existem passagens para o edifício "
          + edificio.codigoEdificio);
      const pisoAValues = passagemResult.map(passagem => passagem.pisoA);
      let pisoResultDTO: IPisoDTO[] = [];

      pisoAValues.forEach(p => pisoResultDTO.push(PisoMap.toDTO(p) as IPisoDTO));

      return Result.ok<IPisoDTO[]>(pisoResultDTO)
    } catch (e) {
      throw e;
    }
  }

  public async deletePassagem(passagemDTO: IDeletePassagemDTO): Promise<Result<IPassagemDTO>> {
    try {
      const passagem = await this.passagemRepo.findByDesignacao(passagemDTO.designacao);

      if (passagem == null)
        return Result.fail<IPassagemDTO>("Não existe qualquer passagem com a designação " + passagemDTO.designacao);

      await this.passagemRepo.delete(passagem);

      return Result.ok<IPassagemDTO>(PassagemMap.toDTO(passagem));
    } catch (err) {
      throw err;
    }
  }

  public async listPassagensGeral(): Promise<Result<IPassagemDTO[]>>{
    try {

      const passagensResult = await this.passagemRepo.listPassagensGeral();

      if (passagensResult.length == 0)
        return Result.fail<IPassagemDTO[]>("Não existem passagens!");

      let passagensResultDTO: IPassagemDTO[] = [];

      passagensResult.forEach(p => passagensResultDTO.push(PassagemMap.toDTO(p) as IPassagemDTO));

      return Result.ok<IPassagemDTO[]>(passagensResultDTO)
    } catch (e) {
      throw e;
    }
  }
}