module.exports = function ($rootScope, $window, $state) {
    var service = {};
    var _local = {
        landingRoute: 'landing',
        authRoute: 'app.callback',
        token: null,
        username: null,
        state: 'LoggedOut'
    };

    service.setCredentials = function (username, token) {
        $rootScope.username = username;
        $rootScope.token = token;
        $rootScope.loggedin = true;

        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        localStorage.setItem("State", "Loggedin");
        // Safe LOCALs
        _local.state = 'Loggedin';
        _local.username = username;
        _local.token = token;

        // go to dashboard
        $state.go('app.dashboard');
    };

    service.goToLogin = function () {
        console.log("go to API login");
        localStorage.setItem('State', "APILogin");
        $window.location.href = "http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=http://localhost:3000/%23/authcallback";
    };

    service.logOut = function () {
        $rootScope.username = null;
        $rootScope.token = null;
        $rootScope.loggedin = false;
        _local.token = null;
        localStorage.setItem("State", "LoggedOut");
        localStorage.clear();
        service.isLoggedIn();
        $state.go(_local.landingRoute);
    };
    service.authHandler = function (event, next) {
        console.log(_local.landingRoute);
        if (service.isLoggedIn() && next.url != _local.landingRoute) {
            event.preventDefault();
            $state.go(_local.landingRoute);
        }
        else if (_local.state == 'APILogin' && next.name == _local.authRoute) {
            return;
        }
        else if (_local.state == 'Loggedin') {
            return;
        }
    };
    service.isLoggedIn = function () {
        console.log('is logged in', _local.token !== null);
        return _local.token !== null;
    };
    /**
         * On Initialization, prepare the previously stored data for use
         */
    (function PrepareAuthentication() {
        // FIRST VERIFY THE STATE OF THE CLIENT | LOGGED IN OR NOT LOGGED IN ?
        _local.state = localStorage.getItem("State");

        if (localStorage.getItem('token') != null) { // Check if the user is logged or not
            _local.state = "Loggedin";
            _local.token = localStorage.getItem("token");
            _local.username = localStorage.getItem("username");
        }
        else{
            service.logOut();
        }
    })();

    return service;
};