module.exports = function ($http) {
    var api = {
        url: 'http://mahjongmayhem.herokuapp.com/',
        games: 'games',
        id: null
    }
    var service = {};

    service.setCredentials = function (id) {
       api.id = id;
       console.log(api.id);
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
    
    service.getGame = function (callback) {
        $http.get(api.url + api.games+'/'+api.id)
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };


    return service;
};