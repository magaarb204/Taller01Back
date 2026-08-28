function obtenerEspecie(personaje) {
  return personaje.especie ?? personaje.species ?? "Desconocida";
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

export function contarPersonajesPorEspecie(personajes) {
  return personajes.reduce((acumulador, personaje) => {
    const especie = obtenerEspecie(personaje);

    acumulador[especie] = (acumulador[especie] ?? 0) + 1;

    return acumulador;
  }, {});
}

export function clasificarPersonajesPorEpisodios(personajes) {
  return personajes.reduce(
    (clasificacion, personaje) => {
      const cantidad = obtenerCantidadEpisodios(personaje);

      if (cantidad < 10) {
        clasificacion.pocaParticipacion.push(personaje);
      } else if (cantidad < 20) {
        clasificacion.participacionMedia.push(personaje);
      } else {
        clasificacion.altaParticipacion.push(personaje);
      }

      return clasificacion;
    },
    {
      pocaParticipacion: [],
      participacionMedia: [],
      altaParticipacion: []
    }
  );
}