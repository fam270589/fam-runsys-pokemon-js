import React, { useEffect, useState } from "react";

export const PokemonContext = React.createContext({
	pokemons: [],
	fetchPokemons: () => {},
	setPokemons: () => {},
	catchedPokes: [],
	setCatchedPokes: () => {},
	setCatched: () => {},
	getLocalPokemons: () => {},
});

//todo:-----PokemonCtxProvider component-----://
const PokemonCtxProvider = (props) => {
	const [pokemons, setPokemons] = useState([]);
	const [catchedPokes, setCatchedPokes] = useState([]);

	const fetchPokemons = async () => {
		try {
			const resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
			const data = await resp.json();

			const tempPokemons = data.results.map((pokemon, idx) => {
				const idString = (idx + 1).toString();
				return { ...pokemon, catched: false, id: idString };
			});

			setPokemons(tempPokemons);
		} catch (error) {
			console.log("error: ", error);
		}
	};

	useEffect(() => {
		const arrPokemons = localStorage.getItem("pokemons");

		if (arrPokemons === null) {
			fetchPokemons();
		} else {
			const items = JSON.parse(arrPokemons);
			setPokemons(items);
		}

		console.log("useEffect from CtxProvider.js");

		return () => {};
	}, []);

	const getLocalPokemons = () => {
		const arrPokemons = localStorage.getItem("pokemons");
		const items = JSON.parse(arrPokemons);

		setPokemons(items);
	};

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
		fetchPokemons,
		setPokemons,
		catchedPokes,
		setCatchedPokes,
		setCatched,
		getLocalPokemons,
	};

	return (
		<PokemonContext.Provider value={contextValue}>
			{props.children}
		</PokemonContext.Provider>
	);
};

export default PokemonCtxProvider;
