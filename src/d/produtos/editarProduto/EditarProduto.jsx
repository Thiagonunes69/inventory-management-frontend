import { useState } from "react";
import "../adicionarProduto/adicionarProduto.css";

function EditarProduto({ closeModal ,produto, setProdutos={setProdutos}}) {
  const [id,setId] = useState(produto.id)
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
             qnt: Number(qnt),
            }),
        }
    );
    if (!response.ok) throw new Error();
      alert("✅ Produto do id ", id ," editado!");
    const produtoAtualizado = await response.json();
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

        <div className="modal-header">
          <h2>Editar Produto</h2>
          <button onClick={closeModal}>✖</button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Nome</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>Descrição</label>
            <input value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>Código</label>
            <input value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>Quantidade</label>
            <input type="number" value={qnt} onChange={(e) => setQnt(e.target.value)} required />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel" onClick={closeModal}>
              Cancelar
            </button>
            <button type="submit" className="save">
              Salvar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditarProduto;