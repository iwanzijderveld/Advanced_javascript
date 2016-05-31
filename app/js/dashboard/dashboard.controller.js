module.exports = function (DashBoardService) {
    var self = this;
    self.games = {};
    
    DashBoardService.setCredentials(id);

    DashBoardService.getGames(function (result) {
        if (result.statusText == 'OK') {
            console.log(result.data);
            self.games = result.data;
        }
        else {
            console.log('Error');
        }
    });
    
    DashBoardService.getGame(function (result) {
        if (result.statusText == 'OK') {
            console.log(result.data);
            self.games = result.data;
        }
        else {
            console.log('Error');
        }
    });
    
};