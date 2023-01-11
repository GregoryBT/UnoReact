import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import ApiVerifLogin from "../../api/User/VerifLogin"
import './Home.scss'

function Home() {
    //#region ************************************************ Déclaration des variables
    // Connexion
    const [user, setUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    // Nom
    const [name, setName] = useState("")
    //#endregion

    //#region ************************************************ Vérification de la connexion
    useEffect(() => {
        checkLogin()
    }, [])

    async function checkLogin() {
        const user = await ApiVerifLogin(localStorage.getItem("Token"))
        console.log(user)
        if (user === "Forbidden") {
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
        alert("Create Game")
    }

    const onClickJoinGameHandler = () => {
        alert("JoinGame")
    }
    //#endregion

    //#region ************************************************ Return
    return (
        <React.Fragment>
            {!isLoaded ? (
                <div className="Loader"></div>
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