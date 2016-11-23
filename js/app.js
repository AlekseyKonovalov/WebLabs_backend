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
    $routeProvider.when('/endGame', {
        templateUrl: 'assets/endGame.html'
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
            controller:  function($scope, $interval, scoreFac, levelFac,  $location){
                $scope.pokPos={'X':5,'Y':1};
                $scope.pokWidth=250;
                $scope.pokheight=180;
                var tictac, tic=0;

                $scope.levelUp=(function () {
                    var temp=levelFac.getLevel()+1;
                    levelFac.setLevel(temp);
                    temp=scoreFac.getScore()+(60-tic)*10;
                    scoreFac.setScore(temp);
                    tic=0;
                })


                tictac = $interval(function () {
                    tic++;
                    if (levelFac.getLevel()==1) {
                        $scope.pokPos.X = 50 * Math.sin(tic / 50);
                        $scope.pokPos.Y = 30 * Math.cos(tic / 40);
                    }
                    if (levelFac.getLevel()==2) {
                        $scope.pokPos.X = 50 * Math.sin(tic / 50);
                        $scope.pokPos.Y = 30 * Math.cos(tic / 40);
                        $scope.pokWidth=150;
                        $scope.pokheight=100;
                    }
                    if (levelFac.getLevel()==3) {
                        $scope.pokPos.X = 50 * Math.sin(tic / 50);
                        $scope.pokPos.Y = 30 * Math.cos(tic / 40);
                        $scope.pokWidth=100;
                        $scope.pokheight=60;
                    }
                    if (levelFac.getLevel()==4 || scoreFac.getScore()<20) {
                        stop();
                        $location.path("/endGame");

                    }

                }, 50);

                var stop=function(){
                    $interval.cancel(tictac);
                };

            }
        }
    })

    .controller("gameController", function ($scope, $interval, scoreFac, levelFac) {
        $scope.score=scoreFac.getScore();
        $scope.level=levelFac.getLevel();
        $scope.time=0;
        $scope.nameUser="noname";

        var tictac=$interval(function(){

            if($scope.level<levelFac.getLevel()){
                $scope.time=0;
            }

            $scope.time++

            $scope.score=scoreFac.getScore();

            scoreFac.setScore(scoreFac.getScore()-10);

            $scope.level=levelFac.getLevel();

            if(levelFac.getLevel()==4 || scoreFac.getScore()<20){
                endTextF();
                stop();
            }


        },300);

        var stop=function(){
            $interval.cancel(tictac);
        };

        var endTextF=function () {
            if(scoreFac.getScore()<1500 && scoreFac.getScore()>500){
                $scope.endText="Not bad"
            }
            if(scoreFac.getScore()>1500){
                $scope.endText="Very good"
            }
            if(scoreFac.getScore()<500){
                $scope.endText="Very bad. Try again"
            }
        }

        $scope.sendResult=(function (temp) {
            var ttt=temp;
            console.log(ttt);
        })
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
            setScore: setScore
        };
    })


    .factory("levelFac", function() {
        var level = 1;
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

