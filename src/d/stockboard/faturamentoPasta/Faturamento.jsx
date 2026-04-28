import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  ResponsiveContainer
} from "recharts";
const data = [
  { mes: "Jan", faturamento: 4000, vendas: 24 },
  { mes: "Fev", faturamento: 1000, vendas: 18 },
  { mes: "Mar", faturamento: 5000, vendas: 30 },
  { mes: "Abr", faturamento: 10000, vendas: 50 },
];

export default function Faturamento() {
  return (
    <div className="FaturamentoGrafico">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <Tooltip />
          <Legend />

          {/* eixo esquerdo */}
          <YAxis yAxisId="left" />

          {/* eixo direito */}
          <YAxis yAxisId="right" orientation="right" />

  
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="faturamento"
            stroke="#3B82F6"
            strokeWidth={3}
          />

          {/* vendas */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="vendas"
            stroke="#10B981"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}