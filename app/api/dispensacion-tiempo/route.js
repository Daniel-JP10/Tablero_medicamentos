// app/api/dispensacion-tiempo/route.js

import { NextResponse } from "next/server";
import { ejecutarSQL } from "@/lib/db";
import { construirWhere } from "@/lib/filtros";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { clausula, params } = construirWhere(searchParams);

  const sql = `
    SELECT
      strftime('%Y-%m', fecha_entrega) AS mes,
      SUM(costo_total) AS costo,
      COUNT(*) AS dispensaciones,
      COUNT(DISTINCT id) AS personas
    FROM dispensacion
    ${clausula}
    GROUP BY mes
    ORDER BY mes
  `;

  const filas = await ejecutarSQL(sql, params);
  return NextResponse.json(filas);
}
