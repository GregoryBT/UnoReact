import React, { useContext, useEffect, useState, useReducer } from "react"
import { useNavigate } from 'react-router-dom';
import ApiVerifLogin from "../../api/User/VerifLogin"
import './Game.scss'
import DefaultProfil from '../../assets/profil.jpg'
import Card from '../../component/Card/Card'
import MyContext from '../../utils/context/socket.jsx';
import Loader from "../../component/Loader/Loader";
import ModalPlus4 from "../../component/ModalPlus4/ModalPlus4";
import ModalWin from "../../component/ModalWin/ModalWin";

function Game() {
    //#region ************************************************ Déclaration des variables
    // Connexion
    const [user, setUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    // Cards
    const [discardCards, setDiscardCards] = useState([])
    const [turn, setTurn] = useState({})
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
        socket.emit('getTurn');
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
    socket.on('players', _players => {
        playersDispatch({ type: "SET_Players", payload: _players })
    });
    socket.on('discardPile', _cards => {
        setDiscardCards(_cards)
    });
    socket.on('turn', _turn => {
        setTurn(_turn)
    });
    socket.on('win', _player => {
        // let id = _player[0].id
        console.log(_player[0].id)
        navigate('/win/' + _player[0].id);
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
        if (turn.player.name === user.username) {
            const lastCard = discardCards[discardCards.length - 1]
            if (card.value === '+4' || card.value === 'Joker') {
                setModalCard(card)
                setOpen(true)
            }
            else if (card.value === lastCard.value || card.color === lastCard.color || card.color === "black" || lastCard.option === card.color || lastCard.value === 'black') {
                socket.emit('add discardPile', players.filter(p => p.name === user.username), card);
                EndTurn(card)
            }
        }
    }

    function HandleCardPlus4(color) {
        handleModalClose()
        modalCard.option = color
        socket.emit('add discardPile', players.filter(p => p.name === user.username), modalCard);
        EndTurn(modalCard)
        setModalCard("")
    }
    // Se déclanche lorsque l'utilisateur clique sur la pioche
    function HandleClickDraw() {
        if (turn.player.name === user.username) {
            socket.emit('draw', players.filter(p => p.name === user.username));
            EndTurn({ id: null, color: null, value: null, hexa: null, rotate: null, mLeft: null, mTop: null })
            setModalCard("")
        }
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
        let _style = {}
        if (turn.player.name === player[0].name) {
            _style.boxShadow = '0px 0px 20px 10px #fbff00'
        }
        return (
            <div className='player1' style={_style}>
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
            let _style = {}
            if (turn.player.name === _player.name) {
                _style.boxShadow = '0px 0px 20px 10px #fbff00'
            }
            return (
                <div className={'player' + (i + 2)} style={_style}>
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
        console.log(card)
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