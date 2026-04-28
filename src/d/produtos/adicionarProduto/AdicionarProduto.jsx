import { useState } from "react";
import "./adicionarProduto.css";

function AdicionarProduto({ fechar }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [codigo, setCodigo] = useState("");
  const [qnt, setQnt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/produtos/adicionarProduto",
        {
          method: "POST",
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

      alert("✅ Produto adicionado!");
      fechar(); // fecha o modal

    } catch (error) {
      alert("❌ Erro ao adicionar produto");
    }
  };

  return (
    <div className="overlay">
      <div className="modal">

        <div className="modal-header">
          <h2>Novo Produto</h2>
          <button onClick={fechar}>✖</button>
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
            <button type="button" className="cancel" onClick={fechar}>
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

export default AdicionarProduto;