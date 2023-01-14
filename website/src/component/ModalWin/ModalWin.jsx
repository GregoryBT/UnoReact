import { useState, useEffect } from "react"
import "../ModalPlus4/ModalPlus4.scss"

function ModalWin(props) {
    const [playerName, setPlayerName] = useState();
    console.log(props)
    if (props.player[0] !== undefined) {
        setPlayerName(props.player[0].name)
    }
    return (
        <div className={props.open ? "Modal Show" : "Modal"}>
            {playerName} a gagné la partied
        </div>
    )
}

export default ModalWin