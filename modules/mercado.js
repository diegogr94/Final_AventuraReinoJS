import { Producto } from './producto.js';

export const mercado = [
  new Producto('Espada corta', 120, 'común', 'arma', { ataque: 8 }, './imagenes/espada-corta.png'),
  new Producto('Arco de caza', 140, 'común', 'arma', { ataque: 7 }, './imagenes/arco-caza.png'),
  new Producto('Armadura de cuero', 180, 'común', 'armadura', { defensa: 6 }, './imagenes/armadura-cuero.png'),
  new Producto('Poción pequeña', 40, 'común', 'consumible', { curacion: 20 }, './imagenes/pocion-pequena.png'),
  new Producto('Espada rúnica', 460, 'raro', 'arma', { ataque: 18 }, './imagenes/espada-runica.png'),
  new Producto('Escudo de roble', 320, 'raro', 'armadura', { defensa: 14 }, './imagenes/escudo-roble.png'),
  new Producto('Poción grande', 110, 'raro', 'consumible', { curacion: 60 }, './imagenes/pocion-grande.png'),
  new Producto('Mandoble épico', 950, 'épico', 'arma', { ataque: 32 }, './imagenes/mandoble-epico.png'),
  new Producto('Placas dracónicas', 880, 'épico', 'armadura', { defensa: 28 }, './imagenes/placas-draconicas.png'),
  new Producto('Elixir legendario', 520, 'épico', 'consumible', { curacion: 150 }, './imagenes/elixir-legendario.png'),
];

export function filtrarPorRareza(rareza) {
  return mercado.filter(producto => producto.rareza === rareza);
}

export function aplicarDescuentoPorRareza(rareza, porcentaje) {
  return mercado.map(producto =>
    producto.rareza === rareza ? producto.aplicarDescuento(porcentaje) : producto
  );
}

export function buscarProducto(nombre) {
  return mercado.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase()) || null;
}

export function describirProducto(producto) {
  return producto.mostrarProducto();
}