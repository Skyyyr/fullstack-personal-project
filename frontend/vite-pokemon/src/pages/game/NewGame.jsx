import Oak from '../../../img/introOak.png'
import background from '../../../img/introbg.png'
import player_f from '../../../img/POKEMONTRAINER_Leaf.png'
import player_m from '../../../img/POKEMONTRAINER_Red.png'
import PlayerChoiceMenu from "../../components/PlayerChoiceMenu.jsx";
import {Howl} from "howler";
import introMusic from "../../../audio/NewStart.mp3";


function NewGame() {
    //TODO We would be creating a brand new 'character' for the player during this process.
    //    We should only submit the request for the new character *AFTER* they've completed the 'New Game'
    //    Sequence so that way we have a name, and gender when creating the character

    return (
        <div className={'row'}>
            <div className={'col-12'}>
                <div className={"imgWrapper"}>
                    <img src={background} id={'background'} height={580}/>
                    <img id={'oak'} src={Oak} className={'oak'}/>
                    <img id={'char_f'} src={player_f} className={'select_start_f invisible'}/>
                    <img id={'char_m'} src={player_m}  className={'select_start_m invisible'}/>
                </div>
            </div>
            <div className={'col-12'}>
                <PlayerChoiceMenu />
            </div>
        </div>
    )
}

export default NewGame