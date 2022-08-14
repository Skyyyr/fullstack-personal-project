import axios from "axios";
import {useEffect, useState} from "react";

function PokemonAttack(props) {

    const [baseDamage, setBaseDamage] = useState(0)
    const [baseAccuracy, setBaseAccuracy] = useState(0)
    const [description, setDescription] = useState('')
    const [color, setColor] = useState('default-color')

    async function obtainAttackData(attackName) {
        if (attackName === 'n') {
            return
        }
        const attackData = await axios.post('/attack', {'requested_attack': attackName}).catch(reason => {
            //Something bad happened!
            console.log("Reason", reason)
        })

        const attObj = attackData.data['attackObj']
        setBaseDamage(attObj['base_damage'])
        setBaseAccuracy(attObj['base_accuracy'])
        setDescription(attObj['description'])
        setColor(attObj['color'])
    }

    useEffect(() => {
        obtainAttackData(props.attackName)
    }, [color])

    return (
        <div className={`row ${color}`}>
            <div className={'col-2'}>
                <button
                    onClick={() => props.useAbility(baseDamage, baseAccuracy, props.attackName)}
                    disabled={props.attackName === 'n'}
                >
                    <lead>
                        {props.attackName === 'n' ? 'Empty Attack' : props.attackName}
                    </lead>
                </button>
            </div>
            <div className={'col-10'}>
                <small>
                    {
                        props.attackName === 'n' ?
                            ''
                            :
                            description
                    }
                    {/*{description}*/}
                </small>
            </div>
        </div>
    )
}

export default PokemonAttack