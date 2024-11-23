import { PrismaClient } from "@prisma/client";
import { Shelter } from "../../../entities/shelter";
import { ShelterRepository } from "../shelter.repository";

export class ShelterRepositoryPrisma implements ShelterRepository {
    private constructor(readonly prisma: PrismaClient) {}

    public static build(prisma: PrismaClient) {
        return new ShelterRepositoryPrisma(prisma);
    }

    public async save(shelter: Shelter): Promise<void> {
        const data = {
            id: shelter.id,
            name: shelter.name,
            address: shelter.address,
            capacity: shelter.capacity,
        };

        await this.prisma.shelter.create({
            data,
        });
    }

    public async list(): Promise<Shelter[]> {
        const aShelters = await this.prisma.shelter.findMany();

        const shelters: Shelter[] = aShelters.map((p) => {
            const { id, name, address, capacity, responsibleId } = p;
            return Shelter.with(id, name, address, capacity, responsibleId);
        });

        return shelters;
    }

    public async update(shelter: Shelter): Promise<void> {
        const data = {
            name: shelter.name,
            address: shelter.address,
            capacity: shelter.capacity,
        };

        await this.prisma.shelter.update({
            where: {
                id: shelter.id,
            },
            data,
        });
    }

    public async find(id: string): Promise<Shelter | null> {
        const aShelter = await this.prisma.shelter.findUnique({
            where: { id },
        });

        if (!aShelter) {
            return null;
        }

        const { name, address, capacity, responsibleId } = aShelter;

        const shelter = Shelter.with(id, name, address, capacity, responsibleId);

        return shelter;
    }
    public async delete(id: string): Promise<void> {
        await this.prisma.shelter.delete({
            where: { id },
        });
    }
    
}
