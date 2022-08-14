import React, {useImperativeHandle, useState} from "react";

function Buddy(props, ref) {

    const myRef = useRef()
    useImperativeHandle(myRef, () => {
        return {
            updateHealthStat: setHealth(health + 1)
        }
    })

    const [budId, setBudId] = useState(props.buddy)
    const [budName, setBudName] = useState(props.buddy === 1 ? "buddy" : "bud")
    const [health, setHealth] = useState(props.health)

    //this could be an attack
    function makeCall() {
        console.log(`I'm buddy ${budId}, and I'm picking up the phone...`)
        const reply = props.call(budId, 1)
        console.log(`Bud:${budId}, reply: ${reply}`)
        setHealth(reply)
    }

    function updateHealth() {
        setHealth(props.healthCheck(budId))
    }

    return (
        <div ref={ref} id={budName} onClick={updateHealth}>
            {budName}:{health}
        </div>
    )
}

export default React.forwardRef(Buddy)