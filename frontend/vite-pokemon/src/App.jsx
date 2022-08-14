import {useEffect, useState} from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import axios from 'axios'
import AppNavbar from "./components/AppNavbar.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Logout from "./pages/Logout.jsx";
import Signup from "./pages/Signup.jsx";
import AboutMe from "./pages/AboutMe.jsx";
import MainMenu from "./pages/game/MainMenu.jsx";
import NewGame from "./pages/game/NewGame.jsx";
import MainGame from "./pages/game/MainGame.jsx";
import Battle from "./pages/game/Battle.jsx";
import WildEncounter from "./pages/game/WildEncounter.jsx";


const getCSRFToken = ()=> {
    let csrfToken

    // the browser's cookies for this page are all in one string, separated by semi-colons
    const cookies = document.cookie.split(';')
    for ( let cookie of cookies ) {
        // individual cookies have their key and value separated by an equal sign
        const crumbs = cookie.split('=')
        if ( crumbs[0].trim() === 'csrftoken') {
          csrfToken = crumbs[1]
        }
    }
    return csrfToken
}

axios.defaults.headers.common['X-CSRFToken'] = getCSRFToken()

function App() {
    const [user, setUser] = useState(null)

    function handleLogout() {
        axios.post('/logout').then((response) => {
            whoAmI()
        })
    }

    const whoAmI = async () => {
        const response = await axios.get('/whoami')
        const user = response.data && response.data[0] && response.data[0].fields
        setUser(user)
    }

    useEffect(()=>{
        whoAmI()
    }, [])

    return (
        <div className="App">
            <Router>
                <AppNavbar user={user}/>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout clickFunction={handleLogout}/>} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/about' element={<AboutMe user={user}/>} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/' element={<Home />} />
                    {/*TODO Should add/remove /home or / */}
                    <Route path='/game' element={<MainMenu user={user}/>} />
                    <Route path='/game/new' element={<NewGame />} />
                    <Route path='/game/play' element={<MainGame user={user}/>} />
                    {/*<Route path='/game/play/encounter' element={<Battle />} />*/}
                    <Route path='/game/play/encounter' element={<WildEncounter />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
