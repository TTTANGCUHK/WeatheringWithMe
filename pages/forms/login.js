import Container from '../../component/FormContainer'
import RStar from '../../utils/required'
import {useState} from "react";
import Router from "next/router";
import { signIn } from "next-auth/react";

const loginPage = () => {

    const [input, setInput] = useState({
        username: '',
        password: ''
    });


    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {
            username: event.target.username.value.trim(),
            password: event.target.password.value
        }
        const result = await signIn("credentials", { username: data.username, password: data.password })
        if (result?.ok) {
            alert("Login successfully")
        } else {
            alert("Wrong username or password")
        }
    }

    return (
        <Container>
            <form className="bg-white rounded p-8 pt-10 pb-20" onSubmit={handleSubmit}>
                <label className="block text-md mb-2 font-bold" htmlFor="username">Username<RStar/></label>
                <input className="w-full py-2 border-2 rounded px-2"
                       id="username"
                       type="text"
                       value={input.username}
                       onChange={(e) => setInput({ username: e.target.value.trim(), password: input.password })}
                       placeholder="Username" required />

                <label className="block text-md mb-2 mt-2 font-bold" htmlFor="password">Password<RStar/></label>
                <input className="w-full py-2 border-2 rounded px-2 mb-4"
                       id="password"
                       type="password"
                       value={input.password}
                       onChange={(e) => setInput({ username: input.username.trim(), password: e.target.value })}
                       placeholder="Password" required />
                <label className="font-bold text-red-600">* are required fields</label>

                <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-md mt-2 py-2 px-4 rounded-full float-right" type="submit">Log In!</button>
            </form>
        </Container>
    );
}



export default loginPage