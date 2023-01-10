const User = require('../models/userModel')

exports.get = (req, res) => {
    User.find((err, docs) => {
        if (!err) {
            res.status(200).send(docs)
        } else {
            res.status(500).send(err)
        }
    })
}