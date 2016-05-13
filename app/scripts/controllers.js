'use strict';

angular.module('dieReiseApp')

  .controller('dataFeedController', function ($scope, dataService, $uibModal) {

    $scope.showContent = false;
    $scope.message = 'Loading ...';
    // FIXME: Consider using promise-notation
    $scope.events = dataService.getEvents().query(
      function (response) {
        $scope.events = response;
        $scope.showContent = true;
      },
      function (response) {
        $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
      });

    $scope.event = {};


    $scope.fillModal = function (event) {

      var modalInstance = $uibModal.open({
          templateUrl: 'modal.html',
          controller: 'GiftController',
          resolve: {
            event: function () {
              console.log(event.name);
              return event;
            }
          }
        });

        modalInstance.result.then(function () {

          // close-button
          $scope.events = dataService.getEvents().query(
            function (response) {
              $scope.events = response;
              $scope.showContent = true;
            },
            function (response) {
              $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
            });
        }, // dismissed

          function () {
          $scope.events = dataService.getEvents().query(
            function (response) {
              $scope.events = response;
              $scope.showContent = true;
            },
            function (response) {
              $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
            });
        });
      };

  })

  .controller('GiftController', function ($scope, dataService, $uibModalInstance, event) {

    if (event.available === false) {
      $scope.event = {name: 'Schon weg', description: 'Schon weg'};
    }
    else {
    $scope.event = event;
    }

    $scope.ok = function () {
      $uibModalInstance.close($scope.event._id);
    };

    $scope.myGift = {firstName: '', lastName: '', email: '', date: ''};
    $scope.registerMessage = 'Vielen Dank für dein Geschenk!';

    $scope.sendForm = function () {
      $scope.myGift.date = new Date().toISOString();
      console.log($scope.myGift);
      $scope.event.registration.push($scope.myGift);
      dataService.getEvents().update({_id: $scope.event._id}, $scope.event);
      $scope.event.available = false;

    };

  })

;
