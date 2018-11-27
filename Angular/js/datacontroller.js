
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
          
          function getScope(ctrlName) {
              var sel = 'div[ng-controller="' + ctrlName + '"]';
              return angular.element(sel).scope();
          }
                        
                  (function (angular) {
                      $.connection.hub.url = "http://localhost:8090/signalr";
                      var feedback = $.connection.feedbackHub;
                      feedback.client.addMessage = function(data){         
                          $scope = getScope('DTC');
                          console.log($scope);
                          $scope.Datas.push({time : data.Time, size : data.Size});
                          $scope.$apply();           
                      }
                      $.connection.hub.start().done(function () {});
                  })(window.angular);