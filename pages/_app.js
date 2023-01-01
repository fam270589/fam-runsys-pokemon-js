import PokemonCtxProvider from "../store/PokemonCtxProvider";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
	return (
		<PokemonCtxProvider>
			<Component {...pageProps} />
		</PokemonCtxProvider>
	);
}
