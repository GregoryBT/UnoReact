import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { sha256 } from 'js-sha256';
import './Login.scss'

function Login() {
    const { register, formState: { errors }, handleSubmit, watch } = useForm({ criteriaMode: 'all', mode: 'onChange', })

    const onSubmit = (data) => {

    }

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
}

export default Login