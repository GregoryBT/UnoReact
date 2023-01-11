import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { sha256 } from 'js-sha256';
import { useNavigate } from 'react-router-dom';
import ApiLogin from '../../api/User/Login';
import './Login.scss'

function Login() {

    //#region ************************************************ Déclaration des variables
    const { register, formState: { errors }, handleSubmit } = useForm({ criteriaMode: 'all', mode: 'onChange', })
    const navigate = useNavigate();
    //#endregion

    //#region ************************************************ Evenement
    const onSubmit = async (data) => {
        const token = await ApiLogin(data.username, sha256(data.password))
        if (token === "Not match") {
            alert("Identifiant ou mot de passe incorrect.")
        }
        else {
            localStorage.setItem("Token", token.accessToken)
            navigate('/home');
        }
    }
    //#endregion

    //#region ************************************************ Return
    return (
        <div className='LoginPage'>
            <div className='content'>
                <h1 className='Title'>Se connecter</h1>
                <form className='form' onSubmit={handleSubmit(onSubmit)} >
                    <input
                        className='Textbox'
                        placeholder='Pseudonyme'
                        {...register('username', { required: true })}
                    />
                    {errors.username?.type === 'required' && (
                        <p className="messageErreur" role="alert">
                            ⚠️ Le Pseudonyme est obligatoire
                        </p>
                    )}
                    <input
                        className='Textbox'
                        placeholder='Mot de passe'
                        type={"Password"}
                        {...register('password', { required: true })}
                    />
                    {errors.password?.type === 'required' && (
                        <p className="messageErreur" role="alert">
                            ⚠️ Le mot de passe est obligatoire
                        </p>
                    )}
                    <button className='Button'>Se connecter</button>
                </form>
                <Link
                    to={`/register`}
                    className='Text'
                >
                    <p>Pas de compte ?</p>
                </Link>

            </div>
        </div>
    )
    //#endregion
}

export default Login