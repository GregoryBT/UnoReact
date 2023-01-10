import { tab } from "@testing-library/user-event/dist/tab"
import { useState } from "react"
import Test2 from "./Test2"

function Test() {
    const [tableau, setTableau] = useState([
        {
            nom: "Toccanier",
            prenom: "Gregory",
            datenaissance: "2001"
        },
        {
            nom: "Toccanier",
            prenom: "Gregory",
            datenaissance: "2002"
        },
        {
            nom: "Toccanier",
            prenom: "Gregory",
            datenaissance: "2003"
        },
    ])
    const [filter, setFilter] = useState(null)

    function onChangeData(data) {
        setTableau([...tableau, data])
    }

    function onFilterData(data) {
        setFilter(data)
    }

    return (
        <>
            <Test2
                data={tableau}
                filter={filter}
                onChangeData={(e) => onChangeData(e)}
                onFilterData={(e) => onFilterData(e)}
            />
        </>

    )
}


export default Test