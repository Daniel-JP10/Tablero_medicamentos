"use client";

// components/SeccionRevelada.jsx
// Envuelve cualquier sección del storytelling para que aparezca con un
// leve desplazamiento y desvanecido cuando el usuario llega a ella con
// el scroll. whileInView solo dispara la animación una vez, así que la
// narrativa no se repite de forma molesta si el usuario sube y baja.

import { motion } from "framer-motion";

export default function SeccionRevelada({ children, className = "", delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
