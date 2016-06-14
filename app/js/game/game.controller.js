module.exports = function (GameService, $stateParams, $filter) {
    var self = this;
    self.tiles = {};
    self.tempTile = undefined;
    self.players = {}; // ik heb dit toegevoegd voor lijst met spelers
    self.matchedTiles = {};

    GameService.getTiles($stateParams.id, function (result) {
        if (result.statusText == 'OK') {
            self.tiles = result.data;
        } else {
            console.log(result.data.message);
        }
    });

    self.clickHandler = function (tile) {
        if (self.tempTile != undefined) {
            GameService.matchTiles($stateParams.id, self.tempTile, tile, function (result) {
                if (result.statusText == 'OK') {
                    console.log("MATCH");
                    // Delete first before setting it to undefined again
                    _deleteTileFromBoard(tile);
                    _deleteTileFromBoard(self.tempTile);
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

    //zoals ik bij service zei, miss via dashboard ophalen, is duplicated functie
    GameService.getGame($stateParams.id, function (result) {
        if (result.statusText == 'OK') {
            self.players = result.data;
            console.log(result.data);
        } else {
            console.log(result.data.message);
        }
    });
    // get matched tiles 
    GameService.getMatchedTiles($stateParams.id, function (result) {
        if (result.statusText == 'OK') {
            self.matchedTiles = result.data;
            self.matchedTiles.forEach(function (tile) {
                console.log(tile);
                _deleteTileFromBoard(tile);
            }, this);
        } else {
            console.log(result.data.message);
        }
    })

    function _deleteTileFromBoard(tile) {
        // get the tile with the same id from the tilelist
        var tileToDelet = $filter('tileById')(self.tiles, tile._id);
        // now get indexof tileToDelet and splice list;
        self.tiles.splice(self.tiles.indexOf(tileToDelet), 1);
        // ^^ HEEFT waarschijnlijk nog een check nodig of de tile niet al verwijderd is. null return
    };

    self.getValidTiles = function (username) {
        for (i = 0; i < self.matchedPlayerTiles.length; i++) {
            if (self.matchedPlayerTiles[i].username == username) {
                return self.matchedPlayerTiles[i].tiles;
            }
        }
    };

};