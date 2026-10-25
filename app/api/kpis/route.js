// app/api/kpis/route.js
// Indicadores macro del tablero y auditoría farmacéutica:
// 1. Pacientes únicos atendidos (id)
// 2. Fórmulas médicas distintas dispensadas (formula)
// 3. Dispensaciones totales (transacciones) y unidades
// 4. Inversión total consolidada y costo promedio por fórmula
// 5. Costo promedio por paciente

import { NextResponse } from "next/server";
import { ejecutarSQL } from "@/lib/db";
import { construirWhere } from "@/lib/filtros";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { clausula, params } = construirWhere(searchParams);

  const sql = `
    WITH costo_por_formula AS (
      SELECT formula, SUM(costo_total) AS costo_formula
      FROM dispensacion
      ${clausula}
      GROUP BY formula
    ),
    costo_por_paciente AS (
      SELECT id, SUM(costo_total) AS costo_paciente
      FROM dispensacion
      ${clausula}
      GROUP BY id
    )
    SELECT
      (SELECT COUNT(DISTINCT id) FROM dispensacion ${clausula}) AS personas,
      (SELECT COUNT(DISTINCT formula) FROM dispensacion ${clausula}) AS formulas,
      (SELECT COUNT(*) FROM dispensacion ${clausula}) AS dispensaciones,
      (SELECT SUM(cantidad) FROM dispensacion ${clausula}) AS unidades,
      (SELECT AVG(costo_formula) FROM costo_por_formula) AS costo_promedio_formula,
      (SELECT AVG(costo_paciente) FROM costo_por_paciente) AS costo_promedio_paciente,
      (SELECT SUM(costo_total) FROM dispensacion ${clausula}) AS costo_total,
      (SELECT SUM(CASE WHEN contrato = 'EVENTO' THEN costo_total ELSE 0 END) FROM dispensacion ${clausula}) AS costo_evento
  `;

  const filas = await ejecutarSQL(sql, params);
  const r = filas[0] || {};
  const pctEvento = r.costo_total > 0 && r.costo_evento
    ? ((r.costo_evento / r.costo_total) * 100).toFixed(1)
    : "0";

  return NextResponse.json({
    ...r,
    porcentaje_costo_evento: pctEvento,
  });
}
