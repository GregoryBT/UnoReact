import React, { useState } from "react"

function Test2(props) {
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [datenaissance, setDatenaissance] = useState("")

    function BTN_Clicked() {
        if (nom === "" || nom === undefined || nom === null) {
            alert('Le nom est vide')
        }
        else if (prenom === "" || prenom === undefined || prenom === null) {
            alert('Le prenom est vide')
        }
        else if (datenaissance === "" || datenaissance === undefined || datenaissance === null) {
            alert('L\'age est vide')
        }
        else {

            props.onChangeData({ nom: nom, prenom: prenom, datenaissance: datenaissance })
        }
    }
    return (
        <div>
            <input placeholder="Nom" onChange={(e) => setNom(e.target.value)}></input>
            <input placeholder="Prénom" onChange={(e) => setPrenom(e.target.value)}></input>
            <input placeholder="Age" onChange={(e) => setDatenaissance(e.target.value)}></input>
            <button onClick={() => BTN_Clicked()}> Click me </button><br /><br />

            {/* Filtre*/}
            <input placeholder="Filtre par année" onChange={(e) => props.onFilterData(e.target.value)}></input>

            {props.data.map((data, i) => {
                if (data.datenaissance.includes(props.filter) || props.filter === null) {
                    return (<p key={i}>{data.nom} {data.prenom} {data.datenaissance}</p>)
                }
            })}
        </div>
    )
}

export default Test2
