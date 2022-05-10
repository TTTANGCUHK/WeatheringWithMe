import Container from '../form'
import RStar from '../../utils/required'
import { useState } from "react";
import Router from "next/router";


const signupPage = () => {
    const [input, setInput] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    function checkPassword({ data }) {
        let uRe = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
        let pwRe = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}$/

        if (!uRe.test(data.username)) {
            alert("Username length must be between 4-20 characters.")
            return false
        }

        if (!pwRe.test(data.password)) {
            alert("Password must contain at least 1 letter and 1 number between 4-20 characters.")
            return false
        }

        if (data.password !== data.confirm_password) {
            alert("Password not match.")
            return false
        }

        return true
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {
            username: event.target.username.value.trim(),
            password: event.target.password.value,
            confirm_password: event.target.confirm_password.value
        }
        if (checkPassword({ data })) {
            const postData = {
                username: data.username,
                password: data.password
            }

            const postTo = "../api/user/createUser"
            const opts = {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                mode: 'cors',
                body: new URLSearchParams(postData)
            }
            const res = await fetch(postTo, opts)
            const result = await res.json()
            if (result.status === "200") {
                alert("You have created your account successfully!")
                if (typeof window !== 'undefined') {
                    await Router.push('/forms/login')
                }
            } else if (result.status === "403") {
                alert("Account already exist!")
            }
        }
    }

    return (
        <Container>
            <form className="bg-white rounded p-8 pt-10 pb-20" onSubmit={handleSubmit}>
                <label className="block text-md mb-2 font-bold" htmlFor="username">Username<RStar /></label>
                <input className="w-full py-2 border-2 rounded px-2"
                    id="username"
                    name="username"
                    type="text"
                    value={input.username}
                    onChange={(e) => setInput({ username: e.target.value.trim(), password: input.password, confirmPassword: input.confirmPassword })}
                    placeholder="Username" required />

                <label className="block text-md mb-2 mt-2 font-bold" htmlFor="password">Password<RStar /></label>
                <input className="w-full py-2 border-2 rounded px-2"
                    id="password"
                    name="password"
                    type="password"
                    value={input.password}
                    onChange={(e) => setInput({ username: input.username.trim(), password: e.target.value, confirmPassword: input.confirmPassword })}
                    placeholder="Password" required />

                <label className="block text-md mb-2 mt-2 font-bold" htmlFor="confirm_password">Confirm Password<RStar /></label>
                <input className="w-full py-2 border-2 rounded px-2 mb-4"
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    value={input.confirmPassword}
                    onChange={(e) => setInput({ username: input.username.trim(), password: input.password, confirmPassword: e.target.value })}
                    placeholder="Confirm password" required />
                <label className="font-bold text-red-600">* are required fields</label>

                <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-md mt-2 py-2 px-4 rounded-full float-right"
                    type="submit">Sign Up!</button>
            </form>
        </Container>
    );
}
export default signupPage