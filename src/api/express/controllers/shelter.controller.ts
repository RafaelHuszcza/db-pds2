import { Request, Response } from "express";
import { ShelterRepositoryPrisma } from "../../../repositories/shelter/prisma/shelter.repository.prisma";

import { prisma } from "../../../util/prisma.util";
import { ShelterServiceImplementation } from "../../../services/shelter/implementation/shelter.service.implementation";

export class ShelterController {
    private constructor() {}

    public static build() {
        return new ShelterController();
    }

    public async create(request: Request, response: Response) {
        const { name, address, capacity, responsibleId } = request.body;

        const aRepository = ShelterRepositoryPrisma.build(prisma);

        const aService = ShelterServiceImplementation.build(aRepository);

        const output = await aService.create({
            name,
            address,
            capacity,
            responsibleId
        });

        const data = {
            id: output.id,
            name: output.name,
            address: output.address,
            capacity: output.capacity,
            responsibleId: output.responsibleId
        };

        response.status(201).json(data).send();
    }

    public async list(request: Request, response: Response) {
        const aRepository = ShelterRepositoryPrisma.build(prisma);
        const aService = ShelterServiceImplementation.build(aRepository);

        const output = await aService.list();

        const data = {
            shelters: output.shelters,
        };

        response.status(200).json(data).send();
    }

    public async addVolunteer(request: Request, response: Response) {
        const { shelterId } = request.params;
        const { userId } = request.body;

        const aRepository = ShelterRepositoryPrisma.build(prisma);
        const aService = ShelterServiceImplementation.build(aRepository);

        const output = await aService.addVolunteer(shelterId, userId);

        const data = {
            id: output.id,
            volunteerId: output.volunteerId,
            message: "Volunteer successfully added to shelter"
        };

        response.status(200).json(data).send();
    }

    public async removeVolunteer(request: Request, response: Response) {
        const { shelterId, userId } = request.params;

        const aRepository = ShelterRepositoryPrisma.build(prisma);
        const aService = ShelterServiceImplementation.build(aRepository);

        await aService.removeVolunteer(shelterId, userId);

        response.status(204).send();
    }

    public async getDetails(request: Request, response: Response) {
        const { id } = request.params;

        const aRepository = ShelterRepositoryPrisma.build(prisma);
        const aService = ShelterServiceImplementation.build(aRepository);

        const output = await aService.getDetails(id);

        const data = {
            id: output.id,
            name: output.name,
            address: output.address,
            capacity: output.capacity,
            responsible: output.responsible,
            volunteers: output.volunteers,
            items: output.items,
            sheltered: output.sheltered
        };

        response.status(200).json(data).send();
    }

    public async updateCapacity(request: Request, response: Response) {
        const { id } = request.params;
        const { capacity } = request.body;

        const aRepository = ShelterRepositoryPrisma.build(prisma);
        const aService = ShelterServiceImplementation.build(aRepository);

        const output = await aService.updateCapacity(id, capacity);

        const data = {
            id: output.id,
            capacity: output.capacity
        };

        response.status(200).json(data).send();
    }
}
