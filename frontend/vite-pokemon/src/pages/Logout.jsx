import { useNavigate } from "react-router-dom";
import {useEffect} from "react";

function Logout(props) {
    const nav = useNavigate()

    function logout() {
        nav('/home')
        props.clickFunction()
    }

    useEffect(() => {
        if (props.user === undefined) {
            nav('/login')
            return () => {
                mounted.current = false
            }
        }
        mounted.current = true
    }, [])

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