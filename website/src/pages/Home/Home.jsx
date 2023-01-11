import React, { useContext, useEffect, useReducer, useState } from "react"
import { useNavigate } from 'react-router-dom';
import ApiVerifLogin from "../../api/User/VerifLogin"
import Loader from "../../component/Loader/Loader";
import './Home.scss'
import MyContext from '../../utils/context/socket.jsx';
import socketReducer from '../../utils/reducer/socket.jsx'

// const initialTodos = [
//     {
//         id: 1,
//         title: "Todo 1",
//         complete: false,
//     },
//     {
//         id: 2,
//         title: "Todo 2",
//         complete: false,
//     },
// ];

function Home() {
    //#region ************************************************ Déclaration des variables
    // Connexion
    const [user, setUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    // Nom
    const [name, setName] = useState("")

    // Socket
    // const [todos, dispatch] = useReducer(socketReducer, useContext(MyContext));
    // const [socket, dispatch] = useReducer(socketReducer, useContext(MyContext));
    //#endregion
    //#region ************************************************ Vérification de la connexion
    useEffect(() => {
        checkLogin()
    }, [])

    async function checkLogin() {
        const user = await ApiVerifLogin(localStorage.getItem("Token"))
        console.log(user)
        if (user === "Forbidden") {
            alert("Il faut d'abord se connecter")
            navigate('/login');
        }
        else {
            setUser(user)
            setIsLoaded(true)
        }
    }
    //#endregion

    //#region ************************************************ Evenement
    const onClickCreateGameHandler = () => {
        // let todo = { id: 1 }
        // dispatch({ type: "ADD", id: todo.id });        
        navigate('/lobby');
    }

    const onClickJoinGameHandler = () => {
        console.log(todos)
    }
    //#endregion

    //#region ************************************************ Return
    return (
        <React.Fragment>
            {!isLoaded ? (
                <Loader></Loader>
            ) : (

                <div className="HomePage">
                    <div className="content">
                        <button onClick={() => onClickCreateGameHandler()}> Créer une partie</button>
                        <button onClick={() => onClickJoinGameHandler()}> Rejoindre une partie</button>
                    </div>
                </div>
            )
            }
        </React.Fragment>
    )
    //#endregion
}

export default Home