const Users = require('../models/usersModel')
const jwt = require('jsonwebtoken')
const accessTokenSecret = '!SXve@Bu?$J@6!!$7zB6J9@k?4#7aU24ia7GE7#i9wEaPBk8f4' // <--------------------------- ?

/*********************************************************** Requete Get ***********************************************************/
// Récupère tous les utilisateurs
exports.get = (req, res) => {
    Users.find((err, docs) => {
        if (!err) {
            res.status(200).send(docs)
        } else {
            res.status(500).send(err)
        }
    })
}
/*********************************************************** Requete Post ***********************************************************/
// Ajoute un utilisateur a la base de données
exports.post = (req, res) => {
    // On affiche dans la console les données du nouvel utilisateur
    console.log('\n Add : \n', req.body)
    // On récupere les données passer en JSON
    const UsernameItem = req.body?.username || null
    const PasswordItem = req.body?.password || null
    Users.find((err, docs) => {
        // Filter user from the users array by username and password
        const user = docs.find((u) => {
            return u.username === UsernameItem
        })
        console.log("Test")
        console.log(user)
        // Si il n'y a pas d'utilisateur déja crée avec ce pseudonyme
        if (user === undefined) {
            // On créé l'objet qui stock les données du nouvel utlilisateur
            const newUsers = new Users({
                username: UsernameItem,
                password: PasswordItem
            })

            // On envoie l'utilisateur dans la base de données
            newUsers.save((err, docs) => {
                if (!err) {
                    res.status(201).json(docs)
                } else {
                    res.status(500).json(err)
                }
            })
        }
        else {
            res.status(200).json("User already created")
        }
    })

}
// Créer un token de connexion
exports.login = (req, res) => {
    console.log(req.body)
    // On récupere les données passer en JSON
    const usernameItem = req.body?.username || null
    const passwordItem = req.body?.password || null

    Users.find((err, docs) => {
        if (!err) {
            // Filter user from the users array by username and password
            const user = docs.find((u) => {
                return u.username === usernameItem && u.password === passwordItem
            })
            if (user) {
                // Generate an access token
                const accessToken = jwt.sign({ username: user.username }, accessTokenSecret)

                res.status(200).json({
                    accessToken,
                })
            } else {
                res.status(200).json("Not match")
            }
        } else {
            res.status(500).send(err)
        }
    })
}
// Vérifie que le client existe
exports.veriflogin = (req, res) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(403).json("Forbidden")
            }
            req.user = user;
            console.log(user)
            res.send(JSON.stringify(req.user))
        })
    } else {
        res.status(401).json("Erreur 2")
    }


}
