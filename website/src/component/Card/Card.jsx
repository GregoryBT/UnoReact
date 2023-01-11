function Card(props) {
    if (props.side === "Front") {
        console.log(props.card.color)
        if (props.card.color === "black") {
            console.log(props.style)
            props.style.color = "#FFFFFF"
            console.log(props.style)
            return (
                <div key={props.key} className={props.className} style={props.style} onClick={() => props.onClick(props.card)}>
                    <p>{props.card.value}</p>
                </div >
            )
        }
        else {
            return (
                <div key={props.key} className={props.className} style={props.style} onClick={() => props.onClick(props.card)}>
                    <p>{props.card.value}</p>
                </div >
            )
        }
    }
    else {
        return (
            <div key={props.key} className={props.className} style={{ backgroundColor: '#101010', color: '#FFFFFF' }} onClick={props.onClick}>
                <p>UNO</p>
            </div>
        )
    }
}

export default Card