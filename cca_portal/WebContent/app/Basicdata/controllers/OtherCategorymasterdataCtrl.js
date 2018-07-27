"use strict";

angular.module('app.Basicdata').controller('OtherCategorymasterdataCtrl', function ($scope,$state,$stateParams,$location) {

    $scope.ww = true;
    $scope.btnSwitch = function(flag){
        if(flag == 'w'){
            $scope.ww = false;
        }else if(flag == 'p'){
            $scope.ww = true;
        }
    }

    $scope.del = function(){
        if(confirm('确认要删除？')){

        }else {

        }
    }
})