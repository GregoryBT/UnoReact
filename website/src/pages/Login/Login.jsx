import './Login.scss'

function Login() {
    return (
        <div className='LoginPage'>
            <div className='content'>
                <h1 className='Title'>Se connecter</h1>
                <input
                    className='Textbox'
                    placeholder='Username'
                />
                <input
                    className='Textbox'
                    placeholder='Password'
                    type={"Password"}
                />
                <button className='Button'>Se connecter</button>
                <p className='Text'>Pas de compte ?</p>
            </div>
        </div>
    )
}

export default Login