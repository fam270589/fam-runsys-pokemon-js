import React, { useContext, useState } from "react";
import { PokemonContext } from "../store/PokemonCtxProvider";

//todo:-----Search component-----://
const Search = (props) => {
	const [searchKey, setSearchKey] = useState("");

	const pokemonCtx = useContext(PokemonContext);
	const pokemons = pokemonCtx.pokemons;
	const setPokemons = pokemonCtx.setPokemons;
	const fetchPokemons = pokemonCtx.fetchPokemons;

	const handleOnChange = (event) => {
		const key = event.target.value;
		setSearchKey(key);
	};

	const handleSearch = (key) => {
		if (key.trim() === "") {
			fetchPokemons();
			return;
		}

		const newList = pokemons.filter((pokemon) =>
			pokemon.name.includes(key.toLowerCase())
		);
		setPokemons(newList);
		setSearchKey("");
	};

	return (
		<div className="w-full flex flex-col my-7 items-center gap-2">
			<p
				className="underline underline-offset-2 hover:text-blue-500"
				onClick={() => fetchPokemons()}
			>
				Reset List
			</p>
			<div className="w-full flex gap-2 justify-center">
				<input
					className="border rounded-md px-3 py-1"
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
					className="bg-slate-700 text-gray-200 px-3 py-1 rounded-md "
					onClick={() => handleSearch(searchKey)}
				>
					Search
				</button>
			</div>
		</div>
	);
};

export default Search;
