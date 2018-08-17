"use strict";

angular.module('app.OperationData').controller('CAmanualuploadCtrl', function ($scope,$state,$stateParams,$location) {
    //button 切换
    $scope.sw1 = true;
    $scope.ww = false;
    $scope.sw2 = false;
    $scope.btnSwitch = function (flag) {
        if (flag == 'w') {
            $scope.ww = true;
            $scope.sw1 = false;
            //$scope.sw2 = false;
        } else if (flag == 'p') {
            $scope.ww = false;
            $scope.sw1 = true;
            //$scope.sw2 = false;
        }
    }

    $scope.btnSV = function (flag) {
        if (flag == 's1') {
            $scope.sw2 = true;
            $scope.sw1 = false;
            $scope.ww=false;
        } else if (flag == 's2') {
            $scope.sw1 = true;
            $scope.sw2 = false;
            $scope.ww=false;
        }
    }

})