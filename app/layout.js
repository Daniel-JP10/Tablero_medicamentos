import "./globals.css";

export const metadata = {
  title: "Tablero de Dispensación de Medicamentos | EPS 2020-2021",
  description:
    "Análisis interactivo de dispensación de medicamentos con foco en el grupo ANTIDIABETICOS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-eps-950 text-eps-50 antialiased">{children}</body>
    </html>
  );
}
