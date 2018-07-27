"use strict";

angular.module('app.Validation').controller('QTQPNtakedownAccumulationCtrl', function ($scope,$state,$stateParams,$location) {

    $scope.ww = true;
    $scope.s1 = true;
    $scope.s2 = false;
    $scope.w1 = true;
    $scope.w2 = false;
    $scope.c1 = false;
    $scope.c2 = false;
    $scope.btnSwitch = function(flag){
        if(flag == 'w'){
            //PRC与WW切换
            $scope.ww = false;
            //大表切换
            $scope.w2 = true;
            $scope.w1 = false;
            //两个按钮功能切换
            $scope.s1 = false;
            $scope.s2 = true;
            //小表隐藏
            $scope.c1 = false;
            $scope.c2 = false;
        }else if(flag == 'p'){
            $scope.ww = true;
            $scope.w1 = true;
            $scope.w2 = false;
            $scope.s1 = true;
            $scope.s2 = false;
            $scope.c1 = false;
            $scope.c2 = false;
        }
    }

    $scope.btnSV1 = function(flag){
        if(flag == 'd'){
            //$scope.ww = true;
            $scope.w1 = true;
            $scope.c1 = false;

        }else if(flag == 's'){
            //$scope.ww = false;
            $scope.w1 = false;
            $scope.c1 = true;
        }
    }
    $scope.btnSV2 = function(flag){
        if(flag == 'd'){
            $scope.w2 = true;
            $scope.c2 = false;
        }else if(flag == 's'){
            $scope.w2 = false;
            $scope.c2 = true;
        }
    }
})