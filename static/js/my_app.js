/**
 * Created by Nawfal on 12-Oct-15.
 */
angular.module('myApp', ['ngMaterial']).
	controller('myController', ['$scope', '$http', function ($scope, $http) {
		$scope.error="";
		console.log('my_app-Controller');
		$http.get('/user/profile')
			.success(function (data, status, headers, config) {
				console.log('data in myApp '+JSON.stringify(data));
				$scope.user = data;
				$scope.error = "";
			}).
			error(function (data, status, headers, config) {
				$scope.user = {};
				$scope.error = data;
			});
	}]);
