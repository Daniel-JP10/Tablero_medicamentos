// app/api/subcuentas/route.js
// Distribución presupuestal y de cobertura por régimen y subcuentas (POS Subsidiado, Programas, etc.).

import { NextResponse } from "next/server";
import { ejecutarSQL } from "@/lib/db";
import { construirWhere } from "@/lib/filtros";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { clausula, params } = construirWhere(searchParams);

  const sql = `
    SELECT
      CASE 
        WHEN subcuenta = '0' THEN 'Régimen Especial / Evento'
        ELSE subcuenta 
      END AS subcuenta,
      SUM(costo_total) AS costo,
      COUNT(*) AS dispensaciones,
      COUNT(DISTINCT id) AS personas,
      AVG(costo_total) AS costo_promedio
    FROM dispensacion
    ${clausula}
    GROUP BY subcuenta
    ORDER BY costo DESC
    LIMIT 8
  `;

  const filas = await ejecutarSQL(sql, params);
  const totalCosto = filas.reduce((acc, f) => acc + (f.costo || 0), 0);

  const enriquecidas = filas.map((f) => ({
    ...f,
    porcentajeCosto: totalCosto > 0 ? ((f.costo / totalCosto) * 100).toFixed(1) : 0,
  }));

  return NextResponse.json(enriquecidas);
}
