import {
  obtenerPaginas,
  compararEstrategias
} from "./asincronia.js";

import {
  normalizarPersonajes
} from "./normalizacion.js";

import realizarConsultas from "./consultas.js";

import {
  contarPersonajesPorEspecie,
  clasificarPersonajesPorEpisodios
} from "./estadisticas.js";


async function main() {
  try {

    // Obtener automáticamente todas las páginas
    const paginas = await obtenerPaginas();

    console.log(
      `Cantidad de páginas detectadas: ${paginas.length}`
    );


    // Ejecutar y comparar las dos estrategias
    const {
      secuencial,
      concurrente
    } = await compararEstrategias(paginas);


    // Usar como solución definitiva el resultado concurrente
    const personajes = concurrente.personajes;

    console.log(
      `Personajes obtenidos: ${personajes.length}`
    );


    // Normalización
    const personajesNormalizados =
      normalizarPersonajes(personajes);

    console.log(
      `Personajes normalizados: ${personajesNormalizados.length}`
    );


    // Consultas
    const consultas =
      realizarConsultas(personajesNormalizados);


    console.log("\n--- CONSULTAS ---");

    console.log(
      "Humanos vivos:",
      consultas.humanosVivos.length
    );

    console.log(
      "Personajes con 20 o más episodios:",
      consultas.personajes20Episodios.length
    );

    console.log(
      "Primera Alien Female:",
      consultas.primeraAlienFemenina
    );

    console.log(
      "¿Existe algún personaje con tipo?",
      consultas.existeTipo
    );

    console.log(
      "¿Todos tienen imagen y episodios?",
      consultas.todosValidos
    );


    // Estadísticas por especie
    const estadisticas =
      contarPersonajesPorEspecie(
        personajesNormalizados
      );

    console.log(
      "\n--- ESTADÍSTICAS POR ESPECIE ---"
    );

    console.log(estadisticas);


    // Clasificación por episodios
    const clasificacion =
      clasificarPersonajesPorEpisodios(
        personajesNormalizados
      );

    console.log(
      "\n--- CLASIFICACIÓN POR EPISODIOS ---"
    );

    console.log(clasificacion);

  } catch (error) {

    console.error(
      "Error ejecutando el programa:",
      error.message
    );

  }
}

main();