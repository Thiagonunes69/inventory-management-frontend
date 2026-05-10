import { useState } from "react";

import "../../modais.css";

import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineInventory2 } from "react-icons/md";

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

      fechar();

      window.location.reload();

    } catch (error) {
      alert("❌ Erro ao adicionar produto");
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <button className="close" onClick={fechar}>
          <AiOutlineClose />
        </button>
        <div className="modalTop">
          <div className="iconBox produtoIcon">
            <MdOutlineInventory2 />
          </div>

          <div>
            <h1>Novo Produto</h1>
            <p>Adicione um novo produto ao estoque.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>

          <div className="modalBody">
            <div className="input-group">
              <label>Nome</label>

              <input type="text" placeholder="Digite o nome do produto..." value={nome} onChange={(e) => setNome(e.target.value)} required/>
            </div>
            <div className="input-group">
              <label>Descrição</label>

              <input type="text" placeholder="Digite uma descrição..." value={descricao} onChange={(e) => setDescricao(e.target.value)} required/>
            </div>
            <div className="input-group">
              <label>Código</label>

              <input type="text" placeholder="Digite o código..." value={codigo} onChange={(e) => setCodigo(e.target.value)} required/>
            </div>
            <div className="input-group">
              <label>Quantidade</label>

              <input type="number" placeholder="Digite a quantidade..." value={qnt} onChange={(e) => setQnt(e.target.value)} required/>
            </div>
          </div>

          <div className="modalFooter">
            <button type="button" className="cancelButton" onClick={fechar}>
              Cancelar
            </button>

            <button type="submit" className="saveButton">
              Salvar Produto
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AdicionarProduto;