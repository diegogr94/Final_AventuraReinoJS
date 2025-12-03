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

/** Importa la función de descuentos desde el módulo de mercado. */
import { aplicarDescuentoPorRareza } from './modules/mercado.js';

/** Importa las clases Enemigo y JefeFinal desde el módulo de enemigos. */
import { Enemigo, JefeFinal } from './modules/enemigos.js';


// ================================================================
// 2. VARIABLES GLOBALES (ESTADO DEL JUEGO)
// ================================================================

/** * @type {Jugador} 
 * @description Instancia del jugador principal.
 */
let jugador;

/** * @type {Array<Object>} 
 * @description Array que almacena temporalmente los productos seleccionados en el mercado antes de comprar.
 */
let cesta = [];

/** * @type {Array<Enemigo>} 
 * @description Lista de enemigos contra los que se luchará secuencialmente.
 */
let enemigos = [];

// ================================================================
// 3. FUNCIONES DE UTILIDAD Y CONFIGURACIÓN
// ================================================================

/**
 * Devuelve la ruta de la imagen correspondiente al nombre de un producto.
 * @param {string} nombre - El nombre exacto del producto.
 * @returns {string} Ruta relativa de la imagen. Devuelve una imagen por defecto si no encuentra coincidencia.
 */
function obtenerImagenProducto(nombre) {
    /** @type {Object<string, string>} Mapa de nombres de items a rutas de archivos */
    const mapaImagenes = {
        'Espada corta':       './imagenes/espadaCorta.jpg',
        'Arco de caza':       './imagenes/arcoCaza.jpg',
        'Armadura de cuero':  './imagenes/armaduraCuero.jpg',
        'Poción pequeña':     './imagenes/pocionPeque.jpg',
        'Espada rúnica':      './imagenes/espadaRunica.jpg',
        'Escudo de roble':    './imagenes/escudoRoble.jpg',
        'Poción grande':      './imagenes/pocionGrande.jpg',
        'Mandoble épico':     './imagenes/mandobleEpico.jpg',
        'Placas dracónicas':  './imagenes/placasDraconicas.jpg',
        'Elixir legendario':  './imagenes/elixirLegendario.jpg'
    };
    
    // Si la imagen existe la devuelve, si no, pone la espada corta por defecto
    return mapaImagenes[nombre] || './imagenes/espadaCorta.jpg'; 
}

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


// Inicialización de Enemigos
    enemigos = [
        new Enemigo("Troll", 10, 50),       
        new Enemigo("Minotauro", 15, 80),
        new JefeFinal("Mago", 30, 200, "Trueno", 1.5) 
    ];

    // Asignación de imágenes a los enemigos
    const imagenesEnemigos = ['./imagenes/troll.png', './imagenes/minotauro.png', './imagenes/mago.png'];
    enemigos.forEach((enemigo, indice) => {
        enemigo.img = imagenesEnemigos[indice] || './imagenes/troll.png';
    });    

    
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


// ================================================================
// 6. ESCENA 2: MERCADO
// ================================================================

/**
 * Carga la escena del mercado.
 * Aplica descuentos aleatorios a una rareza aleatoria y gestiona la cesta de la compra.
 */
function cargarMercado() {
    mostrarEscena('escena-mercado');
    
    // 1. Lógica de Descuento Aleatorio
    const rarezasPosibles = ['común', 'raro', 'épico'];
    const rarezaElegida = rarezasPosibles[Math.floor(Math.random() * rarezasPosibles.length)];
    
    // Genera un descuento entre 10% y 60%
    const porcentajeDescuento = Math.floor(Math.random() * 51) + 10;

    // Obtener lista de productos con precios actualizados
    const productosEnVenta = aplicarDescuentoPorRareza(rarezaElegida, porcentajeDescuento);

    // 2. Renderizado de Productos
    const grid = document.getElementById('grid-mercado');
    grid.innerHTML = ''; 

    productosEnVenta.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'tarjeta-item';
        
        // Mantener selección visual si ya está en la cesta
        if (cesta.includes(producto)) {
            div.classList.add('seleccionado');
        }

        const imagen = obtenerImagenProducto(producto.nombre);

        div.innerHTML = `
            <img src="${imagen}">
            <h4>${producto.nombre}</h4>
            <p style="font-size:0.8em">${producto.mostrarProducto()}</p>
            <button class="btn-pequeno">${cesta.includes(producto) ? 'Retirar' : 'Añadir'}</button>
        `;

        // Evento Click: Añadir/Quitar de la cesta
        div.onclick = () => {
            if (cesta.includes(producto)) {
                // Retirar producto
                cesta = cesta.filter(p => p !== producto);
                div.classList.remove('seleccionado');
                div.querySelector('button').innerText = "Añadir";
            } else {
                // Añadir producto
                cesta.push(producto);
                div.classList.add('seleccionado');
                div.querySelector('button').innerText = "Retirar";
            }
            actualizarCestaVisual();
        };

        grid.appendChild(div);
    });

    actualizarCestaVisual();

    // 3. Confirmar Compra
    document.getElementById('btn-comprar').onclick = () => {
        cesta.forEach(item => jugador.añadirItem(item));
        cargarJugadorEquipado();
    };
}

