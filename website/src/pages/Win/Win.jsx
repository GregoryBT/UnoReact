import React, { useContext, useEffect, useReducer, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../component/Loader/Loader";
import MyContext from "../../utils/context/socket";
import './Win.scss'

function Win() {
    // Socket
    const [socket, setSocket] = useState(useContext(MyContext));
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
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
    useEffect(() => {
        socket.emit('getPlayers');
    }, [])

    socket.on('players', _players => {
        playersDispatch({ type: "SET_Players", payload: _players })
        setIsLoaded(true)
    });

    function AfficherJoueur() {
        let { id } = useParams();
        let winner = players.filter(p => p.id === id)
        console.log(winner)
        return (
            <p className="Winner">{winner[0].name} à gagné la partie</p>
        )
    }

    function handleClickBTNMenu() {
        navigate('/home');
    }

    return (
        <React.Fragment>
            {!isLoaded ? (
                <Loader />
            ) : (
                <div className="GamePage">
                    {AfficherJoueur()}
                    <button className="MenuButton" onClick={() => handleClickBTNMenu()}>Retour au menu principal</button>
                </div>
            )
            }
        </React.Fragment>
    )
}

export default Win