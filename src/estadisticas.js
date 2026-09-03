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

  // Primero acumulamos:
  // - cantidad de personajes
  // - total de episodios
  // - cantidad de vivos

  const estadisticas = personajes.reduce(
    (acumulador, personaje) => {

      const especie = obtenerEspecie(personaje);
      const cantidadEpisodios =
        obtenerCantidadEpisodios(personaje);
      const estado = obtenerEstado(personaje);

      // Si la especie todavía no existe,
      // creamos su estructura inicial
      if (!acumulador[especie]) {
        acumulador[especie] = {
          cantidad: 0,
          totalEpisodios: 0,
          vivos: 0
        };
      }

      // Incrementar cantidad
      acumulador[especie].cantidad += 1;

      // Acumular episodios
      acumulador[especie].totalEpisodios +=
        cantidadEpisodios;

      // Contar personajes vivos
      if (estado === "Alive") {
        acumulador[especie].vivos += 1;
      }

      return acumulador;
    },
    {}
  );


  // Convertimos totalEpisodios en promedioEpisodios
  return Object.entries(estadisticas).reduce(
    (resultado, [especie, datos]) => {

      resultado[especie] = {
        cantidad: datos.cantidad,

        promedioEpisodios:
          datos.totalEpisodios / datos.cantidad,

        vivos: datos.vivos
      };

      return resultado;
    },
    {}
  );
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