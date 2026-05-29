# Mini App de Productos · Semana 6 (Demo starter)

Este es el **punto de partida** de la Sesión 1 del martes 26 de mayo.

## ¿Qué traemos de Semana 5?

- ✅ Proyecto Vite + TypeScript ya configurado (`tsconfig.json` en modo strict).
- ✅ La librería `validators.ts` con `validarNombre`, `validarPrecio`, `validarStock`,
  `validarCategoria`, `formatearMoneda` y el tipo `Resultado<T>`.
- ✅ `index.html` con la estructura HTML del formulario y la lista (estática).
- ✅ `styles.css` aplicado (heredado del Bloque 1).
- ⚠️ `main.ts` casi vacío: aquí es donde vamos a escribir el código de hoy.

## ¿Qué vamos a construir hoy?

Un formulario que:

1. Lea los 4 campos cuando el usuario hace submit.
2. Valide cada uno con la librería de S5.
3. Muestre errores específicos bajo cada campo si algo está mal.
4. Si todo está OK, cree un nuevo `<li>` en la lista de productos.

Sin DOM, este HTML es decorativo. Hoy le damos vida.

## Cómo arrancar

```bash
npm install
npm run dev
```

Abre http://localhost:5173 y la consola del navegador (F12 → Console).
