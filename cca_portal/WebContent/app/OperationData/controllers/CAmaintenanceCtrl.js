"use strict";

angular.module('app.OperationData').controller('CAmaintenanceCtrl', function ($scope,$state,$timeout,$stateParams,$rootScope,APP_CONFIG,CAmaintenanceService) {
    //初始化Cycle Choose
    CAmaintenanceService.getSelectCycle().then(function(data){
        if(data.code == 0){
            $scope.cycledata = data.result;
        }
        console.log(data);
    },function(data){
        console.log(data);
    });

    //第二部分tab信息展示
    $scope.getPage = function(){
        CAmaintenanceService.getExecute2().then(function(data){
            if(data.code == 0){
                $scope.tablist = data.result;
                $("#tabExample1").dataTable().fnDestroy();
                $timeout(function () {
                    $('#tabExample1').dataTable({
                        "scrollY": 160,
                        "scrollX": true,
                        "dom": '<"top">rt<"bottom"><"clear">',
                        "scrollCollapse": true,
                        //"jQueryUI": true,
                        // "pagingType":   "simple_numbers",
                        stateSave: true,
                        "paging": false,
                        "ordering": false,
                        "bLengthChange": true
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
            CAmaintenanceService.getExecute($scope.search).then(function(data){
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
        //$scope.SearchTaskId(a,b,c)
    }

    //点击Search
    $scope.SearchTab = function(){
        if(!$scope.taskId){
            alert("请选择项！");
        }else if($scope.status =='Success' || $scope.status =='Publish'){
            $scope.PRCww=true;

            $scope.TaskID =  $scope.taskId;
            $scope.CycleName = $scope.cyclename;

            //WW
            CAmaintenanceService.getWw($scope.TaskID).then(function(data){
                if(data.code == 0){
                    $scope.WwList = data.result;
                    console.log($scope.WwList);
                }
                console.log(data);
            },function(data){
                console.log(data);
            });

            //PRC
            CAmaintenanceService.getPrc($scope.TaskID).then(function(data) {
                if (data.code == 0) {
                    $scope.PrcList = data.result;
                    console.log($scope.PrcList);
                }
                console.log(data)
            } ,function(data){
                console.log(data);
            });
        }else {
            alert("暂未执行成功，无法查看！");
        }
    };
    //删除
    $scope.DelOneItem = function(){
        if(!$scope.taskId){
            alert("请选择项！");
        }else if($scope.status =='Success' || $scope.status =='Publish'|| $scope.status =='Error'){
            if(confirm('确认要删除？')) {
                console.log($scope.taskid);
                $scope.taskid = {
                    uuid: $scope.taskId
                };
                CAmaintenanceService.DelItem($scope.taskid).then(function (data) {
                    if (data.code == 0) {
                        alert("删除成功！");
                        $scope.taskId = '';
                        $scope.getPage();
                        //$("#tabExample").dataTable().fnDestroy();
                        //$scope.PRCWW = true;
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

    //prc时的Download
    $scope.getPRCDownLoad = function(){
        if(!$scope.TaskID){
            return;
        }else{
        CAmaintenanceService.getPrcDown($scope.TaskID).then(function(data){
            console.log(data);
            var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            var objectUrl = URL.createObjectURL(blob);
            var aForExcel = $("<a><span class='forExcel'>����excel</span></a>").attr("href",objectUrl);
            $("body").append(aForExcel);
            $(".forExcel").click();
            aForExcel.remove();
        },function(data){
            console.log(data);
        })
        }
    }

    //点击Validate
    $scope.getValidate = function(){
        $scope.validate = {
            zcycle_name : $scope.CycleName,
            zuuid : $scope.TaskID,
            user : $rootScope.user
        };
        console.log($rootScope.user)
        CAmaintenanceService.getValidate($scope.validate).then(function (data) {
            if(data.code == 0){
                alert('成功！');
                $scope.getPage();
            }else {
                alert(data.msg);
            }
            console.log(data);
        }, function (data) {
            console.log(data);
        });
    };

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

    //$scope.btnSV = function (flag) {
    //    if (flag == 's1') {
    //        $scope.sw2 = true;
    //        $scope.sw1 = false;
    //        $scope.ww=false;
    //    } else if (flag == 's2') {
    //        $scope.sw1 = true;
    //        $scope.sw2 = false;
    //        $scope.ww=false;
    //    }
    //}

})