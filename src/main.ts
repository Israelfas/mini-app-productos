import {
  validarNombre,
  validarPrecio,
  validarStock,
  validarCategoria,
  formatearMoneda,
  type Resultado,
  type Categoria,
} from "./validators.ts";

type Producto = {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
  categoria: Categoria;
};

const productos: Producto[] = [];

const form            = document.querySelector<HTMLFormElement>("#form-producto");
const inputNombre     = document.querySelector<HTMLInputElement>("#nombre");
const inputPrecio     = document.querySelector<HTMLInputElement>("#precio");
const inputStock      = document.querySelector<HTMLInputElement>("#stock");
const selectCategoria = document.querySelector<HTMLSelectElement>("#categoria");
const lista           = document.querySelector<HTMLUListElement>("#lista-productos");
const estadoVacio     = document.querySelector<HTMLParagraphElement>("#estado-vacio");

if (!form || !inputNombre || !inputPrecio || !inputStock || !selectCategoria || !lista || !estadoVacio) {
  throw new Error("Faltan elementos en el HTML. Revisa los id.");
}

function mostrarError(idCampo: string, mensaje: string): void {
  const p = document.querySelector<HTMLParagraphElement>(`#error-${idCampo}`);
  if (!p) return;
  p.textContent = mensaje;
  const campoPadre = p.parentElement;
  if (campoPadre) {
    campoPadre.classList.toggle("invalido", mensaje.length > 0);
  }
}

function limpiarErrores(): void {
  mostrarError("nombre", "");
  mostrarError("precio", "");
  mostrarError("stock", "");
  mostrarError("categoria", "");
}

function tomar<T>(resultado: Resultado<T>, idCampo: string): T | null {
  if (resultado.tipo === "ok") {
    mostrarError(idCampo, "");
    return resultado.valor;
  }
  mostrarError(idCampo, resultado.mensaje);
  return null;
}

function eliminarProducto(id: string): void {
  const indice = productos.findIndex((p) => p.id === id);
  if (indice === -1) return;

  productos.splice(indice, 1);

  const li = lista!.querySelector<HTMLElement>(`[data-id="${id}"]`)?.closest("li");
  if (li) li.remove();

  if (productos.length === 0) {
    estadoVacio!.classList.remove("oculto");
  }
}

function renderProducto(p: Producto): HTMLLIElement {
  const li = document.createElement("li");
  li.className = "producto";

  const nombre = document.createElement("span");
  nombre.className = "nombre";
  nombre.textContent = p.nombre;

  const precio = document.createElement("span");
  precio.className = "precio";
  precio.textContent = formatearMoneda(p.precio);

  const meta = document.createElement("span");
  meta.className = "meta";

  const tag = document.createElement("span");
  tag.className = "categoria-tag";
  tag.textContent = p.categoria;

  const stock = document.createElement("span");
  stock.textContent = ` Stock: ${p.stock} unidades`;

  meta.appendChild(tag);
  meta.appendChild(stock);

  const botonEliminar = document.createElement("button");
  botonEliminar.type = "button";
  botonEliminar.className = "btn-eliminar";
  botonEliminar.textContent = "Eliminar";
  botonEliminar.dataset.id = p.id;

  botonEliminar.addEventListener("click", () => {
    eliminarProducto(p.id);
  });

  li.appendChild(nombre);
  li.appendChild(precio);
  li.appendChild(meta);
  li.appendChild(botonEliminar);

  return li;
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  limpiarErrores();

  const nombre    = tomar(validarNombre(inputNombre.value),        "nombre");
  const precio    = tomar(validarPrecio(inputPrecio.value),        "precio");
  const stock     = tomar(validarStock(inputStock.value),          "stock");
  const categoria = tomar(validarCategoria(selectCategoria.value), "categoria");

  if (nombre === null || precio === null || stock === null || categoria === null) return;

  const nuevo: Producto = {
    id: crypto.randomUUID(),
    nombre,
    precio,
    stock,
    categoria,
  };

  productos.push(nuevo);

  const li = renderProducto(nuevo);
  lista.appendChild(li);

  estadoVacio.classList.add("oculto");
  form.reset();
  inputNombre.focus();
});