import { useEffect, useState } from "react";
import "../../produtos/adicionarProduto/adicionarProduto.css";
import "./adicionarMovimentacao.css"

function AdicionarMovimentacao({ fechar }) {

  const [produtos, setProdutos] = useState([]);
  const [buscaProduto, setBuscaProduto] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const [tipo, setTipo] = useState("ENTRADA");
  const [quantidade, setQuantidade] = useState("");
  const [observacao, setObservacao] = useState("");

  // BUSCA PRODUTOS
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/produtos/listar",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();

        setProdutos(data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchProdutos();
  }, []);

  // FILTRO PELO NOME
  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(buscaProduto.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDA SE ESCOLHEU PRODUTO
    if (!produtoSelecionado) {
      alert("Selecione um produto");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/transacoes/${produtoSelecionado.id}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          body: JSON.stringify({
            tipo,
            quantidade: Number(quantidade),
            observacao,
          }),
        }
      );

      if (!response.ok) throw new Error();

      alert("✅ Movimentação adicionada!");

      fechar();

      window.location.reload();

    } catch (error) {
      console.error(error);

      alert("❌ Erro ao adicionar movimentação");
    }
  };

  return (
    <div className="overlay">
      <div className="modal">

        <div className="modal-header">
          <h2>Nova Movimentação</h2>

          <button onClick={fechar}>
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          {/* BUSCA PRODUTO */}
          <div className="input-group">
            <label>Produto</label>

            <input
              type="text"
              placeholder="Buscar produto..."
              value={buscaProduto}
              onChange={(e) => {
                setBuscaProduto(e.target.value);
                setProdutoSelecionado(null);
              }}
              required
            />

            {/* LISTA */}
            {buscaProduto && !produtoSelecionado && (
              <div className="lista-produtos">
                {produtosFiltrados.map((p) => (
                  <div
                    key={p.id}
                    className="item-produto"
                    onClick={() => {
                      setProdutoSelecionado(p);
                      setBuscaProduto(p.nome);
                    }}
                  >
                    {p.nome}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="input-group">
            <label>Tipo</label>

            <select  
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="ENTRADA">Entrada</option>
              <option value="SAIDA">Saída</option>
            </select>
          </div>

          <div className="input-group">
            <label>Quantidade</label>

            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Observação</label>

            <input
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              required
            />
          </div>

          <div className="modal-actions">

            <button
              type="button"
              className="cancel"
              onClick={fechar}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="save"
            >
              Salvar
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default AdicionarMovimentacao;