"use strict";

angular.module('app.OperationData').controller('MarkupmaintenanceCtrl', function ($scope,$rootScope,$state,$stateParams,$location,$timeout,MarkupmaintenanceService,navService) {

    var prc = {
        stype : 'PRC'
    }
    var ww = {
        stype : 'WW'
    }
    $rootScope.getCycle('FCST').then(function(data){
        $scope.cycledata = data.result;
    });
    //第二部分tab信息展示
    $scope.getPage = function(){
        MarkupmaintenanceService.getExecute2().then(function(data){
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
        },function(data){
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
            },function(data){
            });
        }
    };


    //单击整行选中
    $scope.trClick = function($event,id,status,cycleName){
        $($("#tabExample input:radio")).removeAttr("checked");
        $($event.target).parent().find("input:radio").prop("checked",true);
        $scope.taskId = id;
        $scope.status = status;
        $scope.cyclename = cycleName;
    }



    $scope.WW = true;
    $scope.PRC = true;
    $scope.markTab = false;
    //点击Search
    $scope.SearchTab = function(){
        if(!$scope.taskId){
            alert("请选择项！");
        }else if($scope.status =='Success' || $scope.status =='Publish'){
	        	
			var geo = [];
			geo = geo.concat($rootScope.allSortData.geos);
			var segmentWW = [];
			segmentWW = segmentWW.concat($rootScope.wwSortData);
			var segmentPRC = [];
			segmentPRC = segmentPRC.concat($rootScope.prcSortData);
			geo.push('Total');
			segmentWW.push('Total');
			segmentPRC.push('Total');
            $scope.markTab = true;
            $scope.TaskID =  $scope.taskId;
            $scope.CyclName = $scope.cyclename;

            //WW
            MarkupmaintenanceService.getWw($scope.TaskID).then(function(data){
                if(data.code == 0){
                     $scope.result = data.result;
                     $scope.resData = [];
                     for(var i in $scope.result){
                     var thead1 =['XXX+BMC $M（'+ i +'）'].concat(geo);
                     var thead2 = ['XXX+Markup in Tape $M (' + i + '）'].concat(geo);
                     var tbodyBmc = $rootScope.SortUnique($scope.result[i],segmentWW,thead1,'bmc');
                     var tbodyMark = $rootScope.SortUnique($scope.result[i],segmentWW,thead2,'mark45');
                     $scope.resData.push({name : i,tbodyBmc : {tbodyBmcThead:thead1,tbodyBmcTbody : tbodyBmc.slice(0,tbodyBmc.length-1),tbodyBmcTfoot:tbodyBmc.slice(tbodyBmc.length-1)},tbodyMark : {tbodyMarkThead:thead2,tbodyMarkTbody : tbodyMark.slice(0,tbodyMark.length-1),tbodyMarkTfoot:tbodyMark.slice(tbodyMark.length-1)}})
                     }
                     $timeout($scope.resData);
                }
            },function(data){
            });

            //PRC
             MarkupmaintenanceService.getPrc($scope.TaskID).then(function(data) {
                 if (data.code == 0) {
                     $timeout(function(){
                         $scope.markHZ = $rootScope.markHZ(data.result,segmentPRC)
                     });
                 }
                 } ,function(data){
             });
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
                }, function (data) {
                });
            }
        }else {
            alert("还未执行完成！");
        }
    };

    //点击Validate
    $scope.getValidate = function(){
        $scope.validate = {
            zcycle_name : $scope.CyclName,
            zuuid : $scope.TaskID,
            user : $rootScope.user
        };
        MarkupmaintenanceService.getValidate($scope.validate).then(function (data) {
            if(data.code == 0){
                alert('Success!');
                $scope.getPage();
            }else {
                alert(data.msg);
            }
        }, function (data) {
        });
    };

    $scope.getDownLoad = function(){
        $('#ps2').css('display','block');
        $('#ws2').css('display','block');
        $('#ps1').css('display','none');
        $('#ws1').css('display','none');
        if(!$scope.TaskID){
            return;
        }else {
            MarkupmaintenanceService.getPrcSum($scope.TaskID).then(function (data) {
                var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                var objectUrl = URL.createObjectURL(blob);
                var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href",objectUrl);
                $("body").append(aForExcel);
                $(".forExcel").click();
                aForExcel.remove();
                $('#ps1').css('display','block');
                $('#ws1').css('display','block');
                $('#ps2').css('display','none');
                $('#ws2').css('display','none');
            }, function (data) {
            });
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