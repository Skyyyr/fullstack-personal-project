import LoginCredentialForm from "../components/LoginCredentialForm.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Signup() {
    const nav = useNavigate()
    function submitSignupForm() {
        const inputEmail = document.getElementById('email-form').value
        const inputPassword = document.getElementById('password-form').value
        //TODO Check for valid entries?
        axios.post('/signup', {email: inputEmail, password: inputPassword}).then((response)=>{
            console.log('response from server: ', response)
            window.location.reload()
        })
        nav('/login')
    }
    return (
        <div>
            <h1>
                Sign Up
            </h1>
            <p>
                Welcome to our page, please fill out the form below to sign up for an account.
            </p>
            <LoginCredentialForm />
            <button onClick={submitSignupForm}>
                Sign-up
            </button>
        </div>
    )
}

export default Signup