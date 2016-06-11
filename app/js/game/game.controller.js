module.exports = function (GameService, $stateParams, ) {
    var self = this;
    self.tiles = {};
    self.deletedTiles = {};
    self.tempTile = undefined;

    self.gameDetails = "Iwan van Zijderveld";
    GameService.getTiles($stateParams.id, function (result) {
        if (result.statusText == 'OK') {
            self.tiles = result.data;
        } else {
            console.log(result.data.message);
        }
    });

    self.clickHandler = function (tile) {
        if (self.tempTile != undefined) {
            GameService.matchedTiles($stateParams.id, self.tempTile, tile, function (result) {
                if (result.statusText == 'OK') {
                    console.log("MATCH");
                    self.tempTile = undefined;
                }
                else {
                    console.log(result.data.message);
                    self.tempTile = undefined;
                }
            });
        }
        else {
            self.tempTile = tile;
        }
    };
};