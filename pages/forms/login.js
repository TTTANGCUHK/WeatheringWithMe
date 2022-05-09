import Container from '../form'
import RStar from '../../utils/required'

const loginPage = () => {

    // const [likes, setLikes] = useState(0);

    // function onClick() {
    //     setLikes(likes + 1);
    // }

    return (
        <Container>
            <form className="bg-white rounded p-8 pt-10 pb-20">
                <label className="block text-md mb-2 font-bold" name="username">Username<RStar/></label>
                <input className="w-full py-2 border-2 rounded px-2" id="username" type="text" required />

                <label className="block text-md mb-2 mt-2 font-bold" name="password">Password<RStar/></label>
                <input className="w-full py-2 border-2 rounded px-2 mb-4" id="password" type="password" required />
                <label className="font-bold text-red-600">* are required fields</label>

                <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-md mt-2 py-2 px-4 rounded-full float-right" type="submit">Log In!</button>
            </form>
            {/*<h1>SIGN IN!!!!</h1>*/}

            {/*<button onClick={onClick}>Like ({likes})</button>*/}
        </Container>
    );
}



export default loginPage