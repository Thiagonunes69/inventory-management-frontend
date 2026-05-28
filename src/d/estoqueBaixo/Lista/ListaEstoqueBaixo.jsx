import "../../produtos/listarProdutos/listagemProdutos.css";
import "../../modais.css";
import { useState, useEffect } from "react";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

function ListagemProdutos({
  busca = "",
  categoria = "todos",
  status = "todos",
  resumo,
}) {
  const [produtos, setProdutos] = useState([]);

  const [modal, setModal] = useState(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/produtos/listarEstoqueBaixo`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }

        const data = await response.json();

        const produtosFormatados = data.map((p) => ({
          id: p.id,
          nome: p.nome,
          descricao: p.descricao,
          codigo: p.codigo,
          estoque: p.qnt,
          status: p.status?.toLowerCase(),
          usuarioNome: p.usuarioNome,
          imagem: "https://via.placeholder.com/40",
        }));

        setProdutos(produtosFormatados);

        console.log(data);
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar produtos");
      }
    };

    fetchProdutos();
  }, []);

  // 🔥 mostra apenas baixo ou esgotado
  const produtosFiltrados = produtos.filter((p) => {
    const matchBusca = p.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

    const matchStatus =
      p.status === "estoque baixo" || p.status === "esgotado";

    return matchBusca && matchStatus;
  });

  // HANDLERS
  const openModal = (tipo, produto) => {
    setProdutoSelecionado(produto);
    setModal(tipo);
  };

  const closeModal = () => {
    setModal(null);
    setProdutoSelecionado(null);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/produtos/removerProduto/${produtoSelecionado.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao deletar produto");
      }

      setProdutos((prev) =>
        prev.filter((p) => p.id !== produtoSelecionado.id)
      );

      closeModal();

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("❌ Erro ao deletar produto");
    }
  };

  return (
    <div className="produtos">
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Código</th>
              <th>Estoque</th>
              <th>Status</th>
              <th>Usuário</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {produtosFiltrados.map((p, index) => {
              return (
                <tr key={p.id}>
                  <td><span className="codigo">{p.codigo}</span></td>

                  <td className="produto">
                    <img src={p.imagem} alt="" />

                    <div>
                      <strong>{p.nome}</strong>
                      <span>{p.descricao}</span>
                    </div>
                  </td>

                  <td>
                    <span className="codigo">{p.codigo}</span>
                  </td>

                  <td>{p.estoque}</td>

                  <td>
                    <span className={`status ${p.status}`}>
                      {p.status === "em estoque" && "Em estoque"}
                      {p.status === "estoque baixo" && "Estoque baixo"}
                      {p.status === "esgotado" && "Esgotado"}
                    </span>
                  </td>

                  <td>{p.usuarioNome}</td>

                  <td className="acoes">
                    <button onClick={() => openModal("edit", p)}>
                      ✏️
                    </button>

                    <button
                      className="delete"
                      onClick={() => openModal("delete", p)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAIS */}
      {modal && (
        <div className="overlay">
          <div className="modal">
            <button className="close" onClick={closeModal}>
              <AiFillCloseCircle />
            </button>

            {modal === "edit" && (
              <EditarProduto
                closeModal={closeModal}
                produto={produtoSelecionado}
                setProdutos={setProdutos}
              />
            )}

            {modal === "delete" && (
              <div className="deleteModal">
                <button className="close" onClick={closeModal}>
                  <AiOutlineClose />
                </button>

                <div className="modalTop">
                  <div className="iconBox deleteIcon">
                    <MdDeleteOutline />
                  </div>

                  <div>
                    <h1>Excluir Produto</h1>
                    <p>Esta ação não poderá ser desfeita.</p>
                  </div>
                </div>

                <div className="modalBody">
                  <div className="row">
                    <span>Produto</span>

                    <div className="productInfo">
                      <h3>{produtoSelecionado.nome}</h3>

                      <div className="codigo">
                        {produtoSelecionado.codigo}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <span>Status</span>

                    <div className="tipo SAIDA">
                      Será removido do sistema
                    </div>
                  </div>
                </div>

                <div className="modalFooter">
                  <button
                    className="cancelButton"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>

                  <button
                    className="deleteButton"
                    onClick={handleDelete}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ListagemProdutos;