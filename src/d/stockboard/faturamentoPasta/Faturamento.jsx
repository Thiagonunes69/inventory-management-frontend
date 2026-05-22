import "./faturamento.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";

import { useEffect, useState } from "react";

export default function Faturamento() {

  const [data, setData] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    fetch(
      `${import.meta.env.VITE_API_URL}/api/transacoes/dadosGrafico/2026-05-01/2026-05-16`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

      .then((response) => {

        if (!response.ok) {
          throw new Error("Erro HTTP: " + response.status);
        }

        return response.json();
      })

      .then((dados) => {

        const dadosFormatados = dados.map((item) => ({
          ...item,
          dia: formatarData(item.dia)
        }));

        setData(dadosFormatados);
      })

      .catch((erro) => {
        console.log("Erro ao buscar gráfico:", erro);
      });

  }, []);

  function formatarData(data) {

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}`;
  }

  return (

    <div className="grafico-area relatorio">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 10
          }}
        >

          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="#e5e7eb"
          />

          <XAxis
            dataKey="dia"
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "#6b7280",
              fontSize: 14
            }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "#6b7280",
              fontSize: 14
            }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 14px rgba(0,0,0,0.12)"
            }}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="entradas"
            name="Entradas"
            stroke="#22c55e"
            strokeWidth={4}
            dot={{
              r: 4,
              strokeWidth: 3,
              fill: "#fff"
            }}
            activeDot={{
              r: 7
            }}
          />

          <Line
            type="monotone"
            dataKey="saidas"
            name="Saídas"
            stroke="#ef4444"
            strokeWidth={4}
            dot={{
              r: 4,
              strokeWidth: 3,
              fill: "#fff"
            }}
            activeDot={{
              r: 7
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );
}