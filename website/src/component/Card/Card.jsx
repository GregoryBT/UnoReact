function Card(props) {
    if (props.side === "Front") {
        return (
            <div key={props.key} className={props.className} style={props.style}>
                <p>{props.card.value}</p>
            </div>
        )
    }
    else {
        return (
            <div key={props.key} className={props.className} style={{ backgroundColor: '#101010', color: '#FFFFFF' }}>
                <p>UNO</p>
            </div>
        )
    }
}

export default Card