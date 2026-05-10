import { useState } from "react";
import "../adicionarProduto/adicionarProduto.css";

import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";

function EditarProduto({
  closeModal,
  produto,
  setProdutos,
}) {

  const [id] = useState(produto.id);
  const [nome, setNome] = useState(produto.nome);
  const [descricao, setDescricao] = useState(produto.descricao);
  const [codigo, setCodigo] = useState(produto.codigo);
  const [qnt, setQnt] = useState(produto.estoque);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(
        `http://localhost:8080/api/produtos/editarProduto/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          body: JSON.stringify({
            nome,
            descricao,
            codigo,
          }),
        }
      );

      if (!response.ok) throw new Error();

      const produtoAtualizado = await response.json();

      alert(`✅ Produto ${produtoAtualizado.nome} editado!`);

      setProdutos((prev) =>
        prev.map((p) =>
          p.id === produtoAtualizado.id
            ? {
                ...p,
                nome: produtoAtualizado.nome,
                descricao: produtoAtualizado.descricao,
                codigo: produtoAtualizado.codigo,
                estoque: produtoAtualizado.qnt,
              }
            : p
        )
      );

      closeModal();

    } catch (error) {
      alert("❌ Erro ao editar produto");
    }
  };

  return (
    <div className="overlay">

      <div className="modal">
        <button className="close" onClick={closeModal}>
          <AiOutlineClose />
        </button>

        <div className="modalTop">
          <div className="iconBox editIcon">
            <MdOutlineEdit />
          </div>

          <div>
            <h1>Editar Produto</h1>
            <p>Atualize as informações do produto selecionado.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="modalBody">

            <div className="input-group">
              <label>Nome</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required/>
            </div>

            <div className="input-group">
              <label>Descrição</label>
              <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required/>
            </div>

            <div className="input-group">
              <label>Código</label>
              <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} required/>
            </div>

          </div>
          <div className="modalFooter">
            <button type="button" className="cancelButton" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="saveButton">Salvar Alterações</button>
          </div>

        </form>

      </div>

    </div>
  );
}

export default EditarProduto;