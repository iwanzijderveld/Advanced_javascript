module.exports = function ($scope, $mdDialog) {
    console.log('show dialog')
    $mdDialog.show({
        templateUrl: 'views/login/login.html',
        controller: 'IndexController as IndexC',
        parent: angular.element(document.body),
        clickOutsideToClose: false
    });
};