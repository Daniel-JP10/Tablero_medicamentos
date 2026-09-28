#  Tablero de Control y Analítica de Dispensación de Medicamentos (EPS 2020 - 2021)

> **Auditoría, visualización y storytelling analítico sobre 28.482 dispensaciones farmacéuticas.**  
> Desarrollado con Next.js 14, WebAssembly SQLite (`sql.js`), Recharts y Tailwind CSS.

---

###  Autor
* **Daniel Andres Jimenez Povea**

---

##  Descripción del Proyecto

Este tablero interactivo fue diseñado para auditar, entender y comunicar la dinámica presupuestal y operativa del suministro de medicamentos en una EPS durante el periodo 2020-2021. 

A diferencia de tableros estáticos tradicionales, **todas las cifras, KPIs y gráficos se calculan en vivo ejecutando sentencias SQL parametrizadas** sobre una base de datos SQLite integrada (`data/medicamentos.db`), procesada en el servidor mediante **WebAssembly**.

---

##  Stack Tecnológico

| Componente | Tecnología | Propósito |
|---|---|---|
| **Framework Web** | Next.js 14 (App Router) | Servidor Serverless, rutas API REST y renderizado React 18 |
| **Motor de Base de Datos** | SQLite (`sql.js` via WebAssembly) | Consultas SQL reales en memoria sin binarios nativos |
| **Visualización de Datos** | Recharts v2 | Gráficos reactivos (Áreas temporales, Barras, Donas) |
| **Animación y Storytelling** | Framer Motion | Efectos de entrada progresiva y conteo animado de métricas |
| **Estilos y Diseño** | Tailwind CSS + Lucide Icons | Estética profesional Dark Obsidian de alto contraste |
| **Plataforma de Despliegue** | Vercel | Despliegue en Edge / Serverless Functions |

---

##  Matriz de Requisitos y Resolución Técnica

El tablero resuelve de forma integral los 11 puntos analíticos solicitados más la sección de cierre:

| # | Métrica / Requerimiento Analítico | Endpoint API | Componente Frontend |
|:---:|---|---|---|
| **1 y 2** | Pacientes únicos y fórmulas médicas dispensadas | `/api/kpis` | `TarjetaKpi.jsx` |
| **3** | Inversión / Costo promedio por fórmula atendida | `/api/kpis` | `TarjetaKpi.jsx` |
| **4** | Comportamiento histórico mensual del costo dispensado | `/api/dispensacion-tiempo` | `GraficoTiempo.jsx` |
| **5** | Top 10 medicamentos con mayor impacto presupuestal | `/api/top-medicamentos` | `GraficoTopMedicamentos.jsx` |
| **6** | Distribución de gasto dentro vs fuera del PBS | `/api/costo-pbs` | `GraficoPBS.jsx` |
| **7** | Concentración del gasto por departamento de dispensación | `/api/costo-departamento` | `GraficoDepartamento.jsx` |
| **8** | Costo logístico según modalidad (Presencial vs Domicilio) | `/api/costo-entrega` | `GraficoEntrega.jsx` |
| **9, 10, 11** | Segmentación reactiva (Grupo Farmacológico, Año, Mes, Regional) | `/api/filtros` | `BarraFiltros.jsx` |
| **Cierre** | Análisis epidemiológico y financiero del grupo **ANTIDIABETICOS** | `/api/antidiabeticos` | `SeccionAntidiabeticos.jsx` |

> **Nota Metodológica (Punto 7):** El enunciado del taller menciona la columna `municipio_caf`. En la base de datos, la agrupación departamental estandarizada reside en `departamento_caf`. Para maximizar la rigurosidad geográfica y evitar dispersión en cientos de municipios, se agrupó por `departamento_caf`, identificando los registros sin codificar como **`Sin Asignar`**.

---

##  Características de Visualización y UX

