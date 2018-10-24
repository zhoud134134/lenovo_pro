"use strict";

angular.module('app.Validation').controller('OthercategoryAccumulationCtrl', function ($scope, $http, $timeout, OthercategoryAccumulationService, $state, $stateParams, $rootScope, $location, Upload, APP_CONFIG) {
    $rootScope.getvalidationCycle('OtherCategoryFCST').then(function (data) {
        $scope.cycledata = data.result;
    });
    $scope.ww = true;
    $scope.btnSwitch = function (flag) {
        if (flag == 'w') {
            $scope.ww = false;
        } else if (flag == 'p') {
            $scope.ww = true;
        }
    }
    //上传
    $scope.myfiles = {};
    $scope.openUpload = function () {
        $scope.myfilesVal = '';
        $scope.fileChange = function () {
            if ($scope.myfiles.name) {
                $scope.myfilesVal = $scope.myfiles.name;
            } else {
                $scope.myfilesVal = '';
            }
        }
    };

    $scope.ww = false;
    $scope.searchOtherTab = function () {
        if (!$scope.CycleChoose) {
            alert("Please select conditions！");
        } else {
            $('#upload1').css('display', 'none');
            $('#upload2').css('display', 'block');
            $scope.id = $scope.CycleChoose.taskId;
            $scope.ww = false;
            //请求表格数据调用方法
            OthercategoryAccumulationService.getOthercategoryData($scope.id).then(function (data) {
                if (data.code == 0) {
                    $scope.ww = true;
                    $scope.categoryData = data.result;
                    var geo = $rootScope.getFiled($scope.categoryData, "geo");
                    var categorylvl1 = $rootScope.getFiled($scope.categoryData, "categorylvl1");
                    var categorylvl2 = $rootScope.getFiled($scope.categoryData, "categorylvl2");
                    var categorylvl3 = $rootScope.getFiled($scope.categoryData, "categorylvl3");
                    $scope.dataMap = OthercategoryAccumulationService.getDataMap($scope.categoryData, geo, categorylvl1, categorylvl2, categorylvl3);

                    $('#upload1').css('display', 'block');
                    $('#upload2').css('display', 'none');

                    if($scope.dataMap.geo==''||$scope.dataMap.region==''||$scope.dataMap.segment==''){
                        console.log("空");
                        $("#other_content .sticky-wrap .sticky-thead").hide();
                    }
                }
            }, function (data) {
                console.log(data);
            });
        };
    };


    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在table render完成后执行的js
        $('#final table').stickySort({sortable: true});
    });

    //下载模板
    $scope.DowTemp = function () {
        $scope.temp = {
            type: 'category'
        };
        OthercategoryAccumulationService.download($scope.temp).then(function (response) {
            var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
            fileName = fileName.replace(/\"/g, "");
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
            console.log(data);
        });
    }


    //Download table
    $scope.getOtherDown = function () {
        //if (!$scope.id) {
        //    return;
        //} else {

        OthercategoryAccumulationService.getOtherDownLoad($scope.id).then(function (response) {
            var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
            fileName = fileName.replace(/\"/g, "");
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
            console.log(data);
        })
        //}
    }
});