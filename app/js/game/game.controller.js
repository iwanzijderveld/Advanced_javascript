module.exports = function (GameService, $stateParams, $filter, Socket, $rootScope, $mdToast) {
    var self = this;
    self.tiles = {};
    self.tempTile = undefined;
    self.players = {}; // ik heb dit toegevoegd voor lijst met spelers
    self.matchedTiles = {};
    $rootScope.playing = true;

    var socket = Socket.connectGame($stateParams.id);
    socket.on('match', function (data) {
        _deleteTileFromBoard(data[0]);
        _deleteTileFromBoard(data[1]);
        _getMatchedTiles();
    });

    GameService.getTiles($stateParams.id, function (result) {
        if (result.statusText == 'OK') {
            self.tiles = result.data;
        } else {
            console.log(result.data.message);
        }
    });
    self.clickHandler = function (tile) {
        if (_isPlayer()) {
            // second click so check if it is valid
            if (self.tempTile != undefined) {
                GameService.matchTiles($stateParams.id, self.tempTile, tile, function (result) {
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
            // first click
            else {
                self.tempTile = tile;
            }
        }
        else{
            $mdToast.show($mdToast.simple().textContent("Spectaters cant play"));
        }
    };

    function _isPlayer() {
        return $filter('spectate')(self.players, $rootScope.username);
    }

    //zoals ik bij service zei, miss via dashboard ophalen, is duplicated functie
    GameService.getGame($stateParams.id, function (result) {
        if (result.statusText == 'OK') {
            self.players = result.data;
            console.log(result.data);
            console.log(_isPlayer());
        } else {
            console.log(result.data.message);
        }
    });

    _getMatchedTiles();

    function _getMatchedTiles() {
        // get matched tiles 
        GameService.getMatchedTiles($stateParams.id, function (result) {
            if (result.statusText == 'OK') {
                self.matchedTiles = result.data;
            } else {
                console.log(result.data.message);
            }
        })
    };

    function _deleteTileFromBoard(tile) {
        // get the tile with the same id from the tilelist
        var tileToDelet = $filter('tileById')(self.tiles, tile._id);

        if (tileToDelet != null) {
            // now get indexof tileToDelet and splice list;
            var index = self.tiles.indexOf(tileToDelet);
            self.tiles.splice(index, 1);
            // ^^ HEEFT waarschijnlijk nog een check nodig of de tile niet al verwijderd is. null return
        }
    };

    self.getValidTiles = function (username) {
        for (i = 0; i < self.matchedPlayerTiles.length; i++) {
            if (self.matchedPlayerTiles[i].username == username) {
                return self.matchedPlayerTiles[i].tiles;
            }
        }
    };

};