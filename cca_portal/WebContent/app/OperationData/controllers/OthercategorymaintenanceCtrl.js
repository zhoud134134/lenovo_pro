"use strict";

angular.module('app.OperationData').controller('OthercategorymaintenanceCtrl', function ($scope,$http,OthercategorymaintenanceService,$state,$stateParams,$rootScope,$location) {

    $scope.ww = true;
    $scope.btnSwitch = function(flag){
        if(flag == 'w'){
            $scope.ww = false;
        }else if(flag == 'p'){
            $scope.ww = true;
        }
    }

    //请求表格数据调用方法
    OthercategorymaintenanceService.getOthercategoryData().then(function(data){
        if(data.code == 0){
            $scope.categoryData = data.result;
            var geo = $rootScope.getFiled($scope.categoryData,"geo");
            var categorylvl1 = $rootScope.getFiled($scope.categoryData,"categorylvl1");
            var categorylvl2 = $rootScope.getFiled($scope.categoryData,"categorylvl2");
            var categorylvl3 = $rootScope.getFiled($scope.categoryData,"categorylvl3");
            $scope.dataMap = OthercategorymaintenanceService.getDataMap($scope.categoryData,geo,categorylvl1,categorylvl2,categorylvl3);
        }

    },function(data){
        //console.log(data);
    });
    
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在table render完成后执行的js
    	$('#final table').stickySort({ sortable: true });
    });
    
})