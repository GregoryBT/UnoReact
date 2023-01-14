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
let deck = [];
// Un tableau pour stocker les cartes dans le jeux
let discardPile = [
];
// Un objet qui stock les données du tour
let turn = {
    player: {},
    ordre: []
};

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
    players.forEach(player => {
        _socket = playerssocket.filter(p => p.id === player.id);
        _socket[0].emit('players', players);
    });
}
// Met a jour l'état de la discardPile
function MiseAJourStatedDiscardPile() {
    players.forEach(player => {
        _socket = playerssocket.filter(p => p.id === player.id);
        _socket[0].emit('discardPile', discardPile);
    });
}
// Met a jour l'état de win
function MiseAJourStateWin(_player) {
    players.forEach(player => {
        console.log("Boucle")
        _socket = playerssocket.filter(p => p.id === player.id);
        _socket[0].emit('win', _player);
    });
}
// Dit a tous le monde de lancer la partie
function MiseAJourStartGame() {
    if (players !== undefined) {
        players.forEach(player => {
            _socket = playerssocket.filter(p => p.id === player.id);
            _socket[0].emit('startGame');
        });
    }
    else {
        console.log("Players not found")
    }
}

// Met a jour le tour
function MiseAJourTurn() {
    players.forEach(player => {
        _socket = playerssocket.filter(p => p.id === player.id);
        _socket[0].emit('turn', turn);
    });
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
        // Vider le turn
        turn = {
            player: {},
            ordre: []
        }
        // Reremplir le deck de base
        deck = [
            { id: '0', color: 'red', value: '0', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '1', color: 'red', value: '1', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '2', color: 'red', value: '1', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '3', color: 'red', value: '2', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '4', color: 'red', value: '2', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '5', color: 'red', value: '3', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '6', color: 'red', value: '3', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '7', color: 'red', value: '4', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '8', color: 'red', value: '4', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '9', color: 'red', value: '5', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '10', color: 'red', value: '5', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '11', color: 'red', value: '6', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '12', color: 'red', value: '6', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '13', color: 'red', value: '7', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '14', color: 'red', value: '7', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '15', color: 'red', value: '8', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '16', color: 'red', value: '8', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '17', color: 'red', value: '9', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '18', color: 'red', value: '9', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '19', color: 'red', value: '+2', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '20', color: 'red', value: '+2', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '21', color: 'red', value: '◁◁', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '22', color: 'red', value: '◁◁', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '23', color: 'red', value: '🚫', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '24', color: 'red', value: '🚫', hexa: '#ba2736', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '25', color: 'green', value: '0', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '26', color: 'green', value: '1', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '27', color: 'green', value: '1', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '28', color: 'green', value: '2', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '29', color: 'green', value: '2', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '30', color: 'green', value: '3', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '31', color: 'green', value: '3', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '32', color: 'green', value: '4', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '33', color: 'green', value: '4', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '34', color: 'green', value: '5', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '35', color: 'green', value: '5', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '36', color: 'green', value: '6', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '37', color: 'green', value: '6', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '38', color: 'green', value: '7', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '39', color: 'green', value: '7', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '40', color: 'green', value: '8', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '41', color: 'green', value: '8', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '42', color: 'green', value: '9', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '43', color: 'green', value: '9', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '44', color: 'green', value: '+2', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '45', color: 'green', value: '+2', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '46', color: 'green', value: '◁◁', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '47', color: 'green', value: '◁◁', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '48', color: 'green', value: '🚫', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '49', color: 'green', value: '🚫', hexa: '#54a335', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '50', color: 'blue', value: '0', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '51', color: 'blue', value: '1', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '52', color: 'blue', value: '1', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '53', color: 'blue', value: '2', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '54', color: 'blue', value: '2', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '55', color: 'blue', value: '3', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '56', color: 'blue', value: '3', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '57', color: 'blue', value: '4', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '58', color: 'blue', value: '4', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '59', color: 'blue', value: '5', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '60', color: 'blue', value: '5', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '61', color: 'blue', value: '6', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '62', color: 'blue', value: '6', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '63', color: 'blue', value: '7', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '64', color: 'blue', value: '7', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '65', color: 'blue', value: '8', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '66', color: 'blue', value: '8', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '67', color: 'blue', value: '9', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '68', color: 'blue', value: '9', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '69', color: 'blue', value: '+2', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '70', color: 'blue', value: '+2', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '71', color: 'blue', value: '◁◁', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '72', color: 'blue', value: '◁◁', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '73', color: 'blue', value: '🚫', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '74', color: 'blue', value: '🚫', hexa: '#0154a4', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '75', color: 'yellow', value: '0', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '76', color: 'yellow', value: '1', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '77', color: 'yellow', value: '1', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '78', color: 'yellow', value: '2', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '79', color: 'yellow', value: '2', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '80', color: 'yellow', value: '3', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '81', color: 'yellow', value: '3', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '82', color: 'yellow', value: '4', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '83', color: 'yellow', value: '4', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '84', color: 'yellow', value: '5', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '85', color: 'yellow', value: '5', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '86', color: 'yellow', value: '6', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '87', color: 'yellow', value: '6', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '88', color: 'yellow', value: '7', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '89', color: 'yellow', value: '7', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '90', color: 'yellow', value: '8', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '91', color: 'yellow', value: '8', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '92', color: 'yellow', value: '9', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '93', color: 'yellow', value: '9', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '94', color: 'yellow', value: '+2', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '95', color: 'yellow', value: '+2', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '96', color: 'yellow', value: '◁◁', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '97', color: 'yellow', value: '◁◁', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '98', color: 'yellow', value: '🚫', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '99', color: 'yellow', value: '🚫', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '100', color: 'black', value: '+4', hexa: '#090909', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '101', color: 'black', value: '+4', hexa: '#090909', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '102', color: 'black', value: '+4', hexa: '#090909', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '103', color: 'black', value: '+4', hexa: '#090909', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '104', color: 'black', value: 'Joker', hexa: '#090909', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '105', color: 'black', value: 'Joker', hexa: '#090909', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '106', color: 'black', value: 'Joker', hexa: '#090909', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { id: '107', color: 'black', value: 'Joker', hexa: '#090909', rotate: Math.floor(Math.random() * 180), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) }
        ] // La pioche
        discardPile = []
    });
    // ***************************************************************** Mélange le deck
    socket.on('shuffle deck', () => {
        // Mélanger les cartes
        shuffleDeck(deck);
    });
    // ***************************************************************** Distribuer les cartes
    socket.on('distribute card', (_players, numbercard) => {
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
        // On retire la carte de la main du gars
        for (let i = 0; i < _player[0].cards.length; i++) {
            if (_player[0].cards[i].id === card.id) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            _player[0].cards.splice(index, 1);
        }
        let _players = players.filter(p => p.id !== _player[0].id);
        _players.push(_player[0])

        players = _players
        // On met a jour l'état de la main du joueur
        MiseAJourStatePlayers();

        // Rajoute la pile au milieu
        discardPile.push(card)
        // On met a jour l'état de la pile
        _players = players.filter(p => p.id === _player.id);
        MiseAJourStatedDiscardPile();
        console.log(_player[0].cards.length)
        if (_player[0].cards.length <= 0) {
            MiseAJourStateWin(_player);
        }
    });
    // ***************************************************************** Piocher une carte
    socket.on('draw', _player => {
        if (deck.length === 0) {
            // Mettre la pile dans le deck mais a l'envers
            let lastcard = discardPile.pop()
            deck = discardPile.reverse()
            // Vider la discard pile
            discardPile = []
            // Rajouter la premiere carte
            discardPile.push(lastcard)
            // On met a jour l'état de la main du joueur
            MiseAJourStatedDiscardPile();
        }
        _player[0].cards.push(deck.pop())

        let _players = players.filter(p => p.id !== _player[0].id);
        _players.push(_player[0])

        players = _players
        // On met a jour l'état de la main du joueur
        MiseAJourStatePlayers();
    });
    // ***************************************************************** Lancement de la partie
    socket.on('start game', () => {
        // Met la premiere carte
        discardPile.push(deck.pop())
        // Prend un chiffre aléatoire parmis les joueurs
        let nbr = (Math.floor(Math.random() * (players.length)))
        // Remplit la table turn
        turn.ordre = players
        // Décaler la table
        for (let i = 0; i < nbr; i++) {
            let _playerADeplacer = turn.ordre.shift()
            turn.ordre.push(_playerADeplacer)
        }
        turn.player = turn.ordre[0]
        MiseAJourTurn();
        // On met a jour l'état des joueurs
        MiseAJourStartGame();
    });
    // ***************************************************************** Gere le tour
    socket.on('end turn', (player, card) => {
        // Changement de l'ordre des joueurs
        let _playerADeplacer = turn.ordre.shift()
        turn.ordre.push(_playerADeplacer)

        // Changement du joueur
        turn.player = turn.ordre[0]

        // Mise a jour des données
        MiseAJourTurn();
        // switch (card.value) {
        //     case '◁◁':
        //         // On met a jour l'état des joueurs
        //         MiseAJourTurn(3);
        //         break;
        //     case '🚫':
        //         // On met a jour l'état des joueurs
        //         MiseAJourTurn(2);
        //         break;
        //     default:
        //         // On met a jour l'état des joueurs
        // MiseAJourTurn(1);
        //         break;
        // }
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
    // ***************************************************************** Envoie la discardPile
    socket.on('getDiscardPile', () => {
        socket.emit('discardPile', discardPile);
    });
    // ***************************************************************** Envoie la discardPile
    socket.on('getTurn', () => {
        socket.emit('turn', turn);
    });
});

http.listen(5000, () => {
    console.log('Le serveur écoute sur le port 5000');
});