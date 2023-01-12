import React, { useContext, useEffect, useState, useReducer } from "react"
import { useNavigate } from 'react-router-dom';
import ApiVerifLogin from "../../api/User/VerifLogin"
import './Game.scss'
import DefaultProfil from '../../assets/profil.jpg'
import Card from '../../component/Card/Card'
import MyContext from '../../utils/context/socket.jsx';
import Loader from "../../component/Loader/Loader";
import ModalPlus4 from "../../component/ModalPlus4/ModalPlus4";

function Game() {
    //#region ************************************************ Déclaration des variables
    // Connexion
    const [user, setUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    // Cards
    const [discardCards, setDiscardCards] = useState([])
    // Modal
    const [open, setOpen] = useState(false)
    const [modalCard, setModalCard] = useState("")
    const [color, setColor] = useState("")
    // Socket
    const [socket, setSocket] = useState(useContext(MyContext));
    //#endregion

    useEffect(() => {
        socket.emit('getPlayers');
        socket.emit('getDiscardPile');
    }, [])
    //#region ************************************************ Reducer
    const playersReducer = (state, action) => {
        switch (action.type) {
            case "SET_Players":
                return action.payload
            default:
                return state
        }
    }
    const [players, playersDispatch] = useReducer(playersReducer, [])
    //#endregion
    //#region ************************************************ Socket
    socket.on('players', players => {
        playersDispatch({ type: "SET_Players", payload: players })
    });
    socket.on('discardPile', cards => {
        console.log(cards.length)
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
    //#region 
    function handleModalClose() {
        setOpen(false)
    }
    //#endregion
    //#region ************************************************ Evenement
    // Se déclacneh lorque l'utilisateur clique sur la carte
    function HandleClickCard(card) {
        const lastCard = discardCards[discardCards.length - 1]
        if (card.value === '+4' || card.value === 'Joker') {
            setModalCard(card)
            setOpen(true)
        }
        else if (card.value === lastCard.value || card.color === lastCard.color || card.color === "black" || lastCard.option === card.color) {
            socket.emit('add discardPile', players.filter(p => p.name === user.username), card);
            // EndTurn(card)
        }
    }
    function HandleCardPlus4(color) {
        handleModalClose()
        console.log(color)
        modalCard.option = color
        socket.emit('add discardPile', players.filter(p => p.name === user.username), modalCard);
        // EndTurn(card)
    }
    // Se déclanche lorsque l'utilisateur clique sur la pioche
    function HandleClickDraw() {
        socket.emit('draw', players.filter(p => p.name === user.username));
    }
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
                style={{ backgroundColor: card.hexa, transform: 'rotate(' + (90 - card.rotate) + 'deg)', marginLeft: (-25 - card.mLeft) + 'px', marginTop: (-55 - card.mTop) + 'px' }}
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
        return (
            <div className='player1'>
                {player[0].cards.map((card) => (
                    <Card
                        key={card.id}
                        className='card'
                        style={{ backgroundColor: card.hexa }}
                        side={"Front"}
                        card={card}
                        onClick={() => HandleClickCard(card)}
                    />
                ))}
            </div>
        )
    }
    // Affiche le joueurs des autres
    function ShowOtherPlayer() {
        let otherplayer = players.filter(p => p.name !== user.username);
        return otherplayer.map((_player, i) => {
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

    function EndTurn(card) {
        socket.emit('end turn', players.filter(p => p.name === user.username), card);
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
                    <div className='firstdrawCard drawCard' onClick={() => HandleClickDraw()}>
                        UNO
                    </div>
                    {/*  Bouton UNO */}
                    {ShowBTNUno()}
                    <ModalPlus4
                        open={open}
                        handleColor={(_color) => HandleCardPlus4(_color)}
                        handleModalClose={() => handleModalClose()}
                    />
                </div>
            )
            }
        </React.Fragment>
    )
    //#endregion
}

export default Game