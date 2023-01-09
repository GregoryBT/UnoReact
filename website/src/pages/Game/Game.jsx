import { useState } from 'react'
import './Game.scss'

function Game() {
    const [cards, setCards] = useState(
        [
            { color: "blue", value: "Skip", hexa: "#178ccd" },
            { color: "red", value: "8", hexa: "#cb1f45" },
            { color: "blue", value: "8", hexa: "#178ccd" },
            { color: "blue", value: "8", hexa: "#178ccd" },
            { color: "red", value: "8", hexa: "#cb1f45" },
            { color: "green", value: "2", hexa: "#e8ab28" },
            { color: "blue", value: "3", hexa: "#178ccd" },
            { color: "green", value: "4", hexa: "#168d53" }
        ]
    )

    function AfficherCarte() {
        return (cards.map((card) => (
            <div className='card' style={{ backgroundColor: card.hexa }}>
                <p>{card.value}</p>
            </div>
        )
        ))
    }
    return (
        <div className="GamePage">
            <div className='cards-bottom'>
                {AfficherCarte()}
            </div>
            <div className='cards-top'>
                {AfficherCarte()}
            </div>
        </div>
    )
}

export default Game