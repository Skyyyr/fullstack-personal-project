import {Howl} from "howler";
import {useEffect, useState} from "react";
//Audio files
import battle from "../../audio/Battle wild.mp3";
import battleWin from "../../audio/battle victory wild.mp3";
import flee from "../../audio/battle flee.mp3";
import battleBallDrop from "../../audio/battle ball drop.mp3";
import battleBallHit from "../../audio/battle ball hit.mp3";
import battleCatchClick from "../../audio/battle catch click.mp3";
import battleDamageNormal from "../../audio/battle damage normal.mp3";
import battleDamageSuper from "../../audio/battle damage super.mp3";
import battleDamageWeak from "../../audio/battle damage weak.mp3";
import battleJumpToBall from "../../audio/battle jump to ball.mp3";
import battleRecall from "../../audio/battle recall.mp3";
import battleThrow from "../../audio/battle throw.mp3";
import lappetTown from "../../audio/lappet town.mp3";
import newStart from "../../audio/NewStart.mp3";
import pkmnXpFull from "../../audio/pkmn exp full.mp3";
import pkmnXpGain from "../../audio/pkmn exp gain.mp3";
import pkmnCenter from "../../audio/poke center.mp3";
import title from "../../audio/title.mp3";

function SoundController(props) {

    const [soundObject, setSoundObject] = useState()
    const [name, setName] = useState()

    function determineTheAudio(requestedAudio) {
        let foundAudio = ''
        switch (requestedAudio) {
            case 'battle':
                foundAudio = battle
                break
            case 'win':
                foundAudio = battleWin
                break
            case 'flee':
                foundAudio = flee
                break
            case 'title':
                foundAudio = title
                break
            case 'pkmnCenter':
                foundAudio = pkmnCenter
                break
            case 'lappetTown':
                foundAudio = lappetTown
                break
            default:
                break
        }

        setName(requestedAudio)
        return foundAudio
    }

    function createSound() {
        let audio = determineTheAudio(props.soundData['audio'])
        console.log(audio)
        const sndObj = new Howl({
            src: audio,
            loop: props.soundData['loop']
        });
        setSoundObject(sndObj)
    }

    function play() {
        soundObject.play()
    }

    function stop() {
        soundObject.stop()
        props.stopSound()
    }

    useEffect(() => {
        createSound()
    }, [])

    return (
        <div>
            Audio: {name}
            <button onClick={play}>
                play
            </button>
            <button onClick={stop}>
                stop
            </button>
        </div>
    )
}

export default SoundController