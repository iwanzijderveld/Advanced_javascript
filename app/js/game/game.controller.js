module.exports = function (GameService, $stateParams) {
    var self = this;
    self.tiles = {};

    self.gameDetails = "Iwan van Zijderveld";
    GameService.getTiles($stateParams.id, function (result) {
        if (result.statusText == 'OK') {
            self.tiles = result.data;
        } else {
            console.log(result.data.message);
        }
    });
};