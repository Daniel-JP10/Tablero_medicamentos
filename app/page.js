"use client";

// app/page.js
// Plataforma Integral de Investigación Farmacoepidemiológica y Farmacoeconómica (EPS 2020 - 2021).
// Análisis multidimensional sobre 28.482 dispensaciones ejecutado con SQLite / WebAssembly en Vercel.

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import BarraFiltros from "@/components/BarraFiltros";
import TarjetaKpi from "@/components/TarjetaKpi";
import SeccionRevelada from "@/components/SeccionRevelada";
import GraficoTiempo from "@/components/GraficoTiempo";
import GraficoTopMedicamentos from "@/components/GraficoTopMedicamentos";
import GraficoPBS from "@/components/GraficoPBS";
import GraficoDepartamento from "@/components/GraficoDepartamento";
import GraficoEntrega from "@/components/GraficoEntrega";
import GraficoContratos from "@/components/GraficoContratos";
import GraficoCronicos from "@/components/GraficoCronicos";
import GraficoFamilias from "@/components/GraficoFamilias";
import GraficoSubcuentas from "@/components/GraficoSubcuentas";
import SeccionPolifarmacia from "@/components/SeccionPolifarmacia";
import GraficoMunicipios from "@/components/GraficoMunicipios";
import SeccionAntidiabeticos from "@/components/SeccionAntidiabeticos";
import SeccionAuditoriaCalidad from "@/components/SeccionAuditoriaCalidad";

// Construye el query string a partir del objeto de filtros activo,
// para que cada endpoint reciba exactamente los mismos parámetros.
function aQueryString(filtros) {
  const parametros = new URLSearchParams();
  if (filtros.grupo !== "todos") parametros.set("grupo", filtros.grupo);
  if (filtros.anio !== "todos") parametros.set("anio", filtros.anio);
  if (filtros.mes !== "todos") parametros.set("mes", filtros.mes);
  if (filtros.regional !== "todas") parametros.set("regional", filtros.regional);
  return parametros.toString();
}

