// app/api/costo-departamento/route.js


import { NextResponse } from "next/server";
import { ejecutarSQL } from "@/lib/db";
import { construirWhere } from "@/lib/filtros";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { clausula, params } = construirWhere(searchParams);

  const sql = `
    SELECT
      departamento_caf,
      SUM(costo_total) AS costo,
      COUNT(*) AS dispensaciones
    FROM dispensacion
    ${clausula}
    GROUP BY departamento_caf
    ORDER BY costo DESC
  `;

  const filas = await ejecutarSQL(sql, params);
  return NextResponse.json(filas);
}
