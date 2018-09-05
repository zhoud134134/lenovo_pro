"use strict";

angular.module('app.OperationData').controller('MegaDealRelatedMaintenanceCtrl', function ($scope,$state,$stateParams,$location) {
    $scope.ww = true;
    $scope.btnSwitch = function(flag){
        if(flag == 'w'){
            $scope.ww = false;
        }else if(flag == 'p'){
            $scope.ww = true;
        }
    }
})