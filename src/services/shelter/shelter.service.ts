export type ShelterOutputDto = {
    id: string;
    name: string;
    address: string;
    capacity: number;
};

export type CreateShelterOutputDto = {
    id: string;
    name: string;
    address: string;
    capacity: number;
};

export type ListSheltersOutputDto = {
    shelters: {
        id: string;
        name: string;
        address: string;
        capacity: number;
    }[];
};

export interface ShelterService {
    /**
     * Cria um novo abrigo.
     * @param name Nome do abrigo.
     * @param address Endereço do abrigo.
     * @param capacity Capacidade máxima do abrigo.
     * @returns Detalhes do abrigo criado.
     */
    create(
        name: string,
        address: string,
        capacity: number,
        responsibleId: string
    ): Promise<CreateShelterOutputDto>;

    /**
     * Lista todos os abrigos.
     * @returns Lista de todos os abrigos disponíveis.
     */
    list(): Promise<ListSheltersOutputDto>;

    /**
     * Obtém os detalhes de um abrigo específico.
     * @param id ID do abrigo.
     * @returns Detalhes do abrigo.
     */
    getDetails(id: string): Promise<ShelterOutputDto>;

    /**
     * Atualiza os detalhes de um abrigo.
     * @param id ID do abrigo.
     * @param name Novo nome do abrigo.
     * @param address Novo endereço do abrigo.
     * @param capacity Nova capacidade do abrigo.
     * @returns Detalhes do abrigo atualizado.
     */
    update(
        id: string,
        name: string,
        address: string,
        capacity: number
    ): Promise<ShelterOutputDto>;

    /**
     * Exclui um abrigo pelo ID.
     * @param id ID do abrigo.
     * @returns ID do abrigo excluído.
     */
    delete(id: string): Promise<{ id: string }>;
}
