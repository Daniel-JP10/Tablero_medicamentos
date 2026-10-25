// app/api/familias-terapeuticas/route.js
// Investigación de concentración farmacoterapéutica por grandes familias de medicamentos.

import { NextResponse } from "next/server";
import { ejecutarSQL } from "@/lib/db";
import { construirWhere } from "@/lib/filtros";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { clausula, params } = construirWhere(searchParams);

  const sql = `
    SELECT
      CASE WHEN familia = '' THEN 'Sin Asignar / Alta Complejidad' ELSE familia END AS familia,
      SUM(costo_total) AS costo,
      COUNT(*) AS dispensaciones,
      COUNT(DISTINCT id) AS personas,
      COUNT(DISTINCT descripcion) AS moleculas_distintas,
      AVG(precio) AS precio_promedio_unidad
    FROM dispensacion
    ${clausula}
    GROUP BY familia
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
