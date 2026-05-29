// ─────────────────────────────────────────────────────────────
//  validators.ts · Librería tipada de la Semana 5
//
//  Estos validadores los escribieron ustedes la semana pasada.
//  Hoy NO los vamos a tocar. Los vamos a USAR desde el DOM.
//
//  Recordatorio del patrón:
//    - Cada validador recibe un string (lo que viene de un input).
//    - Devuelve un Resultado<T> (unión discriminada).
//    - El consumidor está OBLIGADO por TypeScript a manejar
//      ambos casos: 'ok' y 'error'.
// ─────────────────────────────────────────────────────────────

export type Resultado<T> =
  | { tipo: "ok"; valor: T }
  | { tipo: "error"; mensaje: string };

// ── Validador: nombre del producto ──────────────────────────
export function validarNombre(input: string): Resultado<string> {
  const limpio = input.trim();
  if (limpio.length === 0) {
    return { tipo: "error", mensaje: "El nombre es obligatorio." };
  }
  if (limpio.length < 3) {
    return { tipo: "error", mensaje: "Debe tener al menos 3 caracteres." };
  }
  if (limpio.length > 50) {
    return { tipo: "error", mensaje: "Máximo 50 caracteres." };
  }
  return { tipo: "ok", valor: limpio };
}

// ── Validador: precio en USD ────────────────────────────────
export function validarPrecio(input: string): Resultado<number> {
  const limpio = input.trim();
  if (limpio.length === 0) {
    return { tipo: "error", mensaje: "El precio es obligatorio." };
  }
  const numero = Number(limpio);
  if (!Number.isFinite(numero)) {
    return { tipo: "error", mensaje: "Debe ser un número válido." };
  }
  if (numero <= 0) {
    return { tipo: "error", mensaje: "Debe ser mayor que cero." };
  }
  if (numero > 1_000_000) {
    return { tipo: "error", mensaje: "Demasiado alto (máximo $1.000.000)." };
  }
  return { tipo: "ok", valor: numero };
}

// ── Validador: stock disponible ─────────────────────────────
export function validarStock(input: string): Resultado<number> {
  const limpio = input.trim();
  if (limpio.length === 0) {
    return { tipo: "error", mensaje: "El stock es obligatorio." };
  }
  const numero = Number(limpio);
  if (!Number.isInteger(numero)) {
    return { tipo: "error", mensaje: "Debe ser un número entero." };
  }
  if (numero < 0) {
    return { tipo: "error", mensaje: "No puede ser negativo." };
  }
  return { tipo: "ok", valor: numero };
}

// ── Validador: categoría (tipo literal) ─────────────────────
export type Categoria = "electronica" | "ropa" | "alimentos";

export function validarCategoria(input: string): Resultado<Categoria> {
  if (input === "electronica" || input === "ropa" || input === "alimentos") {
    return { tipo: "ok", valor: input };
  }
  return { tipo: "error", mensaje: "Selecciona una categoría válida." };
}

// ── Formateador: moneda en USD ──────────────────────────────
export function formatearMoneda(valor: number): string {
  return new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
  }).format(valor);
}
