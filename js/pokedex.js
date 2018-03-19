var pokeApp = angular.module('pokedex', ['ngResource']);

/**
 *
 * With this you can inject POKEAPI url wherever you want
 */
pokeApp.constant('pokedex', 'http://pokeapi.co');

<!-- Contrôleur avec une liste de pokemon initialisée pour le test -->

pokeApp.controller('listpokem', ['$scope', '$log', function ($scope, $log) {
    $scope.pokemons = [
        {id: '1', name: 'pidgeot'},
        {id: '2', name: 'charmander'},
        {id: '3', name: 'charizard'},
        {id: '4', name: 'wartortle'},
        {id: '5', name: 'blastoise'},
        {id: '6', name: 'butterfree'},
        {id: '7', name: 'pidgey'}];
    //le  clic sur le bouton ok dans la vue renvoie vers cette methode qui affiche le pokemenon selectionné sur la consolebouton
    $scope.selection = function () {
        $log.info($scope.select);
        $log.warn($scope.select);
        $log.log($scope.select);
    }
}]);

/**
 * Creation de directive //Name: {{customer.name}} Address: {{customer.address}}
 */
/*pokeApp.directive('Mavue',function () {
    return {template: 'Helle world'};
});*/


pokeApp.config(['$resourceProvider', function ($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

<!-- Contrôleur apermettant le data binding entre l'id saisi et le model -->
pokeApp.controller('pokNum', ['$scope', '$log', function ($scope, $log) {
    {
        $log.log($scope.id);
    };
}]);

<!-- Resources permettant d'acceder a l'API pokemon -->
pokeApp.factory('pokService', function ($resource) {
    return $resource('https://pokeapi.co/api/v2/pokemon/:pokeid', {pokeid: '@id'},
        {
            queryAll: {
                url: 'https://pokeapi.co/api/v2/pokemon/',
                method: 'GET',
                cache: false,
                isArray: false
            }
        })
});

<!-- Contrôleur permettant de recuperer tous les pokemons en utilisant la ressource -->

pokeApp.controller('listpokeappi', ['$scope', 'pokService', '$log', function ($scope, pokeresource, $log) {

    pokeresource.queryAll().$promise.then(function (value) {
        $scope.resultatresource = value.results;
        $log.warn($scope.resultatresource);
    });
}])
;

<!-- Contrôleur permettant le data binding entre l'id saisi et le model -->

pokeApp.controller('pokNum', ['$scope', function ($scope) {

}]);

<!-- controlleur permettant la recupération des pokemons à partir  du service $http -->

pokeApp.controller('pokemonListHttp', ['$scope', '$http', function ($scope, $http) {
    $http.get('https://pokeapi.co/api/v2/pokemon/').then(function (data) {
        $scope.donnees = data;
        console.log(data);
    }, function (data) {
        document.getElementById("erreur").innerHTML = "Erreur lors de l'appel du json"
    });
}]);

<!-- controlleur permettant la recupération des pokemons à partir  du service $ressource puis la recuperation des informations du pokemon selectionné à l'aide du service $http-->

pokeApp.controller('PokemonByRessource', ['$scope', '$log', 'pokService', '$http', function ($scope, $log, PokeService, $http) {
    PokeService.queryAll().$promise.then(function (value) {
        $scope.pokApi = value.results;
        console.log($scope.pokApi);
    });
    $scope.$watch('select', function () {
        $scope.url = $scope.select.url;
        $http.get($scope.url).then(function (data) {
            $scope.pok = data;
            console.log($scope.pok);
        }, function (data) {
            document.getElementById("erreur").innerHTML = "Erreur lors de l'appel du json"
        });
        console.log($scope.pok);
    });

}]);


<!-- controlleur permettant la recupération des pokemons à l'aide du service $ressource puis l'affectation du pokemeon selectionné à une variable du serviceCommun-->

pokeApp.controller('PokemonSet', ['$scope', 'pokService', 'serviceCommun', function ($scope, PokeService, serviceCommun) {

    PokeService.queryAll().$promise.then(function (value) {
        $scope.poks = value.results;
    });
    $scope.$watch('selected', function () {
        serviceCommun.setC($scope.selected);


    });

}]);

<!-- controlleur permettant la recuperation du pokemon affecté au service commun et faire appel par la suite au service $http afin de recuperer les informations de ce pokemon-->

pokeApp.controller('PokemonGet', ['$scope', 'serviceCommun', '$http', function ($scope, serviceCommun, $http) {
    $scope.$watch(function () {
        return serviceCommun.obs;
    }, function () {
        $scope.pok = serviceCommun.getC();
        $scope.url = $scope.pok.url;
        $http.get($scope.url).then(function (data) {
            $scope.InfoPok = data;
            console.log($scope.InfoPok);
        }, function (data) {
            document.getElementById("erreur").innerHTML = "Erreur lors de l'appel du json"
        });
        console.log($scope.InfoPok);
    });
}]);


<!-- definition d'un sevice commun qui va servir de communication entre deux controlleurs-->

pokeApp.service("serviceCommun", function () {
    var c;
    var obs;
    this.Obs = function () {
        return this.obs = this.c;
    }.bind(this);
    this.setC = function (c) {
        this.c = c;
        return this.Obs();
    }.bind(this);

    this.getC = function () {
        return this.c;
    };

});