import { Link } from 'react-router-dom'
import './Login.scss'

function Register() {
    return (
        <div className='LoginPage'>
            <div className='content'>
                <h1 className='Title'>Créer un compte</h1>
                <input
                    className='Textbox'
                    placeholder='Pseudonyme'
                />
                <input
                    className='Textbox'
                    placeholder='Mot de passe'
                    type={"Password"}
                />
                <input
                    className='Textbox'
                    placeholder='Confirmer le mot de passe'
                    type={"Password"}
                />
                <button className='Button'>Créer un compte</button>
                <Link
                    to={`/login`}
                    className='Text'
                >
                    <p>Déja un compte ?</p>
                </Link>
            </div>
        </div>
    )
}

export default Register