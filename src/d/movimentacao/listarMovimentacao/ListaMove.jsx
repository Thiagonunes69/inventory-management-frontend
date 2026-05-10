import "../../Dashboard.css";
import "../../modais.css"
import "./listaMove.css"

import { useState, useEffect } from "react";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import { BiTransferAlt } from "react-icons/bi";

function ListaMove() {
  
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [modal, setModal] = useState(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  useEffect(() => {
    const fetchMove = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/transacoes",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar movimentações");
        }

        const data = await response.json();

        const movimentacoesFormatadas = data.map((p) => ({
          id: p.id,
          idProduto: p.idProduto,
          codigo: p.codigoProduto,
          nome: p.nomeProduto,
          tipo: p.tipo,
          quantidade: p.quantidade,
          data: p.data,
          observacao: p.observacao,
          //loja: p.loja,
        }));

        setMovimentacoes(movimentacoesFormatadas);

        console.log(movimentacoesFormatadas);
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar movimentações");
      }
    };

    fetchMove();
  }, []);

  const openModal = (tipo, produto) => {
    setProdutoSelecionado(produto);
    setModal(tipo);
  };

  const closeModal = () => {
    setModal(null);
    setProdutoSelecionado(null);
  };
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Produto</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Loja</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {movimentacoes.map((m, index) => (
            <tr key={m.id}>
              <td>{m.codigo}</td>
              <td >{m.nome}</td>
              <td>
                <span className={`tipo ${m.tipo.toLowerCase()}`}>
                  {m.tipo === "ENTRADA" && "Entrada"}
                  {m.tipo === "SAIDA" && "Saída"}
                </span>
              </td>
              <td>{m.quantidade}</td>
              <td>
                {/* <span className="tag">{m.loja}</span> */}
                <span className="tag">Loja Central</span>
              </td>
              <td>{new Date(m.data).toLocaleDateString("pt-BR")}</td>

              <td className="acoes">
                <button onClick={() => openModal("view", m)}>
                  👁️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal && (
  <div className="overlay">
    <div className="modal">

      {/* FECHAR */}
      <button className="close" onClick={closeModal}>
        <AiOutlineClose />
      </button>

      {/* TOPO */}
      <div className="modalTop">

        <div className="iconBox">
          <BiTransferAlt />
        </div>

        <div>
          <h1>Detalhes da Movimentação</h1>
          <p>
            Visualize as informações completas desta movimentação.
          </p>
        </div>

      </div>

      {/* BODY */}
      <div className="modalBody">

        <div className="row">
          <span>Nome / Produto</span>

          <div className="productInfo">
            <h3>{produtoSelecionado.nome}</h3>

            <div className="codigo">
              {produtoSelecionado.codigo}
            </div>
          </div>
        </div>

        <div className="row">
          <span>Data e Hora</span>
          <h3>{produtoSelecionado.data}</h3>
        </div>

        <div className="row">
          <span>Tipo</span>

          <div className={`tipo ${produtoSelecionado.tipo}`}>
            {produtoSelecionado.tipo}
          </div>
        </div>

        <div className="row">
          <span>Quantidade</span>
          <h3>{produtoSelecionado.quantidade}</h3>
        </div>

        <div className="row">
          <span>Loja</span>
          <h3>Loja Central</h3>
        </div>

        <div className="row">
          <span>Observação</span>
          <h3>{produtoSelecionado.observacao}</h3>
        </div>

      </div>

      {/* FOOTER */}
      <div className="modalFooter">
        <button onClick={closeModal}>
          Fechar
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
}

export default ListaMove;