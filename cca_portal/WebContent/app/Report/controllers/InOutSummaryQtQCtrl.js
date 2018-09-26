"use strict";

angular.module('app.Report').controller('InOutSummaryQtQCtrl', function ($scope,$rootScope,InOutSummaryQtQservice,$state,$stateParams,$location) {
    //
    // $scope.breplybox1 = false;
    // $scope.breplybox2 = false;
    // $scope.breplybox3 = false;
    // $scope.breplybox4 = false;
    // $scope.breplybtn1 = true
    // $scope.breplybtn2 = true
    // $scope.breplybtn3 = true
    // $scope.breplybtn4 = true
    // $scope.bReply1 = function(flag){
    //     $scope.breplybox1 = true;
    //     if(flag == 'r'){
    //         $scope.breplybtn1 = false;
    //     }else if(flag == 'u'){
    //         $scope.breplybtn1 = true;
    //         $scope.breplybox1 = false;
    //     }
    // }
    // $scope.bReply2 = function(flag){
    //     $scope.breplybox2 = true;
    //     if(flag == 'r'){
    //         $scope.breplybtn2 = false;
    //     }else if(flag == 'u'){
    //         $scope.breplybtn2 = true;
    //         $scope.breplybox2 = false;
    //     }
    // }
    // $scope.bReply3 = function(flag){
    //     $scope.breplybox3 = true;
    //     if(flag == 'r'){
    //         $scope.breplybtn3 = false;
    //     }else if(flag == 'u'){
    //         $scope.breplybtn3 = true;
    //         $scope.breplybox3 = false;
    //     }
    // }
    // $scope.bReply4 = function(flag){
    //     $scope.breplybox4 = true;
    //     if(flag == 'r'){
    //         $scope.breplybtn4 = false;
    //     }else if(flag == 'u'){
    //         $scope.breplybtn4 = true;
    //         $scope.breplybox4 = false;
    //     }
    // }


    $rootScope.getOutsumCycle().then(function (data) {
        $scope.cycledata = data.result;

    });


    $rootScope.getSeg('segment').then(function(data){
        $scope.seGcycledata = data.result;
    });
    $rootScope.getSeg('geo').then(function(data){
        $scope.Geocycledata = data.result;
    });


})