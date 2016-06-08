module.exports = function ($http, APIService) {
    var service = {};

    service.getTiles = function (id, callback) {
        console.log("get tiles for: " + id);
        $http.get(APIService.tiles(id))
            .then(function (result) {
                callback(result);
            }, function (error) {
                callback(error);
            });
        console.log(APIService.tiles(id));
    };

    return service;
};