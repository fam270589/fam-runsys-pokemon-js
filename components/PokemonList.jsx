import React, { useContext, useState } from "react";
import { PokemonContext } from "../store/PokemonCtxProvider";
import PokemonCard from "./ui/PokemonCard";

//todo:-----PokemonList component-----://
const PokemonList = () => {
	const [isAscending, setisAscending] = useState(false);
	const [sortCatchedActive, setSortCatchedActive] = useState(false);
	const [sortNameActive, setSortNameActive] = useState(false);

	const pokemonCtx = useContext(PokemonContext);
	const pokemons = pokemonCtx.pokemons;
	const setPokemons = pokemonCtx.setPokemons;
	const getLocalPokemons = pokemonCtx.getLocalPokemons;

	const handleSortName = () => {
		let sorted;

		if (isAscending) {
			sorted = [...pokemons].sort((a, b) => (a.name < b.name ? 1 : -1));
		} else {
			sorted = [...pokemons].sort((a, b) => (a.name > b.name ? 1 : -1));
		}

		setPokemons(sorted);
		setisAscending((prevState) => !prevState);

		if (!sortNameActive) {
			setSortNameActive(true);
		}
	};

	const handleSortCatched = () => {
		if (sortCatchedActive) {
			getLocalPokemons();
		} else {
			const catched = pokemons.filter((pokemon) => pokemon.catched === true);
			setPokemons(catched);

			localStorage.setItem("pokemons", JSON.stringify(pokemons));
		}

		setSortCatchedActive((prevState) => !prevState);
	};

	return (
		<div className="w-full flex flex-col items-center">
			<div className="flex gap-7">
				<p>Sort: </p>
				<p
					className={`border px-2 rounded-md cursor-pointer ${
						sortNameActive
							? "border-blue-400 bg-blue-400 text-white"
							: "text-gray-500"
					}`}
					onClick={handleSortName}
				>
					{isAscending ? "Descending" : "Ascending"}
				</p>
				<p
					className={`border px-2 rounded-md cursor-pointer ${
						sortCatchedActive
							? "border-blue-400 bg-blue-400 text-white"
							: "text-gray-500"
					}`}
					onClick={handleSortCatched}
				>
					Catched
				</p>
			</div>

			<div className="w-full sm:w-1/2 my-1 px-5">
				{pokemons.length > 0 ? (
					pokemons.map((pokemon) => (
						<PokemonCard key={pokemon.id} id={pokemon.id} pokemon={pokemon} />
					))
				) : (
					<p className="text-center my-10">Pokemon Not Found...</p>
				)}
			</div>
		</div>
	);
};

export default PokemonList;
