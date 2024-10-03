import { Service, Inject } from 'typedi';
import config from "../../config";
import IEdificioDTO from '../dto/IEdificioDTO';
import { Edificio } from "../domain/edificio";
import { Piso } from "../domain/piso";
import IEdificioRepo from '../services/IRepos/IEdificioRepo';
import IMapaEdificioRepo from './IRepos/IMapaPisoRepo';
import IEdificioService from './IServices/IEdificioService';
import { Result } from "../core/logic/Result";
import { EdificioMap } from "../mappers/EdificioMap";
import { CodigoEdificio } from '../domain/codigoEdificio';
import { resolve } from 'path';
import IDeleteEdificio from '../dto/IDeleteEdificio';
import IListMinMaxDTO from '../dto/IListMinMaxDTO';
import IPisoRepo from './IRepos/IPisoRepo';

@Service()
export default class EdificioService implements IEdificioService {
  constructor(
      //@Inject(config.repos.role.name) private edificioRepo : IEdificioRepo, // joao :repos.edificio ?
      @Inject(config.repos.edificio.name) private edificioRepo: IEdificioRepo,
      @Inject(config.repos.piso.name) private pisoRepo: IPisoRepo,
 
      ) {}

  public async getEdificio( edificioId: string): Promise<Result<IEdificioDTO>> {
    try {
      const edificio = await this.edificioRepo.findByDomainId(edificioId);

      if (edificio === null) {
        return Result.fail<IEdificioDTO>("Edificio não encontrado");
      }
      else {
        const edificioDTOResult = EdificioMap.toDTO( edificio ) as IEdificioDTO;
        return Result.ok<IEdificioDTO>( edificioDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>> {
    try {

      const edificio = await this.edificioRepo.findByCodigo(edificioDTO.codigoEdificio);

      if(edificio != null)
        return Result.fail<IEdificioDTO>("Edifício com o código " + edificioDTO.codigoEdificio + " já existe!");

      const codigo = CodigoEdificio.create(edificioDTO.codigoEdificio).getValue();
      const descricao = edificioDTO.descricaoEdificio;
      const dimensao = edificioDTO.dimensaoMaximaPiso;
      const nomeOpcional = edificioDTO.nomeOpcionalEdificio;


      const edificioOrError = Edificio.create({
        codigoEdificio: codigo,
        descricaoEdificio: descricao,
        dimensaoMaximaPiso: dimensao,
        nomeOpcionalEdificio: nomeOpcional
      });

      if (edificioOrError.isFailure) {
        return Result.fail<IEdificioDTO>(edificioOrError.errorValue());
      }

      const edificioResult = edificioOrError.getValue();

      await this.edificioRepo.save(edificioResult);

      const edificioDTOResult = EdificioMap.toDTO( edificioResult ) as IEdificioDTO;
      return Result.ok<IEdificioDTO>( edificioDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>> {
    try {
      const edificio = await this.edificioRepo.findByCodigo(edificioDTO.codigoEdificio);

      if (edificio === null) {
        return Result.fail<IEdificioDTO>("Edificio não encontrado");
      }else {
        edificio.codigo = edificioDTO.codigoEdificio;
        edificio.descricao = edificioDTO.descricaoEdificio;
        edificio.dimensaoMaximaPiso = edificioDTO.dimensaoMaximaPiso;
        edificio.nomeOpcional = edificioDTO.nomeOpcionalEdificio;
        await this.edificioRepo.save(edificio);

        const edificioDTOResult = EdificioMap.toDTO( edificio ) as IEdificioDTO;
        return Result.ok<IEdificioDTO>( edificioDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async listEdificios(): Promise<Result<IEdificioDTO[]>> {
    try {

        const edificios = await this.edificioRepo.findAll();

        if (edificios == null){
          return Result.fail<IEdificioDTO[]>("Não existem registos de edifícios");
        }
        
        let edificiosDTO : IEdificioDTO[] = [];

        for(const edificio of edificios){
          const p = EdificioMap.toDTO(edificio) as IEdificioDTO;
          edificiosDTO.push(p);
        }

        return Result.ok<IEdificioDTO[]>( edificiosDTO )
      } catch (e) {
        throw e;
      }
  }

  public async deleteEdificio(edificioDTO: IDeleteEdificio): Promise<Result<IEdificioDTO>> {
    try {
      const edificio = await this.edificioRepo.findByCodigo(edificioDTO.codigoEdificio);

      if (edificio == null)
        return Result.fail<IEdificioDTO>("Não existe qualquer edificio com o código " + edificioDTO.codigoEdificio);

      await this.edificioRepo.delete(edificio);

      return Result.ok<IEdificioDTO>(EdificioMap.toDTO(edificio));
    } catch (err) {
      throw err;
    }
  }

  public async listMinMax(minMax: IListMinMaxDTO): Promise<Result<IEdificioDTO[]>> {
    try {
      const edificios = await this.edificioRepo.findAll();
      if (edificios == null){
        return Result.fail<IEdificioDTO[]>("Não existem registos de edifícios");
      }
    
      
      let edificiosDTO = [];
     for (let i = 0; i < edificios.length; i++) {
      const edificio = edificios[i];
      const pisos = await this.pisoRepo.findByEdificio(edificio.codigo);
      const numPisos = pisos.length;
      if (numPisos >= minMax.min && numPisos <= minMax.max) {
        edificiosDTO.push(EdificioMap.toDTO(edificio) as IEdificioDTO);
      }
    }

      return Result.ok<IEdificioDTO[]>( edificiosDTO )
    } catch (e) {
      throw e;
    }

  }


}