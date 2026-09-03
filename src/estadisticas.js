function obtenerEspecie(personaje) {
  return personaje.especie ?? personaje.species ?? "Desconocida";
}

function obtenerEstado(personaje) {
  return personaje.estado ?? personaje.status ?? "Desconocido";
}

function obtenerCantidadEpisodios(personaje) {
  if (typeof personaje.cantidadEpisodios === "number") {
    return personaje.cantidadEpisodios;
  }

  if (typeof personaje.episodeCount === "number") {
    return personaje.episodeCount;
  }

  if (Array.isArray(personaje.episodios)) {
    return personaje.episodios.length;
  }

  if (Array.isArray(personaje.episode)) {
    return personaje.episode.length;
  }

  return 0;
}


// ESTADÍSTICAS POR ESPECIE

export function contarPersonajesPorEspecie(personajes) {
  return personajes.reduce((acumulador, personaje) => {
    const especie = obtenerEspecie(personaje);
    const cantidadEpisodios =
      obtenerCantidadEpisodios(personaje);
    const estado = obtenerEstado(personaje);

    // Si la especie todavía no existe,
    // se crea su estructura inicial
    if (!acumulador[especie]) {
      acumulador[especie] = {
        cantidad: 0,
        promedioEpisodios: 0,
        vivos: 0
      };
    }

    // Guardamos la cantidad anterior
    const cantidadAnterior =
      acumulador[especie].cantidad;

    // Incrementamos la cantidad de personajes
    acumulador[especie].cantidad += 1;

    // Calculamos el nuevo promedio
    acumulador[especie].promedioEpisodios =
      (
        acumulador[especie].promedioEpisodios *
        cantidadAnterior +
        cantidadEpisodios
      ) /
      acumulador[especie].cantidad;

    // Contamos personajes vivos
    if (estado === "Alive") {
      acumulador[especie].vivos += 1;
    }

    return acumulador;
  }, {});
}


// CLASIFICACIÓN POR CANTIDAD DE EPISODIOS

export function clasificarPersonajesPorEpisodios(personajes) {

  return personajes.reduce(
    (clasificacion, personaje) => {

      const cantidad =
        obtenerCantidadEpisodios(personaje);

      if (cantidad >= 1 && cantidad <= 5) {

        clasificacion["1-5"] += 1;

      } else if (cantidad >= 6 && cantidad <= 15) {

        clasificacion["6-15"] += 1;

      } else if (cantidad >= 16 && cantidad <= 30) {

        clasificacion["16-30"] += 1;

      } else if (cantidad > 30) {

        clasificacion["30+"] += 1;

      }

      return clasificacion;
    },
    {
      "1-5": 0,
      "6-15": 0,
      "16-30": 0,
      "30+": 0
    }
  );
}