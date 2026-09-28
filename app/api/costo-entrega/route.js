// app/api/costo-entrega/route.js

import { NextResponse } from "next/server";
import { ejecutarSQL } from "@/lib/db";
import { construirWhere } from "@/lib/filtros";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { clausula, params } = construirWhere(searchParams);

  const sql = `
    SELECT
      CASE WHEN tipo_entrega = '' THEN 'SIN REGISTRO' ELSE tipo_entrega END AS tipo_entrega,
      SUM(costo_total) AS costo,
      COUNT(*) AS dispensaciones
    FROM dispensacion
    ${clausula}
    GROUP BY tipo_entrega
    ORDER BY costo DESC
  `;

  const filas = await ejecutarSQL(sql, params);
  return NextResponse.json(filas);
}
