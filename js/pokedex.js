var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}])

<!-- Contrôleur avec une liste de pokemon initialisée pour le test -->
pokeApp.controller('listpokem', ['$scope', '$log', function ($scope, $log) {
    $scope.mypokemonlist = [{"id": "1", "name": "sangoku"},
        {"id": "2", "name": "vegeta"},
        {"id": "3", "name": "bougboug"},
        {"id": "4", "name": "berus"},
        {"id": "5", "name": "sangoten"}]

    //apres le bouton ok
    $scope.selection = function(){
        $log.warn($scope.select);
    }
}])

