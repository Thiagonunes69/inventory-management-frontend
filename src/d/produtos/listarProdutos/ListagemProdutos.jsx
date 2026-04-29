import "./listagemProdutos.css";
import { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import EditarProduto from "../editarProduto/EditarProduto";

function ListagemProdutos({ busca = "", categoria = "todos", status = "todos", resumo}) {
  const [produtos, setProdutos] = useState([]);

  const [modal, setModal] = useState(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

 useEffect(() => {
  const fetchProdutos = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/produtos/listar",
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

      // 🔥 adapta pro seu front
      const produtosFormatados = data.map((p) => ({
        id: p.id,
        nome: p.nome,
        descricao: p.descricao,
        codigo: p.codigo,
        estoque: p.qnt, // backend usa qnt
        categoria: p.usuarioNome, //  TEMPORÁRIO (ajuste se tiver categoria real)
        preco: 0, //  se não vier ainda
        imagem: "https://via.placeholder.com/40",
      }));

      setProdutos(produtosFormatados);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar produtos");
    }
  };

  fetchProdutos();
}, []);

  const getStatus = (estoque) => {
    if (estoque === 0) return "esgotado";
    if (estoque <= 5) return "baixo";
    return "ok";
  };

  // 🔥 FILTRO AQUI
  const produtosFiltrados = produtos.filter((p) => {
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase());

    const matchCategoria =
      categoria === "todos" || p.categoria === categoria;

    const statusProduto = getStatus(p.estoque);

    const matchStatus =
      status === "todos" || statusProduto === status;

    return matchBusca && matchCategoria && matchStatus;
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
        `http://localhost:8080/api/produtos/removerProduto/${produtoSelecionado.id}`,
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

      // remove da tela depois de deletar no backend
      // remover dps
      setProdutos((prev) =>
        prev.filter((p) => p.id !== produtoSelecionado.id)
      );
      closeModal();
      window.location.reload();//alterar dps!!
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
              <th>Categoria</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {produtosFiltrados.map((p, index) => {
              const status = getStatus(p.estoque);

              return (
                <tr key={p.id}>
                  <td>#{String(index + 1).padStart(3, "0")}</td>

                  <td className="produto">
                    <img src={p.imagem} alt="" />
                    <div>
                      <strong>{p.nome}</strong>
                      <span>{p.categoria}</span>
                    </div>
                  </td>

                  <td>
                    <span className="tag">{p.categoria}</span>
                  </td>

                  <td>R$ {p.preco}</td>

                  <td>{p.estoque}</td>

                  <td>
                    <span className={`status ${status}`}>
                      {status === "ok" && "Em estoque"}
                      {status === "baixo" && "Estoque baixo"}
                      {status === "esgotado" && "Esgotado"}
                    </span>
                  </td>

                  <td className="acoes">
                    <button onClick={() => openModal("edit", p)}>✏️</button>
                    <button className="delete" onClick={() => openModal("delete", p)}>🗑️</button>
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
              <>
                <EditarProduto closeModal={closeModal} produto={produtoSelecionado} setProdutos={setProdutos} />
              </>
            )}

            {modal === "view" && (
              <>
                <h2>{produtoSelecionado.nome}</h2>
                <p>Categoria: {produtoSelecionado.categoria}</p>
                <p>Preço: R$ {produtoSelecionado.preco}</p>
                <p>Estoque: {produtoSelecionado.estoque}</p>
              </>
            )}

            {modal === "delete" && (
              <div className="delete-modal">
                <h2>Excluir Produto</h2>

                <p>
                  Tem certeza que deseja excluir <strong>{produtoSelecionado.nome}</strong>?
                </p>

                <div className="modal-actions">
                  <button className="cancel" onClick={closeModal}>
                    Cancelar
                  </button>
                  <button className="delete-confirm" onClick={handleDelete}>
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