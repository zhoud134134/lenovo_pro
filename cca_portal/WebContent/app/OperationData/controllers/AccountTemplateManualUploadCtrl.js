"use strict";

angular.module('app.OperationData').controller('AccountTemplateManualUploadCtrl', function ($scope,MegaDealRelatedMaintenance,AccountTemplateManualUploadService,CAmaintenanceService,$timeout,$rootScope,Upload,APP_CONFIG,$state,$stateParams,$location) {
	 $rootScope.getCycle('Actual').then(function(data){
	        $scope.cycledata = data.result;
	    });
    $('#final table').stickySort({ sortable: true });
    //上传
    $scope.myfiles = {};
    $scope.myfilesVal = '';
    $scope.fileChange = function(){
        if($scope.myfiles.name){
            $scope.myfilesVal = $scope.myfiles.name;
        }else {
            $scope.myfilesVal = '';
        }
    }

    $scope.ww=false;
    $scope.upload = function(){
        Upload.upload({
            //服务端接收
            url:APP_CONFIG.baseUrl+ '/api/dm/ca/attachments',
            data : {
                file : $scope.myfiles,
                username :$rootScope.user,
                cyclename:$scope.CycleChoose
            },
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
        }).success(function (data, status, headers, config){
            //console.log($scope.CycleChoose.indexOf("M0")==-1);
            if(!$scope.CycleChoose){
                alert("请选择条件！");
            }else {
                if (data.code == 0 && $scope.CycleChoose.indexOf("M0") != -1) {
                    alert('Success');
                    $scope.ww=true;
                    $scope.id=data.result;
                    console.log($scope.id);
                    //$('#myModal').modal('hide');
                    $scope.getPage();
                }else if(data.code == 0 && $scope.CycleChoose.indexOf("Actual") != -1){
                    alert('Success');
                    $scope.ww=true;
                    $scope.id=data.result;
                    console.log($scope.id);
                    //$('#myModal').modal('hide');
                    $scope.getPage();
                } else {
                    alert('Uploading Failed');
                }
            }
        }).error(function (data, status, headers, config) {
            alert('Uploading Failed');
            //上传失败
            console.log('error status: ' + status);
        });
    }

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
            $scope.ww=true;

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
            CAmaintenanceService.getPrc($scope.TaskID).then(function(caprcdata) {
                console.log(caprcdata);
                if (caprcdata.code == 0) {
                    $scope.PrcList = caprcdata.result;
                    console.log($scope.PrcList);
                }
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

    //下载模板
    $scope.DowTemp = function(){
        $scope.temp = {
            type: 'megadeal'
        }
        MegaDealRelatedMaintenance.download($scope.temp).then(function(data){
            console.log(data);
            var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            var objectUrl = URL.createObjectURL(blob);
            var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href",objectUrl);
            $("body").append(aForExcel);
            $(".forExcel").click();
            aForExcel.remove();
        },function(data){
            console.log(data);
        });
    }

})