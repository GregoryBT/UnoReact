import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import ApiVerifLogin from "../../api/User/VerifLogin"
import './Game.scss'
import DefaultProfil from '../../assets/profil.jpg'
import Card from '../../component/Card/Card'
import MyContext from '../../utils/context/socket.jsx';
import Loader from "../../component/Loader/Loader";

function Game() {
    //#region ************************************************ Déclaration des variables
    // Connexion
    const [user, setUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    // Nom
    const [players, setPlayers] = useState(
        [
            // {
            //     username: "Gregory",
            //     status: "Owner",
            //     cards: [
            //         { id: "1", color: "blue", value: "Skip", hexa: "#178ccd" },
            //         { id: "2", color: "red", value: "8", hexa: "#cb1f45" },
            //         { id: "3", color: "blue", value: "8", hexa: "#178ccd" },
            //         { id: "4", color: "Black", value: "Plus4", hexa: "#363636" },
            //         { id: "5", color: "red", value: "8", hexa: "#cb1f45" },
            //         { id: "6", color: "Black", value: "Plus4", hexa: "#363636" },
            //         { id: "7", color: "blue", value: "3", hexa: "#178ccd" },
            //         { id: "8", color: "yellow", value: "3", hexa: "#ffdd02" },
            //         { id: "9", color: "blue", value: "3", hexa: "#178ccd" },
            //         { id: "10", color: "yellow", value: "3", hexa: "#ffdd02" }
            //     ]
            // },
            // {
            //     username: "Lucas",
            //     status: "Guest",
            //     cards: [
            //         { id: "1", color: "yellow", value: "Reverse", hexa: "#ffdd02" },
            //         { id: "2", color: "yellow", value: "3", hexa: "#ffdd02" },
            //         { id: "3", color: "yellow", value: "4", hexa: "#ffdd02" },
            //         { id: "4", color: "blue", value: "8", hexa: "#178ccd" },
            //         { id: "5", color: "red", value: "8", hexa: "#cb1f45" },
            //         { id: "6", color: "Black", value: "Plus4", hexa: "#363636" },
            //         { id: "7", color: "blue", value: "3", hexa: "#178ccd" },
            //         { id: "8", color: "yellow", value: "3", hexa: "#ffdd02" },
            //         { id: "9", color: "blue", value: "3", hexa: "#178ccd" },
            //         { id: "10", color: "Black", value: "Plus4", hexa: "#363636" },
            //         { id: "11", color: "blue", value: "3", hexa: "#178ccd" },
            //         { id: "12", color: "yellow", value: "3", hexa: "#ffdd02" },
            //         { id: "13", color: "blue", value: "3", hexa: "#178ccd" },
            //         { id: "14", color: "Black", value: "Plus4", hexa: "#363636" },
            //         { id: "15", color: "blue", value: "3", hexa: "#178ccd" },
            //         { id: "16", color: "yellow", value: "3", hexa: "#ffdd02" },
            //         { id: "17", color: "blue", value: "3", hexa: "#178ccd" }
            //     ]
            // },
            // {
            //     username: "Ryad",
            //     status: "Guest",
            //     cards: [
            //         { id: "1", color: "red", value: "Reverse", hexa: "#cb1f45" },
            //         { id: "2", color: "red", value: "3", hexa: "#cb1f45" },
            //         { id: "3", color: "yellow", value: "4", hexa: "#ffdd02" },
            //         { id: "4", color: "blue", value: "Plus2", hexa: "#178ccd" },
            //         { id: "4", color: "blue", value: "Plus2", hexa: "#178ccd" },
            //         { id: "5", color: "red", value: "8", hexa: "#cb1f45" }
            //     ]
            // },
            // {
            //     username: "Jarod",
            //     status: "Guest",
            //     cards: [
            //         { id: "1", color: "yellow", value: "Reverse", hexa: "#ffdd02" },
            //         { id: "2", color: "Black", value: "Plus4", hexa: "#363636" }
            //     ]
            // }
        ]
    )
    const [discardCards, setDiscardCards] = useState(
        [
            // { id: "1", color: "blue", value: "Skip", hexa: "#178ccd" },
            // { id: "2", color: "red", value: "8", hexa: "#cb1f45" },
            // { id: "3", color: "yellow", value: "8", hexa: "#ffdd02" },
            // { id: "4", color: "blue", value: "8", hexa: "#178ccd" },
            // { id: "5", color: "red", value: "8", hexa: "#cb1f45" },
            // { id: "2", color: "Black", value: "Plus4", hexa: "#363636" },
            // { id: "7", color: "blue", value: "3", hexa: "#178ccd" },
            // { id: "8", color: "yellow", value: "3", hexa: "#ffdd02" },
            // { id: "9", color: "red", value: "3", hexa: "#178ccd" },
            // { id: "10", color: "blue", value: "3", hexa: "#178ccd" }
        ]
    )
    // Socket
    const [socket, setSocket] = useState(useContext(MyContext));
    //#endregion

    useEffect(() => {
        socket.emit('getPlayers');
    }, [])
    //#region ************************************************ Socket
    socket.on('players', players => {
        setPlayers(players)
    });
    socket.on('discardPile', cards => {
        setDiscardCards(cards)
    });
    //#endregion

    //#region ************************************************ Vérification de la connexion
    useEffect(() => {
        checkLogin()
    }, [])

    async function checkLogin() {
        const user = await ApiVerifLogin(localStorage.getItem("Token"))
        if (user === "Forbidden") {
            alert("Il faut d'abord se connecter")
            navigate('/login');
        }
        else {
            setUser(user)
            setIsLoaded(true)
        }
    }
    //#endregion

    //#region ************************************************ Evenement
    //#endregion

    //#region ************************************************ Fonction
    function ShowEnnemiCards(_cards) {
        if (_cards.length > 14) { }
        return (_cards.map((card, i) => {
            if (i < 9) {
                return (
                    <Card
                        key={card.id}
                        className='cardennemi'
                        side={"Back"}
                        card={card}
                    />
                )
            }
            else if (i === 9) {
                return (
                    <div key={card.id} className='cardennemi' style={{ backgroundColor: '#101010', color: '#FFFFFF' }}>
                        <p>+ {_cards.length - i}</p>
                    </div>
                )
            }
        }
        ))
    }

    function ShowDiscardCards() {
        return (discardCards.map((card) => (
            <Card
                key={card.id}
                className='discardCard'
                style={{ backgroundColor: card.hexa, transform: 'rotate(' + Math.floor(Math.random() * 360) + 'deg)', marginLeft: (-25 - Math.floor(Math.random() * (45))) + 'px', marginTop: (-55 - Math.floor(Math.random() * (40))) + 'px' }}
                side={"Front"}
                card={card}
            />
        )
        ))
    }

    function ShowBTNUno() {
        return (
            <button className='BTN_Uno'>UNO</button>
        )
    }

    // Affiche notre joueur
    function ShowPlayer() {
        let player = players.filter(p => p.name === user.username);
        console.log(player)
        console.log(players)
        console.log(user.username)
        return (
            <div className='player1'>
                {player[0].cards.map((card) => (
                    <Card
                        key={card.id}
                        className='card'
                        style={{ backgroundColor: card.hexa }}
                        side={"Front"}
                        card={card}
                    />
                ))}
            </div>
        )
    }
    // Affiche le joueurs des autres
    function ShowOtherPlayer() {
        let otherplayer = players.filter(p => p.name !== user.username);
        return otherplayer.map((_player, i) => {
            console.log(_player)
            return (
                <div className={'player' + (i + 2)}>
                    <div className='player'>
                        <div className='avatar'>
                            <img src={DefaultProfil}></img>
                        </div>
                        <p className='username'>{_player.name}</p>
                    </div>
                    <div className='playercard'>
                        {ShowEnnemiCards(_player.cards)}
                    </div>
                </div>
            )
        })


    }
    //#endregion

    //#region ************************************************ Return
    return (
        <React.Fragment>
            {!isLoaded ? (
                <Loader />
            ) : (

                <div className="GamePage">
                    {ShowPlayer()}
                    {ShowOtherPlayer()}
                    {/*  Pile */}
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
                    {/*  Bouton UNO */}
                    {ShowBTNUno()}

                </div>
            )
            }
        </React.Fragment>
    )
    //#endregion
}

export default Game