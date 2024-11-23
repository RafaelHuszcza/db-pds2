import { Shelter } from "../../entities/shelter";

export interface ShelterRepository {
    save(Shelter: Shelter): Promise<void>;
    list(): Promise<Shelter[]>;
    update(Shelter: Shelter): Promise<void>;
    find(id: string): Promise<Shelter | null>;
    delete(id: string): Promise<void>;
}
