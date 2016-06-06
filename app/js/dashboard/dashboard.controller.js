module.exports = function (DashBoardService, $mdToast, Socket) {
    var self = this;
    self.games = {};
    self.game = {};

    self.setGame = function (game) {
        //Parse the whole JSON object
        self.game = game;
    };

    DashBoardService.getGames(function (result) {
        if (result.statusText == 'OK') {
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
    self.joinGame = function (id) {
        console.log(id);
        DashBoardService.joinGame(id, function (result) {
            if (result.statusText == 'OK') {
                $mdToast.show($mdToast.simple().textContent('Joined game'));
            }
            else {
                $mdToast.show($mdToast.simple().textContent(result.data.message));
            }
        });
    };
};