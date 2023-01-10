import { tab } from "@testing-library/user-event/dist/tab"
import { useState } from "react"
import Test2 from "./Test2"

function Test() {
    const [tableau, setTableau] = useState([])

    function RemplirTableau(data) {
        setTableau([...tableau, data])
    }
    return (
        <div>
            <Test2
                onChangeData={(e) => RemplirTableau(e)}
            ></Test2>
            {tableau.map((data) => (
                <p>{data}</p>
            ))}
        </div>

    )
}


export default Test