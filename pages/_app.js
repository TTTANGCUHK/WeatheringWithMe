// CSCI2720 Spring 2022 Group 34

// Group Members: 

// Chan King Kai (1155143995)
// Liu Man Kai (1155144128)
// Tang Tsz Tsun (1155125182) 
// Ho Ka Yu (1155142984)
// Chan Sui Cheung (1155142564)

import '../styles/globals.css';
import NavBar from "../component/NavBar.js";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps} }) {
    return (
        <SessionProvider session={session} refetchInterval={5 * 60}>
            <NavBar />
            <Component {...pageProps} />
        </SessionProvider>
    )
}