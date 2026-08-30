const URL_API = "https://rickandmortyapi.com/api/character";

async function consultarPagina(numeroPagina) {
  const respuesta = await fetch(`${URL_API}?page=${numeroPagina}`);

  if (!respuesta.ok) {
    throw new Error(
      `No fue posible consultar la página ${numeroPagina}`
    );
  }

  return respuesta.json();
}

export async function consultarPaginasSecuencialmente(paginas) {
  const inicio = performance.now();
  const personajes = [];

  for (const pagina of paginas) {
    const datos = await consultarPagina(pagina);
    personajes.push(...datos.results);
  }

  const tiempo = performance.now() - inicio;

  return {
    personajes,
    tiempo
  };
}

export async function consultarPaginasConcurrentemente(paginas) {
  const inicio = performance.now();

  const promesas = paginas.map((pagina) =>
    consultarPagina(pagina)
  );

  const resultados = await Promise.all(promesas);

  const personajes = resultados.flatMap(
    (resultado) => resultado.results
  );

  const tiempo = performance.now() - inicio;

  return {
    personajes,
    tiempo
  };
}

export async function compararEstrategias(paginas) {
  const secuencial =
    await consultarPaginasSecuencialmente(paginas);

  const concurrente =
    await consultarPaginasConcurrentemente(paginas);

  console.log(
    `Tiempo secuencial: ${secuencial.tiempo.toFixed(2)} ms`
  );

  console.log(
    `Tiempo con Promise.all: ${concurrente.tiempo.toFixed(2)} ms`
  );

  return {
    secuencial,
    concurrente
  };
}