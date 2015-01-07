var todoApp = angular.module('todoApp', []);

todoApp.controller('mainController', ['$scope', '$http', function($scope, $http) {
	$scope.formData = {};

	// Birta öll todo á síðunni
	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
			console.log('Success: ' + data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// Þegar formi er POSTað þá senda gögnin til API
	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				// Hreinsa input formið
				$scope.formData = {};
				$scope.todos = data;
				console.log('Success: ' + data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// Eyða todo
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
				console.log('Success: ' + data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}]);

// function mainController($scope, $http) {
// 	$scope.formData = {};

// 	// Birta öll todo á síðunni
// 	$http.get('/api/todos')
// 		.success(function(data) {
// 			$scope.todos = data;
// 			console.log('Success: ' + data);
// 		})
// 		.error(function(data) {
// 			console.log('Error: ' + data);
// 		});

// 	// Þegar formi er POSTað þá senda gögnin til API
// 	$scope.createTodo = function() {
// 		$http.post('/api/todos', $scope.formData)
// 			.success(function(data) {
// 				// Hreinsa input formið
// 				$scope.formData = {};
// 				$scope.todos = data;
// 				console.log('Success: ' + data);
// 			})
// 			.error(function(data) {
// 				console.log('Error: ' + data);
// 			});
// 	};

// 	// Eyða todo
// 	$scope.deleteTodo = function() {
// 		$http.delete('/api/todos/' + id)
// 			.success(function(data) {
// 				$scope.todos = data;
// 				console.log('Success: ' + data);
// 			})
// 			.error(function(data) {
// 				console.log('Error: ' + data);
// 			});
// 	};
// };