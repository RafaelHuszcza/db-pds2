import { Shelter } from "../../../entities/shelter";
import { ShelterRepository } from "../../../repositories/shelter/shelter.repository";
import {
    CreateShelterOutputDto,
    ListSheltersOutputDto,
    ShelterOutputDto,
    ShelterService,
} from "../shelter.service";

export class ShelterServiceImplementation implements ShelterService {
    private constructor(readonly repository: ShelterRepository) {}

    public static build(repository: ShelterRepository) {
        return new ShelterServiceImplementation(repository);
    }

    /**
     * Cria um novo abrigo.
     */
    public async create(
        name: string,
        address: string,
        capacity: number,
        responsibleId: string
    ): Promise<CreateShelterOutputDto> {
        const aShelter = Shelter.create(name, address, capacity, responsibleId);

        await this.repository.save(aShelter);

        const output: CreateShelterOutputDto = {
            id: aShelter.id,
            name: aShelter.name,
            address: aShelter.address,
            capacity: aShelter.capacity,
        };

        return output;
    }

    /**
     * Obtém os detalhes de um abrigo.
     */
    public async getDetails(id: string): Promise<ShelterOutputDto> {
        const aShelter = await this.repository.find(id);

        if (!aShelter) {
            throw new Error(`Abrigo com ID "${id}" não foi encontrado.`);
        }

        const output: ShelterOutputDto = {
            id: aShelter.id,
            name: aShelter.name,
            address: aShelter.address,
            capacity: aShelter.capacity,
        };

        return output;
    }

    /**
     * Lista todos os abrigos.
     */
    public async list(): Promise<ListSheltersOutputDto> {
        const aShelters = await this.repository.list();

        const shelters = aShelters.map((shelter) => ({
            id: shelter.id,
            name: shelter.name,
            address: shelter.address,
            capacity: shelter.capacity,
        }));

        const output: ListSheltersOutputDto = {
            shelters,
        };

        return output;
    }

    /**
     * Atualiza os dados de um abrigo.
     */
    public async update(
        id: string,
        name: string,
        address: string,
        capacity: number
    ): Promise<ShelterOutputDto> {
        const aShelter = await this.repository.find(id);

        if (!aShelter) {
            throw new Error(`Abrigo com ID "${id}" não foi encontrado.`);
        }

        aShelter.updateDetails(name, address, capacity);

        await this.repository.update(aShelter);

        const output: ShelterOutputDto = {
            id: aShelter.id,
            name: aShelter.name,
            address: aShelter.address,
            capacity: aShelter.capacity,
        };

        return output;
    }

    /**
     * Exclui um abrigo.
     */
    public async delete(id: string): Promise<{ id: string }> {
        const aShelter = await this.repository.find(id);

        if (!aShelter) {
            throw new Error(`Abrigo com ID "${id}" não foi encontrado.`);
        }

        await this.repository.delete(id);

        return { id: aShelter.id };
    }
}
