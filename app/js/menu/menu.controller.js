module.exports = function ($scope, AuthenticationService, DashBoardService, $mdToast, $mdDialog, $window) {
    this.self = this;

    this.self.minPlayers = 1;
    this.self.maxPlayers = 32;
    this.self.players = [];
    this.self.gameTemplates = ["Snake", "Ox", "Dragon", "Shanghai", "Monkey", "Ram", "Rooster"];
    // this.self.lobby = [
    //     {
    //         title: 'Games',
    //         games: [{ title: 'open' }],
    //         allPlayers: true
    //     },
    //     {
    //         title: 'My games',
    //         games: [{ title: 'open' },
    //             { title: 'playing' }],
    //         allPlayers: false
    //     },
    //     {
    //         title: 'Spectate',
    //         games: [{ title: 'playing' }],
    //         allPlayers: true
    //     },
    //     {
    //         title: 'History',
    //         games: [{ title: 'finished' }],
    //         allPlayers: true
    //     }
    // ];

    
    //Start dataTable
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
  $scope.limitOptions = [5, 10, 15
//   , {
//     label: 'All',
//     value: function () {
//       return $scope.DashC.games ? $scope.DashC.games.length : 0;
//     }}
];

  $scope.query = {
    order: 'createdOn',
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

  $scope.log = function (item) {
    console.log(item.name, 'was selected');
  };

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
            controller: 'MenuController as MenuC',
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
                $window.location.reload();
            }
            else {
                console.log(result);
            }
        });
    };
};