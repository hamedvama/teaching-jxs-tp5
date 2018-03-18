var pokeApp = angular.module('POKEDEX', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEDEX', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}])


<!-- Contrôleur avec une liste de pokemon initialisée pour le test -->

.controller('pokemonSearch',['$scope','$log', function($scope,$log) {
    $scope.pokemons=[{id: '1', name: 'pidgeot'},{id:'2',name:'charmander'},{id:'3',name:'charizard'},{id:'4',name:'wartortle'},
        {id:'5',name:'blastoise'},{id:'6',name:'butterfree'},{id: '7', name: 'pidgey'}];
    $scope.logInfo = function()
    {$log.log($scope.selection);
        $log.info($scope.selection);
    };
}])

<!-- Resources permettant d'acceder a l'API pokemon -->
pokeApp.factory('pokeresource', function ($resource) {
    return $resource('https://pokeapi.co/api/v2/pokemon/:pokeid', {pokeid: '@id'},
        {
            queryAll: {
                url: 'https://pokeapi.co/api/v2/pokemon/',
                method: 'GET',
                cache: false,
                isArray: false
            }
        })
})
<!-- Contrôleur permettant de recuperer tous les pokemons en utilisant la ressource -->
pokeApp.controller('listpokeappi', ['$scope', 'pokeresource', '$log', function ($scope, pokeresource, $log) {

    pokeresource.queryAll().$promise.then(function (value) {
        $scope.resultatresource = value.results;
        $log.warn($scope.resultatresource);
    });
}])

pokeApp.controller('reqhttp', function ($scope, $http) {
    $http({
        method : "GET",
        url : "https://pokeapi.co/api/v2/pokemon/"
    }).then(function mySuccess(response) {
        $scope.resultat = response.data.results;
        console.log("les objets")
        console.log($scope.resultat);
    }, function eError(response) {
        $scope.resultat = response.statusText;
    });
    $scope.fselectionner = function () {
        console.log($scope.selectionner.url);
        $http({
            method : 'GET',
            url : $scope.selectionner.url
        }).then(function mySuccess(response) {
            $scope.resultatp = response.data.moves;
            console.log($scope.resultatp);
        }, function eError(response) {
            $scope.resultatp = response.statusText;
        })
    }
});