* **Escala Adaptativa vs Lineal:** El gráfico departamental cuenta con un selector de escala continuo ($f(x) = x^{0.35}$) que permite contrastar volúmenes medianos y pequeños (Córdoba, Sucre, Magdalena, Bogotá) sin que queden aplanados a 0 ni se distorsione la jerarquía real respecto a Bolívar ($281M) y Sin Asignar ($461M).
* **Contraste y Storytelling Dark Mode:** Paleta Obsidian `#070b14` con acentos de color vibrantes (Cian eléctrico, Esmeralda, Ámbar y Coral) con ratio de contraste WCAG AAA.
* **Filtros Globales Reactivos:** Cada filtro actualiza de manera simultánea todos los KPIs y gráficos del dashboard en tiempo real.
* **Optimizado para Serverless:** Configuración especial en `next.config.mjs` con `outputFileTracingIncludes` para empaquetar el binario `.wasm` y la base de datos SQLite en las funciones efímeras de Vercel.

---

##  Guía de Instalación y Ejecución Local

### Prerrequisitos
* **Node.js** 18.0 o superior
* **npm** 9.0 o superior

### 1. Clonar el repositorio
```bash
git clone https://github.com/Daniel-JP10/Tablero_medicamentos.git
cd Tablero_medicamentos
```

### 2. Instalar dependencias
```bash
npm ci --ignore-scripts
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre en tu navegador: [http://localhost:3000](http://localhost:3000)

### 4. Compilar para Producción (Verificación Vercel)
```bash
npm run build
```

---

##  Arquitectura del Repositorio

```text
├── app/
│   ├── api/                     # Rutas REST serverless
│   │   ├── antidiabeticos/      # Análisis del grupo de diabetes
│   │   ├── costo-departamento/  # Agrupación por departamento CAF
│   │   ├── costo-entrega/       # Modalidad presencial / domicilio
│   │   ├── costo-pbs/           # Cobertura dentro/fuera PBS
│   │   ├── dispensacion-tiempo/ # Serie mensual de gasto
│   │   ├── filtros/             # Opciones dinámicas para selects
│   │   ├── kpis/                # Métricas macro (Pacientes, Fórmulas, Promedio)
│   │   └── top-medicamentos/    # Top 10 medicamentos por costo
│   ├── globals.css              # Sistema de diseño y fondo ambiental
│   ├── layout.js                # Shell global y metadatos SEO
│   └── page.js                  # Ensamblador del storytelling y estado reactivo
├── components/
│   ├── BarraFiltros.jsx         # Barra de navegación y filtros globales
│   ├── GraficoDepartamento.jsx  # Gráfica de barras con escala adaptativa
│   ├── GraficoEntrega.jsx       # Comparativa logística de entrega
│   ├── GraficoPBS.jsx           # Dona de cobertura presupuestal PBS
│   ├── GraficoTiempo.jsx        # Área de marea temporal del gasto
│   ├── GraficoTopMedicamentos.jsx # Barras horizontales top gasto
│   ├── SeccionAntidiabeticos.jsx # Tarjeta ejecutiva de cierre
│   ├── SeccionRevelada.jsx      # Contenedor con animación en viewport
│   └── TarjetaKpi.jsx           # Tarjeta con conteo animado e iconos
├── data/
│   └── medicamentos.db          # Base de datos SQLite (28.482 registros)
├── lib/
│   ├── db.js                    # Conexión sql.js y ejecución parametrizada
│   └── filtros.js               # Generador dinámico de cláusula WHERE SQL
├── next.config.mjs              # Configuración WASM y File Tracing para Vercel
├── package.json                 # Dependencias y scripts
└── tailwind.config.js           # Paleta de colores e identidades
```

---

##  Seguridad y Manejo de Datos
* Las consultas SQL están construidas utilizando parámetros nombrados (`$grupo`, `$anio`, etc.) mediante sentencias preparadas de SQLite (`stmt.bind()`), eliminando cualquier vector de inyección SQL.
* El archivo de base de datos se consulta exclusivamente en modo lectura, garantizando la inmutabilidad de la información auditada.

---

**© 2026 Daniel Andres Jimenez Povea** — Todos los derechos reservados.
