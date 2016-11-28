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

    .controller("toplistController", function ($scope, $http) {
        $scope.users;
        $http.get("?controller=user").success(function (data) {
            $scope.users = data;
            console.log($scope.users);

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

            controller:  function($scope, $interval, scoreFac, levelFac,  $location, $http){
                $scope.pokPos={'X':5,'Y':1};
                $scope.pokWidth=250;
                $scope.pokheight=180;

                var tictac, tic=0;
                var pokemons;

                $http.get("?controller=pokemon").success(function (data) {
                    pokemons = data;
                    $scope.power = pokemons[0].power;
                    $scope.speed= pokemons[0].speed;
                    $scope.imagePok = pokemons[0].image;
                    $scope.gamePok();
                });

                $scope.levelUp=(function () {
                    var temp=levelFac.getLevel()+1;
                    levelFac.setLevel(temp);
                    temp=scoreFac.getScore()+(60-tic/100)* parseInt($scope.power);
                    scoreFac.setScore(temp);
                    tic=0;
                    levelPok();
                })
                var i=1;

                $scope.gamePok=function () {
                    tictac = $interval(function () {
                        tic++;
                        $scope.pokPos.X = 50 * Math.sin(tic / (50/i)) ;
                        $scope.pokPos.Y = 30 * Math.cos(tic / (40/i)) ;


                    }, 50);
                }

                var stop=function(){
                    $interval.cancel(tictac);
                };


                var levelPok=function(){
                    if(levelFac.getLevel()<4){

                        $scope.power = pokemons[i].power;
                        $scope.speed= pokemons[i].speed;
                        $scope.imagePok = pokemons[i].image;
                        $scope.pokPos.X=30;
                        $scope.pokPos.Y=40;
                        i++;

                        $scope.pokWidth= $scope.pokWidth/2;
                        $scope.pokheight=$scope.pokheight/2;
                    }
                    else {
                        stop();
                        $location.path("/endGame");
                    }
                };
            }
        }
    })

    .controller("gameController", function ($scope, $interval, scoreFac, levelFac, $http, $location,  $log) {
        $scope.score=scoreFac.getScore();
        $scope.level=levelFac.getLevel();
        $scope.time=0;
        var nameUser="noname";

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
            if(scoreFac.getScore()<4500 && scoreFac.getScore()>2500){
                $scope.endText="Not bad"
            }
            if(scoreFac.getScore()>4500){
                $scope.endText="Very good"
            }
            if(scoreFac.getScore()<2500){
                $scope.endText="Very bad. Try again"
            }
        };

        $scope.sendResult=(function () {
            nameUser= $scope.innn.username.$modelValue;


            $http.post("/?controller=user", {"id":"22","name":nameUser,"score":scoreFac.getScore() })
                .success(function () {
                    console.log('ok.send.');
                    $location.path('/start');
                })
                .error(function (err) {
                    console.log('Не было отправки');
                })
            ;
        });
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

