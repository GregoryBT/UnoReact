import { useState } from 'react'
import './Game.scss'

function Game() {
    const [cards, setCards] = useState(
        [
            { id: "1", color: "blue", value: "Skip", hexa: "#178ccd" },
            { id: "2", color: "red", value: "8", hexa: "#cb1f45" },
            { id: "3", color: "blue", value: "8", hexa: "#178ccd" },
            { id: "4", color: "blue", value: "8", hexa: "#178ccd" },
            { id: "5", color: "red", value: "8", hexa: "#cb1f45" },
            { id: "6", color: "green", value: "2", hexa: "#e8ab28" },
            { id: "7", color: "blue", value: "3", hexa: "#178ccd" },
            { id: "8", color: "blue", value: "3", hexa: "#178ccd" },
            { id: "9", color: "blue", value: "3", hexa: "#178ccd" },
            { id: "10", color: "blue", value: "3", hexa: "#178ccd" },
            { id: "11", color: "blue", value: "3", hexa: "#178ccd" },
            { id: "12", color: "blue", value: "3", hexa: "#178ccd" },
            { id: "13", color: "blue", value: "3", hexa: "#178ccd" },
            { id: "14", color: "blue", value: "3", hexa: "#178ccd" },
            { id: "6", color: "green", value: "2", hexa: "#e8ab28" },
            { id: "7", color: "blue", value: "3", hexa: "#178ccd" },
            { id: "8", color: "blue", value: "3", hexa: "#178ccd" },
            { id: "9", color: "blue", value: "3", hexa: "#178ccd" },
            { id: "10", color: "blue", value: "3", hexa: "#178ccd" },
            { id: "11", color: "blue", value: "3", hexa: "#178ccd" },
            { id: "12", color: "blue", value: "3", hexa: "#178ccd" },
        ]
    )

    function ShowCards() {
        return (cards.map((card) => (
            <div key={card.id} className='card' style={{ backgroundColor: card.hexa }}>
                <p>{card.value}</p>
            </div>
        )
        ))
    }

    function ShowEnnemiCards() {
        return (cards.map((card) => (
            <div key={card.id} className='cardennemi' style={{ backgroundColor: '#101010', color: '#FFFFFF' }}>
                <p>UNO</p>
            </div>
        )
        ))
    }

    function ShowDiscardCards() {
        return (cards.map((card) => (
            <div key={card.id} className='discardCard' style={{ backgroundColor: card.hexa, transform: 'rotate(' + Math.floor(Math.random() * 360) + 'deg)', marginLeft: (-25 - Math.floor(Math.random() * (45))) + 'px', marginTop: (-55 - Math.floor(Math.random() * (40))) + 'px' }}>
                <p>{card.value}</p>
            </div>
        )
        ))
    }


    return (
        <div className="GamePage">
            <div className='cards-bottom'>
                {ShowCards()}
            </div>
            <div className='player2'>
                <div className='player'>
                    <img className='avatar'></img>
                    <p className='username'>Gregory</p>
                </div>
                <div className='playercard'></div>
                {/* {ShowEnnemiCards()} */}
            </div>
            <div className='player3'>
                <div className='player'></div>
                <div className='playercard'></div>
                {/* {ShowEnnemiCards()} */}
            </div>
            <div className='player4'>
                <div className='player'></div>
                <div className='playercard'></div>
                {/* {ShowEnnemiCards()} */}
            </div>
            <div className='Discard'>
                {ShowDiscardCards()}
            </div>
            {/*  Pioche */}
            <div className='drawCard'>
                UNO
            </div>
            <div className='firstdrawCard drawCard'>
                UNO
            </div>
        </div>
    )
}

export default Game