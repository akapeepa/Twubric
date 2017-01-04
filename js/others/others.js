// var options = {
//   itemSelector: '.mdl-card',
//   layoutMode: 'fitRows',
//   resizesContainer: true,
//   getSortData: {
//     total: '.total parseInt ',
//     friends: '.friends parseInt',
//     influence: '.influence parseInt',
//     chirpiness: '.chirpiness parseInt'
//   }
// };

// var $container = $('.isotope').isotope(options);

var $container = $('.isotope').isotope({
  itemSelector: '.mdl-card',
  layoutMode: 'fitRows',
  resizesContainer: true,
  getSortData: {
    score: '.total parseInt ',
    friends: '.friends parseInt',
    influence: '.influence parseInt',
    chirpiness: '.chirpiness parseInt'
  }
});
//
$('#sorts').on( 'click', 'button', function() {
  var sortByValue = $(this).attr('data-sort-by');
  $grid.isotope({ sortBy: sortByValue });
  console.log("nsahl");
});

// $('#sorts').on('click', 'button', function() {
//     var sortByValue = $(this).attr('data-sort-by');
//     $container.isotope({ sortBy: sortByValue});
//     console.log("cjhv");
//   });




//Routes
// twubric.config(function($routeProvider){
//   $routeProvider
//   .when('/',{
//     templateUrl:'views/home.htm',
//     controller:'homeController',
//     controllerAs:'hc'
//   });
// });
