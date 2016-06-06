module.exports = function ($mdToast) {
    var socket;
    var factory = {};

    factory.connectGame = function (id) {
        socket = io.connect('http://mahjongmayhem.herokuapp.com?gameId=' + id);
        console.log("Connected");
    };

    socket.on('start', function () {
        console.log("game 141 started");
    });
    factory.connectGame(141);

    return factory;
};