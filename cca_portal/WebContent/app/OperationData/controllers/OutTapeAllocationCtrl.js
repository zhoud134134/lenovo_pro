"use strict";

angular.module('app.OperationData').controller('OutTapeAllocationCtrl', function ($scope,$rootScope,Upload,$timeout,APP_CONFIG,$state,$stateParams,$location,OutTapeAllocationService) {
    //EBR  上传文件
    $scope.myfiles = {};
    $scope.openUpload = function(){
        $scope.myfilesVal = '';
        $scope.fileChange = function(){
            if($scope.myfiles.name){
                $scope.myfilesVal = $scope.myfiles.name;
            }else {
                $scope.myfilesVal = '';
            }
        }
    };
    //GIBP 上传文件
    $scope.myfiles1 = {};
    $scope.openUpload1 = function(){
        $scope.myfilesVal1 = '';
        $scope.fileChange1 = function(){
            if($scope.myfiles1.name){
                $scope.myfilesVal1 = $scope.myfiles1.name;
            }else {
                $scope.myfilesVal1 = '';
            }
        }
    };
    //上传
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
            if(!$scope.CycleChoose){
                alert("请选择条件！");
            }else {
                if (data.code == 0 && $scope.CycleChoose.indexOf("M0") != -1) {
                    alert('上传成功！');
                    console.log(data);
                    $scope.id=data.result;
                    $scope.getPage();
                }else if(data.code == 0 && $scope.CycleChoose.indexOf("Actual") != -1){
                    alert('上传成功！');
                    $scope.id=data.result;
                    console.log(data);
                    console.log($scope.id);
                    $scope.getPage();
                } else {
                    alert('上传失败！');
                }
            }
        }).error(function (data, status, headers, config) {
            alert('上传失败');
            //上传失败
            console.log('error status: ' + status);
        });
    }

    //第二部分tab信息展示
    $scope.getPage = function(){
        OutTapeAllocationService.getExecute2().then(function(data){
            if(data.code == 0){
                $scope.tablist = data.result;
                console.log($scope.tablist);
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
        console.log($scope.taskId);
        $scope.status = status;
        console.log($scope.status);
        $scope.cyclename = cycleName;
        console.log($scope.cyclename);
    };
    //LTA Out  SW三个 隐藏
    $scope.althree=false;
    //点击Search
    $scope.SearchTab = function(){
        if(!$scope.taskId){
            alert("请选择项！");
        }else if($scope.status =='Success' || $scope.status =='Publish'){
            $scope.TaskID =  $scope.taskId;
            $scope.CycleName = $scope.cyclename;
            //LTA Out  SW三个 显示
            $scope.althree=true;
            //LTA显示
            $scope.althreeLta=true;
            $scope.althreeOut=true;
            $scope.althreeSw=true;
            //LatalTable 1
            OutTapeAllocationService.getWw($scope.TaskID).then(function(data){
                if(data.code == 0){
                    $scope.WwList = data.result;
                    $scope.LatalTable();
                    console.log($scope.TaskID);
                    console.log($scope.CyclName);
                }
                console.log(data);
            },function(data){
                console.log(data);
            });

            //LatresTable 2
            OutTapeAllocationService.getPrc($scope.TaskID).then(function(data) {
                if (data.code == 0) {
                    $scope.PrcList = data.result;
                    console.log($scope.PrcList);
                    $scope.LatresTable();
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
                OutTapeAllocationService.DelItem($scope.taskid).then(function (data) {
                    if (data.code == 0) {
                        alert("删除成功！");
                        $scope.taskId = '';
                        $scope.getPage();
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
    //LatalTable 搜索数据
    $scope.LatalTable = function(){
        $("#LatalExample").dataTable().fnDestroy();
        $timeout(function () {
            $('#LatalExample thead tr').eq(1).find('td').each(function() {
                var title = $('#LatalExample thead tr td').eq($(this).index()).text();
                $(this).html('<input type="text" placeholder="Search ' + title + '" />');
            });
            var table = $('#LatalExample').DataTable({
                "scrollY": 600,
                "scrollX": true,
                "dom": '<"top">rt<"bottom"><"clear">',
                "scrollCollapse": true,
                "paging": false,
                "ordering": false,
                "autoWidth": false,
                "data" :  $scope.WwList,
                "columns":[
                    { "data": "H1" },
                    { "data": "Account" },
                    { "data": "A0" },
                    { "data": "Profit Center" },
                    { "data": "Amount" },
                    { "data": "Deal Des./SKU/Text"},
                    {"data":"GPN"},
                    {"data":"Plant"},
                    {"data":"CD"},
                    {"data":"BU"},
                    {"data":"Geo"},
                    {"data":"Sub_Geo"},
                    {"data":"Country"},
                    {"data":"BPC Segment"},
                    {"data":"Segment"}
                    //{ "data": "lqBmc" ,render: function ( data, type, row ) {
                    //    if(data == null){
                    //        return data;
                    //    }else {
                    //        var abc = data + '';
                    //        return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    //    }
                    //}}
                ]
            });
            table.columns().eq(0).each(function(colIdx) {
                $('input', table.column(colIdx).header()).on('keyup change', function() {
                    table
                        .column(colIdx)
                        .search(this.value)
                        .draw();
                });
            });
        });
    }
    //LatresTable  搜索 数据
    $scope.LatresTable = function(){
        $("#LatresExample").dataTable().fnDestroy();
        $timeout(function () {
            $('#LatresExample thead tr').eq(1).find('td').each(function() {
                var title = $('#LatresExample thead tr td').eq($(this).index()).text();
                $(this).html('<input type="text" placeholder="Search ' + title + '" />');
            });
            var table = $('#LatresExample').DataTable({
                "scrollY": 600,
                "scrollX": true,
                "dom": '<"top">rt<"bottom"><"clear">',
                "scrollCollapse": true,
                "paging": false,
                "ordering": false,
                "autoWidth": false,
                "data" :  $scope.PrcList,
                "columns":[
                    { "data": "BU" },
                    { "data": "Segment" },
                    { "data": "Intel Alliance Funding" },
                    { "data": "SKU" },
                    { "data": "Geo" },
                    { "data": "Sub_Geo"},
                    {"data":"Amount"}
                    //{ "data": "lqBmc" ,render: function ( data, type, row ) {
                    //    if(data == null){
                    //        return data;
                    //    }else {
                    //        var abc = data + '';
                    //        return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    //    }
                    //}}
                ]
            });
            table.columns().eq(0).each(function(colIdx) {
                $('input', table.column(colIdx).header()).on('keyup change', function() {
                    table
                        .column(colIdx)
                        .search(this.value)
                        .draw();
                });
            });
        });
    }

    //Download
    $scope.getDownLoad = function(){
        if(!$scope.TaskID){
            return;
        }else{
            OutTapeAllocationService.getWwDown($scope.TaskID).then(function(data){
                console.log(data);
                var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                var objectUrl = URL.createObjectURL(blob);
                var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href",objectUrl);
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
        OutTapeAllocationService.getValidate($scope.validate).then(function (data) {
            if(data.code == 0){
                alert('Success！');
                $scope.getPage();
            }else {
                alert(data.msg);
            }
            console.log(data);
        }, function (data) {
            console.log(data);
        });
    };
    $scope.type=0;
   $scope.a=function(type){
       switch (type) {
           case 0:
               console.log(0);
               break;
           case 1:
              console.log(1);
               break;
           case 2:
              console.log(2);
               break;

       }
   }
})