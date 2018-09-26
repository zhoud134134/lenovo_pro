"use strict";

angular.module('app.Report').controller('OuttapeBUSummaryCtrl', function ($scope,$state,$stateParams,$rootScope,$location,OuttapeBUSummaryService) {
   // $('#bufinal table').stickySort({ sortable: true });
    
    //请求表格数据调用方法
    OuttapeBUSummaryService.getOuttapeBUSummaryData().then(function(data){
        if(data.code == 0){
            var bUSummary = data.result;
            $scope.bu = $rootScope.getFiled(bUSummary,"bu");
            $scope.geo = $rootScope.getFiled(bUSummary,"geo");
            $scope.segment = $rootScope.getFiled(bUSummary,"segment");
            $scope.mapData = OuttapeBUSummaryService.getData(bUSummary,$scope.bu,$scope.segment,$scope.geo);
            console.log($scope.bu);
            console.log($scope.mapData);
        }
    },function(data){
        console.log(data);
    });

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {

    });

    
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在table render完成后执行的js
    	$('#bufinal table').stickySort({ sortable: true });
    });
    
})