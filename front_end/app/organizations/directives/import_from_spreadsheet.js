angular.module('voluntrApp').directive("fileread", [function () {
  return {
    scope: {
      fileread: "="
    },
    link: function (scope, element, attributes) {
      element.bind("change", function(changeEvent) {
        var reader = new FileReader();
        reader.onload = function (loadEvent) {
          var data = loadEvent.target.result;

          var workbook = XLSX.read(data, {type: 'binary'});
          scope.$apply(function () {
            scope.fileread = workbook;

          });
        };
        reader.onloadend = function() {
          scope.$emit('fileChange');
        };
        reader.readAsBinaryString(changeEvent.target.files[0]); // DOESNT WORK WITH I.E.

      });
    }
  };
}]);
