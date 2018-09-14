"use strict";

angular.module('app.OperationData').controller('OthercategorymaintenanceCtrl', function ($scope,$http,OthercategorymaintenanceService,$state,$stateParams,$rootScope,$location,Upload,APP_CONFIG) {
    $rootScope.getCycle().then(function(data){
        $scope.cycledata = data.result;
    });
    $scope.ww = true;
    $scope.btnSwitch = function(flag){
        if(flag == 'w'){
            $scope.ww = false;
        }else if(flag == 'p'){
            $scope.ww = true;
        }
    }
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
            }else {//&& $scope.CycleChoose.indexOf("M0") != -1
                if (data.code == 0 ) {
                    alert('Success');
                    $scope.ww=true;
                    $scope.id=data.result;
                    console.log(data.result);
                    console.log($scope.id);
                    //$scope.getPage();
                    //请求表格数据调用方法
                    OthercategorymaintenanceService.getOthercategoryData($scope.id).then(function(data){
                        if(data.code == 0){
                            $scope.categoryData = data.result;
                            var geo = $rootScope.getFiled($scope.categoryData,"geo");
                            var categorylvl1 = $rootScope.getFiled($scope.categoryData,"categorylvl1");
                            var categorylvl2 = $rootScope.getFiled($scope.categoryData,"categorylvl2");
                            var categorylvl3 = $rootScope.getFiled($scope.categoryData,"categorylvl3");
                            $scope.dataMap = OthercategorymaintenanceService.getDataMap($scope.categoryData,geo,categorylvl1,categorylvl2,categorylvl3);
                        }
                    },function(data){
                        console.log(data);
                    });
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

    
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在table render完成后执行的js
    	$('#final table').stickySort({ sortable: true });
    });
    
})