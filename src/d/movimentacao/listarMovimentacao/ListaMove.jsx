import "../../Dashboard.css";
import "../../produtos/listarProdutos/listagemProdutos.css";

import { useState, useEffect } from "react";

function ListaMove() {
  const [movimentacoes, setMovimentacoes] = useState([]);

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

              <td className="produto">
                <div>
                  <strong>{m.nome}</strong>
                  <span>{m.codigo}</span>
                </div>
              </td>

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

              <td>
                {new Date(m.data).toLocaleDateString("pt-BR")}
              </td>

              <td className="acoes">
                <button onClick={() => console.log(m)}>
                  👁️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaMove;