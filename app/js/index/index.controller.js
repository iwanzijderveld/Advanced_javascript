module.exports = function ($scope, AuthenticationService, DashBoardService, $mdToast, $mdDialog, $state) {
    this.self = this;

    this.self.minPlayers = 2;
    this.self.maxPlayers = 32;

    this.self.players = [];
    this.self.gameTemplates = ["Snake", "Ox", "Dragon", "Shanghai", "Monkey", "Ram", "Rooster"];

    for (i = 2; i < 33; i++) {
        this.self.players.push(i);
    }

    this.self.goToLogin = function () {
        AuthenticationService.goToLogin();
    };

    this.self.logOut = function () {
        console.log("Uitloggen");
        AuthenticationService.logOut();
    };

    this.self.showAddGame = function () {
        $mdDialog.show({
            templateUrl: 'views/add_game.html',
            controller: 'IndexController as IndexC',
            parent: angular.element(document.body),
            clickOutsideToClose: false
        });
    };
    this.self.closeAddGame = function () {
        $mdDialog.hide();
    }
    this.self.addGame = function () {
        DashBoardService.setGameSettings("Ox", $scope.game.minPlayers, $scope.game.maxPlayers);

        DashBoardService.addGame(function (result) {
            if (result.statusText == 'OK') {
                console.log(result.data);
                $mdToast.show($mdToast.simple().textContent('Nieuwe game aangemaakt'));
                $mdDialog.hide();
                $state.go('app.dashboard');
            }
            else {
                console.log(result);
            }
        });
    };
};