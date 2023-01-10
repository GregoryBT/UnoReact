async function Login(Username, Password) {
    // Déclaration du token a retournée
    var token;
    // Création d'un objet de connexion avec les informations rentrés
    const InformationConnexion = {
        username: Username,
        password: Password,
    }
    // Verification de la de la personne via l'api avec l'objet créé précedement en paramètre
    await fetch(`http://localhost:7777/users/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(InformationConnexion),
    })
        .then(function (response) {
            return console.log(response)
        })
    return token

}
export default Login