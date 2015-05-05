
  // Get angular app
  var app = angular.module('voluntrApp');

  app.factory("XLSXReaderService", ['$q', '$rootScope',
    function($q, $rootScope) {
      var service = function(data) {
        angular.extend(this, data);
      }

      service.readFile = function(file, readCells, toJSON) {
        var deferred = $q.defer();

        XLSXReader(file, readCells, toJSON, function(data) {
          $rootScope.$apply(function() {
            deferred.resolve(data);
          });
        });

        return deferred.promise;
      }


      return service;
    }
  ]);

