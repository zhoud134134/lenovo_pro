"use strict";

angular.module('app.OperationData').controller('MarkupmaintenanceCtrl', function ($scope,$state,$stateParams,$location) {

    $scope.q1 = true;
    $scope.sw1 = true;
    $scope.sw2 = false;
    $scope.btnSwitch = function(flag){
        if(flag == 'w'){
            // $scope.ww = false;
            $scope.sw1 = true;
            $scope.sw2 = false;
        }else if(flag == 'p'){
            //     $scope.ww = true;
            // $scope.sw1 = false;
            // $scope.sw2 = false;
        }
    }

    $scope.btnSV = function(flag){
        if(flag == 's1'){
            $scope.sw2 = true;
            $scope.sw1 = false;
        }else if(flag == 's2') {
            $scope.sw1 = true;
            $scope.sw2 = false;
        }
    }



    /*$('#abctable').dataTable({
        //"processing": true,
        //"scrollY": 100,
        "scrollX": true,
        "dom": '<"top">rt<"bottom"><"clear">',
        "scrollCollapse": true,
        //"jQueryUI": true,
        // "pagingType":   "simple_numbers",
        //stateSave: true,
        "paging": false,
        //"ordering": false,
        //"lengthChange": true,
        "autoWidth": false,
        fixedColumns: { //�̶��е�������
            leftColumns: 1, //�̶���ߵ�һ��
            //rightColumns:1 //�̶��ұߵ�һ��
        },
        //fixedColumns: true
    });*/

})