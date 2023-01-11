import { useState } from 'react'
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
    //#endregion

    //#region ************************************************ Vérification de la connexion
    useEffect(() => {
        checkLogin()
    }, [])

    async function checkLogin() {
        const user = await ApiVerifLogin(localStorage.getItem("Token"))
        console.log(user)
        if (user === "Forbidden") {
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
    function AfficherPlayers(_players) {
        return (_players.map((_player) => (
            <p className='Player'>{_player.name}</p>
        )))
    }
    //#endregion

    //#region ************************************************ Return
    return (
        <div className="LobbyPage">
            <div className="content">
                <h1>Joueurs Connectés</h1>
                <div className='Players'>
                    {AfficherPlayers(allPlayers)}
                </div>
                <button>Commencer la partie</button>
            </div>
        </div>
    )
    //#endregion
}

export default Lobby