var container = document.getElementById("caja");

const nPoke = 56

for (let algo = 1; algo <= nPoke; algo++) {
    (function (pokemonId) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(response => response.json())
            .then(data => {
                // Crear un contenedor para cada Pokémon
                let pokemonContainer = document.createElement('div');

                // Crear el párrafo y establecer su contenido
                let nom = document.createElement('p');
                nom.textContent = data.name;

                // Crear la imagen y establecer su atributo "src"
                let imagPok = document.createElement("img");
                imagPok.setAttribute("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`);
                imagPok.setAttribute("id", "ATP")
                imagPok.setAttribute("onclick", `pasar(${pokemonId})`)

                // Adjuntar el párrafo y la imagen al contenedor del Pokémon
                pokemonContainer.appendChild(imagPok);
                pokemonContainer.appendChild(nom);

                // Adjuntar el contenedor del Pokémon al contenedor principal
                container.appendChild(pokemonContainer);
            })
            .catch(error => console.error('Error al obtener los datos:', error));
    })(algo);
}

var pokeInformacion = document.getElementById("gameBoy")

var cont = 0

function pasar(id) {

    if (cont > 0) {
        let desac = document.getElementById(cont - 1);
        desac.style.display = "none";
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => {
            // Crear un contenedor para cada Pokémon
            let pokemonContainer = document.createElement('div');
            pokemonContainer.setAttribute("id", cont)

            // Crear el párrafo y establecer su contenido
            let nom = document.createElement('h1');
            nom.innerHTML = data.name;

            // Crear la imagen y establecer su atributo "src"
            let imagPok = document.createElement("img");
            imagPok.setAttribute("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`);
            imagPok.setAttribute("id", "ATP")

            pokemonContainer.appendChild(imagPok);
            pokemonContainer.appendChild(nom);

            pokeInformacion.appendChild(pokemonContainer);


            for (let i = 0; i < data.abilities.length; i++) {
                const habilidad = data.abilities[i].ability;
                const nombreHabilidad = habilidad.name;

                let habi = document.createElement("p")
                habi.innerHTML = `Su ${i + 1}º habilidad es ${nombreHabilidad}`

                pokemonContainer.appendChild(habi)
            }

            for (let i = 0; i < data.types.length; i++) {
                const tipo = data.types[i].type;
                nombreTipo = tipo.name

                let tip = document.createElement("p")
                tip.innerHTML = `${nombreTipo}`

                pokemonContainer.appendChild(tip)
            }

            let pokePeso = document.createElement("p")
            pokePeso.innerHTML = "Peso del pokemon: " + (data.weight / 10) + "kg"
            pokemonContainer.appendChild(pokePeso)


            cont++;
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}
