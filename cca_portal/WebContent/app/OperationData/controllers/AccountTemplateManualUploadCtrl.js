"use strict";

angular.module('app.OperationData').controller('AccountTemplateManualUploadCtrl', function ($scope, OthercategorymaintenanceService, AccountTemplateManualUploadService, CAmaintenanceService, $timeout, $rootScope, Upload, APP_CONFIG, $state, $stateParams, $location) {
    $rootScope.getCycle('Actual').then(function (data) {
        $scope.cycledata = data.result;
    });
    //$('#final table').stickySort({sortable: true});

    //上传
    $scope.myfiles = {};
    $scope.myfilesVal = '';
    $scope.fileChange = function () {
        if ($scope.myfiles.name) {
            $scope.myfilesVal = $scope.myfiles.name;
        } else {
            $scope.myfilesVal = '';
        }
    }

    $scope.account = false;
    $scope.upload = function () {
        if (!$scope.CycleChoose) {
            alert("Please select conditions！");
        } else {
            $('#upload1').css('display', 'none');
            $('#upload2').css('display', 'block');
            Upload.upload({
                //服务端接收
                url: APP_CONFIG.baseUrl + '/api/SUMACT/',
                data: {
                    file: $scope.myfiles,
                    username: $rootScope.user,
                    cycle: $scope.CycleChoose
                },
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }
            }).success(function (data, status, headers, config) {
                console.log(data);
                if (data.code == 0) {
                    $scope.id = data.result;
                    $scope.TaskID = data.result;

                    $scope.cycleName=$scope.CycleChoose;
                    //请求表格数据调用方法
                    AccountTemplateManualUploadService.getSumactData($scope.id).then(function (data) {
                        if (data.code == 0) {
                            $scope.account = true;
                            console.log(data);
                            $scope.categoryData = data.result;

                            var geo = $rootScope.sortByDataBase($rootScope.getFiled($scope.categoryData, "geo"),$scope.allSortData.geos);
                            var categorylvl1 =$rootScope.getFiled($scope.categoryData, "categorylvl1");
                            var categorylvl2 = $rootScope.getFiled($scope.categoryData, "categorylvl2");
                            var categorylvl3 = $rootScope.getFiled($scope.categoryData, "categorylvl3");
                            $scope.dataMap = OthercategorymaintenanceService.getDataMap($scope.categoryData, geo, categorylvl1, categorylvl2, categorylvl3);
                            console.log($scope.dataMap);

                            $('#upload1').css('display', 'block');
                            $('#upload2').css('display', 'none');
                        }
                    }, function (data) {
                        console.log(data);
                    });
                } else {
                    alert('Uploading Failed');
                }
            }).error(function (data, status, headers, config) {
                alert('Uploading Failed');
                //上传失败
                console.log('error status: ' + status);
            });
        }
    }
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在table render完成后执行的js
        $('#final table').stickySort({sortable: true});


    });

    //ww时的Download
    $scope.getSumActDownLoad = function () {
        if (!$scope.TaskID) {
            return;
        } else {
            AccountTemplateManualUploadService.getSumActDownLoad($scope.TaskID).then(function (response) {
                var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
                fileName=fileName.replace(/\"/g,"");
                var data = response.data;
                //console.log(data);
                var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                var objectUrl = URL.createObjectURL(blob);
                var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href", objectUrl);
                aForExcel.attr("download", fileName);
                $("body").append(aForExcel);
                $(".forExcel").click();
                aForExcel.remove();
            }, function (data) {
                //console.log(data);
            })
        }
    }

    //下载模板
    $scope.DowTemp = function () {
        $scope.temp = {
            type: 'actual'
        }
        AccountTemplateManualUploadService.download($scope.temp).then(function (response) {
            console.log(response);
            var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
            fileName=fileName.replace(/\"/g,"");
            var data = response.data;
            var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            var objectUrl = URL.createObjectURL(blob);
            var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href",objectUrl);
            aForExcel.attr("download",fileName);
            $("body").append(aForExcel);
            $(".forExcel").click();
            aForExcel.remove();
        }, function (data) {
            console.log(data);
        });
    }

})