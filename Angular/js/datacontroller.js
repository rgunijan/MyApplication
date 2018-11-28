
        (function(angular) {
            'use strict';
          var myApp = angular.module('angTestApp', []);
          
          myApp.controller('DTC', ['$scope', function($scope) {
              $scope.Datas = [];
          
              $scope.addData = function(data) {
                  $scope.Datas.push(data);
              };
          
          }]);
          })(window.angular);