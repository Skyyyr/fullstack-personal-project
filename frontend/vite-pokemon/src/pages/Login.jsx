import axios from "axios";
import LoginCredentialForm from "../components/LoginCredentialForm.jsx";
import { useNavigate } from "react-router-dom";


function Login() {
    const nav = useNavigate()

    function submitLoginForm() {
        const inputEmail = document.getElementById('email-form').value
        const inputPassword = document.getElementById('password-form').value
        console.log(inputEmail, inputPassword)
        axios.post('/login', {email: inputEmail, password: inputPassword}).then((response)=>{
            console.log('response from server: ', response)
            window.location.reload()
        })
        nav('/home')
    }

    return (
        <div className={'container'}>
            <h1>
                Login to your account
            </h1>
            <LoginCredentialForm />
            <button onClick={submitLoginForm}>
                Login
            </button>
        </div>
    )
}

export default Login