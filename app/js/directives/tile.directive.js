module.exports = function () {
    return {
        restrict: 'E',
        link: function (scope, element) {
            var tile = scope.tile;

            element.css({ 'left': (tile.xPos) * 37 + 'px', 'top': tile.yPos * 45.5 + 'px', 'z-index': tile.zPos });
            if (scope.tile.zPos > 0) {
                element.css({ 'left': ((tile.xPos) * 37 + (tile.zPos * 3)) + 'px', 'top': (tile.yPos * 45.5 - (tile.zPos * 3)) + 'px' })
            }
            var className = tile.tile.suit + "-" + tile.tile.name;
            element.addClass(className)
        }
    };
};