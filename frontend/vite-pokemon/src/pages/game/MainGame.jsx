import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import pokeball from '../../../img/POKEBALL.png'
import {useRef} from "react";

function MainGame(props) {
    const nav = useNavigate()

    const mounted = useRef(false);

    const [activePokemon, setActivePokemon] = useState([])

    function wildEncounter(props) {
        nav('/game/play/encounter')
    }

    async function displayActivePokemon() {
        const response = await axios.get('/trainer').catch(reason => {
            //Something bad happened!
            console.log("Reason", reason)
        })
        const trainerData = JSON.parse(response.data['trainer'])
        const slot = trainerData[0]['fields']

        let htmlContent = []

        for (let i = 1; i < 7; i++) {
            const slot_data = slot[`pokemon_slot_${i}`]
            if (slot_data === 0) {
                break
            }
            const response_poke = await axios.post('/pokemon', {'poke': slot_data, 'trainer': trainerData[0]['pk']}).catch(reason => {
                // Something bad happened!
                console.log("Reason", reason)
            })

            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${response_poke.data['poke']['pokedex_number']}/`)
            htmlContent.push(<img src={response.data.sprites.front_default} onClick={() => testSwap(response_poke.data['poke']['id'], i)}/>)
        }

        setActivePokemon(htmlContent)
    }

    async function testSwap(id, slotidx) {
        //TODO Use or not variable assignment
        await axios.post('/trainer', {isSwap: true, slot_one_to: id, slot_id: slotidx}).catch(reason => {
            //Something bad happened!
            console.log("Reason", reason)
        })
        displayActivePokemon()
    }

    function displayPokeBalls() {
        let htmlContent = []
        for (let i = 0; i < 6; i++) {
            htmlContent.push(
                <div className={'col-1'}>
                    <img src={pokeball} />
                </div>
            )
        }
        return htmlContent
    }



    useEffect(() => {
        if (props.user === undefined) {
            nav('/login')
            return () => {
                mounted.current = false
            }
        }
        displayActivePokemon()
        mounted.current = true
    }, [])

    useEffect(() => {
    }, [activePokemon])

    return (
        <div className={'row'}>
            <div className={'col-12'}>
                <button onClick={wildEncounter} >
                    Find Pokemon
                </button>
            </div>
            <div>
                <h1>
                    Active Pokemon
                </h1>
                <div className={'col-12'}>
                    {
                        activePokemon.length === 0 ?
                            <div className={'row'}>
                                {displayPokeBalls()}
                            </div>
                            :
                            activePokemon
                    }
                </div>
            </div>
        </div>
    )
}

export default MainGame