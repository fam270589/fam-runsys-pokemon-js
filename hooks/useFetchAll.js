import { useState, useEffect } from "react";

export const useFetchAll = (initialValue) => {
	const [allPokemons, setAllPokemons] = useState(initialValue);

	useEffect(() => {
		const fetchPokemons = async () => {
			try {
				const resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
				const data = await resp.json();
				const tempPokemons = data.results.map(
					(pokemon, idx) => {
						const idString = (idx + 1).toString();
						return { ...pokemon, catched: false, id: idString };
					}
				);
				setAllPokemons(tempPokemons);
			} catch (error) {
				console.log("error: ", error);
			}
		};

		fetchPokemons();

		console.log("useEffect run...");

		return () => {};
	}, []);

	return allPokemons;
};
