const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const socketIO = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000",
    },
});


app.use(cors())

// Un tableau pour stocker les joueurs en ligne
let playerssocket = [
];
let players = [
];
// Un tableau pour stocker les cartes dans la pioche
let deck = [
    { color: 'red', value: '0' },
    { color: 'red', value: '1' },
    { color: 'red', value: '1' },
    { color: 'red', value: '2' },
    { color: 'red', value: '2' },
    { color: 'red', value: '3' },
    { color: 'red', value: '3' },
    { color: 'red', value: '4' },
    { color: 'red', value: '4' },
    { color: 'red', value: '5' },
    { color: 'red', value: '5' },
    { color: 'red', value: '6' },
    { color: 'red', value: '6' },
    { color: 'red', value: '7' },
    { color: 'red', value: '7' },
    { color: 'red', value: '8' },
    { color: 'red', value: '8' },
    { color: 'red', value: '9' },
    { color: 'red', value: '9' },
    { color: 'red', value: 'Plus2' },
    { color: 'red', value: 'Plus2' },
    { color: 'red', value: 'Reverse' },
    { color: 'red', value: 'Reverse' },
    { color: 'red', value: 'Skip' },
    { color: 'red', value: 'Skip' },
    { color: 'green', value: '0' },
    { color: 'green', value: '1' },
    { color: 'green', value: '1' },
    { color: 'green', value: '2' },
    { color: 'green', value: '2' },
    { color: 'green', value: '3' },
    { color: 'green', value: '3' },
    { color: 'green', value: '4' },
    { color: 'green', value: '4' },
    { color: 'green', value: '5' },
    { color: 'green', value: '5' },
    { color: 'green', value: '6' },
    { color: 'green', value: '6' },
    { color: 'green', value: '7' },
    { color: 'green', value: '7' },
    { color: 'green', value: '8' },
    { color: 'green', value: '8' },
    { color: 'green', value: '9' },
    { color: 'green', value: '9' },
    { color: 'green', value: 'Plus2' },
    { color: 'green', value: 'Plus2' },
    { color: 'green', value: 'Reverse' },
    { color: 'green', value: 'Reverse' },
    { color: 'green', value: 'Skip' },
    { color: 'green', value: 'Skip' },
    { color: 'blue', value: '0' },
    { color: 'blue', value: '1' },
    { color: 'blue', value: '1' },
    { color: 'blue', value: '2' },
    { color: 'blue', value: '2' },
    { color: 'blue', value: '3' },
    { color: 'blue', value: '3' },
    { color: 'blue', value: '4' },
    { color: 'blue', value: '4' },
    { color: 'blue', value: '5' },
    { color: 'blue', value: '5' },
    { color: 'blue', value: '6' },
    { color: 'blue', value: '6' },
    { color: 'blue', value: '7' },
    { color: 'blue', value: '7' },
    { color: 'blue', value: '8' },
    { color: 'blue', value: '8' },
    { color: 'blue', value: '9' },
    { color: 'blue', value: '9' },
    { color: 'blue', value: 'Plus2' },
    { color: 'blue', value: 'Plus2' },
    { color: 'blue', value: 'Reverse' },
    { color: 'blue', value: 'Reverse' },
    { color: 'blue', value: 'Skip' },
    { color: 'blue', value: 'Skip' },
    { color: 'yellow', value: '0' },
    { color: 'yellow', value: '1' },
    { color: 'yellow', value: '1' },
    { color: 'yellow', value: '2' },
    { color: 'yellow', value: '2' },
    { color: 'yellow', value: '3' },
    { color: 'yellow', value: '3' },
    { color: 'yellow', value: '4' },
    { color: 'yellow', value: '4' },
    { color: 'yellow', value: '5' },
    { color: 'yellow', value: '5' },
    { color: 'yellow', value: '6' },
    { color: 'yellow', value: '6' },
    { color: 'yellow', value: '7' },
    { color: 'yellow', value: '7' },
    { color: 'yellow', value: '8' },
    { color: 'yellow', value: '8' },
    { color: 'yellow', value: '9' },
    { color: 'yellow', value: '9' },
    { color: 'yellow', value: 'Plus2' },
    { color: 'yellow', value: 'Plus2' },
    { color: 'yellow', value: 'Reverse' },
    { color: 'yellow', value: 'Reverse' },
    { color: 'yellow', value: 'Skip' },
    { color: 'yellow', value: 'Skip' },
    { color: 'black', value: 'Plus4' },
    { color: 'black', value: 'Plus4' },
    { color: 'black', value: 'Plus4' },
    { color: 'black', value: 'Plus4' },
    { color: 'black', value: 'Joker' },
    { color: 'black', value: 'Joker' },
    { color: 'black', value: 'Joker' },
    { color: 'black', value: 'Joker' }
];
// Un tableau pour stocker les cartes dans le jeux
let discardPile = [
];


