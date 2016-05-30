module.exports = function (AuthenticationService) {
    this.self = this;
    this.self.goToLogin = function () {
        AuthenticationService.goToLogin();
    }
    this.self.logOut = function () {
        console.log("Uitloggen");
        AuthenticationService.logOut();
    }
};