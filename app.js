


(function () {
    'use strict';

    angular.module('myApp', ["ngRoute"])

        .controller('MyController', function ($scope, $http) {
            $http.get('http://localhost:3000/').then(function (response) {
                $scope.datas = response.data
            })
        })

        .controller('createController', function ($scope) {
            $scope.addEntry = function () {
                var newData = "{\"emp_id\":\"" + $scope.id + "\", \"emp_name\":\"" + $scope.name + "\", \"emp_designation\":\"" + $scope.desig + "\", \"emp_department\":\"" + $scope.dept + "\", \"emp_salary\":\"" + $scope.sal + "\", \"emp_location\":\"" + $scope.loc + "\"}";

                fetch('http://localhost:3000/new', {
                    method: "POST",
                    body: newData,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.id=""
                $scope.name=""
                $scope.desig=""
                $scope.dept=""
                $scope.sal=""
                $scope.loc=""
            };
        })

        .controller('updateController', function ($scope, $http) {
            $http.get('http://localhost:3000/').then(function (response) {
                $scope.datas = response.data
            })

            $scope.getId = function () {
                var selectedId = $scope.id
                console.log(selectedId)
                $scope.name = selectedId['name']
                $scope.desig = selectedId['desig']
                $scope.dept = selectedId['dept']
                $scope.sal = selectedId['sal']
                $scope.loc = selectedId['loc']
            }

            $scope.updateEntry = function () {
                var newData = "{\"emp_id\":\"" + $scope.id + "\", \"emp_name\":\"" + $scope.name + "\", \"emp_designation\":\"" + $scope.desig + "\", \"emp_department\":\"" + $scope.dept + "\", \"emp_salary\":\"" + $scope.sal + "\", \"emp_location\":\"" + $scope.loc + "\"}";

                fetch('http://localhost:3000/update', {
                    method: "POST",
                    body: newData,
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => response.json()) 
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.id=""
                $scope.name=""
                $scope.desig=""
                $scope.dept=""
                $scope.sal=""
                $scope.loc=""
            };
        })

        .controller('deleteController', function ($scope, $http) {
            $http.get('http://localhost:3000/').then(function (response) {
                $scope.datas = response.data
            })
            $scope.deleteEntry = function () {
                var delJson = { delID: $scope.del.id }
                var jsonObj = JSON.stringify(delJson)

                fetch('http://localhost:3000/delete', {
                    method: "POST",
                    body: jsonObj,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.del = ""
            }
        })
        .config(function ($routeProvider) {
            $routeProvider
                .when("?", {
                    templateUrl: "view.html"
                })
                .when("#add", {
                    controller: "createController"
                })
                .when("#update", {
                    controller: "updateController"
                })
                .when("#delete", {
                    controller: "deleteController"
                });
        })
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.hashPrefix('');
        }])
})();
