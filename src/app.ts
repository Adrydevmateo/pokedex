const container: HTMLElement | any = document.getElementById("app");
const pokemons: number = 100;

interface IPokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

const fetchData = (): void => {
  for (let index = 1; index <= pokemons; index++) {
    getPokemon(index);
  }
};

const getPokemon = async (id: number): Promise<void> => {
  const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: any = await data.json();
  const pokemonType: string = pokemon.types
    .map((poke: any) => poke.type.name)
    .join(", ");

  const transformedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: `${pokemon.sprites.front_default}`,
    type: pokemonType,
  };

  showPokemon(transformedPokemon);
};

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

  container.innerHTML += output;
};

fetchData();
