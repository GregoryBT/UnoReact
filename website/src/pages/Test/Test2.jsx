import React, { useState } from "react"

function Test2(props) {
    const [data, setData] = useState()
    function BTN_Clicked() {
        props.onChangeData(data)
    }
    return (
        <div>
            <input onChange={(e) => setData(e.target.value)}></input>
            <button onClick={() => BTN_Clicked()}> Click me </button>
        </div>
    )
}

export default Test2
