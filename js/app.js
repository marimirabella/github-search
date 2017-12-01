angular.module('app', [])
    .controller('appController', function($scope, $http, $window) {

        $scope.show = false;

        // Search
        $scope.submitSearch = function() {
            $scope.value = document.querySelector('form input:first-child').value;
            $scope.request = "https://api.github.com/search/repositories?q=" + $scope.value + "&per_page=10";
            $http.get($scope.request).then(function(response) {
                    $scope.repos = response.data.items;
                    var total = response.data.total_count;
                    $scope.last = total > 1000 ? 100 : Math.ceil(total/10);
                    $scope.count = 1;
                    $scope.style = {'display': 'initial'};
                }, function(response) {
                    console.log("Error " + response.status);
                }
            );
        }

        // Pagination
        $scope.pagination = function(prev_req, page) {
            if(page) {
                $scope.first = 1;
                $http.get(prev_req + "&page=" + page).then(function(response){
                    $scope.repos = response.data.items;
                });

                // Scroll to top
                setTimeout(function(){$window.scrollTo(0, 0);}, 400);
            }
        }

    })
;