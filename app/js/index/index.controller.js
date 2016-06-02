module.exports = function (AuthenticationService, DashBoardService, $mdToast, $mdDialog) {
    this.self = this;

    this.self.minPlayers = 2;
    this.self.maxPlayers = 32;
    this.self.templates = {
        0: { name: 'Ox' },
        1: { name: 'Dragon' },
        2: { name: 'Rooster' }
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

    this.self.addGame = function (game) {
        DashBoardService.addGame(game.template, game.minPlayers, game.maxPlayers, function (result) {
            if (result.statusText == 'OK') {
                console.log(result.data);
                $mdToast.show($mdToast.simple().textContent('Nieuwe game aangemaakt'));
                this.self.closeAddGame();
            }
            else {
                console.log(result);
            }
        });
    };
};