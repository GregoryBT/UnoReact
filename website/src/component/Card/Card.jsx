function Card(props) {
    if (props.side === "Front") {
        return (
            <div key={props.key} className={props.className} style={props.style} onClick={() => props.onClick(props.card)}>
                <p>{props.card.value}</p>
            </div >
        )
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