let pokedex = null


//crear divs y renderizar los sprite, numeros y nombres de los pokemon
function renderPokemon(pokemon) {

    const element = document.getElementById("pokedex")
    const card = document.createElement("div")
    card.classList.add("card")

    const pkmnName = document.createElement("div")
    pkmnName.classList.add("pokemon_name")
    pkmnName.innerText = pokemon.name

    const pkdexNumber = document.createElement("div")
    pkdexNumber.classList.add("pokedex_number")
    pkdexNumber.innerText = pokemon.number

    const render = document.createElement("img")
    render.classList.add("render")
    render.src = pokemon.sprite
    
    element.appendChild(card)
    card.appendChild(pkmnName)
    card.appendChild(pkdexNumber)
    card.appendChild(render)

    
    card.addEventListener("click", pokemonDescription)

}

//crea los elementos (div, img) del nombre, número y render del pokemon. Se usa "return" para poder extraer los elementos a otra función.
function createElements(pokemon){
    const pkmnName = document.createElement("div")
    pkmnName.classList.add("pokemon_name")
    pkmnName.innerText = pokemon.name

    const pkdexNumber = document.createElement("div")
    pkdexNumber.classList.add("pokedex_number")
    pkdexNumber.innerText = pokemon.number

    const render = document.createElement("img")
    render.classList.add("render")
    render.src = pokemon.sprite

    return {
        pkmnName,
        pkdexNumber,
        render
    }
    
}

//Creación del pop-up de la info del pokemon al pulsar encima de él. Se añaden los elementos gracias al return.
function pokemonDescription(event){
    const whereIsThePokemon = event.currentTarget.querySelector(".pokedex_number").innerText
    const findPokemon = pokedex.find((pokemon) => pokemon.number.toString() === whereIsThePokemon)

    const divViewport = document.createElement("div") //Creación div borroso para la tarjeta
    document.body.appendChild(divViewport) //Ahora es "hijo" de body
    divViewport.classList.add("viewport_div") //Se le añade una clase para trabajar en css

    const descriptionDiv = document.createElement("div") //Creación del div de la tarjeta de descripción
    divViewport.appendChild(descriptionDiv) //Ahora es el hijo del div borroso
    descriptionDiv.classList.add("description_div") //Se le añade la clase para trabajar en css
    
    const { pkmnName, pkdexNumber, render } = createElements(findPokemon)
    descriptionDiv.appendChild(pkmnName)
    descriptionDiv.appendChild(pkdexNumber)
    descriptionDiv.appendChild(render)
    
    const pkdexDescription = document.createElement("div")
    pkdexDescription.classList.add("pokedex_description")
    pkdexDescription.innerText = findPokemon.description

    descriptionDiv.appendChild(pkdexDescription)

    pkmnName.classList.replace("pokemon_name", "cardPokemonName")
    pkdexNumber.classList.replace("pokemon_number", "cardPokemonNumber")
    render.classList.replace("render", "cardPokemonRender")
}


//Función comodín que nos permite borrar los pokemon para los filtros.
function erasepokemon() {

    const element = document.getElementById("pokedex")
    element.innerHTML= ''
}


//añadir funcionalidad al buscador para filtrar los pokemon cuando pulsamos enter
function SearchFilter(event){
    const searchFilter = pokedex.filter(pokemon =>pokemon.name.includes(event.target.value))
    const element = document.getElementById("pokedex")
    console.log(element)
    element.innerHTML= ''

    for (i = 0; i < searchFilter.length; i+=1) {
        renderPokemon(searchFilter[i])
    }
}

const search = document.getElementById("search")
search.addEventListener("input", SearchFilter)


//Función que borra y vuelve a renderizar los pokemon (reinicio)
function reRender(pokemonList){

    erasepokemon()
    for (i = 0; i < pokemonList.length; i+=1) {
        renderPokemon(pokemonList[i])
    }
}

//filtro por los tipos de pokemon, limpia los datos al filtrar y vuelve a renderizar los sprites, numeros y nombres de los filtrados
function TypeFilter(event){

    const buttonList = document.getElementsByClassName("type")
    for (i = 0; i < buttonList.length; i+=1) {
        buttonList[i].classList.remove("selected")
    }

    event.target.classList.add("selected")

    if (event.target.id === "alltypes"){
        
        reRender(pokedex)

    } else{
        const typeFilter = pokedex.filter(pokemon => {

            const isPoketype1 = pokemon.type == event.target.innerText.toLowerCase();
            const isPoketype2 = pokemon.type2 && pokemon.type2 === event.target.innerText.toLowerCase();
            
            return isPoketype1 || isPoketype2;
        })

        reRender(typeFilter)
    }

}

//evento de click en los botones que tienen la clase indicada
const types = document.querySelectorAll(".type")
for (i = 0; i < types.length; i+=1) {
    types[i].addEventListener("click", TypeFilter)

}


//filtro por generación de pokemon en el selector
function GenFilter(event){
    const genFilter = pokedex.filter(pokemon => pokemon.gen == event.target.value)

    const element = document.getElementById("pokedex")
    element.innerHTML= ''

    for (i = 0; i < genFilter.length; i+=1) {
        renderPokemon(genFilter[i])
    }
}

//evento de cambio de generación en el selector
const gen = document.getElementById("gen")
gen.addEventListener("change", GenFilter)



//obtiene los pokemon y llama a la funcion "render pokemon" (crea un div por por cada pokemon y los renderiza)
async function init() {
    pokedex = await getPokemon()
    for (i = 0; i < pokedex.length; i+=1) {
        renderPokemon(pokedex[i])
    }
}

init()
