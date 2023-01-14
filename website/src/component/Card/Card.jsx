function Card(props) {
    if (props.side === "Front") {
        if (props.card.color === "black") {
            if (props.card.option !== undefined) {
                props.style.backgroundColor = props.card.option
            }
            props.style.color = "#FFFFFF"
            return (
                <div key={props.card.id} className={props.className} style={props.style} onClick={() => props.onClick(props.card)}>
                    <p>{props.card.value}</p>
                </div >
            )
        }
        else if (props.card.value === "6" || props.card.value === "9") {
            props.style.textDecoration = "underline"
            return (
                <div key={props.card.id} className={props.className} style={props.style} onClick={() => props.onClick(props.card)}>
                    <p>{props.card.value}</p>
                </div >
            )
        }
        else if (props.card.value === "+4") {
            console.log(props.card)
            props.style.backgroundColor = props.card.option
            return (
                <div key={props.card.id} className={props.className} style={props.style} onClick={() => props.onClick(props.card)}>
                    <p>{props.card.value}</p>
                </div >
            )
        }
        else {
            return (
                <div key={props.card.id} className={props.className} style={props.style} onClick={() => props.onClick(props.card)}>
                    <p>{props.card.value}</p>
                </div >
            )
        }
    }
    else {
        return (
            <div key={props.card.id} className={props.className} style={{ backgroundColor: '#101010', color: '#FFFFFF' }} onClick={props.onClick}>
                <p>UNO</p>
            </div>
        )
    }
}

export default Card