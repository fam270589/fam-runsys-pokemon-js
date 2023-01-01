import React, { useState } from "react";

export const PokemonContext = React.createContext({
	pokemons: [],
	setPokemons: () => {},
	catchedPokes: [],
	setCatchedPokes: () => {},
	setCatched: () => {},
});

//todo:-----PokemonCtxProvider component-----://
const PokemonCtxProvider = (props) => {
	const [pokemons, setPokemons] = useState([]);
	const [catchedPokes, setCatchedPokes] = useState([]);

	const setCatched = (id) => {
		const tempPokemons = pokemons.map((pokemon) => {
			if (pokemon.id === id) {
				return { ...pokemon, catched: true };
			}
			return pokemon;
		});

		localStorage.setItem("pokemons", JSON.stringify(tempPokemons));
		setPokemons(tempPokemons);
	};

	const contextValue = {
		pokemons,
		setPokemons,
		catchedPokes,
		setCatchedPokes,
		setCatched,
	};

	return (
		<PokemonContext.Provider value={contextValue}>
			{props.children}
		</PokemonContext.Provider>
	);
};

export default PokemonCtxProvider;
