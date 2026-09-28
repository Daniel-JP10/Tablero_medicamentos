// lib/db.js
// Este archivo es el puente entre Next.js y SQLite.
// sql.js carga el motor SQLite compilado en WebAssembly y luego abre el archivo medicamentos.db como si fuera una base de datos normal.

import initSqlJs from "sql.js";
import fs from "fs";
import path from "path";

let dbInstancePromise = null;

export function getDb() {
  // Si ya existe una promesa de conexión, reutilizamos la conexión. Esto evita abrir el archivo de 5 MB en cada llamada a la API.
  if (!dbInstancePromise) {
    dbInstancePromise = (async () => {
      const SQL = await initSqlJs({
        locateFile: (file) =>
          path.join(process.cwd(), "node_modules", "sql.js", "dist", file),
      });

      const filePath = path.join(process.cwd(), "data", "medicamentos.db");
      const fileBuffer = fs.readFileSync(filePath);
      const db = new SQL.Database(fileBuffer);
      return db;
    })();
  }
  return dbInstancePromise;
}

// Convierte el resultado crudo de sql.js, que viene como columnas y filas separadas, en un arreglo de objetos {columna: valor}, mucho más fácil de consumir desde React.
export function resultadoAObjetos(resultado) {
  if (!resultado || resultado.length === 0) return [];
  const { columns, values } = resultado[0];
  return values.map((fila) => {
    const objeto = {};
    columns.forEach((columna, i) => {
      objeto[columna] = fila[i];
    });
    return objeto;
  });
}

// Ejecuta una consulta SQL y ya devuelve los objetos listos para usar. params es un objeto con llaves tipo $anio, $mes, tal como los produce lib/filtros.js, para que la consulta quede parametrizada y segura.
export async function ejecutarSQL(sql, params = {}) {
  const db = await getDb();
  const stmt = db.prepare(sql);
  if (Object.keys(params).length) stmt.bind(params);
  const filas = [];
  while (stmt.step()) {
    filas.push(stmt.getAsObject());
  }
  stmt.free();
  return filas;
}
