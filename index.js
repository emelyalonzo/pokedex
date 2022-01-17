const pokeList = document.getElementById("pokedex");

const fetchPokemon = (isFilter,type = "") => {
  const promises = [];
  for (let i = 1; i <= 151; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((response) => response.json()));
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name,
      image: result.sprites["front_default"], //to obtain the front image
      type: result.types.map((type) => type.type.name).join(", "),
      id: result.id,
    }));
  if (isFilter) {
    showPokemonFiltered(pokemon, type);
  } else {
    showPokemon(pokemon);
  }
  });
};

const showPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon
    .map(
      (pokemonUnit) => `
	        <li class="card">
                <h3 class="card-number">${pokemonUnit.id}</h3>
	            <img class="card-image" src="${pokemonUnit.image}"/>
	            <h2 class="card-title">${pokemonUnit.name}</h2>
	            <p class="card-subtitle">Type: ${pokemonUnit.type}</p>
	        </li>
	    `
    )
    .join("");
    pokeList.innerHTML = pokemonHTMLString;
};

const showPokemonFiltered = (pokemon, type) => {
  const pokemonHTMLString = pokemon
    .filter(
      pokemonUnit => 
      pokemonUnit.type.includes(type) 
      )
    .map(
      (pokemonUnit) => `
	        <li class="card">
                <h3 class="card-number">${pokemonUnit.id}</h3>
	            <img class="card-image" src="${pokemonUnit.image}"/>
	            <h2 class="card-title">${pokemonUnit.name}</h2>
	            <p class="card-subtitle">Type: ${pokemonUnit.type}</p>
	        </li>
	    `
    )
    .join("");
    pokeList.innerHTML = pokemonHTMLString;
};
// fetchPokemon();

document.querySelector(".btn-all").addEventListener("click", () => {fetchPokemon(false)});

const btnList = document.querySelectorAll(".btn");
for (let i = 1; i < btnList.length; i++) {
  document.querySelector(`.btn-${btnList[i].textContent.toLowerCase()}`).addEventListener("click", () => {fetchPokemon(true, `${btnList[i].textContent.toLowerCase()}`)});
};