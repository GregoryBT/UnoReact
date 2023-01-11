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
    { color: 'red', value: '0', hexa: '#ba2736' },
    { color: 'red', value: '1', hexa: '#ba2736' },
    { color: 'red', value: '1', hexa: '#ba2736' },
    { color: 'red', value: '2', hexa: '#ba2736' },
    { color: 'red', value: '2', hexa: '#ba2736' },
    { color: 'red', value: '3', hexa: '#ba2736' },
    { color: 'red', value: '3', hexa: '#ba2736' },
    { color: 'red', value: '4', hexa: '#ba2736' },
    { color: 'red', value: '4', hexa: '#ba2736' },
    { color: 'red', value: '5', hexa: '#ba2736' },
    { color: 'red', value: '5', hexa: '#ba2736' },
    { color: 'red', value: '6', hexa: '#ba2736' },
    { color: 'red', value: '6', hexa: '#ba2736' },
    { color: 'red', value: '7', hexa: '#ba2736' },
    { color: 'red', value: '7', hexa: '#ba2736' },
    { color: 'red', value: '8', hexa: '#ba2736' },
    { color: 'red', value: '8', hexa: '#ba2736' },
    { color: 'red', value: '9', hexa: '#ba2736' },
    { color: 'red', value: '9', hexa: '#ba2736' },
    { color: 'red', value: 'Plus2', hexa: '#ba2736' },
    { color: 'red', value: 'Plus2', hexa: '#ba2736' },
    { color: 'red', value: 'Reverse', hexa: '#ba2736' },
    { color: 'red', value: 'Reverse', hexa: '#ba2736' },
    { color: 'red', value: 'Skip', hexa: '#ba2736' },
    { color: 'red', value: 'Skip', hexa: '#ba2736' },
    { color: 'green', value: '0', hexa: '#54a335' },
    { color: 'green', value: '1', hexa: '#54a335' },
    { color: 'green', value: '1', hexa: '#54a335' },
    { color: 'green', value: '2', hexa: '#54a335' },
    { color: 'green', value: '2', hexa: '#54a335' },
    { color: 'green', value: '3', hexa: '#54a335' },
    { color: 'green', value: '3', hexa: '#54a335' },
    { color: 'green', value: '4', hexa: '#54a335' },
    { color: 'green', value: '4', hexa: '#54a335' },
    { color: 'green', value: '5', hexa: '#54a335' },
    { color: 'green', value: '5', hexa: '#54a335' },
    { color: 'green', value: '6', hexa: '#54a335' },
    { color: 'green', value: '6', hexa: '#54a335' },
    { color: 'green', value: '7', hexa: '#54a335' },
    { color: 'green', value: '7', hexa: '#54a335' },
    { color: 'green', value: '8', hexa: '#54a335' },
    { color: 'green', value: '8', hexa: '#54a335' },
    { color: 'green', value: '9', hexa: '#54a335' },
    { color: 'green', value: '9', hexa: '#54a335' },
    { color: 'green', value: 'Plus2', hexa: '#54a335' },
    { color: 'green', value: 'Plus2', hexa: '#54a335' },
    { color: 'green', value: 'Reverse', hexa: '#54a335' },
    { color: 'green', value: 'Reverse', hexa: '#54a335' },
    { color: 'green', value: 'Skip', hexa: '#54a335' },
    { color: 'green', value: 'Skip', hexa: '#54a335' },
    { color: 'blue', value: '0', hexa: '#0154a4' },
    { color: 'blue', value: '1', hexa: '#0154a4' },
    { color: 'blue', value: '1', hexa: '#0154a4' },
    { color: 'blue', value: '2', hexa: '#0154a4' },
    { color: 'blue', value: '2', hexa: '#0154a4' },
    { color: 'blue', value: '3', hexa: '#0154a4' },
    { color: 'blue', value: '3', hexa: '#0154a4' },
    { color: 'blue', value: '4', hexa: '#0154a4' },
    { color: 'blue', value: '4', hexa: '#0154a4' },
    { color: 'blue', value: '5', hexa: '#0154a4' },
    { color: 'blue', value: '5', hexa: '#0154a4' },
    { color: 'blue', value: '6', hexa: '#0154a4' },
    { color: 'blue', value: '6', hexa: '#0154a4' },
    { color: 'blue', value: '7', hexa: '#0154a4' },
    { color: 'blue', value: '7', hexa: '#0154a4' },
    { color: 'blue', value: '8', hexa: '#0154a4' },
    { color: 'blue', value: '8', hexa: '#0154a4' },
    { color: 'blue', value: '9', hexa: '#0154a4' },
    { color: 'blue', value: '9', hexa: '#0154a4' },
    { color: 'blue', value: 'Plus2', hexa: '#0154a4' },
    { color: 'blue', value: 'Plus2', hexa: '#0154a4' },
    { color: 'blue', value: 'Reverse', hexa: '#0154a4' },
    { color: 'blue', value: 'Reverse', hexa: '#0154a4' },
    { color: 'blue', value: 'Skip', hexa: '#0154a4' },
    { color: 'blue', value: 'Skip', hexa: '#0154a4' },
    { color: 'yellow', value: '0', hexa: '#ebcf25' },
    { color: 'yellow', value: '1', hexa: '#ebcf25' },
    { color: 'yellow', value: '1', hexa: '#ebcf25' },
    { color: 'yellow', value: '2', hexa: '#ebcf25' },
    { color: 'yellow', value: '2', hexa: '#ebcf25' },
    { color: 'yellow', value: '3', hexa: '#ebcf25' },
    { color: 'yellow', value: '3', hexa: '#ebcf25' },
    { color: 'yellow', value: '4', hexa: '#ebcf25' },
    { color: 'yellow', value: '4', hexa: '#ebcf25' },
    { color: 'yellow', value: '5', hexa: '#ebcf25' },
    { color: 'yellow', value: '5', hexa: '#ebcf25' },
    { color: 'yellow', value: '6', hexa: '#ebcf25' },
    { color: 'yellow', value: '6', hexa: '#ebcf25' },
    { color: 'yellow', value: '7', hexa: '#ebcf25' },
    { color: 'yellow', value: '7', hexa: '#ebcf25' },
    { color: 'yellow', value: '8', hexa: '#ebcf25' },
    { color: 'yellow', value: '8', hexa: '#ebcf25' },
    { color: 'yellow', value: '9', hexa: '#ebcf25' },
    { color: 'yellow', value: '9', hexa: '#ebcf25' },
    { color: 'yellow', value: 'Plus2', hexa: '#ebcf25' },
    { color: 'yellow', value: 'Plus2', hexa: '#ebcf25' },
    { color: 'yellow', value: 'Reverse', hexa: '#ebcf25' },
    { color: 'yellow', value: 'Reverse', hexa: '#ebcf25' },
    { color: 'yellow', value: 'Skip', hexa: '#ebcf25' },
    { color: 'yellow', value: 'Skip', hexa: '#ebcf25' },
    { color: 'black', value: 'Plus4', hexa: '#090909' },
    { color: 'black', value: 'Plus4', hexa: '#090909' },
    { color: 'black', value: 'Plus4', hexa: '#090909' },
    { color: 'black', value: 'Plus4', hexa: '#090909' },
    { color: 'black', value: 'Joker', hexa: '#090909' },
    { color: 'black', value: 'Joker', hexa: '#090909' },
    { color: 'black', value: 'Joker', hexa: '#090909' },
    { color: 'black', value: 'Joker', hexa: '#090909' }
];
// Un tableau pour stocker les cartes dans le jeux
let discardPile = [
];
// Un objet qui stock les données du tour
let turn = {};

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
        // Reremplir le deck de base
        deck = [
            { color: 'red', value: '0', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: '1', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: '1', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: '2', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: '2', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: '3', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: '3', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: '4', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: '4', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: '5', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: '5', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: '6', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: '6', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: '7', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: '7', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: '8', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: '8', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: '9', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: '9', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: 'Plus2', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: 'Plus2', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: 'Reverse', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: 'Reverse', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: 'Skip', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'red', value: 'Skip', hexa: '#ba2736', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '0', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '1', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '1', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '2', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '2', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '3', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '3', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '4', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '4', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '5', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '5', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '6', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '6', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '7', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '7', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '8', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '8', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '9', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: '9', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: 'Plus2', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: 'Plus2', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: 'Reverse', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: 'Reverse', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: 'Skip', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'green', value: 'Skip', hexa: '#54a335', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '0', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '1', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '1', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '2', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '2', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '3', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '3', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '4', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '4', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '5', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '5', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '6', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '6', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '7', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '7', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '8', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '8', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '9', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: '9', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: 'Plus2', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: 'Plus2', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: 'Reverse', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: 'Reverse', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: 'Skip', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'blue', value: 'Skip', hexa: '#0154a4', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '0', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '1', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '1', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '2', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '2', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '3', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '3', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '4', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '4', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '5', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '5', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '6', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '6', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '7', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '7', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '8', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '8', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '9', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: '9', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: 'Plus2', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: 'Plus2', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: 'Reverse', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: 'Reverse', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: 'Skip', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'yellow', value: 'Skip', hexa: '#ebcf25', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'black', value: 'Plus4', hexa: '#090909', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'black', value: 'Plus4', hexa: '#090909', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'black', value: 'Plus4', hexa: '#090909', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'black', value: 'Plus4', hexa: '#090909', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'black', value: 'Joker', hexa: '#090909', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'black', value: 'Joker', hexa: '#090909', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'black', value: 'Joker', hexa: '#090909', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) },
            { color: 'black', value: 'Joker', hexa: '#090909', rotate: Math.floor(Math.random() * 360), mLeft: Math.floor(Math.random() * (45)), mTop: Math.floor(Math.random() * (40)) }
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
            if (_player[0].cards[i].color === card.color && _player[0].cards[i].value === card.value) {
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
    });
    // ***************************************************************** Piocher une carte
    socket.on('draw', _player => {
        _player[0].cards.push(deck.pop())

        let _players = players.filter(p => p.id !== _player[0].id);
        _players.push(_player[0])

        players = _players
        // On met a jour l'état de la main du joueur
        MiseAJourStatePlayers();
    });
    // ***************************************************************** Lancement de la partie
    socket.on('start game', () => {
        discardPile.push(deck.pop())
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
    // ***************************************************************** Envoie la discardPile
    socket.on('getDiscardPile', () => {
        socket.emit('discardPile', discardPile);
    });
});

http.listen(5000, () => {
    console.log('Le serveur écoute sur le port 5000');
});