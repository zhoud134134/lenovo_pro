"use strict";

angular.module('app.OperationData').controller('MarkupmaintenanceCtrl', function ($scope,$rootScope,$state,$stateParams,$location,$timeout,MarkupmaintenanceService) {

    //初始化Cycle Choose
    MarkupmaintenanceService.getSelectCycle().then(function(data){
        if(data.code == 0){
            $scope.cycledata = data.result;
        }
        console.log(data);
    },function(data){
        console.log(data);
    });

    //第二部分tab信息展示
    $scope.getPage = function(){
        MarkupmaintenanceService.getExecute2().then(function(data){
            console.log(data);
            if(data.code == 0){
                //$scope.noData = false;
                $scope.tablist = data.result;
                $("#tabExample").dataTable().fnDestroy();
                $timeout(function () {
                    $('#tabExample').dataTable({
                        "scrollY": 160,
                        "scrollX": true,
                        "dom": '<"top">rt<"bottom"><"clear">',
                        "scrollCollapse": true,
                        "jQueryUI": true,
                        // "pagingType":   "simple_numbers",
                        stateSave: true,
                        "paging": false,
                        "ordering": false,
                        "bLengthChange": true,
                        //"order": [[ 3, "desc" ]]
                    });
                });
            }
            console.log(data);
        },function(data){
            console.log(data);
        });
    }
    $scope.getPage();


    //点击Execute执行
    //$scope.noData = true;
    $scope.getExecute = function(){
        $scope.taskId = '';
        $scope.search = {
            cycleName : $scope.CycleChoose,
            user : $rootScope.user
        }
        console.log($rootScope.user);
        if(!$scope.CycleChoose){
            alert("请选择条件！");
        }else {
            MarkupmaintenanceService.getExecute($scope.search).then(function(data){
                if(data.code == 0){
                    alert(data.result);
                    $scope.getPage();
                }else {
                    alert(data.msg);
                }
                console.log(data);
            },function(data){
                console.log(data);
            });
        }
    };


    //单击整行选中
    $scope.trClick = function($event,id,status,cycleName){
        $($("#tabExample input:radio")).removeAttr("checked");
        $($event.target).parent().find("input:radio").prop("checked",true);
        $scope.taskId = id;
        console.log($scope.taskId)
        $scope.status = status;
        console.log($scope.status)
        $scope.cyclename = cycleName;
        console.log($scope.cyclename)
    }



    $scope.WW = true;
    $scope.PRC = true;



    $scope.markTab = false;
    //点击Search
    $scope.SearchTab = function(){
        if(!$scope.taskId){
            alert("请选择项！");
        }else if($scope.status =='Success' || $scope.status =='Publish'){
            $scope.markTab = true;
            //$scope.PRCWW = false;
            $scope.TaskID =  $scope.taskId;
            $scope.CyclName = $scope.cyclename;
            //$scope.WW = false;
            //$scope.PRC = true;

            //WW
            // $("#PRCExample").dataTable().fnDestroy();
            MarkupmaintenanceService.getWw($scope.TaskID).then(function(data){
                if(data.code == 0){
                    console.log(data)
                    $scope.only = data.result.only;
                    $scope.master = data.result.master;

                    //第一模块的第一个表thead
                    $scope.tab1_1thead = ['XXX+BMC $M（Exclude Visual & Accessory）'].concat($rootScope.Markupthead);
                    //第一模块的第二个表thead
                    $scope.tab1_2thead = ['XXX+Markup in Tape $M (Exclude Visual,Accessory,Workstation）'].concat($rootScope.Markupthead);
                    //第一模块的第一个表整体
                    $scope.tab1_1 = $rootScope.SortUnique($scope.only,$rootScope.Markuptbody,$scope.tab1_1thead,'bmc');
                    //第一模块的第二个表整体
                    $scope.tab1_2 = $rootScope.SortUnique($scope.only,$rootScope.Markuptbody,$scope.tab1_2thead,'mark45');
                    //第一模块的第一个表tbody
                    $scope.tab1_1_tbody = $scope.tab1_1.slice(0,$scope.tab1_1.length-1)
                    //第一模块的第一个表tfoot
                    $scope.tab1_1_tfoot = $scope.tab1_1.slice($scope.tab1_1.length-1)
                    //第一模块的第二个表tbody
                    $scope.tab1_2_tbody = $scope.tab1_2.slice(0,$scope.tab1_2.length-1)
                    //第一模块的第二个表tfoot
                    $scope.tab1_2_tfoot = $scope.tab1_2.slice($scope.tab1_2.length-1)

                }
                console.log(data);
            },function(data){
                console.log(data);
            });

            //PRC
            /* MarkupmaintenanceService.getPrc($scope.TaskID).then(function(data) {
             if (data.code == 0) {
             $scope.PrcList = data.result;
             console.log($scope.PrcList);
             $scope.prcTalbe();
             }
             console.log(data)
             } ,function(data){
             console.log(data);
             });*/
        }else {
            alert("暂未执行成功，无法查看！");
        }
    };

    //删除
    $scope.DelParticular = function(){
        if(!$scope.taskId){
            alert("请选择项！");
        }else if($scope.status =='Success' || $scope.status =='Publish'|| $scope.status =='Error'){
            if(confirm('确认要删除？')) {
                console.log($scope.taskid);
                $scope.taskid = {
                    uuid: $scope.taskId
                };
                MarkupmaintenanceService.DelParticular($scope.taskid).then(function (data) {
                    if (data.code == 0) {
                        alert("删除成功！");
                        $scope.taskId = '';
                        $scope.getPage();
                        //$("#tabExample").dataTable().fnDestroy();
                        $scope.PRCWW = true;
                    }else {
                        alert(data.msg);
                    }
                    console.log(data);
                }, function (data) {
                    console.log(data);
                });
            }
        }else {
            alert("还未执行完成！");
        }
    };




    //Actual与Forecast选择展示
    $scope.atc = true;
    $scope.wpSel = function(){
        if($scope.CycleSelect == 'Forecast'){
            $scope.atc = true;
            $scope.aww = true;
            $scope.fww = true;
        }else if($scope.CycleSelect =='Actual'){
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

    //Forecast中PRC与WW的切换
    $scope.fww = true;
    $scope.btnSwitchF = function(flag){
        if(flag == 'w'){
            $scope.fww = false;
        }else if(flag == 'p'){
            $scope.fww = true;
        }
    }


})