export default function realizarConsultas(personajes) {

    const humanosVivos = personajes.filter(personaje =>
        personaje.estado === "Alive" &&
        personaje.especie === "Human"
    );

    const personajes20Episodios = personajes.filter(personaje =>
        personaje.cantidadEpisodios >= 20
    );

    const primeraAlienFemenina = personajes.find(personaje =>
        personaje.especie === "Alien" &&
        personaje.genero === "Female"
    );

    const existeTipo = personajes.some(personaje =>
        personaje.tipo && personaje.tipo.trim() !== ""
    );

    const todosValidos = personajes.every(personaje =>
        personaje.imagen &&
        personaje.cantidadEpisodios > 0
    );

    return {
        humanosVivos,
        personajes20Episodios,
        primeraAlienFemenina,
        existeTipo,
        todosValidos
    };
}