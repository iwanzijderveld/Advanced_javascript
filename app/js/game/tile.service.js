module.exports = function () {
    var service = {};

    service.easyVerification = function (tile1, tile2) {
        console.log(tile1);
        if (_sameid(tile1._id, tile2._id)) {
            console.log("cant match with the same tile");
        }
        // else if (_canMatch(tile1, tile2) == false) {
        //     console.log("Tiles are not from the same sort");
        // }
    }

    function _sameid(id1, id2) {
        return id1 === id2;
    }
    /*
    // geeft error WTF?
    function _canMatch(tile1, tile2) {
        if (tile1.tile.matchesWholeSuit && tile2.tile.matchesWholeSuit) {
            return tile1.tile.suit === tile2.tile.suit;
        }
        else if (tile1.tile.suit === tile2.tile.suit) {
            return tile1.tile.name === tile2.tile.name;
        }
        else {
            return false;
        }
    }
*/
    return service;
};