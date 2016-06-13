module.exports = function (GameService, $stateParams ) {
    var self = this;
    self.tiles = {};
    self.deletedTiles = {};
    self.tempTile = undefined;
    self.players = {}; // ik heb dit toegevoegd voor lijst met spelers

    //DIT IS EEN VOORBEELD VOOR HOE JE DE MATCHED TILES OPSLAAT     
    self.matchedPlayerTiles = [
        {
            username: 'Joost Vermeulen',
            tiles: [{ tileObject: 'Wind-West' },
                { tileObject: 'Season-Summer' }]
        },
        {
            username: 'Niels Snakenborg',
            tiles: [{ tileObject: 'Wind-West' },
                { tileObject: 'Bamboo-7' },
                { tileObject: 'Season-Winter' },
                { tileObject: 'Circle-3' }]
         }
    ];

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

    //zoals ik bij service zei, miss via dashboard ophalen, is duplicated functie
    GameService.getGame($stateParams.id, function (result) {
        if (result.statusText == 'OK') {
            self.players = result.data;
        } else {
            console.log(result.data.message);
        }
    });

    //zoals ik bij service zei, miss via dashboard ophalen, is duplicated functie
    GameService.getGame($stateParams.id, function (result) {
        if (result.statusText == 'OK') {
            self.players = result.data;
        } else {
            console.log(result.data.message);
        }
    });
     self.getValidTiles = function (username) {
        for (i = 0; i < self.matchedPlayerTiles.length; i++) {
            if ( self.matchedPlayerTiles[i].username == username) {
                return self.matchedPlayerTiles[i].tiles;
            }
        }
    };

};