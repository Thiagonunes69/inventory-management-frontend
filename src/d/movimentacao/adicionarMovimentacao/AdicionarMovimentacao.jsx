import { useEffect, useState } from "react";

import "../../produtos/adicionarProduto/adicionarProduto.css";
import "./adicionarMovimentacao.css";

import { AiOutlineClose } from "react-icons/ai";
import { BiTransferAlt } from "react-icons/bi";

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

  // FILTRA PRODUTOS
  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(buscaProduto.toLowerCase())
  );

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

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
        {/* FECHAR */}
        <button className="close" onClick={fechar}><AiOutlineClose /></button>

        {/* TOPO */}
        <div className="modalTop">
          <div className="iconBox movimentacaoIcon"><BiTransferAlt /></div>
          <div>
            <h1>Nova Movimentação</h1>
            <p>Registre uma entrada ou saída de produto.</p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          <div className="modalBody">

            {/* PRODUTO */}
            <div className="input-group">
              <label>Produto</label>
              <input type="text" placeholder="Buscar produto..." value={buscaProduto} onChange={(e) => { setBuscaProduto(e.target.value); setProdutoSelecionado(null); }} required/>

              {/* LISTA */}
              {buscaProduto && !produtoSelecionado && (
                <div className="lista-produtos">
                  {produtosFiltrados.map((p) => (
                    <div key={p.id} className="item-produto" onClick={() => {setProdutoSelecionado(p); setBuscaProduto(p.nome);}}>
                      {p.nome}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TIPO */}
            <div className="input-group">
              <label>Tipo</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="ENTRADA">Entrada</option>
                <option value="SAIDA"> Saída </option>
              </select>
            </div>

            {/* QUANTIDADE */}
            <div className="input-group">
              <label>Quantidade</label>
              <input type="number" placeholder="Digite a quantidade..." value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required/>
            </div>

            {/* OBSERVAÇÃO */}
            <div className="input-group">
              <label>Observação</label>
              <input type="text" placeholder="Digite uma observação..." value={observacao} onChange={(e) => setObservacao(e.target.value)} required/>
            </div>
          </div>

          {/* FOOTER */}
          <div className="modalFooter">
            <button type="button" className="cancelButton" onClick={fechar}>Cancelar </button>
            <button type="submit" className="saveButton">Salvar Movimentação</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdicionarMovimentacao;