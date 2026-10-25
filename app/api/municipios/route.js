// app/api/municipios/route.js
// Concentración territorial detallada a nivel municipal (Bolívar y municipios adyacentes).

import { NextResponse } from "next/server";
import { ejecutarSQL } from "@/lib/db";
import { construirWhere } from "@/lib/filtros";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { clausula, params } = construirWhere(searchParams);

  const sql = `
    SELECT
      CASE 
        WHEN municipio_caf = '0' OR municipio_caf = '' THEN 'Sin Asignar' 
        ELSE municipio_caf 
      END AS municipio,
      CASE 
        WHEN departamento_caf = '0' OR departamento_caf = '' THEN 'Sin Asignar' 
        ELSE departamento_caf 
      END AS departamento,
      SUM(costo_total) AS costo,
      COUNT(*) AS dispensaciones,
      COUNT(DISTINCT id) AS personas
    FROM dispensacion
    ${clausula}
    GROUP BY municipio
    ORDER BY costo DESC
    LIMIT 10
  `;

  const filas = await ejecutarSQL(sql, params);
  const costoTotal = filas.reduce((acc, f) => acc + (f.costo || 0), 0);

  const enriquecidas = filas.map((f) => ({
    ...f,
    porcentajeCosto: costoTotal > 0 ? ((f.costo / costoTotal) * 100).toFixed(1) : 0,
  }));

  return NextResponse.json(enriquecidas);
}
