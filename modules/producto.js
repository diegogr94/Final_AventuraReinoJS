import { EUR } from '../utils/utils.js';

/**
 * Clase que representa un objeto comprable en el mercado del juego.
 * Gestiona los precios, rarezas y bonus de cada ítem (Armas, Armaduras o Consumibles).
 * @class
 */
export class Producto {

  /**
   * Nombre identificativo del producto.
   * @type {string}
   */
  nombre;

  /**
   * Precio base del producto en monedas.
   * @type {number}
   */
  precio;

  /**
   * Categoría de rareza (ej: 'común', 'raro', 'épico').
   * @type {string}
   */
  rareza;

  /**
   * Tipo de ítem (ej: 'arma', 'armadura', 'consumible').
   * @type {string}
   */
  tipo;

  /**
   * Estadísticas extra que otorga el ítem (ataque, defensa o curación).
   * @type {Object}
   */
  bonus;

  /**
   * Crea una nueva instancia de Producto.
   * @param {string} nombre - Nombre del producto.
   * @param {number} precio - Precio base del producto.
   * @param {string} rareza - Nivel de rareza (por ejemplo: "común", "raro", "épico").
   * @param {string} tipo - Tipo de producto (por ejemplo: "arma", "poción", "armadura").
   * @param {Object} bonus - Objeto con los bonus del producto, por ejemplo { ataque: 5, defensa: 2 }.
   */
  constructor(nombre, precio, rareza, tipo, bonus) {
    this.nombre = nombre;
    this.precio = precio;
    this.rareza = rareza;
    this.tipo = tipo;
    // Añadimos protección por si bonus viene vacío
    this.bonus = bonus || {};
  }

  /**
   * Devuelve una representación en texto del producto formateada.
   * Incluye nombre, rareza, precio (formateado en EUR) y sus bonus.
   * @returns {string} Descripción legible del producto.
   */
  mostrarProducto() {
    // Convierte los bonus a un texto como "ataque+5, defensa+2"
    let bonusTexto = '';
    for (const clave in this.bonus) {
      bonusTexto += `${clave}+${this.bonus[clave]}, `;
    }
    // Quita la última coma y espacio si hay texto
    if (bonusTexto.length > 0) {
        bonusTexto = bonusTexto.slice(0, -2);
    }

    return `${this.nombre} [${this.rareza}] (${this.tipo}) — ${EUR.format(this.precio)} — ${bonusTexto}`;
  }

  /**
   * Crea una copia del producto con un precio reducido.
   * Se usa para no modificar el precio del producto original en la base de datos del juego.
   * @param {number} porcentaje - Porcentaje de descuento a aplicar (0–100).
   * @returns {Producto} Una nueva instancia de Producto con el precio rebajado.
   */
  aplicarDescuento(porcentaje) {
    // Limita el porcentaje entre 0 y 100 para evitar errores matemáticos
    if (porcentaje < 0) porcentaje = 0;
    if (porcentaje > 100) porcentaje = 100;

    // Calcula el nuevo precio redondeado
    const nuevoPrecio = Math.round(this.precio * (1 - porcentaje / 100));

    // Retorna una nueva instancia (Inmutabilidad)
    return new Producto(this.nombre, nuevoPrecio, this.rareza, this.tipo, this.bonus);
  }
}