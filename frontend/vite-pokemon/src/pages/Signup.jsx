import LoginCredentialForm from "../components/LoginCredentialForm.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Signup() {
    const nav = useNavigate()
    async function submitSignupForm() {
        const inputEmail = document.getElementById('email-form').value
        const inputPassword = document.getElementById('password-form').value

        if (!inputEmail.includes("@") || !inputEmail.includes(".com")) {
            console.log("Not a valid email")
            return
        }

        if (inputPassword.split("").length <= 6) {
            console.log("pw too short")
            return
        }

        //The user has put in a potential email and pw that are valid. So we make the account.

        const signupResponse = await axios.post('/signup', {email: inputEmail, password: inputPassword}).catch((response)=>{
            console.log('response from server: ', response)
            // window.location.reload()
        })

        // console.log("signupResponse", signupResponse)
        const results = signupResponse.data['signup']
        if (results === 'success') {
            alert("You've successfully created your account.")
            nav('/login')
        } else {
            alert("The details you entered were not valid for an account to be made. Please enter a valid email, " +
                "and a password which is 7 characters or greater.")
        }
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