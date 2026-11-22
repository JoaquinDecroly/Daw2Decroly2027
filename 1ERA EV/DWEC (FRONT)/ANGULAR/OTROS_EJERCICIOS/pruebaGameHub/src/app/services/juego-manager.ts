import { Injectable } from '@angular/core';
import { IJuego } from '../interfaces/ijuego.interfaces';

@Injectable({ providedIn: 'root' })
export class JuegoManager {
juegos: IJuego[] = [
  {
    id: 1,
    nombre: 'The Witcher 3: Wild Hunt',
    plataforma: 'PC / PS5 / Xbox',
    genero: 'RPG',
    precio: 29.99,
    imagen: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg',
    descripcion: 'Acompaña a Geralt de Rivia en una aventura épica por un mundo lleno de monstruos, magia y decisiones difíciles.',
    favorito: false
  },
  {
    id: 2,
    nombre: 'Red Dead Redemption 2',
    plataforma: 'PC / PS4 / Xbox',
    genero: 'Acción / Aventura',
    precio: 39.99,
    imagen: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.jpg',
    descripcion: 'Explora el salvaje oeste americano en una historia sobre Arthur Morgan y la banda de Van der Linde.',
    favorito: false
  },
  {
    id: 3,
    nombre: 'Cyberpunk 2077',
    plataforma: 'PC / PS5 / Xbox',
    genero: 'RPG',
    precio: 49.99,
    imagen: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.jpg',
    descripcion: 'Sumérgete en Night City, una enorme ciudad futurista donde las decisiones pueden cambiar tu destino.',
    favorito: false
  },
  {
    id: 4,
    nombre: 'Elden Ring',
    plataforma: 'PC / PS5 / Xbox',
    genero: 'Soulslike',
    precio: 59.99,
    imagen: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg',
    descripcion: 'Descubre las Tierras Intermedias y enfréntate a enemigos desafiantes en una aventura de fantasía.',
    favorito: false
  },
  {
    id: 5,
    nombre: 'Minecraft',
    plataforma: 'PC / PS5 / Xbox / Switch',
    genero: 'Sandbox',
    precio: 26.95,
    imagen: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co49x5.jpg',
    descripcion: 'Construye, explora y sobrevive en un mundo abierto donde tu imaginación es el límite.',
    favorito: false
  },
  {
    id: 6,
    nombre: 'God of War Ragnarök',
    plataforma: 'PS4 / PS5 / PC',
    genero: 'Acción',
    precio: 49.99,
    imagen: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.jpg',
    descripcion: 'Acompaña a Kratos y Atreus en un viaje por los nueve reinos de la mitología nórdica.',
    favorito: false
  }
];

favoritos: IJuego[] = [];


    obtenerJuegos() {
        return this.juegos;
    }

    buscarPorId(id: number): IJuego {
        const juegoBuscado = this.juegos.find((p) =>
            p.id === id
        );

        if (juegoBuscado) {
            return juegoBuscado;
        } else {
            throw new Error("Juego no encontrado");
        }
    }


    guardarJuego(juego: IJuego) {
        const index = this.juegos.findIndex((p) =>
            p.id === juego.id
        );

        if (index !== -1) {
            this.juegos[index] = juego;
        } else {
            this.juegos.push(juego);
        }
    }


    eliminarJuego(id: number) {
        const index = this.juegos.findIndex((p) =>
            p.id === id
        );

        const indexFavorito = this.favoritos.findIndex((f) =>
            f.id === id
        );

        if (index !== -1) {
            this.juegos.splice(index, 1);
        }

        if (indexFavorito !== -1) {
            this.favoritos.splice(indexFavorito, 1);
        }
    }

    anadirFavorito(id: number) {
        const juegoSeleccionado = this.juegos.find((p) =>
            p.id === id
        );

        if (juegoSeleccionado && !this.favoritos.some((p) =>
                p.id === juegoSeleccionado.id)) {
            this.favoritos.push(juegoSeleccionado);
            juegoSeleccionado.favorito = true;
        }
    }

    eliminarFavorito(id: number) {
        const index = this.favoritos.findIndex((p) =>
            p.id === id
        );

        if (index !== -1) {
            this.favoritos.splice(index, 1);
            this.juegos.find((p) => p.id === id)!.favorito = false;
        }
    }
}
