// Referencias a elementos HTML
const container: HTMLElement | any = document.getElementById("app");
const pokemons: number = 100;

// Interfaz de como se debe ver un objeto pokemon
interface IPokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

// Método para obtener objetos pokemon
const fetchData = (): void => {
  for (let index = 1; index <= pokemons; index++) {
    getPokemon(index);
  }
};

// Método para obtener información desde la api
const getPokemon = async (id: number): Promise<void> => {
  const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: any = await data.json();
  const pokemonType: string = pokemon.types
    .map((poke: any) => poke.type.name)
    .join(", ");

  // Objeto para crear pokemon a partir de la información recibida por la api
  const transformedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: `${pokemon.sprites.front_default}`,
    type: pokemonType,
  };

  // Llamada al método para crear elementos html a partir del objeto pokemon creador
  showPokemon(transformedPokemon);
};

// Método para crear elementos html a partir de un objeto pokemon
const showPokemon = (pokemon: IPokemon): void => {
  let output: string = `
    <article class="card">
        <section class="card--section">
            <h2 class="card--section--id">#${pokemon.id}</span>
        </section>

        <section class="card--section">
            <img class="card--section--image" src=${pokemon.image} alt=${pokemon.name}>
        </section>

        <section class="card--section">
            <h3 class="card--section--name">${pokemon.name}</h1>
            <p class="card--section--details">${pokemon.type}</p>
        </section>
    </article>
    `;

  // Agregando al contenedor principal (<section id="app">) los elementos html creados
  container.innerHTML += output;
};

// Llamando al método fetch data para agregar una carta pokemon por cada objeto pokemon creado
fetchData();
