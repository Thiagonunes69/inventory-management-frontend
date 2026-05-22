import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import "./graficoPizza.css";

function GraficoProdutosMaisMovimentados() {
  const [data, setData] = useState([]);

  const COLORS = [
    "#2563eb",
    "#22c55e",
    "#f59e0b",
    "#8b5cf6",
    "#94a3b8"
  ];

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/transacoes/produtosMaisVendidos`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      const resultado = await response.json();

      // junta ENTRADA + SAIDA do mesmo produto
      const produtosAgrupados = {};

      resultado.forEach((item) => {
        if (!produtosAgrupados[item.produtoId]) {
          produtosAgrupados[item.produtoId] = {
            produto: item.produtoId,
            movimentacoes: 0
          };
        }

        produtosAgrupados[item.produtoId].movimentacoes += item.movimentacoes;
      });

      // transforma em array
      const produtos = Object.values(produtosAgrupados);

      // ordena do maior para o menor
      produtos.sort(
        (a, b) => b.movimentacoes - a.movimentacoes
      );

      // pega os 4 maiores
      const top4 = produtos.slice(0, 4);

      // pega o resto
      const restantes = produtos.slice(4);

      // soma os restantes
      const totalOutros = restantes.reduce(
        (acc, item) => acc + item.movimentacoes,
        0
      );

      // adiciona "Outros" apenas se existir resto
      if (totalOutros > 0) {
        top4.push({
          produto: "Outros",
          movimentacoes: totalOutros
        });
      }

      setData(top4);

    } catch (erro) {
      console.error("Erro ao buscar gráfico:", erro);
    }
  }

  const total = data.reduce(
    (acc, item) => acc + item.movimentacoes,
    0
  );

  return (
    <div className="graficoPizza">
      <div className="conteudoGrafico">

        <div className="areaGrafico">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="movimentacoes"
                nameKey="produto"
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="80%"
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="legenda">
          {data.map((item, index) => (
            <div className="itemLegenda" key={index}>

              <div className="infoLegenda">

                <span
                  className="cor"
                  style={{
                    background: COLORS[index]
                  }}
                />

                <div>
                  <h4>{item.produto}</h4>

                  <p>
                    {item.movimentacoes} movimentações
                  </p>
                </div>

              </div>

              <strong>
                {Math.round(
                  (item.movimentacoes / total) * 100
                ) || 0}
                %
              </strong>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default GraficoProdutosMaisMovimentados;