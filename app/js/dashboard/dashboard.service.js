module.exports = function ($http) {
    var api = {
        url: 'http://mahjongmayhem.herokuapp.com',
        games: '/games',
        players: '/players',
        id: null
    }
    var game = {
        template: null,
        minPlayers: null,
        maxPlayers: null
    }
    var service = {};

    service.setCredentials = function (id) {
        api.id = id;
        console.log(api.id);
    };

    service.setGameSettings = function (template, minPlayers, maxPlayers) {
        game.template = template;
        game.minPlayers = minPlayers;
        game.maxPlayers = maxPlayers;
        console.log(template + minPlayers + maxPlayers);
    };

    /**
     * pageSize: games on a page
     * pageIndex: which page to go
     * createdBy: filter game on name creater
     * player: filter player in game
     * gameTemplate: filter game template
     * state: game state filter
     */
    service.getGames = function (callback) {
        $http.get(api.url + api.games)
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    service.getGame = function (id, callback) {
        $http.get(api.url + api.games + '/' + id)
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };


    service.addGame = function (callback) {
        $http.post(api.url + api.games, { templateName: game.template, minPlayers: game.minPlayers, maxPlayers: game.maxPlayers })
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    service.joinGame = function (id, callback) {
        $http.post(api.url + api.games + '/' + id + api.players)
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    service.startGame = function (id, callback) {
        $http.post(api.url + api.games + '/' + id + '/start')
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };


    return service;
};