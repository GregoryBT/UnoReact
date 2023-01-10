import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { sha256 } from 'js-sha256';
import './Login.scss'
import ApiAddUser from '../../api/User/Post'

function Register() {
    const { register, formState: { errors }, handleSubmit, watch } = useForm({ criteriaMode: 'all', mode: 'onChange', })

    const onSubmit = async (data) => {
        const _response = await ApiAddUser(data.username, sha256(data.password))


    }

    return (
        <div className='LoginPage'>
            <div className='content'>
                <h1 className='Title'>Créer un compte</h1>
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
                    <input
                        className='Textbox'
                        placeholder='Confirmer le mot de passe'
                        type={"Password"}
                        {...register('confirmPassword', { required: true, validate: (value) => value === watch('password') })}
                    />
                    {errors.confirmPassword?.type === 'required' && (
                        <p className="messageErreur" role="alert">
                            ⚠️ Le mot de passe est obligatoire
                        </p>
                    )}
                    {errors.confirmPassword?.type === 'validate' && (
                        <p className="messageErreur" role="alert">
                            ⚠️ Les mots de passe ne sont pas identique
                        </p>
                    )}
                    <button className='Button'>Créer un compte</button>
                </form>
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