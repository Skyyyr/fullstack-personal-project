import {useNavigate} from "react-router-dom";
import axios from "axios";
import easyGrass from "../../fixtures/testWildArea.json";
import {useEffect, useRef, useState} from "react";
import PokemonAttacksMenu from "../../components/PokemonAttacksMenu.jsx";
import intro from "../../../audio/battle wild.mp3";
import win from "../../../audio/battle victory wild.mp3";
import flee from "../../../audio/battle flee.mp3";
import {Howl} from "howler";

//Stat generation
const STAT_INNER_ROLLS = 6
const STAT_OUTER_ROLLS = 3
const ROLL_LEVEL_MULTIPLIER = 10

//Attack roll types
const MISS = 0
const HIT = 1
const CRITICAL_FAILURE = 2
const CRITICAL_SUCCESS = 3

//Wild Attack Slots
const WILD_ATT_1 = 0
const WILD_ATT_2 = 1
const WILD_ATT_3 = 2
const WILD_ATT_4 = 3


const battle = new Howl({
    src: intro,
    loop: true
});
const winner = new Howl({
    src: win,
    loop: false
});
const fle = new Howl({
    src: flee,
    loop: false
});

function WildEncounter() {

    const nav = useNavigate()

    function playFlee() {
        battle.stop()
        fle.play()
    }

    function playIntro() {
        battle.play()
    }

    function stopIntro() {
        battle.stop()
    }

    function playWinner() {
        battle.stop()
        winner.play()
    }

    function stopWinner() {
        winner.stop()
    }

    function mainGame() {
        nav('/game/play')
    }

    function mainGameFlee() {
        playFlee()
        nav('/game/play')
    }


    const [isLoaded, setIsLoad] = useState(false)
    const [otherPokemon, setOtherPokemon] = useState()

    //Wild Pokemon Details
    const [wildPokemon, setWildPokemon] = useState([])
    const [wildHealth, setWildHealth] = useState(0)
    const [wildMaxHealth, setWildMaxHealth] = useState(0)
    const [wildSpeed, setWildSpeed] = useState(0)
    const [wildAccuracy, setWildAccuracy] = useState(0)
    const [wildDefense, setWildDefense] = useState(0)
    const [wildOffense, setWildOffense] = useState(0)
    const [wildAttacks, setWildAttacks] = useState(['Tackle'])
    const [wildHealthBar, setWildHealthBar] = useState(100)

    //Player Pokemon Details
    const [playerPokemon, setPlayerPokemon] = useState([])
    const [playerHealth, setPlayerHealth] = useState(0)
    const [playerMaxHealth, setPlayerMaxHealth] = useState(0)
    const [playerSpeed, setPlayerSpeed] = useState(0)
    const [playerAccuracy, setPlayerAccuracy] = useState(0)
    const [playerDefense, setPlayerDefense] = useState(0)
    const [playerOffense, setPlayerOffense] = useState(0)
    const [playerAttacks, setPlayerAttacks] = useState([])
    const [playerHealthBar, setPlayerHealthBar] = useState(100)
    const [playerSlot, setPlayerSlot] = useState(1)

    const [myTurn, setMyTurn] = useState(false)
    const mounted = useRef(false);

    //Attack Message State
    const [attackMessage, setAttackMessage] = useState('')

    function randomNumberGenerator(min, max, amntOfRolls, logRolls = false) {
        let addedRolls = 0
        for (let i = 0; i < amntOfRolls; i++) {
            const rand = Math.floor(Math.random()*(max - min + 1) + min)
            addedRolls += rand
            if (logRolls) {
                console.log(`Rolled ${rand}, addedRolls: ${addedRolls}`)
            }
        }
        const average = Math.floor(addedRolls / amntOfRolls)
        if (logRolls) {
            console.log(`Average roll value: ${average}`)
        }

        return average
    }

    function statGenerator(pokeLevel) {
        let rolls = 0
        for (let i = 0; i < STAT_OUTER_ROLLS; i++) {
            const roll = randomNumberGenerator(pokeLevel, (pokeLevel * ROLL_LEVEL_MULTIPLIER), STAT_INNER_ROLLS)
            rolls += roll
        }

        return Math.floor(rolls / STAT_INNER_ROLLS)
    }

    function hitOrMiss(baseAccuracy) {
        const to_hit_roll = randomNumberGenerator(1, 20, 2)
        if (to_hit_roll === 1) {
            return CRITICAL_FAILURE
        } else if (to_hit_roll === 20) {
            return CRITICAL_SUCCESS
        }

        const myAcc = myTurn ? playerAccuracy : wildAccuracy
        const myDef = myTurn ? wildDefense : playerDefense

        const totalAcc = to_hit_roll + baseAccuracy + randomNumberGenerator(1, myAcc, 5)

        const totalDef = randomNumberGenerator(1, myDef, 5) + myDef

        if (totalAcc >= totalDef) {
            return HIT
        }
        return MISS
    }

    async function setupWildAttacks(attackList) {
        console.log("SETUPWILDATTACKS", attackList)
        let attack_list = []
        //Since every pokemon will have at least 1 attack we don't need to check for 1 - just the others
        if (attackList.length > 3) {
            //Attack 4
            try {
                const attackData = await axios.post('/attack', {'requested_attack': attackList[WILD_ATT_4]['attackName']}).catch(reason => {
                     //Something bad happened!
                    console.log("Reason", reason)
                })
                attack_list.push(attackData)
            } catch (e) {
                console.log (`Couldn't fullfil attackData on ${attackList[WILD_ATT_4]}`)
            }
        }
        if (attackList.length > 2) {
            //Attack 3
            try {
                const attackData = await axios.post('/attack', {'requested_attack': attackList[WILD_ATT_3]['attackName']}).catch(reason => {
                     //Something bad happened!
                    console.log("Reason", reason)
                })
                attack_list.push(attackData)
            } catch (e) {
                console.log (`Couldn't fullfil attackData on ${attackList[WILD_ATT_3]}`)
            }
        }
        if (attackList.length > 1) {
            //Attack 2
            try {
                const attackData = await axios.post('/attack', {'requested_attack': attackList[WILD_ATT_2]['attackName']}).catch(reason => {
                     //Something bad happened!
                    console.log("Reason", reason)
                })
                attack_list.push(attackData)
            } catch (e) {
                console.log (`Couldn't fullfil attackData on ${attackList[WILD_ATT_2]}`)
            }
        }
        //Attack 1
        try {
            const attackData = await axios.post('/attack', {'requested_attack': attackList[WILD_ATT_1]['attackName']}).catch(reason => {
                 //Something bad happened!
                console.log("Reason", reason)
            })
            attack_list.push(attackData)
        } catch (e) {
            console.log (`Couldn't fullfil attackData on ${attackList[WILD_ATT_1]}`)
        }

        console.log("Attack list: ", attack_list)

        return attack_list
    }

    async function setupBattlerData(isWild = true, pData = {}) {
        if (isWild) {
            const level = pData['level']
            //We make health different because we want to store the initial health value as the max
            //for this randomly generated pokemon
            const healthRoll = statGenerator(level)
            setWildHealth(healthRoll)
            setWildMaxHealth(healthRoll)

            setWildSpeed(statGenerator(level))
            setWildAccuracy(statGenerator(level))
            setWildDefense(statGenerator(level))
            setWildOffense(statGenerator(level))

            let result = []
            try {
                const listOfAttacks = await setupWildAttacks(pData['attack_list'])
                console.log("t", listOfAttacks)
                result = listOfAttacks
            } catch (e) {
                console.log("error", e)
            }

            if (result.length > 0) {
                setWildAttacks(result)
            }

            setIsLoad(true)

        } else {
            setPlayerHealth(pData['current_health'])
            setPlayerMaxHealth(pData['health'])
            setPlayerSpeed(pData['speed'])
            setPlayerAccuracy(pData['accuracy'])
            setPlayerDefense(pData['defence'])
            setPlayerOffense(pData['offence'])
        }
    }

    async function generatePokemon(pData, isWild= true) {
        const specificId = pData['pokedex_number']
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${specificId}/`)
            let htmlContent = []
            if (isWild) {
                htmlContent.push(<img src={response.data.sprites.front_default}/>)
                htmlContent.push(response.data['name'])
                htmlContent.push(specificId)
                htmlContent.push(pData['level'])
                setWildPokemon(htmlContent)
            } else {
                htmlContent.push(<img src={response.data.sprites.back_default}/>)
                htmlContent.push(pData['name'])
                htmlContent.push(specificId)
                htmlContent.push(pData['level'])
                setPlayerPokemon(htmlContent)
            }

            await setupBattlerData(isWild, pData)

        } catch (e) {
            console.log(`Error: ${e}`)
        }
    }

    function randomPoke() {
        //TODO If we are going to have multiple wild zones we'd handle it around here somewhere
        const rand = Math.floor(Math.random() * easyGrass[0].length);
        generatePokemon(easyGrass[0][rand])
    }

    async function myPoke(isSwap = false, slotId = 1) {
        const response = await axios.get('/trainer').catch(reason => {
            //Something bad happened!
            console.log("Reason", reason)
        })

        const trainerData = JSON.parse(response.data['trainer'])
        const slot = trainerData[0]['fields']
        let slotter = 'pokemon_slot_1'
        if (isSwap) {
            setPlayerSlot(slotId)
            switch (slotId) {
                case 2:
                    slotter = 'pokemon_slot_2'
                    break
                case 3:
                    slotter = 'pokemon_slot_3'
                    break
                case 4:
                    slotter = 'pokemon_slot_4'
                    break
                case 5:
                    slotter = 'pokemon_slot_5'
                    break
                case 6:
                    slotter = 'pokemon_slot_6'
                    break
                default:
                    slotter = 'pokemon_slot_1'
                    break
            }
        }
        const response_poke = await axios.post('/pokemon', {
            // 'poke': slot['pokemon_slot_1'],
            'poke': slot[slotter],
            'trainer': trainerData[0]['pk']
        }).catch(reason => {
            // Something bad happened!
            console.log("Reason", reason)
        })

        let attackList = []
        attackList.push(response_poke.data['poke']['attack_slot_1'])
        attackList.push(response_poke.data['poke']['attack_slot_2'])
        attackList.push(response_poke.data['poke']['attack_slot_3'])
        attackList.push(response_poke.data['poke']['attack_slot_4'])
        setPlayerAttacks(attackList)

        await generatePokemon(response_poke.data['poke'], false)
    }

    async function catchPoke() {
        const response_poke = await axios.post('/pokemon', {
            'poke': 'catch',
            'details': {
                    'name': wildPokemon[1],
                    'pokedex_number': wildPokemon[2],
                    'level': wildPokemon[3],
                    'max_health': wildMaxHealth,
                    'health': wildHealth,
                    'speed': wildSpeed,
                    'accuracy': wildAccuracy,
                    'defence': wildDefense,
                    'offence': wildOffense,
                    'attack_list': wildAttacks
                }
        }).catch(reason => {
            // Something bad happened!
            console.log("Reason", reason)
        })

        //TODO Need to end battle here if caught
        //TODO Need to add the catch mini game - if failure then lose turn

        console.log("Resp from catch", response_poke)
    }


    
    function npcAttack() {
        //TODO random roll or 'ai' for which attack to use out of the available
        const attackName = wildAttacks[WILD_ATT_1].data['attackObj']['name']
        const baseDamage = wildAttacks[WILD_ATT_1].data['attackObj']['base_damage']
        const baseAccuracy = wildAttacks[WILD_ATT_1].data['attackObj']['base_accuracy']

        console.log("NPC ATTACK - ", attackName, baseDamage, baseAccuracy)

        let message = ''
        const hitResult = hitOrMiss(baseAccuracy)
        let damage = randomNumberGenerator(Math.floor(baseDamage / 2), baseDamage, 2)

        switch (hitResult) {
            case MISS:
                message = `${wildPokemon[1]} attempts to attack ${playerPokemon[1]} with ${attackName} and missed!`
                break
            case HIT:
                message = `${wildPokemon[1]} attacks ${playerPokemon[1]} with ${attackName} causing ${damage}`
                break
            case CRITICAL_FAILURE:
                message = `${wildPokemon[1]} has stumbled wit their attack and completely missed!`
                break
            case CRITICAL_SUCCESS:
                damage *= 2
                message = `${wildPokemon[1]} has critically hit ${playerPokemon[1]} with ${attackName} causing ${damage}`
                break
        }

        // We check if they've fainted or not
        if ((playerHealth - damage) <= 0) {
            message = `${wildPokemon[1]} has made ${playerPokemon[1]} faint from taking too much damage!`
            updateAttackMessage(message)
            stopIntro()
            setTimeout(function(){
                mainGame()

            }, 2000)

        } else if (hitResult === CRITICAL_SUCCESS || hitResult === HIT) {
            setPlayerHealth(playerHealth - damage)
            setPlayerHealthBar(Math.floor(((playerHealth - damage) / playerMaxHealth) * 100))
            updateAttackMessage(message)
            setMyTurn(true)
        } else {
            updateAttackMessage(message)
            setMyTurn(true)
        }

    }
    
    function attack(baseDamage, accuracy, attackName) {
        let message = ''
        const hitResult = hitOrMiss(accuracy)
        let damage = randomNumberGenerator(Math.floor(baseDamage / 2), baseDamage, 2)

        switch (hitResult) {
            case MISS:
                message = `${playerPokemon[1]} attempts to attack ${wildPokemon[1]} with ${attackName} and missed!`
                break
            case HIT:
                message = `${playerPokemon[1]} attacks ${wildPokemon[1]} with ${attackName} causing ${damage}`
                break
            case CRITICAL_FAILURE:
                message = `${playerPokemon[1]} has stumbled wit their attack and completely missed!`
                break
            case CRITICAL_SUCCESS:
                damage *= 2
                message = `${playerPokemon[1]} has critically hit ${wildPokemon[1]} with ${attackName} causing ${damage}`
                break
        }

        // We check if they've fainted or not
        if ((wildHealth - damage) <= 0) {
            message = `${playerPokemon[1]} has made ${wildPokemon[1]} faint from taking too much damage!`
            updateAttackMessage(message)
            //TODO end battle here and stop func from continuing
            playWinner()
            setTimeout(function(){
                mainGame()
                stopWinner()

            }, 2000)

        } else if (hitResult === CRITICAL_SUCCESS || hitResult === HIT) {
            setWildHealth(wildHealth - damage)
            setWildHealthBar(Math.floor(((wildHealth - damage) / wildMaxHealth) * 100))
            updateAttackMessage(message)
            setMyTurn(false)
        }
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
            if (slot_data === 0 || slot_data === playerSlot) {
                break
            }
            const response_poke = await axios.post('/pokemon', {'poke': slot_data, 'trainer': trainerData[0]['pk']}).catch(reason => {
                // Something bad happened!
                console.log("Reason", reason)
            })

            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${response_poke.data['poke']['pokedex_number']}/`)
            htmlContent.push(<img src={response.data.sprites.front_default} onClick={() => myPoke(true, i)}/>)
        }

        setOtherPokemon(htmlContent)
    }

    function updateAttackMessage(msg) {
        setAttackMessage(msg)
    }

    function whoseTurnIsItAnyway() {
        setMyTurn(playerSpeed >= wildSpeed)
    }

    useEffect(() => {
        randomPoke()
        myPoke()
        playIntro()
        displayActivePokemon()
        mounted.current = true;

        return () => {
            mounted.current = false;
        };
    }, [])


    useEffect(() => {
        whoseTurnIsItAnyway()
    }, [playerSpeed])

    useEffect(() => {
        if (isLoaded && !myTurn) {
            setTimeout(function() {
                npcAttack()

            }, 2000)
        }
    }, [myTurn])

    const barContainer = {
        height: 10,
        width: 100,
        backgroundColor: 'whitesmoke',
        borderRadius: 20,
        margin: 10
    }

    const progressPercent = {
        height: '100%',
        // width: `${progress}%`,
        width: `${wildHealthBar}%`,
        backgroundColor: 'red',
        borderRadius:40,
        textAlign: 'center'
    }
    const progressPercentPlayer = {
        height: '100%',
        // width: `${progress}%`,
        width: `${playerHealthBar}%`,
        backgroundColor: 'red',
        borderRadius:40,
        textAlign: 'center'
    }

    const progressText = {
        padding: 10,
        color: 'black',
        fontWeight: 900
    }

    return (
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col-4 d-flex justify-content-start'}>
                    {wildPokemon[1]}
                </div>
                <div className={'col-4 d-flex justify-content-end'}>
                    <div style={barContainer}>
                        <div style={progressPercent}>
                            <span style={progressText} >{`${wildHealthBar}%`}</span>
                        </div>
                    </div>
                    {wildPokemon[0]}
                </div>
                <div className={'col-4 d-flex justify-content-evenly stats-enemy'}>
                    <small>
                        {wildPokemon[1]}'s Stats:
                    </small>
                    <p>
                        Speed: {wildSpeed}
                    </p>
                    <p>
                        Accuracy: {wildAccuracy}
                    </p>
                    <p>
                        Defence: {wildDefense}
                    </p>
                    <p>
                        Offence: {wildOffense}
                    </p>
                    <p>
                        Health: {wildHealth}
                    </p>
                </div>
                <div className={'col-12'}>
                    <p className={'text-center'}>
                        {attackMessage}
                    </p>
                </div>
                <div className={'col-4 d-flex'}>
                    {playerPokemon[1]}
                </div>
                <div className={'col-4 d-flex'}>
                    {playerPokemon[0]}
                    <div style={barContainer}>
                        <div style={progressPercentPlayer}>
                            <span style={progressText} >{`${playerHealthBar}%`}</span>
                        </div>
                    </div>
                </div>
                <div className={'col-4 d-flex justify-content-evenly stats-player'}>
                    <small>
                        {playerPokemon[1]}'s Stats:
                    </small>
                    <p>
                        Speed: {playerSpeed}
                    </p>
                    <p>
                        Accuracy: {playerAccuracy}
                    </p>
                    <p>
                        Defence: {playerDefense}
                    </p>
                    <p>
                        Offence: {playerOffense}
                    </p>
                    <p>
                        Health: {playerHealth}
                    </p>
                </div>
            </div>
            {
                myTurn ?
                    <p>
                        my turn
                    </p>
                    :
                    <p>
                        enemy turn
                    </p>
            }
            {
                isLoaded ?
                    <p>
                        LOADED
                    </p>
                    :
                    <p>
                        NOT LOADED
                    </p>
            }
            <h3>
                What will you do?
            </h3>
            <PokemonAttacksMenu attack={attack} attack_list={playerAttacks} myTurn={myTurn}/>
            <hr/>
            <div className={'row'}>
                <div className={'col-6'}>
                    <button onClick={mainGameFlee}>
                        Run
                    </button>
                </div>
                <div className={'col-6'}>
                    <button onClick={catchPoke}>
                        Catch
                    </button>
                </div>
                <div className={'col-6'}>
                    <button onClick={stopIntro}>
                        Mute Music
                    </button>
                </div>
            </div>
            <hr/>
            {otherPokemon}
            {/*{*/}
            {/*    isLoaded ?*/}
            {/*        <div>*/}
            {/*            <div className={'battler-container stats-enemy'}>*/}
            {/*                <Battler isWild={true} pokemon_data={*/}
            {/*                    [*/}
            {/*                        wildPokemon,*/}
            {/*                        wildHealth,*/}
            {/*                        wildSpeed,*/}
            {/*                        wildOffense,*/}
            {/*                        wildDefense,*/}
            {/*                        wildAccuracy,*/}
            {/*                        wildAttacks*/}
            {/*                    ]*/}
            {/*                }*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <div className={'battler-container stats-enemy'}>*/}
            {/*                <Battler isWild={false} pokemon_data={*/}
            {/*                    [*/}
            {/*                        playerPokemon,*/}
            {/*                        playerHealth,*/}
            {/*                        playerSpeed,*/}
            {/*                        playerOffense,*/}
            {/*                        playerDefense,*/}
            {/*                        playerAccuracy,*/}
            {/*                        playerAttacks*/}
            {/*                    ]*/}
            {/*                }*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        :*/}
            {/*        "Not available...."*/}
            {/*}*/}
        </div>
    )
}

export default WildEncounter