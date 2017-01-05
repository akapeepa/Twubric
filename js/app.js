var twubric = angular.module('twubric', ['ngResource']);

// Directive
twubric.directive('twubric', function() {
  return {
    restrict: 'E',
    scope: {
      dataInfo: '=info'
    },
    templateUrl: 'views/home.htm',
    link: function(scope, element, attrs) {
      var options = {
        layoutMode: 'fitRows',
        itemSelector: '.card-item',
        resizesContainer: true,
        getSortData: {
          total: '.total parseInt',
          friends: '.friends parseInt',
          influence: '.influence parseInt',
          chirpiness: '.chirpiness parseInt'
        }
      };

      var $container = $('.isotope').isotope(options);

      scope.$watch('dataInfo', function(newVal, oldVal) {
        $container.isotope('reloadItems').isotope({ sortBy: 'original-order' });
        $('#startDate').datepicker("setDate", "Jan 1, 2008");
        $('#endDate').datepicker("setDate", "Jan 1, 2013");
        $('#endDate').datepicker({
          dateFormat: 'M d, yy',
          changeMonth: true,
          changeYear: true,
          onSelect: function() {
            $container.isotope({ filter: filterByDate });
          }
        });
        $('#startDate').datepicker({
          dateFormat: 'M d, yy',
          changeMonth: true,
          changeYear: true,
          onSelect: function(dateText, inst) {
            $container.isotope({ filter: filterByDate });
          }
        });
      });

      var filterByDate = function() {
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        var date = $(this).find('.joinDate').text();

        if (startDate !== undefined && endDate !== undefined && date !== undefined) {
          date = new Date(date);
          startDate = new Date(startDate);
          endDate = new Date(endDate);
        }

        return date >= startDate && date <= endDate;
      };


      $('#sorts').on('click', 'button', function() {
        var sortByValue = $(this).attr('data-sort-by');
        $(this).toggleClass('selected');
        if ($(this).hasClass('selected')) {
          sortValue = true;
        } else {
          sortValue = false;
        }
        $container.isotope('reloadItems').isotope({ sortBy: sortByValue, sortAscending: sortValue });
      });

      element.on('click', '#removeCard', function() {
        $container.isotope('remove', $(this).parents('.card-item'));
        $container.isotope('layout');
      });


      keyboardJS.bind('t', function(e) {
        $('#total').click();
      });
      keyboardJS.bind('f', function(e) {
        $('#friends').click();
      });
      keyboardJS.bind('i', function(e) {
        $('#influence').click();
      });
      keyboardJS.bind('c', function(e) {
        $('#chirpiness').click();
      });
    }
  }
});

//Service
twubric.service('twubric',function($resource){
  return $resource('js/data.json');
});


//Controller
twubric.controller('homeController',['$scope', 'twubric',function($scope,twubric){

  $scope.sampleData = twubric.query(function(data){
    $scope.data = data;
    console.log($scope.data);
  });

}]);
