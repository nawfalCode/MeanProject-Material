(function () {
	'use strict';
	angular.module('myApp', ['ngMaterial'])
		.controller('myController', ['$scope', '$http', function ($scope, $http) {
			$scope.sendForm = function () {
				console.log($scope.username+'  '+$scope.password+'  '+$scope.email);
				$http({
					method: 'POST',
					url:'http://localhost:8888/dialog',
					data: {
						username: $scope.username,
						password: $scope.password,
						email: $scope.email
					}
				}).success(function (data) {
					console.log('Done');
				}).error(function (err) {
					console.log(err);
				})

			}
		}]);
})();