// app/api/filtros/route.js


import { NextResponse } from "next/server";
import { ejecutarSQL } from "@/lib/db";

export async function GET() {
  const grupos = await ejecutarSQL(`
    SELECT DISTINCT grupo_fco_economico AS valor
    FROM dispensacion
    WHERE grupo_fco_economico != ''
    ORDER BY valor
  `);

  const anios = await ejecutarSQL(`
    SELECT DISTINCT strftime('%Y', fecha_entrega) AS valor
    FROM dispensacion
    ORDER BY valor
  `);

  const regionales = await ejecutarSQL(`
    SELECT DISTINCT regional_caf AS valor
    FROM dispensacion
    WHERE regional_caf != '' AND regional_caf != '0'
    ORDER BY valor
  `);

  return NextResponse.json({
    grupos: grupos.map((f) => f.valor),
    anios: anios.map((f) => f.valor),
    regionales: regionales.map((f) => f.valor),
  });
}
