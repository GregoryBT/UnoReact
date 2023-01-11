import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import ApiVerifLogin from "../../api/User/VerifLogin"
import Loader from "../../component/Loader/Loader";
import MyContext from '../../utils/context/socket.jsx';
import './Lobby.scss'

function Lobby() {
    //#region ************************************************ Déclaration des variables
    // Connexion
    const [user, setUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    // Nom
    const [name, setName] = useState("")
    const [players, setPlayers] = useState([])
    // Socket
    const [socket, setSocket] = useState(useContext(MyContext));
    //#endregion

    //#region ************************************************ useEffect
    useEffect(() => {
        if (user !== null) {
            JoinGame(user.username);
        }
    }, [user])
    // #endregion

    //#region ************************************************ Socket
    socket.on('players', players => {
        setPlayers(players)
    });
    socket.on('startGame', () => {
        navigate('/game');
    });
    //#endregion

    //#region ************************************************ Vérification de la connexion
    useEffect(() => {
        checkLogin()
    }, [])

    async function checkLogin() {
        const user = await ApiVerifLogin(localStorage.getItem("Token"))
        console.log(user)
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
    // Se déclanche lorsque l'on clique sur le bouton "Commencer la partie"
    const StartGame = () => {
        if (players.length >= 2) {
            socket.emit('shuffle deck');
            socket.emit('distribute card', players, 7);
            socket.emit('start game');
        }
        else {
            alert("Il faut au moins 2 joueurs pour commencer la partie")
        }
    }
    //#endregion

    //#region ************************************************ Fonction
    // Rejoindre la game
    function JoinGame(_username) {
        socket.emit('add player', _username);
    }
    // Affichage des joueurs
    function ShowPlayers(_players) {
        return (_players.map((_player, i) => {
            // On affiche une étoile pour le chef de la partie
            if (i === 0) {
                return (
                    <p className='Player'>{_player.name} ⭐</p>
                )
            }
            else {
                return (
                    <p className='Player'>{_player.name}</p>
                )
            }
        }))
    }
    // Affichage du bouton
    function ShowBTNStartGame() {
        // On vérifie qu'il y a bien des joueurs dans la partie
        if (players.length > 0) {
            // On affiche le bouton seulement au premier qui a créer la partie
            if (user.username === players[0].name) { return <button onClick={() => StartGame()}>Commencer la partie</button> }
        }
    }
    //#endregion

    //#region ************************************************ Return
    return (
        <React.Fragment>
            {!isLoaded ? (
                <Loader />
            ) : (

                <div className="LobbyPage">
                    <div className="content">
                        <h1>Joueurs Connectés</h1>
                        <div className='Players'>
                            {ShowPlayers(players)}
                        </div>
                        {ShowBTNStartGame()}

                    </div>
                </div>
            )
            }
        </React.Fragment>
    )
    //#endregion
}

export default Lobby