import { useState } from 'react'
import './Lobby.scss'

function Lobby() {
    const [gameOwner, setGameOwner] = useState([{ name: "GToccanier", role: "Owner" }])
    const [allPlayers, setAllPlayers] = useState([{ name: "GToccanier2", role: "Player" }, { name: "GToccanier2", role: "Player" }, { name: "GToccanier2", role: "Player" }, { name: "GToccanier2", role: "Player" },])

    function AfficherPlayers(_players) {
        return (_players.map((_player) => (
            <p className='Player'>{_player.name}</p>
        )))
    }

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
}

export default Lobby