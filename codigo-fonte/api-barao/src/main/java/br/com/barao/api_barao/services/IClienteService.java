package br.com.barao.api_barao.services;

import br.com.barao.api_barao.dto.CompradorDTO; // Import necessário
import br.com.barao.api_barao.model.Cliente;

import java.util.List; // Interface correta

public interface IClienteService {

    // Métodos que retornam um único objeto (mantidos)
    public Cliente buscarPeloCPF(String cpf);
    public Cliente buscarPeloTelefone(String telefone);
    public Cliente atualizarDados(Cliente dadosOriginais);

    // Métodos que retornam coleções
    public List<Cliente> buscarPorLetra(String letra);
    public List<Cliente> buscarPorPalavraChave(String palavraChave);
    public List<Cliente> buscarTodos();

    // Métodos de relatório/busca específica
    public List<Cliente> buscarAniversariantes(int mes);
    public List<CompradorDTO> buscarCompradores(int idProduto);
}