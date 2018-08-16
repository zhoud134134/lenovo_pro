"use strict";

angular.module('app.Report').controller('OuttapeSummaryCtrl', function ($scope,$state,$stateParams,$timeout) {
    //datatable ±íÍ·¹Ì¶¨
    $scope.reporttab=function(){
        $("#tabExample1").dataTable().fnDestroy();
        $timeout(function () {
            $('#tabExample1').dataTable({
                "scrollY":260,
                "scrollX": true,
                "dom": '<"top">rt<"bottom"><"clear">',
                "scrollCollapse": true,
                "jQueryUI": true,
                // "pagingType":   "simple_numbers",
                stateSave: true,
                "paging": false,
                "ordering": false,
                "bLengthChange": true,
                //"order": [[ 3, "desc" ]],
                "fixedColumns" :{
                    leftColumns: 2,
                }
            });
        })
    }
    $scope.reporttab();
})