'use strict';

angular.module('dieReiseApp')

  .controller('dataFeedController', function ($scope, dataService, $uibModal) {
    // FIXME: Consider using controllerAs syntax (more future proof)
    $scope.registerMessage = 'Das ist leider schon weg.';

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

    // FIXME: Directly pass event object, thus no db query getEvents() is needed
    // $scope.fillModal = function (eventId, eventAvailable) {
    //   console.log(eventId);
    //   console.log(eventAvailable);
    //   // FIXME: use event.available...
    //   if (eventAvailable === true) {
    //     $scope.event = dataService.getEvents().get({_id: eventId});
    //   }
    //   else {
    //     $scope.event = {name: 'Schon weg', description: 'Schon weg'};
    //   }
    //   console.log($scope.event);
    // };


    $scope.fillModal = function (event) {

      var modalInstance = $uibModal.open({
        templateUrl: 'modal.html',
        controller: 'GiftController',
        resolve: {
          event: function () {
            return event;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

  })


  .controller('GiftController', function ($scope, dataService) {

    $scope.myGift = {firstName: '', lastName: '', email: '', date: ''};
    $scope.registerMessage = 'Vielen Dank für dein Geschenk!';

    $scope.sendForm = function () {
      $scope.myGift.date = new Date().toISOString();
      console.log($scope.myGift);
      $scope.event.registration.push($scope.myGift);
      dataService.getEvents().update({_id: $scope.event._id}, $scope.event);
      $scope.event.available = false;

      $scope.myGiftForm.$setPristine();
      $scope.myGift = {firstName: '', lastName: '', email: '', date: ''};
      console.log($scope.myGift);

    };

  })

;
