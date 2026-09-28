// app/api/kpis/route.js
// 1. Número de personas con dispensaciones (id)
// 2. Número de fórmulas distintas dispensadas (formula)
// 3. Costo promedio de una fórmula dispensada

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
    )
    SELECT
      (SELECT COUNT(DISTINCT id) FROM dispensacion ${clausula}) AS personas,
      (SELECT COUNT(DISTINCT formula) FROM dispensacion ${clausula}) AS formulas,
      (SELECT AVG(costo_formula) FROM costo_por_formula) AS costo_promedio_formula,
      (SELECT SUM(costo_total) FROM dispensacion ${clausula}) AS costo_total
  `;

  const filas = await ejecutarSQL(sql, params);
  return NextResponse.json(filas[0] || {});
}
