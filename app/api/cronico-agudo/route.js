// app/api/cronico-agudo/route.js
// Investigación farmacoepidemiológica: Tratamientos para patologías Crónicas vs Agudas.

import { NextResponse } from "next/server";
import { ejecutarSQL } from "@/lib/db";
import { construirWhere } from "@/lib/filtros";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { clausula, params } = construirWhere(searchParams);

  const sql = `
    SELECT
      CASE 
        WHEN cronico = 'CRONICO' THEN 'Tratamiento Crónico'
        WHEN cronico = 'AGUDO' THEN 'Tratamiento Agudo'
        ELSE 'Sin Clasificar / Especial'
      END AS categoria,
      cronico AS tipo_crudo,
      COUNT(*) AS dispensaciones,
      COUNT(DISTINCT id) AS personas,
      COUNT(DISTINCT formula) AS formulas,
      SUM(costo_total) AS costo,
      AVG(costo_total) AS costo_promedio
    FROM dispensacion
    ${clausula}
    GROUP BY cronico
    ORDER BY costo DESC
  `;

  const filas = await ejecutarSQL(sql, params);
  const costoGlobal = filas.reduce((acc, f) => acc + (f.costo || 0), 0);

  const enriquecidas = filas.map((f) => ({
    ...f,
    porcentajeCosto: costoGlobal > 0 ? ((f.costo / costoGlobal) * 100).toFixed(1) : 0,
  }));

  return NextResponse.json(enriquecidas);
}