// ********************************************************** Fonction Utilitaire *********************************************************** //
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        // Générer un nombre aléatoire compris entre 0 et i
        let j = Math.floor(Math.random() * (i + 1));
        // Échanger les cartes à l'index i et j
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// *********************************************** Mettre a jour les données chez les clients *********************************************** //
// Met a jour l'état des joueurs
function MiseAJourStatePlayers() {
    console.log(players)
    players.forEach(player => {
        _socket = playerssocket.filter(p => p.id === player.id);
        console.log("Players envoyer à " + _socket[0].id)
        _socket[0].emit('players', players);
    });
}
// Met a jour l'état de la discardPile
function MiseAJourStatedDiscardPile() {
    console.log(players)
    players.forEach(player => {
        _socket = playerssocket.filter(p => p.id === player.id);
        console.log("discardPile envoyer à " + _socket[0].id)
        _socket[0].emit('discardPile', discardPile);
    });
}
// Dit a tous le monde de lancer la partie
function MiseAJourStartGame() {
    console.log(players)
    if (players !== undefined) {
        players.forEach(player => {
            _socket = playerssocket.filter(p => p.id === player.id);
            console.log("StartGame envoyer à " + _socket[0].id)
            _socket[0].emit('startGame');
        });
    }
    else {
        console.log("Players not found")
    }
}

