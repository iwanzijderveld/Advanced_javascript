module.exports = function(){
    var service = {};

    service.getThemePreference = function () {
        return localStorage.getItem('Theme');
    };

    service.getBlockThemePreference = function () {
        return localStorage.getItem('BlockTheme');
    };

    
    return service;
};