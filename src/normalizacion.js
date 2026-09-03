export function normalizarPersonajes(personajes) {
  return personajes.map((personaje) => {
    return {
      id: personaje.id,
      nombre: personaje.name,
      estado: personaje.status,
      especie: personaje.species,
      tipo: personaje.type,
      genero: personaje.gender,
      origen: personaje.origin?.name ?? "Desconocido",
      ubicacionActual: personaje.location?.name ?? "Desconocido",
      cantidadEpisodios: personaje.episode?.length ?? 0,
      imagen: personaje.image
    };
  });
}