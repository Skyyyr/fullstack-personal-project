import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function PageNotFound() {
    const nav = useNavigate()

    const [background, setBackground] = useState([])

    function takeMeHome() {
        nav('/home')
    }

    async function generateBackground() {
        /**
         * Limited usage to 50 an hour so turning off
         */
        //Move un/pw to dotenv
        const possiblePic = ['forest', 'castle', 'beach', 'sunset', 'windows', 'computers', 'lions', 'tigers', 'bears']
        const search = Math.floor(Math.random()*(possiblePic.length))
        const selectedSearch = possiblePic[search]
        console.log(selectedSearch)
        try {
            const response = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${selectedSearch}&client_id=U8i2szxPo3QSfcLPjzUU4D_qj69j1lOxECQYaf0tH8c`, {
                auth: {
                    username: 'U8i2szxPo3QSfcLPjzUU4D_qj69j1lOxECQYaf0tH8c',
                    password: 'vk1rt_UHKiOKwxsd7cLSQVWsmEKbBsv4W0NwbIrAtAs'
                }
            })

            setBackground([<img src={response.data.results[0].urls.regular}/>])
            console.log(response.data.results[0])
        } catch (e) {
            console.log(`Error: ${e}`)
        }
    }



    useEffect(() => {
        generateBackground()
    }, [])

    return (
        <div className={'row lost'}>
            <h1>
                This is not the page you're looking for... However here's an image for you to look at.
            </h1>
            <button onClick={takeMeHome} className={'lost'}>
                Take me back
            </button>
            <div className={'col-12'}>
                {background}
            </div>
        </div>
    )
}

export default PageNotFound