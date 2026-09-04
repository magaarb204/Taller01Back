const URL_API = "https://rickandmortyapi.com/api/character";

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function consultarPagina(numeroPagina, intento = 1) {
  const respuesta = await fetch(`${URL_API}?page=${numeroPagina}`);

  if (respuesta.status === 429 && intento <= 5) {
    const tiempoEspera = 2000 * (2 ** (intento - 1));

    console.log(
      `Página ${numeroPagina}: HTTP 429. Reintentando en ${
        tiempoEspera / 1000
      } segundos...`
    );

    await esperar(tiempoEspera);

    return consultarPagina(numeroPagina, intento + 1);
  }

  if (!respuesta.ok) {
    throw new Error(
      `No fue posible consultar la página ${numeroPagina}. HTTP ${respuesta.status}`
    );
  }

  return respuesta.json();
}

export async function obtenerPaginas() {
  const datos = await consultarPagina(1);
  const paginas = [];

  for (let i = 1; i <= datos.info.pages; i++) {
    paginas[i - 1] = i;
  }

  return paginas;
}

export async function consultarPaginasSecuencialmente(paginas) {
  const inicio = performance.now();
  const personajes = [];

  for (const pagina of paginas) {
    const datos = await consultarPagina(pagina);

    for (const personaje of datos.results) {
      personajes[personajes.length] = personaje;
    }

    await esperar(2200);
  }

  const tiempo = performance.now() - inicio;

  return {
    personajes,
    tiempo
  };
}

export async function consultarPaginasConcurrentemente(paginas) {
  const inicio = performance.now();
  const personajes = [];

  const TAMANO_GRUPO = 5;

  // Dividir las páginas en grupos de 5
  const grupos = paginas.reduce(
    (acumulador, pagina, indice) => {
      const indiceGrupo =
        Math.floor(indice / TAMANO_GRUPO);

      if (!acumulador[indiceGrupo]) {
        acumulador[indiceGrupo] = [];
      }

      const grupo = acumulador[indiceGrupo];

      grupo[grupo.length] = pagina;

      return acumulador;
    },
    []
  );

  // Procesar los grupos uno después de otro
  await grupos.reduce(
    async (promesaAnterior, grupo) => {
      await promesaAnterior;

      console.log(
        `Consultando concurrentemente páginas ${
          grupo[0]
        } a ${grupo[grupo.length - 1]}`
      );

      const promesas = grupo.map((pagina) =>
        consultarPagina(pagina)
      );

      const resultados = await Promise.all(promesas);

      resultados.reduce(
        (acumulador, resultado) => {
          resultado.results.reduce(
            (lista, personaje) => {
              lista[lista.length] = personaje;
              return lista;
            },
            acumulador
          );

          return acumulador;
        },
        personajes
      );

      await esperar(11000);
    },
    Promise.resolve()
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

  console.log(
    `Tiempo secuencial: ${secuencial.tiempo.toFixed(2)} ms`
  );

  console.log(
    "Esperando antes de iniciar la estrategia concurrente..."
  );

  await esperar(15000);

  const concurrente =
    await consultarPaginasConcurrentemente(paginas);

  console.log(
    `Tiempo con Promise.all: ${concurrente.tiempo.toFixed(2)} ms`
  );

  return {
    secuencial,
    concurrente
  };
}