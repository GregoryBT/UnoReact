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
    const [gameOwner, setGameOwner] = useState([{ name: "GToccanier", role: "Owner" }])
    const [allPlayers, setAllPlayers] = useState([{ name: "GToccanier2", role: "Player" }, { name: "GToccanier2", role: "Player" }, { name: "GToccanier2", role: "Player" }, { name: "GToccanier2", role: "Player" },])
    // Socket
    const [socket, setSocket] = useState(useContext(MyContext));
    //#endregion

    //#region ************************************************ useEffect
    useEffect(() => {
        CreateGame();
        JoinGame();
    }, [])
    // #endregion

    //#region ************************************************ Socket
    socket.on('players', players => {
        setAllPlayers(players)
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
        navigate('/game');
    }
    //#endregion

    //#region ************************************************ Fonction
    // Création d'un partie de uno
    function CreateGame() {

    }
    // Rejoindre la game
    function JoinGame() {

        socket.emit('add player', "Test");
    }
    // Affichage des joueurs
    function AfficherPlayers(_players) {
        return (_players.map((_player) => (
            <p className='Player'>{_player.name}</p>
        )))
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
                            {AfficherPlayers(allPlayers)}
                        </div>
                        <button onClick={() => StartGame()}>Commencer la partie</button>
                    </div>
                </div>
            )
            }
        </React.Fragment>
    )
    //#endregion
}

export default Lobby