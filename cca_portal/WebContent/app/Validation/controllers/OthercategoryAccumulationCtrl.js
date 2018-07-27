"use strict";

angular.module('app.Validation').controller('OthercategoryAccumulationCtrl', function ($scope,$state,$stateParams,$location) {

    $scope.ww = true;
    $scope.btnSwitch = function(flag){
        if(flag == 'w'){
            $scope.ww = false;
        }else if(flag == 'p'){
            $scope.ww = true;
        }
    }
})