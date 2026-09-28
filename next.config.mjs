/** @type {import('next').NextConfig} */
const nextConfig = {
  // sql.js usa un archivo .wasm que no debe pasar por el empaquetador de webpack, por eso lo marcamos como paquete externo para que se cargue tal cual en el servidor
  experimental: {
    serverComponentsExternalPackages: ["sql.js"],
    // Vercel empaqueta cada función serverless con "file tracing": solo incluye los archivos que detecta como necesarios. Como leemos medicamentos.db y el .wasm de sql.js con fs directamente, se los declaramos aquí a la fuerza para que no queden por fuera del bundle.
    outputFileTracingIncludes: {
      "/api/**/*": ["./data/**", "./node_modules/sql.js/dist/**"],
    },
  },
};

export default nextConfig;
