"use strict";

angular.module('app.Validation').controller('CAAccumulationCtrl', function ($scope, $state, $timeout, $stateParams, $rootScope, APP_CONFIG, CAAccumulationService) {

    $rootScope.getvalidationCycle('ca_maintenance').then(function (data) {
        $scope.cycledata = data.result;
    });
    //Search
    $scope.SearchTab = function (id) {
        console.log($scope.CycleChoose.taskId);
        if (!$scope.CycleChoose) {
            alert("Please select conditions");
        } else {
            $('#execute2').css('display', 'block');
            $('#execute1').css('display', 'none');
            $scope.PRCww = true;
            $scope.TaskID = $scope.CycleChoose.taskId;
            $scope.CycleName =$scope.CycleChoose;

            //WW
            CAAccumulationService.getWw($scope.TaskID).then(function (data) {
                if (data.code == 0) {
                    $('#execute1').css('display', 'block');
                    $('#execute2').css('display', 'none');

                    var WwList = data.result;
                    $scope.iconData = {
                        "Consumer": "fa-university",
                        "SMB": "fa-bookmark",
                        "Commercial": "fa-life-bouy",
                        "Others": "fa-code-fork",
                        "Total": "fa-reorder"
                    };
                    $scope.segment = $rootScope.sortByDataBase($rootScope.getFiled(WwList, "segment"), $rootScope.wwSortData);
                    $scope.bu = $rootScope.sortByDataBase($rootScope.getFiled(WwList, "bu"), $rootScope.allSortData.bus);
                    $scope.geo = $rootScope.sortByDataBase($rootScope.getFiled(WwList, "geo"), $rootScope.allSortData.geos);
                    $scope.dataMap =CAAccumulationService.getDataMap(WwList, $scope.segment, $scope.geo, $scope.bu, $rootScope.wwSortData.regions);
                }
            }, function (data) {
                console.log(data);
            });

            //PRC
            CAAccumulationService.getPrc($scope.TaskID).then(function (caprcdata) {
                if (caprcdata.code == 0) {

                    var PrcList = caprcdata.result;
                    $scope.Prcsegment = $rootScope.sortByDataBase($rootScope.getFiled(PrcList, "segment"), $rootScope.prcSortData);
                    $scope.Prcbu = $rootScope.sortByDataBase($rootScope.getFiled(PrcList, "bu"), $rootScope.allSortData.bus);
                    $scope.Prcbu.push('Total');
                    $scope.getPrcDataMap = CAAccumulationService.getPrcDataMap(PrcList, $scope.Prcsegment, $scope.Prcbu);
                }
            }, function (data) {
                 console.log(data);
            });
        }
    };
    CAAccumulationService.getPrcBu('bu').then(function (caprcbudata) {
        $scope.PrcBu = caprcbudata.result;
        //console.log($scope.PrcBu);
    });
    CAAccumulationService.getPrcSegment('segment').then(function (caprcsegmentdata) {
        $scope.PrcSegment = caprcsegmentdata.result;
        //console.log($scope.PrcSegment);
    });

    //prc�Download
    $scope.getPRCDownLoad = function () {
        if (!$scope.TaskID) {
            return;
        } else {
            CAAccumulationService.getPrcDown($scope.TaskID).then(function (response) {
                var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
                var data = response.data;
                // console.log(data);
                //type: "application/vnd.ms-excel"}���Ա���Ϊxls��ʽ��excel�ļ��������ϰ汾��
                //��ʹ�á�application/vnd.openxmlformats-officedocument.spreadsheetml.sheet����ᱣ��Ϊxlsx
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
        }
    }

    //ww��Download
    $scope.getWWDownLoad = function () {
        if (!$scope.TaskID) {
            return;
        } else {
            CAAccumulationService.getWwDown($scope.TaskID).then(function (response) {
                var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
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

    //���Validate
    $scope.getValidate = function () {
        $scope.validate = {
            zcycle_name: $scope.CycleName,
            zuuid: $scope.TaskID,
            user: $rootScope.user
        };
        //  console.log($rootScope.user)
        CAAccumulationService.getValidate($scope.validate).then(function (data) {
            if (data.code == 0) {
                alert("success");
                $scope.getPage();
            } else {
                alert(data.msg);
            }
        }, function (data) {
             console.log(data);
        });
    };

    //button
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

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        $('#final table').stickySort({sortable: true});

        var length = -1;
        $.each($scope.dataMap, function (key, value, index) {
            $.each(value.geo, function (gkey, gvalue, gindex) {
                length += gvalue;
                if (gvalue > 1) {
                    $(".th_" + length).addClass("gray");
                }
            });
        })
    });

})