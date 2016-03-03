/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('BulkImportPeopleCtrl', function ($scope, $modal, $http, $stateParams) {

    $scope.database_attributes = ['first_name','last_name','address_1','address_2','email','zip_code','state','city','occupation','phone','organization_name','notes'];
    $scope.data = {};
    var worksheets;
    var activeWorksheet;

    $scope.$on('fileChange', execute);

    // 4. When select changes, change active worksheet
    $scope.setWorksheet = function() {
      setWorksheet();
    };

    function execute() {
      // Get a list of the worksheet names in the workbook and
      // Set the active worksheet name to be the first worksheet name
      $scope.data.activeWorksheet = $scope.data.workbook.SheetNames[0];

      // Make a list of worksheet names available on scope for a select input
      $scope.data.worksheetNames = $scope.data.workbook.SheetNames;

      // When select changes, change active worksheet
      setWorksheet();
      // Make a corresponding list of selects to the right with best guess of matching user row titles on the right
    }

    $scope.importWorksheet = function() {

      // select the active worksheet
      activeWorksheet = $scope.data.workbook.Sheets[$scope.data.activeWorksheet];
      // rename the header rows in the active worksheet from their original user attributes to the database attributes
      var range = XLSX.utils.decode_range(activeWorksheet['!ref']);
      var C; // column
      var R = range.s.r; // row

      // swap the keys and values of the check response and store result
      // this is done to make it easy to check that the cell text matches with a
      // database attribute
      var swappedResponse = swap($scope.data.checkResponse);

      // for each column of the header row
      for(C = range.s.c; C < range.e.c; C++) {

        // get the text of the cell
        var cellText = activeWorksheet[XLSX.utils.encode_cell({c:C, r:R})].w;

        // check if that text matches swappedResponse
        if (cellText in swappedResponse) {
          // if text matches replace the text with the database attribute
          activeWorksheet[XLSX.utils.encode_cell({c:C, r:R})].w = swappedResponse[cellText];
        }

      }


      // convert the worksheet to a json Object
      var jsonSheet = XLSX.utils.sheet_to_json(activeWorksheet);

      // send json object to server
      var formattedObjectForServer = {
        address_column: $scope.address_column,
        name_column: $scope.name_column,
        people: jsonSheet,
        organization_id: 10
      };

      $http.post('/api/v1/people/import', formattedObjectForServer).then(function(response) {
        // $scope.imported = true;
        $scope.success_message = response.data.success_message;
      });
    };

    function setWorksheet() {

      // get the row titles and make them available on scope
      $scope.data.rowTitles = getRowTitles($scope.data.workbook.Sheets[$scope.data.activeWorksheet]);

      // if there are row titles (not an empty worksheet)
      if ($scope.data.rowTitles !== null) {

        // get the best guesses for how the row titles match volu database attributes
        $http({
          method: 'GET',
          url: 'api/v1/spreadsheet_import/check',
          params: {
            'row_titles[]': $scope.data.rowTitles
          }
        }).then(function(response) {
          $scope.mapped = true;
          $scope.data.checkResponse = response.data.database_map;
        });
      }
    }

    // Get the Row Titles from the 'A' row (header) of a spreadsheet
    function getRowTitles(sheet) {
      var headers = [];

      // if the sheet passed in is empty return null
      if (Object.keys(sheet).length === 0) {
        return null;
      }

      // Description of XLSX functions and worksheet format is found at
      // www.github.com/SheetJS/js-xlsx

      // set range, column (C), and row (R) variables
      var range = XLSX.utils.decode_range(sheet['!ref']);
      var C;
      var R = range.s.r; // start in the first row

      // for every column in the range
      for(C = range.s.c; C <= range.e.c; ++C) {

        // find the cell in the first row
        var cell = sheet[XLSX.utils.encode_cell({c:C, r:R})];

        var headerText;

        // if there is a cell
        if(cell && cell.t) {
          //get the text of the cell and set to headerText
          headerText = XLSX.utils.format_cell(cell);
        } else {
          // set default header text
          headerText = "UNKNOWN " + C;
        }

        headers.push(headerText);
      }
      return headers;
    }

    // utility to swap keys and values in an object
    function swap(object){
      var ret = {};
      for(var key in object){
        ret[object[key]] = key;
      }
      return ret;
    }

  });
