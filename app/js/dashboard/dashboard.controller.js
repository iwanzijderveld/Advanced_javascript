module.exports = function (DashBoardService, $mdToast, $state, Socket, $rootScope,$scope) {
    var self = this;
    self.games = {};
    self.game = {};

    $scope.setGameStateFilter = function(gameState){
        $scope.gameStateFilter = gameState;
    }

    $scope.options = {
        rowSelection: false,
        multiSelect: false,
        autoSelect: false,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: false,
        limitSelect: true,
        pageSelect: false
    };

    $scope.selected = [];
    $scope.limitOptions = [5, 10, 15,{
        label: 'All',
        value: function () {
          return self.games ? self.games.length : 0;
        }
    }];

    $scope.query = {
        order: '-createdOn',
        limit: 10,
        page: 1
    };
    
    $scope.toggleLimitOptions = function () {
        $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
    };
    
    $scope.onPaginate = function(page, limit) {
        console.log('Scope Page: ' + $scope.query.page + ' Scope Limit: ' + $scope.query.limit);
        console.log('Page: ' + page + ' Limit: ' + limit);
        $scope.promise = $timeout(function () {
        }, 2000);
    };

    $scope.logOrder = function (order) {
        console.log('order: ', order);
    };
    
    $scope.log = function (item) {
        console.log(item.name, 'was selected');
    };

    $scope.playing = false;
    self.setGame = function (game) {
        //Parse the whole JSON object
        self.game = game;
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
                var socket = Socket.connectGame(id);
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