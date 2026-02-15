package br.com.barao.api_barao.services;

import br.com.barao.api_barao.dao.ClienteDAO;
import br.com.barao.api_barao.dto.CompradorDTO;
import br.com.barao.api_barao.model.Cliente;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteServiceImpl implements IClienteService {

    private final ClienteDAO dao;

    @Override
    public Cliente buscarPeloCPF(String cpf) {
        return dao.findByCpf(cpf);
    }

    @Override
    public Cliente buscarPeloTelefone(String telefone) {
        if (telefone == null) return null;
        // Regex para manter apenas números (mais limpo que vários replaces)
        String strTelefone = telefone.replaceAll("[^0-9]", "");
        return dao.findByTelefone(strTelefone);
    }

    @Override
    public Cliente atualizarDados(Cliente dadosOriginais) {
        return dao.save(dadosOriginais);
    }

    @Override
    public List<Cliente> buscarPorLetra(String letra) {
        return dao.findByNomeStartsWith(letra);
    }

    @Override
    public List<Cliente> buscarPorPalavraChave(String palavraChave) {
        return dao.findByNomeContaining(palavraChave);
    }

    @Override
    public List<Cliente> buscarTodos() {
        // O cast é seguro aqui pois o Hibernate retorna uma List por baixo dos panos
        return (List<Cliente>) dao.findAll();
    }

    @Override
    public List<Cliente> buscarAniversariantes(int mes) {
        return dao.recuperarAniversariantes(mes);
    }

    // Método adicionado para cumprir o contrato da Interface IClienteService
    // (necessário pois o Controller chama este método)
    @Override
    public List<CompradorDTO> buscarCompradores(int idProduto) {
        return dao.recuperarCompradores(idProduto);
    }
}