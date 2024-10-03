import { Service, Inject } from 'typedi';
import config from "../../config";
import IElevadorDTO from '../dto/IElevadorDTO';
import { Elevador } from "../domain/elevador";
import IElevadorRepo from '../services/IRepos/IElevadorRepo';
import IElevadorService from './IServices/IElevadorService';
import { Result } from "../core/logic/Result";
import { ElevadorMap } from "../mappers/ElevadorMap";
import IListElevadoresDTO from '../dto/IListElevadoresDTO';
import IEdificioRepo from './IRepos/IEdificioRepo';
import IPisoRepo from './IRepos/IPisoRepo';
import { Piso } from '../domain/piso';
import IDeleteElevador from '../dto/IDeleteElevador';

@Service()
export default class ElevadorService implements IElevadorService {
  constructor(
    @Inject(config.repos.elevador.name) private elevadorRepo: IElevadorRepo,
    @Inject(config.repos.edificio.name) private edificioRepo: IEdificioRepo,
    @Inject(config.repos.piso.name) private pisoRepo: IPisoRepo
  ) { }

  public async getElevador(elevadorId: string): Promise<Result<IElevadorDTO>> {
    try {
      const elevador = await this.elevadorRepo.findByDomainId(elevadorId);

      if (elevador === null) {
        return Result.fail<IElevadorDTO>("Elevador não encontrado");
      }
      else {
        const elevadorDTOResult = ElevadorMap.toDTO(elevador) as IElevadorDTO;
        return Result.ok<IElevadorDTO>(elevadorDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }


  public async createElevador(elevadorDTO: IElevadorDTO): Promise<Result<IElevadorDTO>> {
    try {

      const elevador = await this.elevadorRepo.findByNumeroIdentificativo(elevadorDTO.numeroIdentificativo);

      if (elevador != null)
        return Result.fail<IElevadorDTO>("Já existe um elevador com o código " + elevadorDTO.numeroIdentificativo);

      const edificio = await this.edificioRepo.findByCodigo(elevadorDTO.edificio);

      if (edificio == null)
        return Result.fail<IElevadorDTO>("Não existe nenhum edifício com o código " + elevadorDTO.edificio);

      const pisos = await this.pisoRepo.findByEdificio(elevadorDTO.edificio);

      if (pisos.length == 0)
        return Result.fail<IElevadorDTO>("O edificio " + elevadorDTO.edificio + " não tem pisos.");

      let pisosServidos: Piso[] = [];
      let error = false;
      let wrongPiso: string;

      elevadorDTO.pisosServidos.forEach(p => {
        let b = false;
        for (const p2 of pisos) {
          if (p2.designacao == p) {
            pisosServidos.push(p2);
            b = true;
            break;
          }
        }
        if (!b) {
          error = true;
          wrongPiso = p;
          return;
        }
      });

      if (error)
        return Result.fail<IElevadorDTO>("O piso " + wrongPiso + " não pertence ao edifício " + elevadorDTO.edificio + " ou não existe.");

      const elevadorOrError = Elevador.create({
        descricao: elevadorDTO.descricao,
        modelo: elevadorDTO.modelo,
        marca: elevadorDTO.marca,
        numeroIdentificativo: elevadorDTO.numeroIdentificativo,
        numeroSerie: elevadorDTO.numeroSerie,
        pisosServidos: pisosServidos,
        edificio: edificio
      });

      if (elevadorOrError.isFailure) {
        return Result.fail<IElevadorDTO>(elevadorOrError.errorValue());
      }

      const elevadorResult = elevadorOrError.getValue();
      await this.elevadorRepo.save(elevadorResult);

      const elevadorDTOResult = ElevadorMap.toDTO(elevadorResult) as IElevadorDTO;
      return Result.ok<IElevadorDTO>(elevadorDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async updateElevador(elevadorDTO: IElevadorDTO): Promise<Result<IElevadorDTO>> {
    try {
      const elevador = await this.elevadorRepo.findByNumeroIdentificativo(elevadorDTO.numeroIdentificativo);

      if (elevador === null) {
        return Result.fail<IElevadorDTO>("Elevador não encontrado");
      }
      else {

        const edificio = await this.edificioRepo.findByCodigo(elevadorDTO.edificio);

        if (edificio == null)
          return Result.fail<IElevadorDTO>("Edifício com o código " + elevadorDTO.edificio + " não encontrado");


        const pisos = await this.pisoRepo.findByEdificio(elevadorDTO.edificio);

        let pisosServidos: Piso[] = [];
        let error = false;
        let wrongPiso: string;

        elevadorDTO.pisosServidos.forEach(p => {
          let b = false;
          for (const p2 of pisos) {
            if (p2.designacao == p) {
              pisosServidos.push(p2);
              b = true;
              break;
            }
          }
          if (!b) {
            error = true;
            wrongPiso = p;
            return;
          }
        });

        if (error)
          return Result.fail<IElevadorDTO>("O piso " + wrongPiso + " não pertence ao edifício " + elevadorDTO.edificio + " ou não existe.");

        elevador.descricao = elevadorDTO.descricao;
        elevador.marca = elevadorDTO.marca;
        elevador.modelo = elevadorDTO.modelo;
        elevador.pisosServidos = pisosServidos;
        elevador.numeroSerie = elevadorDTO.numeroSerie;
        elevador.numeroIdentificativo = elevadorDTO.numeroIdentificativo;
        elevador.edificio = edificio;
        await this.elevadorRepo.save(elevador);

        const elevadorDTOResult = ElevadorMap.toDTO(elevador) as IElevadorDTO;
        return Result.ok<IElevadorDTO>(elevadorDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }

  // Só precisa de uma query ao repo de elevadores onde o edificio seja igual ao do dto.
  public async listElevadoresEdificio(listElevadoresDTO: IListElevadoresDTO): Promise<Result<IElevadorDTO[]>> {
    try {

      const elevador = await this.elevadorRepo.findByEdificio(listElevadoresDTO.codigoEdificio);

      if (elevador == null)
        return Result.fail<IElevadorDTO[]>("O edifício com o código " + listElevadoresDTO.codigoEdificio + " não tem elevadores.");

      let elevadoresDTO: IElevadorDTO[] = [];

      // O UC pede para listar os elevadorES, porém, no sprint A é pedido para assumir que no máximo existe apenas 1 elevador por edifício.
      // Como tal, esta solução adiciona só 1 elemento ao array. Se no futuro for necessário alterar, basta meter um foreach.
      elevadoresDTO.push(ElevadorMap.toDTO(elevador));

      return Result.ok<IElevadorDTO[]>(elevadoresDTO)
    } catch (e) {
      throw e;
    }
  }

  public async listElevadores(): Promise<Result<IElevadorDTO[]>> {
    try {

      const elevadores = await this.elevadorRepo.findAll();

      if (elevadores.length == 0)
        return Result.fail<IElevadorDTO[]>("Não foram encontrados elevadores");

      let elevadoresDTO: IElevadorDTO[] = [];

      elevadores.forEach(element => {
        elevadoresDTO.push(ElevadorMap.toDTO(element));
      });

      return Result.ok<IElevadorDTO[]>(elevadoresDTO)
    } catch (e) {
      throw e;
    }
  }

  public async deleteElevador(elevadorDTO: IDeleteElevador): Promise<Result<IElevadorDTO>> {
    try {
      const elevador = await this.elevadorRepo.findByNumeroIdentificativo(elevadorDTO.numeroIdentificativo);

      if (elevador == null)
        return Result.fail<IElevadorDTO>("Não existe qualquer elevador com o numero identificativo " + elevadorDTO.numeroIdentificativo);

      await this.elevadorRepo.delete(elevador);

      return Result.ok<IElevadorDTO>(ElevadorMap.toDTO(elevador));
    } catch (err) {
      throw err;
    }
  }

}
