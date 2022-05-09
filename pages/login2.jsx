import React from 'react';
import 'tailwindcss/tailwind.css';


class Login2 extends React.Component {
  
  
  render() {
    return (
        <div className="w-screen h-screen" style={{backgroundImage: "url('./ss-scaled-2048x1152.jpg')"}}>
        <div className="max-w-md m-auto py-28">
        <form className="bg-white rounded p-8 pt-10 drop-shadow-xl pb-20">

            <label className="block text-md mb-2 font-bold" name="username">Username</label>
            <input className="w-full py-2 border-2 rounded px-2" id="username" type="text" required />

            <label className="block text-md mb-2 mt-2 font-bold" name="password">Password</label>
            <input className="w-full py-2 border-2 rounded px-2 mb-4" id="password" type="password" required />

            <button className="bg-gradient-to-b from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white font-bold text-md mt-2 py-2 px-4 rounded float-right" type="submit">Login</button>
            <button className="bg-gradient-to-b from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white font-bold text-md mt-2 py-2 px-4 mr-3 rounded float-right" type="button">Sign up</button>
        </form>
      </div>
      </div>
    
    );
    }
    }


export default Login2;
    
