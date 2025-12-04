import { Producto } from './producto.js';

/**
 * Lista constante de productos disponibles en el juego.
 * Contiene instancias predefinidas de la clase Producto.
 * @constant
 * @type {Array<Producto>}
 */
export const mercado = [
  new Producto('Espada corta', 120, 'común', 'arma', { ataque: 8 }, './imagenes/espada-corta.png'),
  new Producto('Arco de caza', 140, 'común', 'arma', { ataque: 7 }, './imagenes/arco-caza.png'),
  new Producto('Armadura de cuero', 180, 'común', 'armadura', { defensa: 6 }, './imagenes/armadura-cuero.png'),
  new Producto('Poción pequeña', 400, 'común', 'consumible', { curacion: 20 }, './imagenes/pocion-pequena.png'),
  new Producto('Espada rúnica', 406, 'raro', 'arma', { ataque: 18 }, './imagenes/espada-runica.png'),
  new Producto('Escudo de roble', 321, 'raro', 'armadura', { defensa: 14 }, './imagenes/escudo-roble.png'),
  new Producto('Poción grande', 111, 'raro', 'consumible', { curacion: 60 }, './imagenes/pocion-grande.png'),
  new Producto('Mandoble épico', 95, 'épico', 'arma', { ataque: 32 }, './imagenes/mandoble-epico.png'),
  new Producto('Placas dracónicas', 88, 'épico', 'armadura', { defensa: 28 }, './imagenes/placas-draconicas.png'),
  new Producto('Elixir legendario', 52, 'épico', 'consumible', { curacion: 150 }, './imagenes/elixir-legendario.png'),
];

/**
 * Filtra la lista de productos del mercado según su rareza.
 * @function
 * @param {string} rareza - La rareza a filtrar (ej: 'común', 'raro').
 * @returns {Array<Producto>} Un nuevo array con los productos que coinciden con la rareza.
 */
export function filtrarPorRareza(rareza) {
  return mercado.filter(producto => producto.rareza === rareza);
}

/**
 * Aplica un descuento a los productos de una rareza específica.
 * Recorre el mercado y devuelve una copia de los productos con el precio actualizado si coinciden con la rareza.
 * @function
 * @param {string} rareza - La rareza de los productos a descontar.
 * @param {number} porcentaje - El porcentaje de descuento a aplicar (0-100).
 * @returns {Array<Producto>} Un nuevo array de productos con los descuentos aplicados.
 */
export function aplicarDescuentoPorRareza(rareza, porcentaje) {
  return mercado.map(producto =>
    producto.rareza === rareza ? producto.aplicarDescuento(porcentaje) : producto
  );
}

/**
 * Busca un producto en el mercado por su nombre.
 * La búsqueda no distingue entre mayúsculas y minúsculas.
 * @function
 * @param {string} nombre - El nombre del producto a buscar.
 * @returns {Producto|null} El producto encontrado o null si no existe.
 */
export function buscarProducto(nombre) {
  return mercado.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase()) || null;
}

/**
 * Devuelve la descripción en texto de un producto específico.
 * Utiliza el método mostrarProducto de la instancia.
 * @function
 * @param {Producto} producto - El objeto producto a describir.
 * @returns {string} La descripción formateada del producto.
 */
export function describirProducto(producto) {
  return producto.mostrarProducto();
}