// app/api/costo-pbs/route.js

import { NextResponse } from "next/server";
import { ejecutarSQL } from "@/lib/db";
import { construirWhere } from "@/lib/filtros";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { clausula, params } = construirWhere(searchParams);

  const sql = `
    SELECT
      pbs,
      SUM(costo_total) AS costo,
      COUNT(*) AS dispensaciones
    FROM dispensacion
    ${clausula}
    GROUP BY pbs
  `;

  const filas = await ejecutarSQL(sql, params);
  return NextResponse.json(filas);
}
