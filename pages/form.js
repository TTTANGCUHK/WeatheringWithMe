// CSCI2720 Spring 2022 Group 34

// Group Members: 

// Chan King Kai (1155143995)
// Liu Man Kai (1155144128)
// Tang Tsz Tsun (1155125182) 
// Ho Ka Yu (1155142984)
// Chan Sui Cheung (1155142564)

import React from 'react';
import Link from 'next/link';
import Login from "./forms/login";

const FormContainer = ({children}) => {

    if (children == null) {
        return (
            <div className="grid h-screen place-item-center bg-[url('../public/ss-scaled-2048x1152.jpg')]">
                <React.Fragment>
                    <Login />
                </React.Fragment>
            </div>
        );
    }

    else {
        return (
            <div className="grid h-screen place-item-center bg-[url('../public/ss-scaled-2048x1152.jpg')]">
                <React.Fragment>
                    <div className="bg-white box-border drop-shadow-xl w-96 p-4 border-4 rounded-2xl content-center place-self-center">
                        <div className="underline underline-offset-4 decoration-2 m-1 place-item-center">
                            <Link href="/forms/login">
                                <a className="font-bold mx-2">➯ Login!</a>
                            </Link>
                            <Link href="/forms/signup">
                                <a className="font-bold mx-2">🖉 Sign Up!</a>
                            </Link>
                        </div>
                        {children}
                    </div>
                </React.Fragment>
            </div>
        );
    }

}

export default FormContainer