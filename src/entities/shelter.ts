export type ShelterProps = {
    id: string;
    name: string;
    address: string;
    capacity: number;
    responsibleId: string;
    volunteers: string[];  // Array de IDs dos voluntários
    items: Array<{
        id: string;
        description: string;
        quantity: number;
        category: string;
    }>;
    sheltered: Array<{
        id: string;
        name: string;
        age: number;
        entryDate: Date;
    }>;
};

export class Shelter {
    private constructor(readonly props: ShelterProps) {}

    public static create(name: string, address: string, capacity: number, responsibleId: string) {
        if (capacity <= 0) {
            throw new Error("A capacidade do abrigo deve ser maior que zero.");
        }

        return new Shelter({
            id: crypto.randomUUID().toString(),
            name,
            address,
            capacity,
            responsibleId,
            volunteers: [],
            items: [],
            sheltered: []
        });
    }

    public static with(
        id: string,
        name: string,
        address: string,
        capacity: number,
        responsibleId: string
    ): Shelter {
        return new Shelter({
            id,
            name,
            address,
            capacity,
            responsibleId,
            volunteers: [],
            items: [],
            sheltered: [],
        });
    }

    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public get address() {
        return this.props.address;
    }

    public get capacity() {
        return this.props.capacity;
    }

    public get responsibleId() {
        return this.props.responsibleId;
    }

    public get volunteers() {
        return [...this.props.volunteers];
    }

    public get items() {
        return [...this.props.items];
    }

    public get sheltered() {
        return [...this.props.sheltered];
    }

    public updateCapacity(newCapacity: number) {
        if (newCapacity <= 0) {
            throw new Error("A capacidade do abrigo deve ser maior que zero.");
        }

        if (newCapacity < this.props.sheltered.length) {
            throw new Error("A nova capacidade é menor que o número atual de abrigados.");
        }

        this.props.capacity = newCapacity;
    }
    public updateDetails(name: string, address: string, capacity: number) {
        if (capacity <= 0) {
            throw new Error("A capacidade do abrigo deve ser maior que zero.");
        }
    
        if (capacity < this.props.sheltered.length) {
            throw new Error("A nova capacidade não pode ser menor que o número de pessoas abrigadas.");
        }
    
        this.props.name = name;
        this.props.address = address;
        this.props.capacity = capacity;
    }

    public addVolunteer(volunteerId: string) {
        if (this.props.volunteers.includes(volunteerId)) {
            throw new Error("Este voluntário já está registrado neste abrigo.");
        }

        this.props.volunteers.push(volunteerId);
    }

    public removeVolunteer(volunteerId: string) {
        const volunteerIndex = this.props.volunteers.indexOf(volunteerId);
        
        if (volunteerIndex === -1) {
            throw new Error("Voluntário não encontrado neste abrigo.");
        }

        this.props.volunteers.splice(volunteerIndex, 1);
    }

    public addItem(description: string, quantity: number, category: string) {
        if (quantity <= 0) {
            throw new Error("A quantidade do item deve ser maior que zero.");
        }

        const newItem = {
            id: crypto.randomUUID().toString(),
            description,
            quantity,
            category
        };

        this.props.items.push(newItem);
        return newItem.id;
    }

    public removeItem(itemId: string) {
        const itemIndex = this.props.items.findIndex(item => item.id === itemId);
        
        if (itemIndex === -1) {
            throw new Error("Item não encontrado neste abrigo.");
        }

        this.props.items.splice(itemIndex, 1);
    }

    public addSheltered(name: string, age: number) {
        if (this.props.sheltered.length >= this.props.capacity) {
            throw new Error("O abrigo está em sua capacidade máxima.");
        }

        if (age < 0) {
            throw new Error("A idade deve ser um número positivo.");
        }

        const newSheltered = {
            id: crypto.randomUUID().toString(),
            name,
            age,
            entryDate: new Date()
        };

        this.props.sheltered.push(newSheltered);
        return newSheltered.id;
    }

    public removeSheltered(shelteredId: string) {
        const shelteredIndex = this.props.sheltered.findIndex(s => s.id === shelteredId);
        
        if (shelteredIndex === -1) {
            throw new Error("Pessoa abrigada não encontrada neste abrigo.");
        }

        this.props.sheltered.splice(shelteredIndex, 1);
    }

    public getAvailableCapacity() {
        return this.props.capacity - this.props.sheltered.length;
    }

    public isAtCapacity() {
        return this.props.sheltered.length >= this.props.capacity;
    }
}
