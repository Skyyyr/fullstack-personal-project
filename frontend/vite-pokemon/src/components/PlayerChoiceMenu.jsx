import Menus from '../fixtures/characterCreation.json'
import {useEffect, useState} from "react";
import PlayerChoiceOption from "./PlayerChoiceOption.jsx";
import {Howl} from "howler";
import introMusic from "../../audio/NewStart.mp3";
import NameInputForm from "./NameInputForm.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const sound = new Howl({
    src: introMusic,
    loop: true
});

const STARTER_NAMES = ['Bulba-Boss', 'Charmy', 'Turtle']
const STARTER_MOVES = ['Vine Whip', 'Ember', 'Water Gun']

//TODO When selecting one of the starters we should display them on the screen

function PlayerChoiceMenu() {
    const nav = useNavigate()

    const [playerChoices, setPlayerChoices] = useState(Menus[0])
    const [nameInput, setNameInput] = useState()
    const [userName, setUserName] = useState('')
    const [userGender, setUserGender] = useState('m')
    const [convo, setConvo] = useState('')
    const [starterIdx, setStarterIdx] = useState(0)

    function loadGame() {
        nav('/game/play')
    }

    function displayNameInput() {
        return setNameInput(<NameInputForm />)
    }

    function stopDisplayNameInput() {
        const inputName = document.getElementById('name-input').value
        setUserName(inputName)
        return setNameInput(<div></div>)
    }

    function setUserMale() {
        setUserGender('m')
    }

    function setUserFemale() {
        setUserGender('f')
    }

    async function logCharData() {
        console.log('Logging data: ', userName, userGender)
        await axios.post('/trainer', {isSwap: false, name: userName, gender: userGender}).catch(reason => {
            // Something bad happened!
            console.log("Reason", reason)
        })
        await axios.post('/pokemon', {
            'poke': 'starter',
            'details': {
                    'name': starterIdx === 1 ? STARTER_NAMES[0] : starterIdx === 4 ? STARTER_NAMES[1] : STARTER_NAMES[2],
                    'pokedex_number': starterIdx,
                    'level': 5,
                    'max_health': 15,
                    'health': 15,
                    'speed': 10,
                    'accuracy': 15,
                    'defence': 12,
                    'offence': 12,
                    'attack_list': starterIdx === 1 ? STARTER_MOVES[0] : starterIdx === 4 ? STARTER_MOVES[1] : STARTER_MOVES[2]
                }
        }).catch(reason => {
            // Something bad happened!
            console.log("Reason", reason)
        })

        setTimeout(function() {
            loadGame()
        }, 2000)
    }

    function handleFunction(requestedFunction) {
        switch (requestedFunction) {
            case 'play':
                sound.play()
                break
            case 'stop':
                sound.stop()
                break
            case 'pause':
                sound.pause()
                break
            case 'name':
                displayNameInput()
                break
            case 'nameStop':
                stopDisplayNameInput()
                break
            case 'setUserMale':
                setUserMale()
                break
            case 'setUserFemale':
                setUserFemale()
                break
            case 'bulbasaur':
                setStarterIdx(1)
                break
            case 'charmander':
                setStarterIdx(4)
                break
            case 'squirtle':
                setStarterIdx(7)
                break
            case 'finish':
                sound.stop()
                logCharData()
                break
            default:
                console.log("DEFAULT")
                break
        }
    }

    /**
     * We can dynamically animate with this function - we identify which element to find by ID
     * - we check if add / remove are not empty and if they aren't empty we -
     * - add or remove the class specified - which should animate the element
     * @param requestedHtml element by id
     * @param requestedAnimationAdd class to add blank for nothing
     * @param requestedAnimationRemove class to remove blank for nothing
     */
    function handleAnimation(requestedHtml, requestedAnimationAdd, requestedAnimationRemove) {
        const htmlElement = document.getElementById(requestedHtml)
        if (requestedAnimationAdd !== "") {
            htmlElement.classList.add(requestedAnimationAdd)
        }
        if (requestedAnimationRemove !== "") {
            htmlElement.classList.remove(requestedAnimationRemove)
        }
    }

    function updateMenu(clickedOptionId) {
        for (let i = 0; i < Menus.length; i++) {
            if (Menus[i]['id'] === clickedOptionId) {
                setPlayerChoices(Menus[i])
                handleFunction(Menus[i]['func'])
                setConvo(createNpcDialog(Menus[i]['details']))
                if (Menus[i]["anim"]) {
                    for (let j = 0; j < Menus[i]['animation_control'].length; j++) {
                        handleAnimation(
                            Menus[i]['animation_control'][j]['html'],
                            Menus[i]['animation_control'][j]['anim_add'],
                            Menus[i]['animation_control'][j]['anim_remove']
                        )
                    }
                }
                break
            }
        }
    }

    function createMenuOptions(allOptions) {
        let htmlContent = []
        for (let i = 0; i < allOptions.length; i++) {
            htmlContent.push(<PlayerChoiceOption key={i} option={allOptions[i]} clickFunction={updateMenu}/>)
        }
        return htmlContent
    }

    function createNpcDialog(dialog) {
        console.log("Dialog", dialog)
        return <div className={'dialog text-center'}>{dialog}</div>
    }

    useEffect(() => {
        setConvo(createNpcDialog(Menus[0]['details']))
    }, [])

    return (
        <div>
            {convo}
            {createMenuOptions(playerChoices.options)}
            {nameInput}
        </div>
    )
}

export default PlayerChoiceMenu