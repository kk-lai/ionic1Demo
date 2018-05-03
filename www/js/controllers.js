angular.module('app.controllers', [])

.controller('rootCtrl', function($scope) {
	
	
})

.controller('listCtrl', function($scope,$ionicPlatform, $ionicLoading, $timeout, $q) {
	
	var maxId = 100;
	
	$scope.status = '';
	
	$scope.reload=function(type)
	{
		if (typeof type === "undefined") {
			type="sunny";
		}
		$scope.type = type;
		$scope.items=[];
		$scope.isAllLoaded = true;
		$scope.$broadcast('scroll.refreshComplete');
		$timeout($scope.load,200);
	};
	
	$scope.add = function() {
		maxId++;
		var recs = [
			{
				id: maxId,
				name: $scope.type + " Item " + maxId
			}
		];
		$scope.items = recs.concat($scope.items);
	};
	
	$scope.remove = function() {
		$scope.items.shift();
		maxId--;
	};
	
	$scope.update = function() {
		var idx = Math.floor($scope.items.length*Math.random());
		$scope.items[idx].name = $scope.items[idx].name  + ".";
		$scope.status = " " + $scope.items[idx].id;
		$timeout(function() {
			$scope.status="";
		},1000);
	};
	
	$scope.load = function() {
		var d = $q.defer();
		var recs = [];
		
		var id = maxId - $scope.items.length ;
		var i = 0;
		for(i=0;i<20;i++) {
			if (id<=0) {
				break;
			}
			recs.push({
				id: id,
				name: $scope.type + " Item " + (id--)
			});
		}
				
		$timeout(function() {
			d.resolve(recs);
		},300);
		
		d.promise.then(function(res) {
			$scope.items=$scope.items.concat(res);
			if (recs.length<20) {
				$scope.isAllLoaded = true;
			} else {
				$scope.isAllLoaded = false;
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});		
	};
	
	
	$ionicPlatform.ready(function() {
		$scope.reload();
	});
})
;