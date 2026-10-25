# 🔬 Plataforma de Investigación Farmacoepidemiológica, Farmacoeconómica y Auditoría de Dispensación (EPS 2020 - 2021)

> **Auditoría forense, analítica multidimensional y storytelling científico sobre 28.482 dispensaciones farmacéuticas.**  
> Desarrollado con Next.js 14 (App Router), motor SQLite en memoria vía WebAssembly (`sql.js`), Recharts, Framer Motion y Tailwind CSS.

**Despliegue en producción:** [https://tablero-medicamentos.vercel.app/](https://tablero-medicamentos.vercel.app/)

---

### 👤 Autor
* **Daniel Andres Jimenez Povea**

---

## 📌 Introducción y Enfoque de Investigación

La gestión del gasto farmacéutico dentro del Sistema General de Seguridad Social en Salud (SGSSS) en Colombia representa uno de los mayores desafíos para la sostenibilidad financiera de las Entidades Promotoras de Salud (EPS).

Este proyecto trasciende un tablero de control tradicional: constituye una **investigación integral farmacoepidemiológica y farmacoeconómica** fundamentada en el análisis exhaustivo de **28.482 dispensaciones farmacéuticas**, correspondientes a **1.000 pacientes únicos** y **10.005 fórmulas médicas** atendidas durante un horizonte de 24 meses (2020 - 2021) a través del operador logístico AUDIFARMA.

Todas las cifras, matrices de correlación y visualizaciones son computadas **en vivo** ejecutando sentencias SQL parametrizadas sobre un motor SQLite embebido compilado en **WebAssembly**, garantizando inmutabilidad, seguridad estricta y velocidad de respuesta sin dependencias de bases de datos externas.

---

## 🧬 Ejes Centrales de la Investigación

```
┌────────────────────────────────────────────────────────────────────────┐
│             ARQUITECTURA DE INVESTIGACIÓN FARMACOECONÓMICA             │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ 1. Macroeconomía  │ 2. Epidemiología  │ 3. Farmacoterapia & Alto Costo │
│    & Contratación │    & Pacientes    │    (Biológicos e Inmunes)      │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ 4. Polifarmacia   │ 5. Geografía &    │ 6. Auditoría Forense           │
│    & Adherencia   │    Red Logística  │    & Calidad del Dato          │
└───────────────────┴───────────────────┴────────────────────────────────┘
```

### 1. Macroeconomía y Asimetría en Modelos de Contratación (`contrato`)
* **Hallazgo Financiero Crítico:** Se constató una profunda asimetría estructural:
  * La modalidad **CÁPITA** absorbe el **96.0% de las órdenes médicas** (27.333 dispensaciones) con un costo promedio de apenas **$10.372** por prescripción, representando el 38.05% del presupuesto global ($283.5M).
  * La modalidad **EVENTO** agrupa únicamente el **4.0% de las dispensaciones** (1.149 registros), pero consume el **61.95% de los recursos financieros** ($461.6M), con un costo promedio por transacción de **$401.788** (una relación de costo unitario de 38 a 1 frente a la cápita).
* **Implicación Gerencial:** El riesgo presupuestal de la EPS no radica en la masividad ambulatoria, sino en la concentración extrema de medicamentos biológicos y de alta complejidad canalizados por evento.

### 2. Estructura de Aseguramiento y Subcuentas (`subcuenta`)
* El régimen **POS SUBSIDIADO** conforma el núcleo operativo con 22.461 transacciones ($142.1M).
* Los **PROGRAMAS ESPECIALES** (57 fórmulas combinadas entre subsidiado y contributivo) acumulan casi **$100.0M** en gasto, reflejando terapias personalizadas de alto impacto.
* Se evidencian líneas de contingencia y medicamentos controlados para pacientes con patologías de manejo restringido.

### 3. Farmacoterapia Dominante y Concentración Presupuestal (`familia` / `descripcion`)
* **Familia Inmunes / Genéticas:** Representa la cúspide del impacto presupuestal con **$122.8M** en apenas 184 dispensaciones (16.5% del gasto total).
* **Medicamentos de Ultra-Alto Costo:**
  1. *Ustekinumab* (45 mg / 0.5 ml): **$9.501.828** por jeringa prellenada ($57.0M acumulados en solo 6 unidades).
  2. *Abatacept* (250 mg): **$1.098.981** por vial ($71.8M acumulados en 66 unidades).
  3. *Tocilizumab* y *Adalimumab*: Moléculas biológicas modificadoras de enfermedad con costos unitarios superiores a los $500.000.
* **Familia Cardiovascular:** Constituye el mayor peso de atención sostenida en la red ambulatoria con **5.054 dispensaciones** y $45.9M invertidos.

### 4. Epidemiología Clínica: Tratamiento Crónico vs Agudo (`cronico`)
* Los tratamientos para **patologías crónicas** registraron un costo promedio por prescripción de **$31.149** ($241.6M en total).
* Los tratamientos **agudos** demandaron un promedio de **$4.970** por fórmula ($31.9M en total).
* La inversión en un paciente crónico es **más de 6 veces superior** a la de un evento agudo, evidenciando la necesidad de programas preventivos para evitar progresión a estadios de complicación.

### 5. Farmacovigilancia y Riesgo de Polifarmacia (`id`)
* El promedio de moléculas distintas consumidas por paciente es de **9.7 principios activos**.
* **Tasa de Polifarmacia (≥ 5 moléculas concurrentes):** Presente en una porción sustancial de la cohorte analizada.
* **Hiperpolifarmacia Extrema (≥ 10 moléculas):** Se identificaron casos críticos, destacando un paciente con **52 moléculas diferentes**, **304 dispensaciones** y un gasto acumulado de **$166.918.981**, demostrando la existencia de pacientes hiperfrecuentadores que requieren comités de farmacoterapia individualizados.

### 6. Geografía de la Cobertura Territorial (`departamento_caf` / `municipio_caf`)
* **Epicentro Municipal:** Cartagena concentra el mayor volumen ambulatorio con **$226.7M** en 17.056 dispensaciones.
* **Red Satélite en Bolívar:** Turbaco ($14.4M), Arjona ($12.5M), Mahates ($6.3M) y Soplaviento ($5.5M) representan los principales nodos provinciales de entrega.
* **Escala Adaptativa ($f(x) = x^{0.35}$):** Tanto para la distribución departamental como municipal, se implementó una función continua de compresión visual que permite contrastar los municipios intermedios y periféricos sin aplanarlos artificialmente a cero ni falsear el orden jerárquico.

### 7. Auditoría Forense y Gobernanza del Dato
* **El Hallazgo de los $461.8M "Sin Asignar":** En la base de datos figuran 1.241 registros codificados como `0` en departamento y municipio.
* **Resolución Forense:** La investigación demostró una correlación del **100%** entre estos registros y la modalidad de contratación por **EVENTO** en moléculas de alta complejidad. Esto evidencia que los medicamentos de dispensación intrahospitalaria o entrega especializada no pasan por los CAF departamentales estándar, señalando una oportunidad clave de mejora en la codificación DANE para la EPS.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Justificación Técnica |
|---|---|---|
| **Framework Full-Stack** | Next.js 14 (App Router) | Servidor serverless, renderizado reactivo y compilación estática |
| **Motor de Base de Datos** | SQLite (`sql.js` en WebAssembly) | Motor SQL real en memoria, sin drivers de C++ nativos, 100% portable a Vercel |
| **Visualización Analítica** | Recharts v2 | Gráficos reactivos (Barras horizontales, Escalas adaptativas, Áreas temporales, Donas) |
| **Diseño y Estética** | Tailwind CSS (Paleta Obsidian Dark) | Superficies con profundidad (`#070b14`), tipografía moderna y ratio WCAG AAA |
| **Micro-interacciones** | Framer Motion & Lucide Icons | Conteo animado de métricas en viewport y animaciones fluidas |
| **Despliegue y Hosting** | Vercel Serverless | Empaquetamiento automático de `.wasm` y `medicamentos.db` mediante File Tracing |

---

## 📡 Matriz de Endpoints y Servicios Analíticos

Todas las rutas API residen en `app/api/` y consumen la cláusula `WHERE` construida de forma segura y parametrizada en `lib/filtros.js`:

| Endpoint | Propósito Analítico | Método |
|---|---|:---:|
| `/api/kpis` | Indicadores macro (Costo total, personas, fórmulas, costo promedio, % evento) | `GET` |
| `/api/contratos` | Asimetría financiera entre modelos de contratación (Cápita vs Evento) | `GET` |
| `/api/cronico-agudo` | Segmentación epidemiológica y costo unitario (Crónico vs Agudo) | `GET` |
| `/api/familias-terapeuticas` | Ranking de grandes familias clínicas y costo acumulado | `GET` |
| `/api/subcuentas` | Financiación presupuestal por régimen (POS Subsidiado, Programas, etc.) | `GET` |
| `/api/polifarmacia-pacientes` | Concurrencia de principios activos, tasas de polifarmacia y top pacientes | `GET` |
| `/api/dispensacion-tiempo` | Serie cronológica mensual de costo y número de dispensaciones | `GET` |
| `/api/top-medicamentos` | Top 10 moléculas de mayor impacto financiero para la entidad | `GET` |
| `/api/costo-pbs` | Distribución de gasto dentro vs fuera del Plan de Beneficios en Salud | `GET` |
| `/api/costo-departamento` | Concentración geográfica departamental con escala adaptativa | `GET` |
| `/api/municipios` | Desglose territorial a nivel de municipios de la red CAF | `GET` |
| `/api/costo-entrega` | Comparativa logística (Dispensación presencial vs a domicilio) | `GET` |
| `/api/antidiabeticos` | Caso de estudio especial clínico: tendencia y costo del grupo diabetes | `GET` |
| `/api/filtros` | Opciones dinámicas para selectores globales de segmentación | `GET` |

---

## 💻 Guía de Instalación y Ejecución Local

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

### 4. Compilar para Producción (Verificación Serverless Vercel)
```bash
npm run build
```

---

## 📂 Arquitectura del Proyecto

```text
├── app/
│   ├── api/                         # Endpoints REST serverless optimizados
│   │   ├── antidiabeticos/          # Estudio clínico del grupo diabetes
│   │   ├── contratos/               # Asimetría presupuestal Cápita vs Evento
│   │   ├── costo-departamento/      # Análisis regional por departamento
│   │   ├── costo-entrega/           # Canal presencial vs domiciliario
│   │   ├── costo-pbs/               # Cobertura dentro/fuera de PBS
│   │   ├── cronico-agudo/           # Epidemiología de tratamientos continuos
│   │   ├── dispensacion-tiempo/     # Serie mensual cronológica
│   │   ├── familias-terapeuticas/   # Ranking de grupos farmacológicos
│   │   ├── filtros/                 # Opciones para selectores reactivos
│   │   ├── kpis/                    # Métricas agregadas de alto impacto
│   │   ├── municipios/              # Red territorial a nivel municipal
│   │   ├── polifarmacia-pacientes/  # Riesgo clínico y concurrencia de fármacos
│   │   ├── subcuentas/              # Financiación por régimen y programas
│   │   └── top-medicamentos/        # Top 10 moléculas de mayor presupuesto
│   ├── globals.css                  # Variables de diseño y fondo Obsidian Dark
│   ├── layout.js                    # Shell global y metadatos SEO
│   └── page.js                      # Orquestador del storytelling y estado reactivo
├── components/
│   ├── BarraFiltros.jsx             # Barra flotante con selectores sincronizados
│   ├── GraficoContratos.jsx         # Visualización de asimetría presupuestal
│   ├── GraficoCronicos.jsx          # Comparativa de patologías crónicas vs agudas
│   ├── GraficoDepartamento.jsx      # Barras departamentales con escala adaptativa
│   ├── GraficoEntrega.jsx           # Canal logístico de entrega
│   ├── GraficoFamilias.jsx          # Barras horizontales por familias terapéuticas
│   ├── GraficoMunicipios.jsx        # Barras municipales con selector adaptativo
│   ├── GraficoPBS.jsx               # Dona de cobertura presupuestal PBS
│   ├── GraficoSubcuentas.jsx        # Distribución de fondos por subcuentas
│   ├── GraficoTiempo.jsx            # Área de marea temporal del gasto
│   ├── GraficoTopMedicamentos.jsx   # Barras horizontales de concentración Pareto
│   ├── SeccionAntidiabeticos.jsx    # Estudio clínico especial de cierre
│   ├── SeccionAuditoriaCalidad.jsx  # Análisis forense de registros de alta complejidad
│   ├── SeccionPolifarmacia.jsx      # Panel de farmacovigilancia y polifarmacia
│   ├── SeccionRevelada.jsx          # Contenedor con animación en viewport
│   └── TarjetaKpi.jsx               # Tarjeta con conteo animado e iconos semánticos
├── data/
│   └── medicamentos.db              # Base de datos SQLite (28.482 registros)
├── lib/
│   ├── db.js                        # Conexión sql.js y ejecución parametrizada
│   └── filtros.js                   # Generador dinámico de cláusula WHERE SQL
├── next.config.mjs                  # Configuración WASM y File Tracing para Vercel
├── package.json                     # Dependencias y scripts
└── tailwind.config.js               # Paleta de colores e identidades
```

---

## 🔒 Seguridad, Calidad y Compatibilidad con Vercel

* **Inmunidad a Inyecciones SQL:** Todas las consultas se ejecutan con parámetros preparados nombrados (`$grupo`, `$anio`, `$mes`, `$regional`) a través de `stmt.bind()` en `sql.js`, descartando concatenaciones vulnerables.
* **Integridad de Datos:** El archivo `medicamentos.db` se abre en modo estrictamente de solo lectura en memoria.
* **Empaquetamiento Serverless Vercel:** Mediante la directiva `outputFileTracingIncludes` en `next.config.mjs`, Vercel incluye automáticamente el binario `.wasm` y el archivo de base de datos dentro de cada función efímera de la API, garantizando que el despliegue funcione al 100% sin caídas.

---

## 🛡️ Manejo de Datos Faltantes y Filtros Excluyentes (Empty States)

En el análisis de datos farmacoepidemiológicos es frecuente que el usuario aplique combinaciones de filtros altamente restrictivas (por ejemplo, seleccionar un grupo farmacológico específico en un mes o regional donde no hubo dispensaciones registradas).

El tablero cuenta con una capa integral de **manejo resiliente de estados vacíos (empty states)**:
* **Feedback Inmediato en Pantalla:** Cuando una consulta SQL no arroja registros para la combinación de filtros seleccionada, cada contenedor visual muestra de forma limpia y estilizada el mensaje:  
  `No se encontraron datos para la combinación de filtros actual.`
* **Consistencia Gráfica:** Se evita el colapso o rotura de los gráficos de Recharts mediante cajas adaptadas con bordes discontinuos (`border-dashed border-slate-800`), manteniendo la estabilidad del layout sin desbordamientos.
* **Diagnóstico de Brechas:** Esta característica sirve como herramienta de auditoría para que los analistas de la EPS identifiquen rápidamente desabastecimientos temporales o vacíos de cobertura en regionales específicas.

---

## 📜 Especificaciones de Uso, Licencia y Atribución

Este repositorio es de **acceso público y código abierto**. Está concebido como un aporte a la comunidad de analítica de datos en salud, desarrollo web con WebAssembly y farmacoeconomía.

### Términos y Condiciones de Uso:
1. **Libertad de Uso:** Se permite a cualquier persona, estudiante, docente, investigador o institución clonar, bifurcar (fork), estudiar, reutilizar y adaptar el código fuente, la arquitectura serverless y la base de datos para fines académicos, de demostración o profesionales.
2. **Requisito Obligatorio de Atribución / Referencia:**  
   Todo proyecto, exposición, publicación académica, artículo, repositorio derivado o tablero que utilice este código, diseño o hallazgos analíticos **debe otorgar el respectivo crédito y mención explícita al autor original**, enlazando al repositorio fuente:

> **Referencia Requerida:**  
> * **Autor Original:** Daniel Andres Jimenez Povea  
> * **Repositorio Fuente:** [https://github.com/Daniel-JP10/Tablero_medicamentos](https://github.com/Daniel-JP10/Tablero_medicamentos)  
> * **Proyecto:** *Plataforma de Investigación Farmacoepidemiológica, Farmacoeconómica y Auditoría de Dispensación (EPS 2020 - 2021)*

#### Formato de Citación Sugerido (APA / Texto):
```text
Jimenez Povea, D. A. (2026). Plataforma de Investigación Farmacoepidemiológica, 
Farmacoeconómica y Auditoría de Dispensación Farmacéutica (EPS 2020-2021). 
GitHub: https://github.com/Daniel-JP10/Tablero_medicamentos
```

---

**© 2026 Daniel Andres Jimenez Povea** — Plataforma de Investigación Farmacoepidemiológica y Farmacoeconómica. Todos los derechos reservados.

