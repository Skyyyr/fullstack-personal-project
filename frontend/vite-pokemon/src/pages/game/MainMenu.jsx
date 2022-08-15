import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import SoundController from "../../components/SoundController";

function MainMenu() {
    const [hasStoredData, setHasStoredData] = useState(false)

    // const [testBool, setTestBool] = useState(false)

    const nav = useNavigate()

    function startNewGame() {
        nav('/game/new')
    }
    function loadGame() {
        nav('/game/play')
    }

    useEffect(() => {
        hasActiveTrainer()
    }, [])

    async function hasActiveTrainer() {
        const response = await axios.get('/trainer').catch(reason => {
            //Something bad happened!
            console.log("Reason", reason)
        })
        setHasStoredData(response['data']['trainer'] !== "None")
    }

    async function deleteActiveTrainer() {
        await axios.delete('/trainer').catch(reason => {
            //Something bad happened!
            console.log("Reason", reason)
        })
        // We call the func that checks if they have a trainer or not instead of just setting true/false
        // this should ensure that if there happens to be a bug with delete that it'll get caught
        hasActiveTrainer()
    }

    // function audioTest() {
    //     if (testBool) {
    //         setTestBool(false)
    //     } else {
    //         setTestBool(true)
    //     }
    // }

    return (
        <div>
            <h1>
                Main Menu
            </h1>
            <div className={'row'}>
                <div className={'col-12'}>
                    <button
                        onClick={startNewGame}
                        disabled={hasStoredData}
                    >
                        New Game
                    </button>
                </div>
                <div className={'col-12'}>
                    <button
                        onClick={loadGame}
                        disabled={!hasStoredData}
                    >
                        Load Game
                    </button>
                </div>
                <div className={'col-12'}>
                    <button
                        onClick={deleteActiveTrainer}
                        disabled={!hasStoredData}
                    >
                        Delete Game
                    </button>
                </div>
                {/*<button onClick={audioTest}>*/}
                {/*    audio*/}
                {/*</button>*/}
                {/*{*/}
                {/*    testBool ?*/}
                {/*        <SoundController soundData={{'audio': 'title', 'loop': false}} stopSound={audioTest}/>*/}
                {/*        :*/}
                {/*        "No Sound Obj"*/}
                {/*}*/}
            </div>
        </div>
    )
}

export default MainMenu