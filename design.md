
## Les objectifs de ce travail pratique sont les suivants :

le but de ce tp est de nous familiariser avec angularjS , plusieus conecepts à comprendre à l'issu de ce 
tp telsque ; la notion du controleur et du scope , comment garantir le data binding, la creation de service
à l'aide du singleton factory mais aussi à l'aide des services prédefinis telsque $http, $ressource? et la difference entre 
ces deux services, et enfin les directives.


premiere question : recherche d'un pokmeon à l'aide de son id:
cette partie est realisé à travers le dataBinding entre une variable du modele (ou scope) et la donnée saisie par l'utilisateur

deuxieme question : recherche dans une liste: dans cette partie du tp nous avons créer une liste de pokemons , qu'on a affiché
par la suite à l'aide de la directive ng-repeat dans une balise select, nous avons également utilisé les filtres puis un bouton
pour afficher sur la console le pokemon saisi.


troisième question : acces à une api distante: dans cette partie nous avons utiliser le service $ressource pour recuperer
la lsite des pokemons depuis une api distante , puis un affiché les informations d'un pokemon à travers le service $http.


quatrième partie: communication entre controlleurs: dans cette partie nous avons defini un service qui sera appelé par deux controlleurs différents
l'un permet de stocker le pokemon selectionné dans une variable du service, l'autre permet de recupere la variable stockée dans le service.








