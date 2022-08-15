import PokemonAttack from "./PokemonAttack.jsx";

function PokemonAttacksMenu(props) {

    function usedAbility(damage, accuracy, attackName) {
        if (props.myTurn) {
            props.attack(damage, accuracy, attackName)
        } else {
            alert("it's not your turn!")
        }
    }

    function createAttacks() {
        let htmlContent = []
        for (let i = 0; i < props.attack_list.length; i++) {
            htmlContent.push(
                <div className={'col-6'}>
                    <PokemonAttack attackName={props.attack_list[i]} useAbility={usedAbility}/>
                </div>
            )
        }
        return htmlContent
    }

    return (
        <div className={'row'}>
            {createAttacks()}
        </div>
    )
}

export default PokemonAttacksMenu