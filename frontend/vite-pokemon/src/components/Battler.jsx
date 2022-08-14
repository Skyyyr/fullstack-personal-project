import HealthBar from "./HealthBar.jsx";
import {useEffect, useState} from "react";

function Battler(props) {
    const pokemonStats = {
        'img': props.pokemon_data[0][0],
        'name': props.pokemon_data[0][1],
        'pokedex_number': props.pokemon_data[0][2],
        'level': props.pokemon_data[0][3],
        'health': props.pokemon_data[1],
        'speed': props.pokemon_data[2],
        'offence': props.pokemon_data[3],
        'defence': props.pokemon_data[4],
        'accuracy': props.pokemon_data[5],
        'attacks': props.pokemon_data[6],
    }

    const [currentHealth, setCurrentHealth] = useState(pokemonStats['health'])


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

    function takeDamage(damage = 1) {
        console.log("Taken damage")
        // const curHealth = currentHealth
        // setCurrentHealth(curHealth - damage)
        //TODO Needs to return % value without the %
        return randomNumberGenerator(0, 100, 1)
    }

    useEffect(() => {
        console.log("currentHealth", currentHealth, pokemonStats['health'], props.pokemon_data[1])
    }, [currentHealth])



    return (
        <div className={'row'}>
            <div className={'col-4'}>
                <div className={'row'}>
                    <div className={'col text-center'}>
                        <h3>
                            {pokemonStats['name']}
                        </h3>
                    </div>
                    <div className={'col align-content-start'}>
                        <HealthBar bgcolor={"red"} progress={'100'}  height={10} update={takeDamage}/>
                    </div>
                    <div className={'col justify-content-center'}>
                        {pokemonStats['img']}
                    </div>
                </div>
            </div>
            <div className={'col-6'}>
                Stats:
                <div className={'row text-center'}>
                    {/*Level*/}
                    <div className={'col-3'}>
                        Level:
                    </div>
                    <div className={'col-8'}>
                        {pokemonStats['level']}
                    </div>

                    {/*Health*/}
                    <div className={'col-3'}>
                        Health:
                    </div>
                    <div className={'col-8'}>
                        {pokemonStats['health']}
                    </div>

                    {/*Speed*/}
                    <div className={'col-3'}>
                        Speed:
                    </div>
                    <div className={'col-8'}>
                        {pokemonStats['speed']}
                    </div>

                    {/*Accuracy*/}
                    <div className={'col-3'}>
                        Accuracy:
                    </div>
                    <div className={'col-8'}>
                        {pokemonStats['accuracy']}
                    </div>

                    {/*Defence*/}
                    <div className={'col-3'}>
                        Defence:
                    </div>
                    <div className={'col-8'}>
                        {pokemonStats['defence']}
                    </div>

                    {/*Offence*/}
                    <div className={'col-3'}>
                        Offence:
                    </div>
                    <div className={'col-8'}>
                        {pokemonStats['offence']}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Battler