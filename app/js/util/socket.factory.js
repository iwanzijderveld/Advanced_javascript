module.exports = function ($mdToast) {
    // var socket = io('http://mahjongmayhem.herokuapp.com?gameId=5755606a75c3971100c2c3c0');
    var service = {};
    var gameid;

    service.connectGame = function (id) {
        socket = io('http://mahjongmayhem.herokuapp.com?gameId=' + id);
        console.log(socket);
        console.log("Connected");
        gameid = id;
    };

    service.connectGame("5755595475c3971100c2c32f");

    socket.on('start', function () {
        console.log('game' + gameid + 'started');
    });

    return service;
};