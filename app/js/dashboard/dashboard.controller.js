module.exports = function (DashBoardService) {
    var self = this;
    self.games = {};

    DashBoardService.getGames(function (result) {
        if (result.statusText == 'OK') {
            console.log(result.data);
            self.games = result.data;
        }
        else {
            console.log('Error');
        }
    });
};