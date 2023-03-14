import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
import {useRef} from "react";

function Logout(props) {
    const nav = useNavigate()
    const mounted = useRef(false);


    function logout() {
        nav('/home')
        props.clickFunction()
    }

    useEffect(() => {
        if (props.user === undefined) {
            nav('/home')
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