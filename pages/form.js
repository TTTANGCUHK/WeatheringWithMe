import React from 'react';
import Link from 'next/link';

const FormContainer = ({children}) => {

    return (
        <div className="grid h-screen place-item-center bg-[url('../public/ss-scaled-2048x1152.jpg')]">
            <React.Fragment>
                <div className="bg-white box-border drop-shadow-xl w-96 p-4 border-4 rounded-2xl content-center place-self-center">
                    <div className="underline underline-offset-4 decoration-2 m-1 place-item-center">
                        <Link href="/forms/login">
                            <a className="font-bold mx-2">➯ Sign In!</a>
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

export default FormContainer