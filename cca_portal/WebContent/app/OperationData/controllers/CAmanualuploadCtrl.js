"use strict";

angular.module('app.OperationData').controller('CAmanualuploadCtrl', function ($scope,$state,APP_CONFIG,$location,$rootScope,CAmanualuploadService,Upload) {
    //初始化Cycle Choose
    CAmanualuploadService.getSelectCycle().then(function(data){
        if(data.code == 0){
            $scope.cycledata = data.result;
            console.log($scope.cycledata);
        }
        console.log(data);
    },function(data){
        console.log(data);
    });

    //上传
    $scope.myfiles = {};
    $scope.openUpload = function(){
        //$('#myModal').modal('show');
        $scope.myfilesVal = '';
        $scope.fileChange = function(){
            if($scope.myfiles.name){
                $scope.myfilesVal = $scope.myfiles.name;
            }else {
                $scope.myfilesVal = '';
            }
        }
    }

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
            console.log($scope.CycleChoose.indexOf("M0")==-1);
            if(!$scope.CycleChoose){
                alert("请选择条件！");
            }else {
                if (data.code == 0 && $scope.CycleChoose.indexOf("M0") == -1) {
                    alert('上传成功！');
                    //$('#myModal').modal('hide');
                    $scope.goPage();
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

    //prc时的Download
    $scope.getPRCDownLoad = function(){
        if(!$scope.TaskID){
            return;
        }else{
            CAmanualuploadService.getPrcDown($scope.TaskID).then(function(data){
                console.log(data);
                //type: "application/vnd.ms-excel"}可以保存为xls格式的excel文件（兼容老版本）
                //而使用“application/vnd.openxmlformats-officedocument.spreadsheetml.sheet”则会保存为xlsx
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

    //ww时的Download
    $scope.getWWDownLoad = function(){
        if(!$scope.TaskID){
            return;
        }else{
            CAmanualuploadService.getWwDown($scope.TaskID).then(function(data){
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
        console.log($scope.CycleChoose);
        $scope.validate = {
            zcycle_name : $scope.CycleChoose,
            zuuid : $scope.TaskID,
            user : $rootScope.user
        };
        console.log($rootScope.user)
        CAmanualuploadService.getValidate($scope.validate).then(function (data) {
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