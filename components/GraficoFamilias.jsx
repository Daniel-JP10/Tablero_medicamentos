"use client";

// components/GraficoFamilias.jsx
// Concentración terapéutica por grandes familias de medicamentos.
// Permite observar el contraste entre familias de alta rotación (Cardiovascular) vs familias de alto costo (Inmunes/Genéticas).

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function moneda(valor) {
  if (valor === null || valor === undefined) return "-";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);
}

function acortar(texto, max = 26) {
  return texto.length > max ? texto.slice(0, max) + "…" : texto;
}

const paletaFamilias = [
  "#f43f5e", // Inmunes / Biológicos (Rosa intenso)
  "#06b6d4", // Cardiovascular (Cian)
  "#10b981", // Hormonas / Endocrino (Esmeralda)
  "#f59e0b", // Nutrición / Alimentos (Ámbar)
  "#8b5cf6", // Gastrointestinal (Violeta)
  "#3b82f6", // General (Azul)
  "#ec4899", // Insumos (Rosa)
  "#14b8a6", // Dolor (Teal)
  "#a855f7", // Respiratorio (Púrpura)
  "#64748b", // Otros (Gris)
];

export default function GraficoFamilias({ datos }) {
  if (!datos || datos.length === 0) return null;

  const datosPreparados = datos.map((d) => ({
    ...d,
    nombreCorto: acortar(d.familia),
  }));

  return (
    <ResponsiveContainer width="100%" height={380}>
      <BarChart
        layout="vertical"
        data={datosPreparados}
        margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="nombreCorto"
          width={180}
          stroke="#cbd5e1"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(255, 255, 255, 0.05)", radius: 6 }}
          contentStyle={{
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            borderColor: "#334155",
            borderRadius: "12px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
            padding: "10px 14px",
          }}
          labelStyle={{ color: "#f8fafc", fontWeight: "600", marginBottom: "4px" }}
          itemStyle={{ color: "#38bdf8" }}
          formatter={(valor, _, item) => [
            moneda(valor),
            `Costo (${item?.payload?.porcentajeCosto}%, ${new Intl.NumberFormat("es-CO").format(item?.payload?.dispensaciones)} fórmulas, ${item?.payload?.personas} pacientes)`,
          ]}
        />
        <Bar dataKey="costo" radius={[0, 8, 8, 0]}>
          {datosPreparados.map((_, i) => (
            <Cell key={i} fill={paletaFamilias[i % paletaFamilias.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
