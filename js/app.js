"use strict";

var app = angular.module("pokemonGo", ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
    $routeProvider.when('/start', {
            templateUrl: 'assets/start.html'
        })
    $routeProvider.when('/about', {
            templateUrl: 'assets/about.html'
        })
    $routeProvider.when('/toplist', {
            templateUrl: 'assets/toplist.html'
        })
    $routeProvider.when('/startGame', {
        templateUrl: 'assets/startGame.html'
    })
    $routeProvider.otherwise({
            redirectTo: '/'
        });
    })

    .controller("menuController", function ($scope) {
        $scope.menuItems= [
            {name:'start', link:'#start'},
            {name:'toplist', link:'#toplist'},
            {name:'about', link:'#about'},
        ];
    })

    .directive("menupluspagenator", function(){
        return {
            templateUrl:"assets/directives/menu.html",
            replace: true,
            restrict: 'E',
            controller: "menuController"
        }
    })

    .directive("pokemon", function(){
        return {
            templateUrl:"assets/directives/pokemon.html",
            replace: true,
            restrict: 'E',
            controller:  function($scope){
                $scope.pokPossition={'X':0,'Y':0};
                var tictac, tic=0;
                $scope.start=function(){

                    tictac=$interval(function(){
                        tic++;
                        $scope.pokPossition.X=50*Math.sin(tic/50);
                        $scope.pokPossition.Y=20*Math.cos(tic/20);
                    },50);
                };
                $scope.stop=function(){
                    $interval.cancel(tictac);
                };
            }
        }
    })



;

