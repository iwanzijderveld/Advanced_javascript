module.exports = function ($http) {
    var api = {
        url: 'http://mahjongmayhem.herokuapp.com/',
        games: 'games'
    }
    var service = {};
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


    return service;
};