module.exports = function (DashBoardService, $mdToast, $state, Socket, $rootScope) {
    var self = this;
    self.games = {};
    self.game = {};


    $rootScope.playing = false;
    self.setGame = function (game) {
        //Parse the whole JSON object
        self.game = game;
        var socket = Socket.connectGame(game.id);
    };

    self.getGames = function () {
        DashBoardService.getGames(function (result) {
            if (result.statusText == 'OK') {
                self.games = result.data;
                console.log(self.games);
            }
            else {
                $mdToast.show($mdToast.simple().textContent(result.data.message));
            }
        });
    };

    self.getGame = function (id) {
        console.log(id);
        DashBoardService.getGame(id, function (result) {
            if (result.statusText == 'OK') {
                console.log(result.data);
                self.game = result.data;

            }
            else {
                $mdToast.show($mdToast.simple().textContent(result.data.message));
            }
        });
    };

    self.startGame = function (gameId) {
        DashBoardService.startGame(gameId, function (result) {
            if (result.statusText == 'OK') {
                $mdToast.show($mdToast.simple().textContent("Game Started!"));
                $state.go('app.game', { id: gameId });
            }
            else {
                $mdToast.show($mdToast.simple().textContent(result.data.message));
            }
        })
    };

    self.joinGame = function (id) {
        console.log(id);
        DashBoardService.joinGame(id, function (result) {
            if (result.statusText == 'OK') {
                $mdToast.show($mdToast.simple().textContent('Joined game!'));
                self.getGame(id);
                self.getGames();
            }
            else {
                $mdToast.show($mdToast.simple().textContent(result.data.message));
            }
        });
    };

    self.playGame = function (gameId) {
        DashBoardService.getGame(gameId, function (result) {
            console.log(result);
            if (result.statusText == 'OK') {
                $mdToast.show($mdToast.simple().textContent("Playing game!"));
                $state.go('app.game', { id: gameId });
            }
            else {
                $mdToast.show($mdToast.simple().textContent(result.data.message));
            }
        })
    };

    self.spectateGame = function (gameId) {
        DashBoardService.getGame(gameId, function (result) {
            console.log(result);
            if (result.statusText == 'OK') {
                $mdToast.show($mdToast.simple().textContent("Spectating game!"));
                $state.go('app.game', { id: gameId });
            }
            else {
                $mdToast.show($mdToast.simple().textContent(result.data.message));
            }
        })
    };

    // Kan ook via filter -- Kan weg als we geen tabs meer gebruiken
    self.setList = function (game, allPlayers, username) {
        var isUser;
        if (!allPlayers) {
            for (i = 0; i < game.players.length; i++) {
                if (game.players[i]._id == username) {
                    isUser = true;
                }
            }
        } else {
            isUser = true;
        }
        return isUser;
    };

    self.playerExists = function (game, username) {
        for (i = 0; i < game.players.length; i++) {
            if (game.players[i]._id == username) {
                return true
            }
        }
    };

    // Load data automatically when the user opens page
    self.getGames();
};