/**
 * @file ranking.js
 * @description Módulo encargado de la lógica de combate y gestión de rankings.
 * Contiene las funciones para calcular el resultado de las batallas y ordenar a los jugadores.
 */

import { groupBy } from '../utils/utils.js';

/**
 * Simula una batalla por turnos entre un jugador y un enemigo.
 * Calcula el daño recibido por ambas partes basándose en ataque y defensa.
 * * @param {Jugador} jugador - La instancia del jugador que combate.
 * @param {Enemigo} enemigo - La instancia del enemigo o jefe.
 * @returns {Object} Objeto con el resultado: { ganador: string, puntosGanados: number }.
 */
export function batalla(jugador, enemigo) {
  // Copias locales para no mutar el estado hasta el final
  let vidaJugador = jugador.vida;
  let vidaEnemigo = enemigo.vida;

  // Calculamos daño efectivo (asegurando que sea al menos 1 para evitar curaciones)
  const dmgJugador = jugador.ataqueTotal;
  const dmgEnemigo = Math.max(1, enemigo.ataque - jugador.defensaTotal);

  // Bucle de combate: se atacan hasta que uno llegue a 0
  while (vidaJugador > 0 && vidaEnemigo > 0) {
    vidaEnemigo -= dmgJugador;
    if (vidaEnemigo <= 0) break; // Si el enemigo cae, no contraataca
    vidaJugador -= dmgEnemigo;
  }

  // Comprobar resultado
  const ganoJugador = vidaJugador > 0;
  let puntosGanados = 0;

  if (ganoJugador) {
    // 1. Calcular puntos base
    const base = 100 + enemigo.ataque;
    
    // 2. Aplicar multiplicador si es Jefe
    const multiplicador = enemigo.tipo === 'jefe'
      ? (enemigo.multiplicador ?? 1.5)
      : 1;
      
    puntosGanados = Math.round(base * multiplicador);
    
    // 3. Sumar puntos y actualizar vida del jugador
    jugador.ganarPuntos(puntosGanados);
    jugador.vida = vidaJugador; 
  } else {
    // Si pierde, forzamos la vida a 0 para que el juego detecte el fin
    jugador.vida = 0;
  }

  return {
    ganador: ganoJugador ? jugador.nombre : enemigo.nombre,
    puntosGanados,
  };
}

/**
 * Agrupa una lista de jugadores en categorías según su puntuación.
 * Utiliza un umbral para determinar si son "pro" o "rookie".
 *
 * @param {Array<Jugador>} jugadores - Lista de objetos Jugador.
 * @param {number} [umbral=300] - Puntuación mínima para ser considerado "pro" (por defecto 300).
 * @returns {Object} Objeto con las claves 'pro' y 'rookie' conteniendo los arrays de jugadores.
 */
export function agruparPorNivel(jugadores, umbral = 300) {
  return groupBy(jugadores, jugador => (jugador.puntos >= umbral ? 'pro' : 'rookie'));
}

/**
 * Muestra el ranking final de jugadores por consola.
 * Ordena la lista de mayor a menor puntuación antes de mostrarla.
 *
 * @param {Array<Jugador>} jugadores - Lista de jugadores a mostrar.
 */
export function mostrarRanking(jugadores) {
  // Crear copia y ordenar de mayor a menor
  const ordenados = jugadores.slice().sort((a, b) => b.puntos - a.puntos);

  console.log('🏆 RANKING FINAL 🏆');
  for (const jugador of ordenados) {
    console.log(jugador.mostrarJugador());
  }
}
