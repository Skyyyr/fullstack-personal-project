import Menus from '../fixtures/characterCreation.json'
import {useEffect, useState} from "react";
import PlayerChoiceOption from "./PlayerChoiceOption.jsx";
import {Howl} from "howler";
import introMusic from "../../audio/NewStart.mp3";
import NameInputForm from "./NameInputForm.jsx";
import axios from "axios";


const sound = new Howl({
    src: introMusic,
    loop: true
});

function PlayerChoiceMenu() {

    const [playerChoices, setPlayerChoices] = useState(Menus[0])
    const [nameInput, setNameInput] = useState()
    const [userName, setUserName] = useState('')
    const [userGender, setUserGender] = useState('')
    const [convo, setConvo] = useState('')

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

    function logCharData() {
        console.log('Logging data: ', userName, userGender)
        axios.post('/trainer', {isSwap: false, name: userName, gender: userGender}).then((response)=>{
            console.log('response from server: ', response)
            // window.location.reload()
            // TODO transition into the actual game - which is at a dif hash route
        })
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
            case 'logCharData':
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