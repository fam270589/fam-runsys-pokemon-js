import React, { useContext, useRef, useState } from "react";

import { PokemonContext } from "../store/PokemonCtxProvider";

//todo:-----AddPokemon component-----://
const AddPokemon = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const nameRef = useRef(null);
	const typeRef = useRef();
	const heightRef = useRef();
	const weightRef = useRef();

	const pokemonCtx = useContext(PokemonContext);
	const pokemons = pokemonCtx.pokemons;
	const setPokemons = pokemonCtx.setPokemons;

	const handleAdd = (event) => {
		event.preventDefault();

		const enteredName = nameRef.current?.value;
		const enteredType = typeRef.current?.value;
		const enteredHeight = heightRef.current?.value;
		const enteredWeight = weightRef.current?.value;

		const newPoke = {
			name: enteredName,
			type: enteredType,
			height: enteredHeight,
			weight: enteredWeight,
		};

		const newItem = {
			name: enteredName,
			catched: false,
			id: enteredName,
			details: newPoke,
		};

		const newest = [newItem, ...pokemons];

		setPokemons(newest);
		localStorage.setItem("pokemons", JSON.stringify(newest));
	};

	return (
		<div className="my-5 flex flex-col items-center">
			<h1
				className="bg-orange-400 px-3 text-white rounded-md cursor-pointer mb-3"
				onClick={() => setIsOpen((prev) => !prev)}
			>
				Add new pokemon +
			</h1>
			{isOpen ? (
				<form className="flex flex-col gap-2" onSubmit={handleAdd}>
					<div className="flex justify-between">
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							className="border rounded-md px-2 mx-1"
							ref={nameRef}
						/>
					</div>
					<div className="flex justify-between">
						<label htmlFor="type">Type:</label>
						<input
							type="text"
							className="border rounded-md px-2 mx-1"
							ref={typeRef}
						/>
					</div>
					<div className="flex justify-between">
						<label htmlFor="height">Height:</label>
						<input
							type="text"
							className="border rounded-md px-2 mx-1"
							ref={heightRef}
						/>
					</div>
					<div className="flex justify-between">
						<label htmlFor="weight">Weight:</label>
						<input
							type="text"
							className="border rounded-md px-2 mx-1"
							ref={weightRef}
						/>
					</div>
					<button className="bg-green-300 rounded-md">Add</button>
				</form>
			) : null}
		</div>
	);
};

export default AddPokemon;
