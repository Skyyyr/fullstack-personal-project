import {useEffect, useState, useImperativeHandle} from "react";
import {useRef} from "react";

function HealthBar({bgcolor, progress, height, update}) {
    
    const [percent, setPercent] = useState(100)
    const mounted = useRef(false);

    useImperativeHandle(ref, () => ({
        blur: () => {
            console.log("Blur func")
        },
    }))


    const barContainer = {
        height: height,
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        margin: 20
      }

    const progressPercent = {
        height: '100%',
        // width: `${progress}%`,
        width: `${percent}%`,
        backgroundColor: bgcolor,
        borderRadius:40,
        textAlign: 'center'
    }

    const progressText = {
        padding: 10,
        color: 'black',
        fontWeight: 900
    }
    
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, [])

    setInterval(() => {
        if (mounted.current) {
            setPercent(update())
        }
    }, 3000, [])

    return (
        <div style={barContainer}>
            <div style={progressPercent}>
                <span style={progressText} >{`${percent}%`}</span>
            </div>
        </div>
    )
}

export default HealthBar