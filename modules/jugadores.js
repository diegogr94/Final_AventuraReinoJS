import { groupBy } from '../utils/utils.js';

/**
 * Clase que representa al jugador principal del juego.
 * Gestiona sus estadísticas vitales, su inventario de objetos y su puntuación acumulada.
 * @class
 */
export class Jugador {
  /**
   * Nombre identificativo del jugador.
   * @type {string}
   */
  nombre;

  /**
   * Puntuación actual acumulada en el juego.
   * @type {number}
   */
  puntos;

  /**
   * Lista de objetos (armas, armaduras, pociones) que posee el jugador.
   * @type {Array<Object>}
   */
  inventario;

  /**
   * Puntos de vida máximos que puede tener el jugador.
   * @type {number}
   */
  vidaMax;

  /**
   * Puntos de vida actuales del jugador.
   * @type {number}
   */
  vida;

  /**
   * Crea una nueva instancia de Jugador.
   * @param {string} nombre - Nombre del jugador.
   */
  constructor(nombre) {
    this.nombre = nombre;
    this.puntos = 0;
    this.inventario = [];
    this.vidaMax = 100;
    this.vida = this.vidaMax;
  }

  /**
   * Añade un objeto al inventario del jugador.
   * Se utiliza `structuredClone` para crear una copia profunda y evitar referencias al objeto original del mercado.
   * @param {Object} item - Objeto que se añadirá al inventario.
   */
  añadirItem(item) {
    this.inventario.push(structuredClone(item));
  }

  /**
   * Incrementa la puntuación del jugador tras una victoria.
   * @param {number} cantidad - Cantidad de puntos a añadir.
   */
  ganarPuntos(cantidad) {
    this.puntos += cantidad;
  }

  /**
   * Calcula el ataque total sumando los bonus de tipo 'ataque' de todos los objetos del inventario.
   * @returns {number} Puntos de ataque totales.
   */
  get ataqueTotal() {
    return this.inventario.reduce((total, item) => total + (item.bonus.ataque || 0), 0);
  }

  /**
   * Calcula la defensa total sumando los bonus de tipo 'defensa' de todos los objetos del inventario.
   * @returns {number} Puntos de defensa totales.
   */
  get defensaTotal() {
    return this.inventario.reduce((total, item) => total + (item.bonus.defensa || 0), 0);
  }

  /**
   * Agrupa los ítems del inventario según su propiedad 'tipo' (ej: arma, armadura, poción).
   * Utiliza la función auxiliar groupBy.
   * @returns {Object} Un objeto con listas de objetos agrupados por tipo.
   */
  inventarioPorTipo() {
    return groupBy(this.inventario, item => item.tipo);
  }

  /**
   * Genera una representación en texto formateado del estado actual del jugador.
   * @returns {string} Descripción detallada con estadísticas e inventario.
   */
  mostrarJugador() {
    return `
      👤 ${this.nombre}
      ❤️ Vida: ${this.vida}/${this.vidaMax}
      ⭐ Puntos: ${this.puntos}
      ⚔️ Ataque total: ${this.ataqueTotal}
      🛡️ Defensa total: ${this.defensaTotal}
      🎒 Inventario: ${this.inventario.length > 0
          ? this.inventario.map(item => item.nombre).join(', ')
          : 'Vacío'}
    `;
  }
}