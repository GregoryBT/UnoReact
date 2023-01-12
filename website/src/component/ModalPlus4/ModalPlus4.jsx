import { useState, useEffect } from "react"
import "./ModalPlus4.scss"

function ModalPlus4(props) {
    const [color, setColor] = useState(['red', 'blue', 'yellow', 'green']);

    return (
        <div className={props.open ? "Modal Show" : "Modal"}>
            <div className="content">
                {color.map((_color) => {
                    return <button onClick={() => props.handleColor(_color)} className={"BTN_Color"} style={{ backgroundColor: _color }}></button>
                })}
            </div>
            <button onClick={() => props.handleModalClose()}>Fermer Modal</button>
        </div>
    )
}

export default ModalPlus4