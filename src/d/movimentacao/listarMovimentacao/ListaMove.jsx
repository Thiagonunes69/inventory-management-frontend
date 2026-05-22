import "../../Dashboard.css";
import "../../modais.css";
import "./listaMove.css";

import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiTransferAlt } from "react-icons/bi";

function ListaMove({
  classname = "",
  busca = "",
  status = "todos",
  dataInicio = "",
  dataFim = "",
  resumo,
}) {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [modal, setModal] = useState(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  useEffect(() => {
    const fetchMove = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/transacoes`,
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

  // FILTROS
  const movimentacoesFiltradas = movimentacoes.filter((m) => {
    // BUSCA
    const matchBusca = m.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

    // STATUS
    const matchStatus =
      status === "todos" ||
      m.tipo.toLowerCase() === status.toLowerCase();

    // DATA
    const dataMovimentacao = new Date(m.data);

    const matchDataInicio =
      !dataInicio ||
      dataMovimentacao >= new Date(dataInicio);

    const matchDataFim =
      !dataFim ||
      dataMovimentacao <= new Date(dataFim + "T23:59:59");

    return (
      matchBusca &&
      matchStatus &&
      matchDataInicio &&
      matchDataFim
    );
  });

  const openModal = (tipo, produto) => {
    setProdutoSelecionado(produto);
    setModal(tipo);
  };

  const closeModal = () => {
    setModal(null);
    setProdutoSelecionado(null);
  };

  return (
    <div className={`table ${classname}`}>
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
          {movimentacoesFiltradas.map((m, index) => (
            <tr key={m.id}>
              <td><span className="codigo">{m.codigo}</span></td>

              <td>{m.nome}</td>

              <td>
                <span className={`tipo ${m.tipo.toLowerCase()}`}>
                  {m.tipo === "ENTRADA" && "Entrada"}
                  {m.tipo === "SAIDA" && "Saída"}
                </span>
              </td>

              <td>{m.quantidade}</td>

              <td>
                <span className="tag">Loja Central</span>
              </td>

              <td>
                {new Date(m.data).toLocaleDateString("pt-BR")}
              </td>

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
            <button className="close" onClick={closeModal}>
              <AiOutlineClose />
            </button>

            <div className="modalTop">
              <div className="iconBox">
                <BiTransferAlt />
              </div>
              <div>
                <h1>Detalhes da Movimentação</h1>
                <p>Visualize as informações completas desta movimentação.</p>
              </div>
            </div>

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

                <h3>{new Date(produtoSelecionado.data).toLocaleString("pt-BR")}</h3>
              </div>

              <div className="row">
                <span>Tipo</span>

                <div className={`tipo ${produtoSelecionado.tipo.toLowerCase()}`}>
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