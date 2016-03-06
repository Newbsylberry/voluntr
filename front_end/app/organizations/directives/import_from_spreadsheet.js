angular.module('voluntrApp').directive("fileread", [function () {
  return {
    scope: {
      fileread: "="
    },
    link: function (scope, element, attributes) {
      element.bind("change", function(changeEvent) {

        var reader = new FileReader();
        var fileError = false;
        reader.onload = function (loadEvent) {
          var data = loadEvent.target.result;
          var arr = fixdata(data);
          var workbook;
          try {
            workbook   = XLSX.read(btoa(arr), {type: 'base64'});
          } catch (e) {
            console.log(e);
            fileError = true;
          }
          scope.$apply(function () {
            scope.fileread = workbook;
          });

        };

        reader.onloadend = function() {
          // console.log(fileError);
          if (fileError) {
            scope.$emit('fileError');
            scope.$apply();
          } else {
            scope.$emit('fileChange');
          }
        };

        reader.readAsArrayBuffer(changeEvent.target.files[0]);

        function fixdata(data) {
          var o = "", l = 0, w = 10240;
          for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
          o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
          return o;
        }
      });
    }
  };
}]);

