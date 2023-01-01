import React, { useContext, useState } from "react";
import { PokemonContext } from "../store/PokemonCtxProvider";

//todo:-----Search component-----://
const Search = (props) => {
	const [searchKey, setSearchKey] = useState("");

	const pokemonCtx = useContext(PokemonContext);
	const pokemons = pokemonCtx.pokemons;
	const setPokemons = pokemonCtx.setPokemons;

	const handleOnChange = (event) => {
		const key = event.target.value;
		setSearchKey(key);
	};

	const handleSearch = (key) => {
		if (key.trim() === "") {
			const arrPokemons = localStorage.getItem("pokemons");
			const items = JSON.parse(arrPokemons);

			setPokemons(items);
			return;
		}

		const newList = pokemons.filter((pokemon) =>
			pokemon.name?.includes(key.toLowerCase())
		);
		setPokemons(newList);
		setSearchKey("");
	};

	return (
		<div className="flex gap-2 mt-1 mb-5">
			<input
				className="border rounded-md px-3"
				type="text"
				placeholder="pokemon..."
				value={searchKey}
				onChange={handleOnChange}
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						handleSearch(searchKey);
					}
				}}
			/>
			<button
				className="bg-slate-700 text-gray-200 px-3 rounded-md "
				onClick={() => handleSearch(searchKey)}
			>
				Search
			</button>
		</div>
	);
};

export default Search;
