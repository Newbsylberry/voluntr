/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('BulkImportPeopleCtrl', function ($scope, $modal, $http, $stateParams,$state) {

    $scope.database_attributes = ['first_name','last_name','address_1','address_2','email','zip_code','state','city','occupation','phone','organization_name','notes'];
    $scope.data = {};
    $scope.joined_columns = {};
    $scope.errors = {};
    $scope.errors.file = false;
    $scope.data.possibleCustomFields = [];
    $scope.data.notImportedFields = [];
    var worksheets;
    var activeWorksheet;

    $scope.removePossibleCustomField = function(index) {
      var removed = $scope.data.possibleCustomFields.splice(index,1);
      $scope.data.notImportedFields.push(removed[0]);
    };

    $scope.addPossibleCustomField = function(index) {
      var removed = $scope.data.notImportedFields.splice(index,1);
      $scope.data.possibleCustomFields.push(removed[0]);
    };

    $scope.$on('fileChange', execute);

    $scope.$on('fileError', fileError);

    // When select changes, change active worksheet
    $scope.setWorksheet = function() {
      setWorksheet();
    };

    $scope.confirmDatabaseMatch = function() {

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
      for(C = range.s.c; C <= range.e.c; C++) {

        // default cellText to unintelligible string that won't appear in swappedResponse object
        var cellText = "345u2@#22891ndmvdv.124/sjsshv$#";
        // encode cell with given column and row
        var encodedCell = XLSX.utils.encode_cell({c:C, r:R});

        // if there is a cell
        if (activeWorksheet[encodedCell]) {
          // get the text of the cell
          cellText = activeWorksheet[encodedCell].w;

          // check if that text matches swappedResponse
          if (cellText in swappedResponse) {
            // if text matches replace the text with the database attribute
            activeWorksheet[encodedCell].w = swappedResponse[cellText];

            // else when there's  cellText not in swappedResponse
            // (doesn't match a database attribute)
          } else {
            // cell is a potential custom Field

            // add the name to possibleCustomFields array for further processing
            $scope.data.possibleCustomFields.push(activeWorksheet[encodedCell].w);

            // create a temporary name
            var customFieldTempName = 'customField ' + activeWorksheet[encodedCell].w;

            // set temporary name
            activeWorksheet[encodedCell].w = customFieldTempName;
          }
        }

      }

      $scope.data.matchConfirmed = true;

    };

    $scope.importWorksheet = function() {
      // convert the worksheet to a json Object
      var jsonSheet = XLSX.utils.sheet_to_json(activeWorksheet);

      // look through the sheet
      for (var i = 0; i < jsonSheet.length; i++) {
        // if there is a null key
        if (jsonSheet[i][null]){
          // delete it it and its value because it isn't a part of the request
          // body
          delete jsonSheet[i][null];
        }

        // handle custom fields if they exist
        if ($scope.data.possibleCustomFields.length > 0) {
          // set a blank custom_fields property on each object
          jsonSheet[i].custom_fields = {};

          // for every custom field
          for (var j = 0; j < $scope.data.possibleCustomFields.length; j++) {

            // retrieve the temporary key
            var fieldName = $scope.data.possibleCustomFields[j];

            // retrieve the associated value
            var value = jsonSheet[i]['customField ' + fieldName];

            // delete the key
            delete jsonSheet[i]['customField ' + fieldName];

            // add the value to custom_fields property on object
            jsonSheet[i].custom_fields[fieldName] = value;

          }
        }

        // remove not imported fields if they exist
        if ($scope.data.notImportedFields.length > 0) {
          for (var k = 0; k < $scope.data.notImportedFields.length; k++) {
            // retrieve the key
            var notImportedfieldName = $scope.data.notImportedFields[k];

            // delete the property
            delete jsonSheet[i]['customField ' + notImportedfieldName];
          }
        }

      }

      // send json object to server
      var formattedObjectForServer = {
        people: jsonSheet,
        organization_id: $stateParams.organization_Id,
        name_column: $scope.joined_columns.name_column,
        address_column: $scope.joined_columns.address_column
      };

      var bulkAddModal = $modal.open(
          {
            templateUrl: 'organizations/modals/import_people.html',
            controller: 'ImportPeopleModalCtrl',
            windowClass: 'import-people-modal',
            size: 'lg',
            resolve:
            {
              import_information: function () {
                return formattedObjectForServer
              }
            }
          });
        bulkAddModal.result.then(function () {

          },
          function () {
            console.log('Modal dismissed at: ' + new Date());
          });


    };



    function execute() {
      if($scope.data.workbook) {
        // reset all variables
        $scope.errors.file = false;
        $scope.data.matchConfirmed = false;
        $scope.data.possibleCustomFields = [];
        $scope.data.notImportedFields = [];
        $scope.data.rowTitles = [];
        $scope.data.checkResponse = null;

        // Get a list of the worksheet names in the workbook and
        // Set the active worksheet name to be the first worksheet name
        $scope.data.activeWorksheet = $scope.data.workbook.SheetNames[0];

        // Make a list of worksheet names available on scope for a select input
        $scope.data.worksheetNames = $scope.data.workbook.SheetNames;

        // When select changes, change active worksheet
        setWorksheet();
      }
    }

    $scope.isUnique = function() {
      $scope.data.isUnique = true;
      var unique = {};
      var query = $scope.data.checkResponse;

      // for every attribute in the query
      for (var attribute in query) {
        // check if the value is unique && not false
        if (unique[query[attribute]] === undefined && (query[attribute] !== false && query[attribute] !== "" && query[attribute] !== null)) {
          // if its unique && not false
          // add it to the unique object as true
          unique[query[attribute]] = true;


        } else if (query[attribute] !== false && query[attribute] !== "" && query[attribute] !== null) {
          // if its not unique && not false
          // modify it on the unique object as false
          unique[query[attribute]] = false;

          // make data.isUnique === false so that errors will display on view
          $scope.data.isUnique = false;
        }

      }

      // set errors object on scope
      $scope.errors.unique = unique;

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
          $scope.data.checkResponse = response.data.database_map;
          $scope.mapped = true;
          // check if fields are unique
          $scope.isUnique();
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
          headers.push(headerText);
        }
        // the else case is when there is an empty cell, as in when a cell is
        // intentionally blank for spacing, hidden row, etc...


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

    function fileError() {
      $scope.errors.file = true;
    }
  });
