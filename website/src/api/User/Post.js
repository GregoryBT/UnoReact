async function ApiAddUser(Username, Password) {
    // Déclaration du token a retournée
    var status;
    // Création d'un objet de connexion avec les informations rentrés
    const InformationNouvelUtilisateur = {
        username: Username,
        password: Password
    }
    console.log(InformationNouvelUtilisateur)
    // Verification de la de la personne via l'api avec l'objet créé précedement en paramètre
    return await fetch(`http://localhost:7777/users`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(InformationNouvelUtilisateur),
    })
        .then(function (response) {
            return response.json()
        })

}
export default ApiAddUser