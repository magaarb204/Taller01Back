import {
  contarPersonajesPorEspecie,
  clasificarPersonajesPorEpisodios
} from "./estadisticas.js";

const personajesPrueba = [
  {
    nombre: "Rick Sanchez",
    especie: "Human",
    cantidadEpisodios: 51
  },
  {
    nombre: "Morty Smith",
    especie: "Human",
    cantidadEpisodios: 51
  },
  {
    nombre: "Krombopulos Michael",
    especie: "Alien",
    cantidadEpisodios: 7
  },
  {
    nombre: "Abradolf Lincler",
    especie: "Human",
    cantidadEpisodios: 3
  }
];

console.log("Cantidad por especie:");
console.log(contarPersonajesPorEspecie(personajesPrueba));

console.log("\nClasificación por episodios:");
console.log(clasificarPersonajesPorEpisodios(personajesPrueba));