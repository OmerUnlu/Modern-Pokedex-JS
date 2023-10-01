const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn")
const pokemonContainer = document.getElementById("pokemon-container")
const colors = { fire: "#FDDFDF", grass: "#DEFDE0", electric: "#FCF7DE", water: "#DEF3FD", ground: "#f4e7da", rock: "#d5d5d4",fairy: "#fceaff",poison: "#d6b3ff",bug: "#f8d5a3",dragon: "#97b3e6",psychic: "#eaeda1",flying: "#F5F5F5",fighting: "#E6E0D4", normal: "#F5F5F5", ice: "#e0f5ff ",};
const pokeAll =151;

const initPokemon = async () =>{
    for(let i=1 ; i <= pokeAll; i++){
       await getPokemon(i)
    }
};

const getPokemon = async (id) => {
    try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            createPokeCard(data)
    } catch (error) {
      console.error('Hata:', error);
    }
  }
initPokemon()

const createPokeCard = (data) =>{
    
    const id = data.id.toString().padStart(3,"0")
    const type = data.types[0].type.name;
    const color = colors[type]

    const cardPokemon = document.createElement('div');
    cardPokemon.classList.add('card-pokemon');
    cardPokemon.style.backgroundColor=`${color}`;
    

    const pokemonImgCon = document.createElement("div");
    pokemonImgCon.classList.add("pokemon-img");


    const pokemonImg = document.createElement("img")
    pokemonImg.classList.add("poke-img")
    pokemonImg.src= `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`
    pokemonImg.alt= `<${data.name} photo`
    const pokemonContent = document.createElement("div")
    pokemonContent.classList.add("pokemon-content")

    
    const pokeName = document.createElement("h3")
    pokeName.classList.add("poke-name")
    pokeName.innerHTML=`${data.name[0].toUpperCase() + data.name.slice(1)}`

    
    const pokeType = document.createElement("h4")
    pokeType.classList.add("poke-type")
    pokeType.innerHTML=`${type.toUpperCase()}`
    
    const pokeId = document.createElement("h4")
    pokeId.classList.add("poke-id")
    pokeId.innerHTML=`#${id}`

    pokemonContainer.appendChild(cardPokemon)
    cardPokemon.appendChild(pokemonImgCon)
    cardPokemon.appendChild(pokemonContent)
    pokemonImgCon.appendChild(pokemonImg)

    pokemonContent.appendChild(pokeName)
    pokemonContent.appendChild(pokeId)
    pokemonContent.appendChild(pokeType)

}

searchInput.addEventListener("input", (e) =>{
    const pokeNames = document.querySelectorAll(".poke-name");
    const searchValue = searchInput.value.toLowerCase();
    pokeNames.forEach((poke)=>{
        poke.parentElement.parentElement.style.display = 'block';
         if(!poke.innerHTML.toLowerCase().includes(searchValue)){
            poke.parentElement.parentElement.style.display="none";
         }
    })
} )

