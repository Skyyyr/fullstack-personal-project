import axios from "axios";
import LoginCredentialForm from "../components/LoginCredentialForm.jsx";
import { useNavigate } from "react-router-dom";


function Login() {
    const nav = useNavigate()

    async function submitLoginForm() {
        const inputEmail = document.getElementById('email-form').value
        const inputPassword = document.getElementById('password-form').value

        const loginResponse = await axios.post('/login', {email: inputEmail, password: inputPassword}).catch((resp) => {
            console.log("uh oh", resp)
        })

        // console.log("login_response", loginResponse)
        const results = loginResponse.data['login']
        // console.log('results', results)
        if (results === 'success') {
            nav('/home')
            window.location.reload()
        } else {
            alert("The details you entered were not valid for an account. Retry or Register for an account first.")
        }
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