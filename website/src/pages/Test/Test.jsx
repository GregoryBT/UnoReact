import { tab } from "@testing-library/user-event/dist/tab"
import { useState } from "react"
import Test2 from "./Test2"

const Test = () => {
    const [someArray, setFilter] = useState(["bleu", "rouge", "vert"])
    console.log('coucou')
    window.addEventListener('keydown', (event) => {
        console.log(event)
    });
    return (
        <div>
            <h1 className="hello" >25+25</h1>
        </div>
    );
}


export default Test
