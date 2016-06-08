module.exports = function () {
    var service = {};
    var _api = {
        base: 'http://mahjongmayhem.herokuapp.com',
        game:
        {
            base: '/games',
            start: '/start',
            players: '/players',
            tiles: '/tiles'
        }
    };
    function _gameBase(id) {
        return _api.base + _api.game.base + '/' + id;
    };
    service.tiles = function (id) {
        return _gameBase(id) + _api.game.tiles;
    };

    service.games = function () {
        return _api.base + _api.game.base;
    };

    service.game = function (id) {
        return _gameBase(id);
    };

    service.gamePlayers = function (id) {
        return _gameBase(id) + api.game.players
    };
    service.gameStart = function (id) {
        return _gameBase(id) + _api.game.start;
    };
    return service;
};