/**
 * Actualiza la visualización de la cesta de la compra (iconos pequeños) en la parte inferior del mercado.
 */
function actualizarCestaVisual() {
    const cajaCesta = document.getElementById('cesta-mercado');
    
    if(cesta.length === 0) {
        cajaCesta.innerHTML = "<em>Vacía</em>";
    } else {
        // Mapear productos seleccionados a imágenes pequeñas
        cajaCesta.innerHTML = cesta.map(p => {
            const img = obtenerImagenProducto(p.nombre);
            return `<img src="${img}" style="width:30px; height:30px; margin:2px;" title="${p.nombre}">`;
        }).join('');
    }
}

// ================================================================
// 7. ESCENA 3: JUGADOR EQUIPADO
// ================================================================

/**
 * Muestra el estado del jugador tras equiparse con los objetos comprados.
 * Calcula y renderiza las nuevas estadísticas totales (Vida, Ataque, Defensa).
 */
function cargarJugadorEquipado() {
    mostrarEscena('escena-jugador-equipado');
    const container = document.getElementById('tarjeta-jugador-equipado');

    // Generar HTML de los iconos del inventario
    const htmlInventario = jugador.inventario.map(item => {
        const img = obtenerImagenProducto(item.nombre);
        return `<img src="${img}" style="width:40px; height:40px; margin:2px; border:1px solid #333; border-radius:4px;">`;
    }).join('');

    container.innerHTML = `
        <img src="./imagenes/caballero.png" alt="Jugador">
        <h3>${jugador.nombre} (Listo para pelear)</h3>
        <p>❤️ Vida: ${jugador.vida}</p>
        <p>⚔️ Ataque Total: ${jugador.ataqueTotal}</p>
        <p>🛡️ Defensa Total: ${jugador.defensaTotal}</p>
        <p>🎒 Items en mochila: ${jugador.inventario.length}</p>
        
        <div style="margin-top:10px; padding:5px; background:#f0f0f0;">
            <p><strong>Inventario:</strong></p>
            <div>${htmlInventario || '<small>Vacío</small>'}</div>
        </div>
    `;

    document.getElementById('btn-ver-enemigos').onclick = () => cargarListaEnemigos();
}

// ================================================================
// 8. ESCENA 4: LISTA DE ENEMIGOS
// ================================================================

/**
 * Muestra una lista de todos los enemigos a los que se enfrentará el jugador.
 * Permite visualizar sus estadísticas antes de combatir.
 */
function cargarListaEnemigos() {
    mostrarEscena('escena-lista-enemigos');
    const grid = document.getElementById('grid-enemigos');
    grid.innerHTML = '';

    enemigos.forEach(enemigo => {
        const div = document.createElement('div');
        div.className = 'tarjeta-item';
        div.innerHTML = `
            <img src="${enemigo.img}">
            <h4>${enemigo.nombre}</h4>
            <p>Ataque: ${enemigo.ataque}</p>
            <p>Vida: ${enemigo.vida}</p>
        `;
        grid.appendChild(div);
    });

    document.getElementById('btn-iniciar-batalla').onclick = () => {
        indiceBatallaActual = 0; // Reiniciar índice para empezar desde el primero
        prepararBatalla();
    };
}
