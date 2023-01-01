import React, { useContext, useState } from "react";

import { PokemonContext } from "../store/PokemonCtxProvider";

//todo:-----AddPokemon component-----://
const AddPokemon = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [height, setHeight] = useState("");
	const [weight, setWeight] = useState("");

	const pokemonCtx = useContext(PokemonContext);
	const pokemons = pokemonCtx.pokemons;
	const setPokemons = pokemonCtx.setPokemons;

	const handleAdd = (event) => {
		event.preventDefault();

		const newPoke = {
			name,
			type,
			height,
			weight,
		};

		const newItem = {
			name,
			catched: false,
			id: name,
			details: newPoke,
		};

		const newest = [newItem, ...pokemons];

		setPokemons(newest);
		localStorage.setItem("pokemons", JSON.stringify(newest));

		setName("");
		setType("");
		setHeight("");
		setWeight("");
	};

	return (
		<div className="w-full mt-3 mb-5 flex flex-col items-center">
			<h1
				className="bg-orange-400 py-1 px-3 text-white rounded-md cursor-pointer mb-5"
				onClick={() => setIsOpen((prev) => !prev)}
			>
				Add new pokemon +
			</h1>
			{isOpen ? (
				<form className="flex flex-col gap-2" onSubmit={handleAdd}>
					<div className="flex justify-between gap-2">
						<label htmlFor="name">Name:</label>
						<input
							value={name}
							type="text"
							className="border rounded-md px-2 mx-1"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="flex justify-between gap-2">
						<label htmlFor="type">Type:</label>
						<input
							value={type}
							type="text"
							className="border rounded-md px-2 mx-1"
							onChange={(e) => setType(e.target.value)}
						/>
					</div>
					<div className="flex justify-between gap-2">
						<label htmlFor="height">Height:</label>
						<input
							value={height}
							type="text"
							className="border rounded-md px-2 mx-1"
							onChange={(e) => setHeight(e.target.value)}
						/>
					</div>
					<div className="flex justify-between gap-2">
						<label htmlFor="weight">Weight:</label>
						<input
							value={weight}
							type="text"
							className="border rounded-md px-2 mx-1"
							onChange={(e) => setWeight(e.target.value)}
						/>
					</div>
					<button className="bg-green-300 rounded-md mt-1 mb-7 py-1">
						Add
					</button>
				</form>
			) : null}
		</div>
	);
};

export default AddPokemon;
