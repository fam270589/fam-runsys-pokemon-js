import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../store/PokemonCtxProvider";

//todo:-----Details component-----://
const Details = (props) => {
	const [details, setDetails] = useState();
	const [isCatched, setIsCatched] = useState(false);

	const pokemonCtx = useContext(PokemonContext);
	const setCatched = pokemonCtx.setCatched;
	const setCatchedPokes = pokemonCtx.setCatchedPokes;
	const pokemons = pokemonCtx.pokemons;
	const catchedPokes = pokemonCtx.catchedPokes;

	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
				const data = await resp.json();

				setDetails(data);
				console.log(data);
			} catch (error) {
				console.log("error: ", error);
			}
		};

		fetchDetails();

		return () => {};
	}, [id]);

	const handleCatch = (id) => {
		const found = pokemons.find((pokemon) => pokemon.id === id);
		const newPoke = { ...found, catched: true };

		// const newList: IPokemon[] = [...catchedPokes, newPoke];
		// setCatchedPokes(newList);
		setIsCatched(true);
		setCatched(id);
	};

	return (
		<div className="flex flex-col items-center w-full text-center my-3">
			{!details ? (
				<p>Loading</p>
			) : (
				<>
					<Image
						src={details.sprites.front_default}
						alt=""
						width={150}
						height={150}
					/>
					<div className="font-bold text-2xl">
						<h1>{details.name}</h1>
					</div>
					<div>
						<p>Type: {details.types[0].type.name}</p>
						<p>Height: {details.height}</p>
						<p>Weight: {details.weight}</p>
					</div>
					{isCatched ? (
						<button
							className={`bg-green-700 text-gray-200 rounded-md px-3 cursor-pointer m-5`}
						>
							Catched
						</button>
					) : (
						<button
							className={`bg-slate-500 text-gray-200 rounded-md px-3 cursor-pointer m-5`}
							onClick={() => handleCatch(id)}
						>
							Catch!
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default Details;
