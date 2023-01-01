import React from "react";

//todo:-----Header component-----://
const Header = (props) => {
	return (
		<div className="flex flex-col items-center w-full text-center my-3">
			<div className="font-bold text-2xl leading-7">
				<h1>Pokemon</h1>
				<h1>gotta catch em all!!</h1>
			</div>
			<p className="mt-3">Search and Catch your Pokemon. </p>
		</div>
	);
};

export default Header;
