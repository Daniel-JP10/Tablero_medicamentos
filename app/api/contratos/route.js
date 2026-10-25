// app/api/contratos/route.js
// Investigación de la asimetría financiera entre modelos de contratación:
// Contratación por CAPITA (atención primaria y masiva) vs EVENTO (alta complejidad y medicamentos especializados).

import { NextResponse } from "next/server";
import { ejecutarSQL } from "@/lib/db";
import { construirWhere } from "@/lib/filtros";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { clausula, params } = construirWhere(searchParams);

  const sql = `
    SELECT
      contrato,
      COUNT(*) AS dispensaciones,
      COUNT(DISTINCT id) AS personas,
      COUNT(DISTINCT formula) AS formulas,
      SUM(costo_total) AS costo,
      AVG(costo_total) AS costo_promedio_dispensacion,
      SUM(cantidad) AS unidades
    FROM dispensacion
    ${clausula}
    GROUP BY contrato
    ORDER BY costo DESC
  `;

  const filas = await ejecutarSQL(sql, params);
  const costoGlobal = filas.reduce((acc, f) => acc + (f.costo || 0), 0);
  const dispensacionesGlobal = filas.reduce((acc, f) => acc + (f.dispensaciones || 0), 0);

  const enriquecidas = filas.map((f) => ({
    ...f,
    porcentajeCosto: costoGlobal > 0 ? ((f.costo / costoGlobal) * 100).toFixed(1) : 0,
    porcentajeDispensaciones: dispensacionesGlobal > 0 ? ((f.dispensaciones / dispensacionesGlobal) * 100).toFixed(1) : 0,
  }));

  return NextResponse.json(enriquecidas);
}
