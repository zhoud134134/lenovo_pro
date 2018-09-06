"use strict";

angular.module('app.OperationData').controller('MegaDealRelatedMaintenanceCtrl', function ($scope,$state,$stateParams,$location,$timeout,CycleQTQService,Upload,MegaDealRelatedMaintenance,APP_CONFIG,$rootScope) {

    //初始化Cycle Choose
    CycleQTQService.getSelectCycle().then(function(data){
        if(data.code == 0){
            $scope.cycledata = data.result;
        }
        console.log(data);
    },function(data){
        console.log(data);
    });


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

    $scope.caprcww=false;
    $scope.upload = function(){
        if(!$scope.CycleChoose){
            alert("请选择条件！");
        }else {
            var cycleArr = $scope.CycleChoose.split(' ');
            $scope.cycle = cycleArr[2];
            $scope.year = cycleArr[0];
            $scope.quarter = cycleArr[1].substring(0,2) ;
            console.log($scope.quarter)
            Upload.upload({
                //服务端接收
                url:APP_CONFIG.baseUrl+ '/api/mega/attachments',
                data : {
                    file : $scope.myfiles,
                    username :$rootScope.user,
                    cycle:$scope.CycleChoose,
                    year:$scope.year,
                    quarter:$scope.quarter
                },
                headers: {
                    'Authorization': 'Bearer '+ sessionStorage.getItem("token")
                },
            }).success(function (data, status, headers, config){
                console.log(data)
                console.log(status)
                if(status == 200){
                    if(data.code == 0){
                        MegaDealRelatedMaintenance.getData($scope.cycle).then(function(data2){
                            if(data2.code == 0){
                                $scope.pageList = data2.result;
                                $scope.getTable();
                            }
                            console.log(data2);
                        },function(data2){
                            console.log(data2);
                        });
                    }else {
                        alert(data.msg);
                    }
                }

            }).error(function (data, status, headers, config) {
                alert('Uploading Failed');
                //上传失败
                console.log('error status: ' + status);
            });

        }
    }


    $scope.getTable = function(){
        $("#MegaTable").dataTable().fnDestroy();
        $timeout(function () {
            $('#MegaTable thead tr').eq(1).find('td').each(function() {
                var title = $('#MegaTable thead tr td').eq($(this).index()).text();
                $(this).html('<input type="text" placeholder="Search ' + title + '" />');
            });
            var table = $('#MegaTable').DataTable({
                //"processing": true,
                "scrollY": 850,
                "scrollX": true,
                "dom": '<"top">rt<"bottom"><"clear">',
                "scrollCollapse": true,
                "paging": false,
                "autoWidth": false,
                "data" :  $scope.pageList,
                "columns":[
                    { "data": "cycle" },
                    { "data": "category" },
                    { "data": "segment" },
                    { "data": "bu" },
                    { "data": "geo" },
                    { "data": "region" },
                    { "data": "value" },
                    { "data": "remark" }
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