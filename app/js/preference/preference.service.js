module.exports = function($rootScope){
    var service = {};

    getThemePreference = function () {
        return localStorage.getItem('Theme');
    };

    getBlockThemePreference = function () {
        return localStorage.getItem('BlockTheme');
    };

    service.preferenceHandler = function () {
        $rootScope.BlockStyle = getBlockThemePreference();
    };

    
    return service;
};