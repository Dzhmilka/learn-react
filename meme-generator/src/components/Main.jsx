import Meme from "./Meme"
import { useState, useEffect } from "react"

export default function Main() {
    const [allMemes, setAllMemes] = useState([])
    const [meme, setMeme] = useState({
        imageUrl:"http://i.imgflip.com/1bij.jpg",
        topText:"One does not simply",
        bottomText:"Walk into Mordor" 
    })

    const handleChange = (event) => {
        const {value, name} = event.currentTarget
        
        setMeme(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(body => setAllMemes(body.data.memes))
    }, [])

    function getRandomMeme() {
        const allMemesLength = allMemes.length
        const randomId = Math.floor(Math.random() * allMemesLength)
        const randomMeme = allMemes[randomId]
        
        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: randomMeme.url
        }))
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <button onClick={getRandomMeme}>Get a new meme image 🖼</button>
            </div>
            <Meme 
                className="meme"
                imageUrl={meme.imageUrl}
                topText={meme.topText}
                bottomText={meme.bottomText}    
            />
        </main>
    )
}