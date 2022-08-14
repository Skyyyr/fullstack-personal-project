import PokemonAttack from "./PokemonAttack.jsx";

function PokemonAttacksMenu(props) {

    function usedAbility(damage, accuracy, attackName) {
        if (props.myTurn) {
            props.attack(damage, accuracy, attackName)
        } else {
            alert("it's not your turn!")
        }
    }

    // function createAttacks() {
    //     let htmlContent = []
    //     const difference = 4 - props.attack_list.length
    //     // dif = 4 - 2 = 2
    //     for (let i = 0; i < 4; i++) {
    //         const content = i > difference && difference !== 0 ?
    //             <div className={'col-6'}>
    //                 <PokemonAttack attackName={'n'} useAbility={usedAbility}/>
    //             </div>
    //             :
    //             <div className={'col-6'}>
    //                 <PokemonAttack attackName={props.attack_list[i]} useAbility={usedAbility}/>
    //             </div>
    //
    //         htmlContent.push(content)
    //     }
    //     return htmlContent
    // }

    function createAttacks() {
        let htmlContent = []
        for (let i = 0; i < props.attack_list.length; i++) {
            htmlContent.push(
                <div className={'col-6'}>
                    <PokemonAttack attackName={props.attack_list[i]} useAbility={usedAbility}/>
                </div>
            )
        }
        // const difference = 4 - props.attack_list.length
        // if (difference > 0) {
        //     for (let i = 0; i < difference; i++) {
        //         htmlContent.push(
        //         <div className={'col-6'}>
        //             <PokemonAttack attackName={'n'} useAbility={usedAbility}/>
        //         </div>
        //     )
        //     }
        // }
        return htmlContent
    }


    return (
        <div className={'row'}>
            {createAttacks()}
        </div>
    )
}

export default PokemonAttacksMenu