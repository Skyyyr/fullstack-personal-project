import { useNavigate } from "react-router-dom";

function Logout(props) {
    const nav = useNavigate()

    function logout() {
        nav('/home')
        props.clickFunction()
    }

    return (
        <div>
            <h1>
                Logout of your account
            </h1>
            <button onClick={logout}>
                Logout
            </button>
        </div>
    )
}

export default Logout