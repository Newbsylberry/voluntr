angular.module('voluntrApp').filter("personFilter", function () {
  return function(items, input) {
    if (!items) return;
    if (!input) {
      return items;
    }else{
      var filtered = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];



      return filtered;

    }
    }
  };
});
