module.exports = function (DashBoardService) {
    var self = this;
    self.games = {};
    self.game = {};

    self.setGame = function (game) {
        //Parse the whole JSON object
        self.game = game;
    };
    DashBoardService.getGames(function (result) {
        if (result.statusText == 'OK') {
            console.log(result.data);
            self.games = result.data;
        }
        else {
            console.log('Error');
        }
    });

    self.getGame = function (game) {
        console.log(game.id);
        DashBoardService.getGame(game.id, function (result) {
            if (result.statusText == 'OK') {
                console.log(result.data);
                self.game = result.data;
            }
            else {
                console.log('Error');
            }
        });
    };
};