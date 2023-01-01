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
			const arrPokemons = localStorage.getItem("pokemons");
			const items = JSON.parse(arrPokemons);

			setPokemons(items);
		} else {
			const catched = pokemons.filter((pokemon) => pokemon.catched === true);
			setPokemons(catched);
		}

		setSortCatchedActive((prevState) => !prevState);
	};

	return (
		<>
			<div className="flex gap-6">
				<p>Sort: </p>
				<p
					className={`border text-gray-500 px-2 rounded-md cursor-pointer ${
						sortNameActive ? "border-blue-400 bg-blue-400 text-white" : ""
					}`}
					onClick={handleSortName}
				>
					{isAscending ? "Descending" : "Ascending"}
				</p>
				<p
					className={`border text-gray-500 px-2 rounded-md cursor-pointer ${
						sortCatchedActive ? "border-blue-400 bg-blue-400 text-white" : ""
					}`}
					onClick={handleSortCatched}
				>
					Catched
				</p>
			</div>

			<div className="w-5/6 sm:w-1/2 my-1">
				{pokemons ? (
					pokemons.map((pokemon) => (
						<PokemonCard key={pokemon.id} id={pokemon.id} pokemon={pokemon} />
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
};

export default PokemonList;
