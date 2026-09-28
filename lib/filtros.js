// lib/filtros.js
// Los 11 puntos del taller comparten los mismos 3 filtros globales:
// año y mes de dispensación, regional CAF, y grupo farmacológico.
// Centralizamos aquí la construcción del WHERE para que todas las gráficas respondan igual cuando el usuario mueve un filtro.
// Importante: usamos parámetros preparados ($año, $mes, etc) en vez de pegar el texto del usuario directo en el SQL, para no abrir la puerta a inyección SQL desde la URL de la API.

export function construirWhere(searchParams) {
  const condiciones = [];
  const params = {};

  const anio = searchParams.get("anio");
  const mes = searchParams.get("mes");
  const regional = searchParams.get("regional");
  const grupo = searchParams.get("grupo");

  if (anio && anio !== "todos") {
    condiciones.push("strftime('%Y', fecha_entrega) = $anio");
    params.$anio = anio;
  }
  if (mes && mes !== "todos") {
    condiciones.push("strftime('%m', fecha_entrega) = $mes");
    params.$mes = mes;
  }
  if (regional && regional !== "todas") {
    condiciones.push("regional_caf = $regional");
    params.$regional = regional;
  }
  if (grupo && grupo !== "todos") {
    condiciones.push("grupo_fco_economico = $grupo");
    params.$grupo = grupo;
  }

  const clausula = condiciones.length ? "WHERE " + condiciones.join(" AND ") : "";
  return { clausula, params };
}
