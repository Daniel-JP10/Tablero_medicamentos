// app/api/antidiabeticos/route.js

import { NextResponse } from "next/server";
import { ejecutarSQL } from "@/lib/db";

export async function GET() {
  const evolucionMensual = await ejecutarSQL(`
    SELECT
      strftime('%Y-%m', fecha_entrega) AS mes,
      SUM(costo_total) AS costo,
      COUNT(*) AS dispensaciones
    FROM dispensacion
    WHERE grupo_fco_economico = 'ANTIDIABETICOS'
    GROUP BY mes
    ORDER BY mes
  `);

  const medicamentoMasCostoso = await ejecutarSQL(`
    SELECT descripcion, SUM(costo_total) AS costo, COUNT(*) AS dispensaciones
    FROM dispensacion
    WHERE grupo_fco_economico = 'ANTIDIABETICOS'
    GROUP BY descripcion
    ORDER BY costo DESC
    LIMIT 5
  `);

  const costoPromedioFormula = await ejecutarSQL(`
    WITH costo_por_formula AS (
      SELECT formula, SUM(costo_total) AS costo_formula
      FROM dispensacion
      WHERE grupo_fco_economico = 'ANTIDIABETICOS'
      GROUP BY formula
    )
    SELECT AVG(costo_formula) AS promedio_grupo
    FROM costo_por_formula
  `);

  const costoPromedioFormulaGlobal = await ejecutarSQL(`
    WITH costo_por_formula AS (
      SELECT formula, SUM(costo_total) AS costo_formula
      FROM dispensacion
      GROUP BY formula
    )
    SELECT AVG(costo_formula) AS promedio_global
    FROM costo_por_formula
  `);

  // Calculamos la tendencia comparando el primer y el último mes con datos,
  // para poder afirmar con evidencia si el costo subió o bajó en el periodo.
  const primero = evolucionMensual[0];
  const ultimo = evolucionMensual[evolucionMensual.length - 1];
  const variacionPorcentual =
    primero && ultimo && primero.costo > 0
      ? ((ultimo.costo - primero.costo) / primero.costo) * 100
      : null;

  return NextResponse.json({
    evolucionMensual,
    topMedicamentos: medicamentoMasCostoso,
    costoPromedioFormulaGrupo: costoPromedioFormula[0]?.promedio_grupo ?? null,
    costoPromedioFormulaGlobal: costoPromedioFormulaGlobal[0]?.promedio_global ?? null,
    variacionPorcentual,
  });
}
