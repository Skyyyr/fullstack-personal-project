import {useNavigate} from "react-router-dom";
import {useState} from "react";


function Battle() {
    const nav = useNavigate()

    function mainGame() {
        nav('/game/play')
    }

    return (
        <div className={'container'}>

        </div>
    )
}

export default Battle