export default function Pagina() {
  const [filtros, setFiltros] = useState({
    grupo: "todos",
    anio: "todos",
    mes: "todos",
    regional: "todas",
  });

  const [opcionesFiltro, setOpcionesFiltro] = useState({});
  const [kpis, setKpis] = useState(null);
  const [tiempo, setTiempo] = useState([]);
  const [topMedicamentos, setTopMedicamentos] = useState([]);
  const [costoPbs, setCostoPbs] = useState([]);
  const [costoDepartamento, setCostoDepartamento] = useState([]);
  const [costoEntrega, setCostoEntrega] = useState([]);
  const [contratos, setContratos] = useState([]);
  const [cronicoAgudo, setCronicoAgudo] = useState([]);
  const [familias, setFamilias] = useState([]);
  const [subcuentas, setSubcuentas] = useState([]);
  const [polifarmacia, setPolifarmacia] = useState(null);
  const [municipios, setMunicipios] = useState([]);
  const [antidiabeticos, setAntidiabeticos] = useState(null);
  const [cargando, setCargando] = useState(true);

  const manejarCambioFiltro = useCallback((llave, valor) => {
    if (llave === "reset") {
      setFiltros(valor);
      return;
    }
    setFiltros((anterior) => ({ ...anterior, [llave]: valor }));
  }, []);

  // Las opciones de los selectores y el análisis especial de antidiabéticos
  // se inicializan al montar la aplicación.
  useEffect(() => {
    fetch("/api/filtros")
      .then((r) => r.json())
      .then(setOpcionesFiltro);
    fetch("/api/antidiabeticos")
      .then((r) => r.json())
      .then(setAntidiabeticos);
  }, []);

  // Todo el ecosistema de visualizaciones depende de los filtros globales
  // y se recalcula en tiempo real con SQL en WebAssembly.
  useEffect(() => {
    setCargando(true);
    const qs = aQueryString(filtros);
    const sufijo = qs ? `?${qs}` : "";

    Promise.all([
      fetch(`/api/kpis${sufijo}`).then((r) => r.json()),
      fetch(`/api/dispensacion-tiempo${sufijo}`).then((r) => r.json()),
      fetch(`/api/top-medicamentos${sufijo}`).then((r) => r.json()),
      fetch(`/api/costo-pbs${sufijo}`).then((r) => r.json()),
      fetch(`/api/costo-departamento${sufijo}`).then((r) => r.json()),
      fetch(`/api/costo-entrega${sufijo}`).then((r) => r.json()),
      fetch(`/api/contratos${sufijo}`).then((r) => r.json()),
      fetch(`/api/cronico-agudo${sufijo}`).then((r) => r.json()),
      fetch(`/api/familias-terapeuticas${sufijo}`).then((r) => r.json()),
      fetch(`/api/subcuentas${sufijo}`).then((r) => r.json()),
      fetch(`/api/polifarmacia-pacientes${sufijo}`).then((r) => r.json()),
      fetch(`/api/municipios${sufijo}`).then((r) => r.json()),
    ]).then(([k, t, tm, cp, cd, ce, con, ca, fam, sub, pol, mun]) => {
      setKpis(k);
      setTiempo(t || []);
      setTopMedicamentos(tm || []);
      setCostoPbs(cp || []);
      setCostoDepartamento(cd || []);
      setCostoEntrega(ce || []);
      setContratos(con || []);
      setCronicoAgudo(ca || []);
      setFamilias(fam || []);
      setSubcuentas(sub || []);
      setPolifarmacia(pol || null);
      setMunicipios(mun || []);
      setCargando(false);
    }).catch((err) => {
      console.error("Error cargando analítica:", err);
      setCargando(false);
    });
  }, [filtros]);

  return (
    <main className="min-h-screen">
      {/* HERO: Portada con storytelling e impacto visual */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-16 pb-12 text-center md:pt-24 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400">
            <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
            EPS · Investigación Farmacoepidemiológica y Presupuestal 2020 - 2021
          </div>

          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Cada fórmula dispensada cuenta <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">una historia de salud</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
            Investigación exhaustiva sobre <strong>28.482 dispensaciones</strong>, <strong>1.000 pacientes</strong> y <strong>10.005 fórmulas médicas</strong>. Motor SQL analítico en vivo para desentrañar la asimetría de contratación, polifarmacia, epidemiología crónica y dispersión territorial.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1">Motor: SQLite WebAssembly (In-Memory)</span>
            <span className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1">24 Meses Auditados</span>
            <span className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1">Gobernanza del Dato & Farmacovigilancia</span>
            <span className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1">Filtros Reactivos Parametrizados</span>
          </div>
        </motion.div>
      </section>

      {/* MARCO CONTENEDOR TIPO TABLERO */}
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-3xl border border-slate-700/80 bg-slate-950/60 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
          <BarraFiltros opciones={opcionesFiltro} filtros={filtros} onCambiar={manejarCambioFiltro} />

          <div className="space-y-12 p-5 sm:p-7 md:p-10">
            {/* BLOQUE 1: KPIs Ejecutivos Macro */}
            <SeccionRevelada>
              <div className="mb-6 flex flex-col justify-between gap-1 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">Punto de Partida Macroeconómico</p>
                  <h2 className="text-2xl font-black tracking-tight text-white">
                    Dimensionamiento global de la auditoría
                  </h2>
                </div>
                <p className="text-xs text-slate-400">Métricas agregadas según los filtros seleccionados</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <TarjetaKpi
                  etiqueta="Inversión Total Auditada"
                  valor={kpis?.costo_total}
                  esMoneda
                  acento="inversion"
                  descripcion="gasto acumulado en suministro farmacéutico"
                />
                <TarjetaKpi
                  etiqueta="Personas Atendidas"
                  valor={kpis?.personas}
                  acento="eps"
                  descripcion="pacientes únicos con dispensación efectiva"
                />
                <TarjetaKpi
                  etiqueta="Fórmulas Médicas"
                  valor={kpis?.formulas}
                  acento="salud"
                  descripcion="órdenes de prescripción médica procesadas"
                />
                <TarjetaKpi
                  etiqueta="Costo Promedio / Fórmula"
                  valor={kpis?.costo_promedio_formula}
                  esMoneda
                  acento="alerta"
                  descripcion="inversión promedio por orden atendida"
                />
              </div>
            </SeccionRevelada>

            {/* BLOQUE 2: Macroeconomía y Asimetría en Modelos de Contratación */}
            <div className="grid gap-8 lg:grid-cols-2">
              <SeccionRevelada delay={0.05}>
                <div className="h-full rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-md">
                  <div className="mb-4">
                    <span className="inline-block rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400 border border-rose-500/20 uppercase tracking-wider">
                      Gestión del Riesgo Financiero
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-white">
                      Asimetría presupuestal: Cápita vs Evento
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      Mientras que la <strong>Cápita</strong> concentra el 96% de las fórmulas con un costo moderado, la modalidad por <strong>Evento</strong> absorbe más del 60% de los recursos financieros en tratamientos de alta complejidad.
                    </p>
                  </div>

                  {contratos.length ? (
                    <GraficoContratos datos={contratos} />
                  ) : (
                    <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-slate-800 text-sm text-slate-500">
                      No se encontraron datos para la combinación de filtros actual.
                    </div>
                  )}
                </div>
              </SeccionRevelada>

              <SeccionRevelada delay={0.1}>
                <div className="h-full rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-md">
                  <div className="mb-4">
                    <span className="inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                      Fuentes de Aseguramiento
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-white">
                      Distribución por régimen y subcuentas
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      Desglose de recursos según subcuentas de financiamiento público (POS Subsidiado, Programas Especiales, Condicionados y Eventos Centralizados).
                    </p>
                  </div>

                  {subcuentas.length ? (
                    <GraficoSubcuentas datos={subcuentas} />
                  ) : (
                    <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-slate-800 text-sm text-slate-500">
                      No se encontraron datos para la combinación de filtros actual.
                    </div>
                  )}
                </div>
              </SeccionRevelada>
            </div>

            {/* BLOQUE 3: Evolución Temporal del Gasto */}
            <SeccionRevelada delay={0.05}>
              <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-md">
                <div className="mb-6">
                  <span className="inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                    Evolución Histórica
                  </span>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
                    La marea del gasto mes a mes (2020 - 2021)
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-300">
                    Comportamiento cronológico del suministro farmacéutico. Permite evaluar fluctuaciones estacionales, picos de demanda y el impacto de los filtros farmacológicos en el tiempo.
                  </p>
                </div>

                {tiempo.length ? (
                  <GraficoTiempo datos={tiempo} />
                ) : (
                  <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-800 text-sm text-slate-500">
                    No se encontraron datos para la combinación de filtros actual.
                  </div>
                )}
              </div>
            </SeccionRevelada>

            {/* BLOQUE 4: Familias Terapéuticas y Top Medicamentos */}
            <div className="grid gap-8 lg:grid-cols-2">
              <SeccionRevelada delay={0.05}>
                <div className="h-full rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-md">
                  <div className="mb-4">
                    <span className="inline-block rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400 border border-rose-500/20 uppercase tracking-wider">
                      Farmacoterapia Dominante
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-white">
                      Ranking por familias terapéuticas
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      Contraste entre grandes grupos: moléculas inmunológicas y biológicas de alto costo vs tratamientos cardiovasculares de consumo masivo.
                    </p>
                  </div>

                  {familias.length ? (
                    <GraficoFamilias datos={familias} />
                  ) : (
                    <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-800 text-sm text-slate-500">
                      No se encontraron datos para la combinación de filtros actual.
                    </div>
                  )}
                </div>
              </SeccionRevelada>

              <SeccionRevelada delay={0.1}>
                <div className="h-full rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-md">
                  <div className="mb-4">
                    <span className="inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                      Concentración del Gasto (Pareto)
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-white">
                      Diez moléculas con mayor peso presupuestal
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      Una reducida fracción de presentaciones comerciales concentra el mayor impacto financiero para la EPS.
                    </p>
                  </div>

                  {topMedicamentos.length ? (
                    <GraficoTopMedicamentos datos={topMedicamentos} />
                  ) : (
                    <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-800 text-sm text-slate-500">
                      No se encontraron datos para la combinación de filtros actual.
                    </div>
                  )}
                </div>
              </SeccionRevelada>
            </div>

            {/* BLOQUE 5: Epidemiología del Tratamiento: Crónicos vs Agudos */}
            <SeccionRevelada delay={0.05}>
              <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-md">
                <div className="mb-6">
                  <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                    Epidemiología Clínica
                  </span>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
                    Tratamientos crónicos vs agudos: la carga de la continuidad
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-300">
                    Los pacientes con patologías crónicas requieren adherencia sostenida. Mientras que los agudos promedian $4.970 por fórmula, los tratamientos crónicos alcanzan $31.149 por prescripción (&gt;6x de inversión unitaria).
                  </p>
                </div>

                {cronicoAgudo.length ? (
                  <GraficoCronicos datos={cronicoAgudo} />
                ) : (
                  <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-slate-800 text-sm text-slate-500">
                    No se encontraron datos para la combinación de filtros actual.
                  </div>
                )}
              </div>
            </SeccionRevelada>

            {/* BLOQUE 6: Caracterización de Pacientes y Polifarmacia */}
            <SeccionRevelada delay={0.05}>
              <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-md">
                <div className="mb-6">
                  <span className="inline-block rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20 uppercase tracking-wider">
                    Farmacovigilancia y Gestión de Riesgo
                  </span>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
                    Polifarmacia y concentración de pacientes
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-300">
                    Análisis de usuarios hiperfrecuentadores y concurrencia terapéutica. Un paciente individual llegó a registrar hasta 52 moléculas distintas y 304 dispensaciones acumuladas.
                  </p>
                </div>

                {polifarmacia && Number(polifarmacia.total_pacientes) > 0 ? (
                  <SeccionPolifarmacia datos={polifarmacia} />
                ) : (
                  <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-slate-800 text-sm text-slate-500">
                    No se encontraron datos para la combinación de filtros actual.
                  </div>
                )}
              </div>
            </SeccionRevelada>

            {/* BLOQUE 7: Cobertura PBS y Logística de Despacho */}
            <div className="grid gap-8 md:grid-cols-2">
              <SeccionRevelada delay={0.05}>
                <div className="h-full rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-md">
                  <div className="mb-4">
                    <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                      Cobertura y Plan
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-white">
                      Medicamentos dentro vs fuera del PBS
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      El gasto no cubierto por el Plan de Beneficios en Salud representa una carga presupuestal crítica gestionada bajo mecanismos de excepción y recobro.
                    </p>
                  </div>

                  {costoPbs.length ? (
                    <GraficoPBS datos={costoPbs} />
                  ) : (
                    <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-slate-800 text-sm text-slate-500">
                      No se encontraron datos para la combinación de filtros actual.
                    </div>
                  )}
                </div>
              </SeccionRevelada>

              <SeccionRevelada delay={0.1}>
                <div className="h-full rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-md">
                  <div className="mb-4">
                    <span className="inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                      Canal Logístico
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-white">
                      Modalidad de dispensación
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      Distribución del costo entre retiro presencial en los Centros de Atención Farmacéutica (CAF) vs entrega a domicilio.
                    </p>
                  </div>

                  {costoEntrega.length ? (
                    <GraficoEntrega datos={costoEntrega} />
                  ) : (
                    <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-slate-800 text-sm text-slate-500">
                      No se encontraron datos para la combinación de filtros actual.
                    </div>
                  )}
                </div>
              </SeccionRevelada>
            </div>

            {/* BLOQUE 8: Geografía del Gasto (Departamentos y Municipios) */}
            <div className="grid gap-8 lg:grid-cols-2">
              <SeccionRevelada delay={0.05}>
                <div className="h-full rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-md">
                  <div className="mb-4">
                    <span className="inline-block rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20 uppercase tracking-wider">
                      Red Departamental
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-white">
                      Distribución por departamento
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      Bolívar concentra la mayor actividad territorial. La barra en ámbar (&ldquo;Sin Asignar&rdquo;) señala registros de alta complejidad.
                    </p>
                  </div>

                  {costoDepartamento.length ? (
                    <GraficoDepartamento datos={costoDepartamento} />
                  ) : (
                    <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-800 text-sm text-slate-500">
                      No se encontraron datos para la combinación de filtros actual.
                    </div>
                  )}
                </div>
              </SeccionRevelada>

              <SeccionRevelada delay={0.1}>
                <div className="h-full rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-md">
                  <div className="mb-4">
                    <span className="inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                      Red Municipal CAF
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-white">
                      Distribución por municipio
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      Cartagena funge como nodo principal ($226M), seguido por polos regionales clave como Turbaco, Arjona, Mahates y Soplaviento.
                    </p>
                  </div>

                  {municipios.length ? (
                    <GraficoMunicipios datos={municipios} />
                  ) : (
                    <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-800 text-sm text-slate-500">
                      No se encontraron datos para la combinación de filtros actual.
                    </div>
                  )}
                </div>
              </SeccionRevelada>
            </div>

            {/* BLOQUE 9: Caso Especial Clínico - Grupo Antidiabéticos */}
            <SeccionRevelada delay={0.05}>
              <SeccionAntidiabeticos datos={antidiabeticos} />
            </SeccionRevelada>

            {/* BLOQUE 10: Auditoría Forense y Calidad del Dato */}
            <SeccionRevelada delay={0.05}>
              <SeccionAuditoriaCalidad />
            </SeccionRevelada>
          </div>
        </div>
      </div>

      {cargando && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-sky-500/30 bg-slate-900/95 px-4 py-2 text-xs font-medium text-sky-300 shadow-2xl backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-sky-400 animate-ping" />
          Consultando base de datos SQL...
        </div>
      )}
    </main>
  );
}
