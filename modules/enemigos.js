/**
 * Clase base que representa a un enemigo genérico del juego.
 * @class
 */
export class Enemigo {
  /**
   * Tipo de entidad (por defecto 'enemigo').
   * @type {string}
   */
  tipo;

  /**
   * Nombre identificativo del enemigo.
   * @type {string}
   */
  nombre;

  /**
   * Puntos de ataque que inflige el enemigo.
   * @type {number}
   */
  ataque;

  /**
   * Puntos de vida actuales del enemigo.
   * @type {number}
   */
  vida;

  /**
   * Crea una nueva instancia de Enemigo.
   * @param {string} nombre - Nombre del enemigo.
   * @param {number} ataque - Nivel de ataque del enemigo.
   * @param {number} vida - Puntos de vida del enemigo.
   */
  constructor(nombre, ataque, vida) {
    this.tipo = 'enemigo';
    this.nombre = nombre;
    this.ataque = ataque;
    this.vida = vida;
  }

  /**
   * Devuelve una presentación breve del enemigo.
   * @returns {string} Descripción formateada del enemigo.
   */
  mostrarEnemigo() {
    return `🗡️ ${this.nombre} (ATQ ${this.ataque}, HP ${this.vida})`;
  }
}

/**
 * Clase que representa a un Jefe Final.
 * Hereda de la clase Enemigo y añade habilidades especiales y bonificación de puntos.
 * @class
 * @extends Enemigo
 */
export class JefeFinal extends Enemigo {
  /**
   * Descripción o nombre del ataque especial del jefe.
   * @type {string}
   */
  habilidadEspecial;

  /**
   * Factor por el que se multiplicarán los puntos al derrotarlo.
   * @type {number}
   */
  multiplicador;

  /**
   * Crea una nueva instancia de JefeFinal.
   * @param {string} nombre - Nombre del jefe final.
   * @param {number} ataque - Nivel de ataque base del jefe.
   * @param {number} vida - Puntos de vida del jefe.
   * @param {string} habilidadEspecial - Nombre o descripción de su habilidad especial.
   * @param {number} [multiplicador=1.3] - Multiplicador aplicado a los puntos (por defecto 1.3).
   */
  constructor(nombre, ataque, vida, habilidadEspecial, multiplicador = 1.3) {
    super(nombre, ataque, vida);
    this.tipo = 'jefe';
    this.habilidadEspecial = habilidadEspecial;
    this.multiplicador = multiplicador;
  }

  /**
   * Devuelve una presentación detallada del jefe final.
   * @returns {string} Descripción formateada del jefe final con su habilidad especial.
   */
  mostrarEnemigo() {
    return `🐲 ${this.nombre} (ATQ ${this.ataque}, HP ${this.vida}) — Habilidad: ${this.habilidadEspecial}`;
  }
}