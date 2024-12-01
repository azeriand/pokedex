function getPokemon() {
    return new Promise((resolve, reject) => {
        const promise = fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=400")
        let promises = [] 
    
        let pokedex = []
    
        promise.then(response => response.json())
        .then(data => {
            const pokemonList = data.results
    
            pokemonList.forEach((pokemon) => {
                promises.push(fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon.name))
            })        
    
            Promise.all(promises).then(results => {
                const jsonPromises = []

                results.forEach(result => jsonPromises.push(result.json()))

                Promise.all(jsonPromises).then((pkmns) => {
                    pkmns.forEach(pkmn => {
                        const secondType = pkmn.types[1] !== undefined ? pkmn.types[1].type.name : null
                        console.log(pkmn);
                        
                        pokedex.push(new Pokemon(pkmn.name, pkmn.id, pkmn.types[0].type.name, secondType, 1, "", pkmn.sprites.front_default))
                    })
                    resolve(pokedex)
                })
            })
        }); 
    })
    

} 