/**
 * @file main.js
 * @description Script principal del juego "Aventura en el Reino JS". Gestiona el flujo de escenas, la lógica del mercado, el inventario y el sistema de combate.
 * @author Tu Nombre
 * @version 1.0.0
 */

// ================================================================
// 1. IMPORTACIONES
// ================================================================

/** Importa la clase Jugador desde el módulo de jugadores. */
import { Jugador } from './modules/jugadores.js';



// ================================================================
// 2. VARIABLES GLOBALES (ESTADO DEL JUEGO)
// ================================================================

/** * @type {Jugador} 
 * @description Instancia del jugador principal.
 */
let jugador;



// ================================================================
// 3. FUNCIONES DE UTILIDAD Y CONFIGURACIÓN
// ================================================================


/**
 * Gestiona la visibilidad de las escenas del juego.
 * Oculta todas las secciones con clase .escena y muestra solo la solicitada.
 * @param {string} idEscena - El ID del elemento HTML de la escena a mostrar.
 */
function mostrarEscena(idEscena) {
    // 1. Oculto todas las pantallas
    document.querySelectorAll('.escena').forEach(sc => sc.classList.remove('activa'));
    // 2. Muestro solo la que me piden
    document.getElementById(idEscena).classList.add('activa');
}

// ================================================================
// 4. INICIO DEL JUEGO
// ================================================================

/**
 * Función principal que se ejecuta al cargar la ventana.
 * Inicializa al jugador, crea los enemigos y carga la primera escena.
 */
window.onload = () => {
    // Inicialización del Jugador
    jugador = new Jugador("Diego"); 

    
    cargarEscenaJugador();
};

// ================================================================
// 5. ESCENA 1: DATOS INICIALES DEL JUGADOR
// ================================================================

/**
 * Renderiza la escena inicial con los datos base del jugador.
 * Muestra nombre, vida, estadísticas base y puntos.
 */
function cargarEscenaJugador() {
    mostrarEscena('escena-jugador');
    const container = document.getElementById('tarjeta-jugador-inicial');
    
    // Inyectar HTML con datos del jugador
    container.innerHTML = `
        <img src="./imagenes/caballero.png" alt="Jugador">
        <h3>${jugador.nombre}</h3>
        <p>❤️ Vida: ${jugador.vida}</p>
        <p>⚔️ Ataque Base: 0</p>
        <p>🛡️ Defensa Base: 0</p>
        <p>💰 Puntos: ${jugador.puntos}</p>
    `;

    // Configurar botón para avanzar
    document.getElementById('btn-ir-mercado').onclick = () => cargarMercado();
}

