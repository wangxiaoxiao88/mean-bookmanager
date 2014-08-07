//public/main.js

var angularBook = angular.module('angularBook', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$http.get('/api/books')
		.success(function(data) {
			$scope.books = data;
			console.log(data)
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$scope.delBook = function(id) {
		$http.delete('/api/books/' + id)
			.success(function(data) {
				$scope.books = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};

	$scope.addBook = function(){
		$http.post('/api/books', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.books = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};
}