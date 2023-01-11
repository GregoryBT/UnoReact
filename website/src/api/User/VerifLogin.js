async function ApiVerifLogin(token) {
    // Vérification available
    const authorization = 'Bearer ' + token

    // Verification de la de la personne via l'api avec l'objet créé précedement en paramètre
    return await fetch(`http://localhost:7777/users/veriflogin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: authorization
        },
    })
        .then(function (response) {
            return response.json()
        })
}

export default ApiVerifLogin