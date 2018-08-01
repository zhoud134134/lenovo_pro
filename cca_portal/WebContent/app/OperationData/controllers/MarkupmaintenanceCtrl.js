"use strict";

angular.module('app.OperationData').controller('MarkupmaintenanceCtrl', function ($scope,$state,$stateParams,$location) {

    //Actual与Forecast选择展示
    $scope.atc = true;
    $scope.wpSel = function(){
        if($scope.CycleSelect == 'Actual'){
            $scope.atc = true;
            $scope.aww = true;
            $scope.fww = true;
        }else if($scope.CycleSelect =='Forecast'){
            $scope.atc = false;
            $scope.aww = true;
            $scope.fww = true;
        }
    }

    //Actual中PRC与WW的切换
    $scope.aww = true;
    $scope.btnSwitchA = function(flag){
        if(flag == 'w'){
            $scope.aww = false;
        }else if(flag == 'p'){
            $scope.aww = true;
        }
    }

    //Actual中PRC与WW的切换
    $scope.fww = true;
    $scope.btnSwitchF = function(flag){
        if(flag == 'w'){
            $scope.fww = false;
        }else if(flag == 'p'){
            $scope.fww = true;
        }
    }


})