export interface Cliente {
    idCliente?: number;
    nome: string;
    email: string;
    telefone: string;
    dataNasc?: string;
    cpf?: string;

    // Dados de Endereço
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
}
