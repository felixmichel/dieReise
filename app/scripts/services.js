'use strict';

angular.module('dieReiseApp')

  // FIXME: Consider using ng-contant grunt plugin for env variables that are different in production
  .constant('baseURL', 'http://46.101.199.218:3000/')
  //.constant('baseURL', 'http://localhost:3000/')

  .service('dataService', ['$resource', 'baseURL', function ($resource, baseURL) {

    //Zugriff auf alle Events

    this.getEvents = function () {
      return $resource(baseURL + 'events/:_id', null, {'update': {method: 'PUT'}});
    };

  }]);
