package br.com.barao.api_barao.dao;

import br.com.barao.api_barao.dto.CompradorDTO;
import br.com.barao.api_barao.model.Cliente;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClienteDAO extends CrudRepository<Cliente, Integer> {

    // Métodos de busca simples (Spring Data JPA)
    public Cliente findByEmailOrTelefone(String email, String telefone);
    public Cliente findByTelefone(String telefone);
    public Cliente findByCpf(String cpf);

    // Alterado de ArrayList para List para evitar erro de tipo no Controller/Service
    public List<Cliente> findByNomeStartsWith(String prefixo);
    public List<Cliente> findByNomeContaining(String keyword);
    public List<Cliente> findByOrderByNomeAsc();

    /*
     * Consulta personalizada: Busca dados para relatório de compradores.
     * Atenção: O caminho do 'new ...' deve ser o pacote ATUAL do projeto.
     */
    @Query("SELECT DISTINCT new br.com.barao.api_barao.dto.CompradorDTO(cli.nome, cli.email, cli.telefone) "
            + " from Cliente cli "
            + " INNER JOIN Pedido ped ON cli.id = ped.cliente.id "
            + " INNER JOIN ItemPedido itm ON itm.pedido.id = ped.id "
            + " INNER JOIN Produto pro ON itm.produto.id = pro.id "
            + " WHERE pro.id = :id ")
    public List<CompradorDTO> recuperarCompradores(@Param("id") int idProduto);

    /*
     * Consulta personalizada: Aniversariantes do mês.
     */
    @Query("SELECT new br.com.barao.api_barao.model.Cliente(cli.nome, cli.dataNasc, cli.telefone)"
            + " from Cliente cli WHERE month(cli.dataNasc) = :mes ORDER BY day(cli.dataNasc)")
    public List<Cliente> recuperarAniversariantes(@Param("mes") int mes);
}