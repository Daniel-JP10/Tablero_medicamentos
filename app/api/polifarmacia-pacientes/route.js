// app/api/polifarmacia-pacientes/route.js
// Investigación de riesgo clínico: Concentración de gasto en pacientes, polifarmacia y adherencia.

import { NextResponse } from "next/server";
import { ejecutarSQL } from "@/lib/db";
import { construirWhere } from "@/lib/filtros";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { clausula, params } = construirWhere(searchParams);

  // Estadísticas globales de polifarmacia por paciente
  const sqlResumen = `
    WITH paciente_agregado AS (
      SELECT
        id,
        COUNT(*) AS total_dispensaciones,
        COUNT(DISTINCT formula) AS total_formulas,
        COUNT(DISTINCT descripcion) AS total_moleculas,
        SUM(costo_total) AS costo_total_paciente
      FROM dispensacion
      ${clausula}
      GROUP BY id
    )
    SELECT
      COUNT(*) AS total_pacientes,
      AVG(total_moleculas) AS promedio_moleculas_por_paciente,
      MAX(total_moleculas) AS max_moleculas_paciente,
      AVG(total_formulas) AS promedio_formulas_por_paciente,
      MAX(total_formulas) AS max_formulas_paciente,
      AVG(costo_total_paciente) AS costo_promedio_paciente,
      MAX(costo_total_paciente) AS max_costo_paciente,
      SUM(CASE WHEN total_moleculas >= 5 THEN 1 ELSE 0 END) AS pacientes_polifarmacia,
      SUM(CASE WHEN total_moleculas >= 10 THEN 1 ELSE 0 END) AS pacientes_hiperpolifarmacia,
      SUM(costo_total_paciente) AS costo_global_pacientes
    FROM paciente_agregado
  `;

  // Top 5 pacientes de mayor impacto económico (anonimizados)
  const sqlTopPacientes = `
    SELECT
      'Paciente #' || id AS paciente_anonimo,
      COUNT(*) AS dispensaciones,
      COUNT(DISTINCT formula) AS formulas,
      COUNT(DISTINCT descripcion) AS moleculas_distintas,
      SUM(costo_total) AS costo_total
    FROM dispensacion
    ${clausula}
    GROUP BY id
    ORDER BY costo_total DESC
    LIMIT 5
  `;

  const [resumenFilas, topPacientes] = await Promise.all([
    ejecutarSQL(sqlResumen, params),
    ejecutarSQL(sqlTopPacientes, params),
  ]);

  const resumen = resumenFilas[0] || {};
  const totalPacientes = resumen.total_pacientes || 0;
  const pctPolifarmacia = totalPacientes > 0
    ? (((resumen.pacientes_polifarmacia || 0) / totalPacientes) * 100).toFixed(1)
    : 0;
  const pctHiperpolifarmacia = totalPacientes > 0
    ? (((resumen.pacientes_hiperpolifarmacia || 0) / totalPacientes) * 100).toFixed(1)
    : 0;

  return NextResponse.json({
    ...resumen,
    porcentajePolifarmacia: pctPolifarmacia,
    porcentajeHiperpolifarmacia: pctHiperpolifarmacia,
    topPacientes,
  });
}
