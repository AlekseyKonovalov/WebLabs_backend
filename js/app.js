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
            controller:  function($scope, $interval){
                $scope.pokPos={'X':5,'Y':1};
                $scope.pokWidth=250;
                $scope.pokheight=180;

                var tictac, tic=0;
                tictac=$interval(function(){
                    tic++;
                    $scope.pokPos.X=50*Math.sin(tic/50);
                    $scope.pokPos.Y=30*Math.cos(tic/40);

                },50);



            }
        }
    })

    .controller("gameController", function ($scope, $interval, scoreFac, levelFac) {
        $scope.score=scoreFac.getScore();
        $scope.level=levelFac.getLevel();
        $scope.time=0;

        var tictac=$interval(function(){

            $scope.time++

            scoreFac.setScore($scope.score-10);

            $scope.score=scoreFac.getScore();

        },300);


    })

    .factory("scoreFac", function() {
        var score = 1000;
        function setScore(value) {
            score=value;
        };
        function getScore() {
            return score
        };
        return {
            getScore: getScore,
            setScore:setScore
        };
    })


    .factory("levelFac", function() {
        var level = 2;
        function setLevel(value) {
            level=value;
        };
        function getLevel() {
            return level
        };
        return {
            getLevel: getLevel,
            setLevel: setLevel
        };
    })

;