socketIO.on('connection', socket => {
    console.log(`Un joueur s'est connecté avec l'ID de socket : ${socket.id}`);
    playerssocket.push(socket)

    // ***************************************************************** Gère l'ajout de joueurs
    socket.on('add player', name => {
        // On supprime les joueurs qui ont le même id
        players = players.filter(p => p.id !== socket.id);
        // On crée le nouveau joueur
        _newplayer = { 'id': socket.id, 'name': name, 'cards': [] }
        // On ajoute le nouveau joueur au tableau de joueurs
        players.push(_newplayer);
        // On renvoie le nouveau joueur
        socket.emit('player', _newplayer);
        console.log(players)
        // On met a jour l'état des joueurs
        MiseAJourStatePlayers();
    });
    // ***************************************************************** Gère la suppression de joueurs
    socket.on('remove player', player => {
        // On supprime le joueur grâce a son id
        players = players.filter(p => p.id !== player.id);
        // On met a jour l'état des joueurs
        MiseAJourStatePlayers();
    });
    // ***************************************************************** Restart Game
    socket.on('restart game', () => {
        // Vider les cartes des joueurs
        players.forEach(player => {
            player.cards = []
        });
        // Reremplir le deck de base
        deck = [
            { color: 'red', value: '0' },
            { color: 'red', value: '1' },
            { color: 'red', value: '1' },
            { color: 'red', value: '2' },
            { color: 'red', value: '2' },
            { color: 'red', value: '3' },
            { color: 'red', value: '3' },
            { color: 'red', value: '4' },
            { color: 'red', value: '4' },
            { color: 'red', value: '5' },
            { color: 'red', value: '5' },
            { color: 'red', value: '6' },
            { color: 'red', value: '6' },
            { color: 'red', value: '7' },
            { color: 'red', value: '7' },
            { color: 'red', value: '8' },
            { color: 'red', value: '8' },
            { color: 'red', value: '9' },
            { color: 'red', value: '9' },
            { color: 'red', value: 'Plus2' },
            { color: 'red', value: 'Plus2' },
            { color: 'red', value: 'Reverse' },
            { color: 'red', value: 'Reverse' },
            { color: 'red', value: 'Skip' },
            { color: 'red', value: 'Skip' },
            { color: 'green', value: '0' },
            { color: 'green', value: '1' },
            { color: 'green', value: '1' },
            { color: 'green', value: '2' },
            { color: 'green', value: '2' },
            { color: 'green', value: '3' },
            { color: 'green', value: '3' },
            { color: 'green', value: '4' },
            { color: 'green', value: '4' },
            { color: 'green', value: '5' },
            { color: 'green', value: '5' },
            { color: 'green', value: '6' },
            { color: 'green', value: '6' },
            { color: 'green', value: '7' },
            { color: 'green', value: '7' },
            { color: 'green', value: '8' },
            { color: 'green', value: '8' },
            { color: 'green', value: '9' },
            { color: 'green', value: '9' },
            { color: 'green', value: 'Plus2' },
            { color: 'green', value: 'Plus2' },
            { color: 'green', value: 'Reverse' },
            { color: 'green', value: 'Reverse' },
            { color: 'green', value: 'Skip' },
            { color: 'green', value: 'Skip' },
            { color: 'blue', value: '0' },
            { color: 'blue', value: '1' },
            { color: 'blue', value: '1' },
            { color: 'blue', value: '2' },
            { color: 'blue', value: '2' },
            { color: 'blue', value: '3' },
            { color: 'blue', value: '3' },
            { color: 'blue', value: '4' },
            { color: 'blue', value: '4' },
            { color: 'blue', value: '5' },
            { color: 'blue', value: '5' },
            { color: 'blue', value: '6' },
            { color: 'blue', value: '6' },
            { color: 'blue', value: '7' },
            { color: 'blue', value: '7' },
            { color: 'blue', value: '8' },
            { color: 'blue', value: '8' },
            { color: 'blue', value: '9' },
            { color: 'blue', value: '9' },
            { color: 'blue', value: 'Plus2' },
            { color: 'blue', value: 'Plus2' },
            { color: 'blue', value: 'Reverse' },
            { color: 'blue', value: 'Reverse' },
            { color: 'blue', value: 'Skip' },
            { color: 'blue', value: 'Skip' },
            { color: 'yellow', value: '0' },
            { color: 'yellow', value: '1' },
            { color: 'yellow', value: '1' },
            { color: 'yellow', value: '2' },
            { color: 'yellow', value: '2' },
            { color: 'yellow', value: '3' },
            { color: 'yellow', value: '3' },
            { color: 'yellow', value: '4' },
            { color: 'yellow', value: '4' },
            { color: 'yellow', value: '5' },
            { color: 'yellow', value: '5' },
            { color: 'yellow', value: '6' },
            { color: 'yellow', value: '6' },
            { color: 'yellow', value: '7' },
            { color: 'yellow', value: '7' },
            { color: 'yellow', value: '8' },
            { color: 'yellow', value: '8' },
            { color: 'yellow', value: '9' },
            { color: 'yellow', value: '9' },
            { color: 'yellow', value: 'Plus2' },
            { color: 'yellow', value: 'Plus2' },
            { color: 'yellow', value: 'Reverse' },
            { color: 'yellow', value: 'Reverse' },
            { color: 'yellow', value: 'Skip' },
            { color: 'yellow', value: 'Skip' },
            { color: 'black', value: 'Plus4' },
            { color: 'black', value: 'Plus4' },
            { color: 'black', value: 'Plus4' },
            { color: 'black', value: 'Plus4' },
            { color: 'black', value: 'Joker' },
            { color: 'black', value: 'Joker' },
            { color: 'black', value: 'Joker' },
            { color: 'black', value: 'Joker' }
        ] // La pioche
        discardPile = []
    });
    // ***************************************************************** Mélange le deck
    socket.on('shuffle deck', () => {
        // Mélanger les cartes
        shuffleDeck(deck);
    });
    // Distribuer les cartes
    socket.on('distribute card', (_players, numbercard) => {
        console.log("Nombre de cartes a distribué : " + numbercard)
        console.log(_players)
        for (let i = 0; i < numbercard; i++) {
            _players.forEach(player => {
                player.cards.push(deck.pop())
            });
        }
        // On met a jour l'état des joueurs
        players = _players
        MiseAJourStatePlayers();
    });
    // ***************************************************************** Ajoute des carte dans le pot
    socket.on('add discardPile', (_player, card) => {
        // 
        if (card === "default") {
            card = deck.pop()
        }
        else {
            // Récupere les information du joueur
            console.log(players)
            _player = players.filter(p => p.id === _player.id);
            // On retire la carte de la main du gars
            for (let i = 0; i < _player[0].cards.length; i++) {
                if (_player[0].cards[i].color === card.color && _player[0].cards[i].value === card.value) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                _player[0].cards.splice(index, 1);
            }
            // On met a jour l'état de la main du joueur
            MiseAJourPlayerHand(_player);
        }
        // Rajoute la pile au milieu
        discardPile.push(card)
        // On met a jour l'état de la pile
        MiseAJourStatedDiscardPile();
    });
    // ***************************************************************** Piocher une carte
    socket.on('draw', _players => {
        console.log(players)
        _players = players.filter(p => p.id === _players.id);
        console.log(_players)
        _players[0].cards.push(deck.pop())
        // On met a jour l'état des joueurs
        MiseAJourPlayerHand(_players);
    });
    // ***************************************************************** Lancement de la partie
    socket.on('start game', () => {
        // console.log(deck)
        // console.log(players)
        // On met a jour l'état des joueurs
        MiseAJourStartGame();
    });
    // ***************************************************************** Gère la déconnexion des joueurs
    socket.on('disconnect', () => {
        console.log(`Le joueur avec l'ID de socket ${socket.id} s'est déconnecté.`);
        // On supprime le joueur grâce a son id
        players = players.filter(p => p.id !== socket.id);
        // On supprime le joueur grâce a son id
        playerssocket = playerssocket.filter(p => p.id !== socket.id);
        // On met a jour l'état des joueurs
        MiseAJourStatePlayers();
    });
    // ***************************************************************** Envoie les joueurs
    socket.on('getPlayers', () => {
        socket.emit('players', players);
    });
});

http.listen(5000, () => {
    console.log('Le serveur écoute sur le port 5000');
});