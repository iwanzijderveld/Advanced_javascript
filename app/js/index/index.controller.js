module.exports = function ($scope, AuthenticationService, DashBoardService, $mdToast, $mdDialog, $location) {
    
  $scope.limitOptions = [5, 10, 15];
  
  $scope.query = {
    // order: 'name',
    limit: 5,
    page: 1
  };

    this.self = this;

    this.self.minPlayers = 2;
    this.self.maxPlayers = 32;
    this.self.isDashboard = $location.path() === '/dashboard';
    this.self.players = [];
    this.self.gameTemplates = ["Snake", "Ox", "Dragon", "Shanghai", "Monkey", "Ram", "Rooster"];
    this.self.lobby = [
        {
            title: 'Games',
            games: [{ title: 'open' }],
            allPlayers: true
        },
        {
            title: 'My games',
            games: [{ title: 'open' },
                { title: 'playing' }],
            allPlayers: false
        },
        {
            title: 'Spectate',
            games: [{ title: 'playing' }],
            allPlayers: true
        },
        {
            title: 'History',
            games: [{ title: 'finished' }],
            allPlayers: true
        }
    ];

    for (i = this.self.minPlayers; i < this.self.maxPlayers + 1; i++) {
        this.self.players.push(i);
    }

    this.self.goToLogin = function () {
        AuthenticationService.goToLogin();
    };

    this.self.logOut = function () {
        console.log("Uitloggen");
        AuthenticationService.logOut();
    };

    this.self.goToDashboard = function () {
        AuthenticationService.goToDashboard();
    };

    this.self.showAddGame = function () {
        $mdDialog.show({
            templateUrl: 'views/dashboard/add_game.html',
            controller: 'IndexController as IndexC',
            parent: angular.element(document.body),
            clickOutsideToClose: false
        });
    };
    this.self.goToPref = function () {
        $mdDialog.show({
            templateUrl: 'views/preference/preferences.html',
            controller: 'PreferenceController as PrefC',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    }
    this.self.closeAddGame = function () {
        $mdDialog.hide();
    }
    this.self.addGame = function () {
        DashBoardService.setGameSettings($scope.game.template, $scope.game.minPlayers, $scope.game.maxPlayers);

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