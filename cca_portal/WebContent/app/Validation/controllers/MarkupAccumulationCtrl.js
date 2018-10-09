"use strict";

angular.module('app.Validation').controller('MarkupAccumulationCtrl', function ($scope,$rootScope,$state,$stateParams,$location,$timeout,MarkupAccumulationService,navService) {

    var prc = {
        stype : 'PRC'
    }
    var ww = {
        stype : 'WW'
    }
    $rootScope.getvalidationCycle('markup_bmc').then(function (data) {
        $scope.cycledata = data.result;
        console.log($scope.cycledata);
    });

    $scope.WW = true;
    $scope.PRC = true;
    $scope.markTab = false;
    //���Search
    $scope.SearchTab = function(){
        if(!$scope.CycleChoose){
            alert("Please select conditions");
        }else{
            $scope.markTab = true;
            $scope.TaskID =  $scope.CycleChoose.taskId;
            $scope.CyclName = $scope.cyclename;

            //WW
            MarkupAccumulationService.getWw($scope.TaskID).then(function(data){
                if(data.code == 0){
                    $scope.result = data.result;
                    $scope.resData = [];
                    for(var i in $scope.result){
                        var thead1 =[$scope.CyclName+' BMC $M（'+ i +'）'].concat($rootScope.allSortData.geos);
                        var thead2 = [$scope.CyclName+' Markup in Tape $M (' + i + '）'].concat($rootScope.allSortData.geos);
                        var tbodyBmc = $rootScope.SortUnique($scope.result[i],$rootScope.wwSortData,thead1,'bmc');
                        var tbodyMark = $rootScope.SortUnique($scope.result[i],$rootScope.wwSortData,thead2,'mark45');
                        $scope.resData.push({name : i,tbodyBmc : {tbodyBmcThead:thead1,tbodyBmcTbody : tbodyBmc.slice(0,tbodyBmc.length-1),tbodyBmcTfoot:tbodyBmc.slice(tbodyBmc.length-1)},tbodyMark : {tbodyMarkThead:thead2,tbodyMarkTbody : tbodyMark.slice(0,tbodyMark.length-1),tbodyMarkTfoot:tbodyMark.slice(tbodyMark.length-1)}})
                    }
                    $timeout($scope.resData);
                }
            },function(data){
            });

            //PRC
            MarkupAccumulationService.getPrc($scope.TaskID).then(function(data) {
                if (data.code == 0) {
                    $timeout(function(){
                        $scope.markHZ = $rootScope.markHZ(data.result,$rootScope.prcSortData);
                        $scope.cycleForTitle=$scope.CyclName;
                    });
                }
            } ,function(data){
            });

        }
    };


    //Validate
    $scope.getValidate = function(){
        $scope.validate = {
            zcycle_name : $scope.CyclName,
            zuuid : $scope.TaskID,
            user : $rootScope.user
        };
        MarkupAccumulationService.getValidate($scope.validate).then(function (data) {
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
            MarkupAccumulationService.getPrcSum($scope.TaskID).then(function (data) {
                var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
                fileName=fileName.replace(/\"/g,"")
                var data = response.data;
                var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                var objectUrl = URL.createObjectURL(blob);
                var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href",objectUrl);
                aForExcel.attr("download",fileName);
                $("body").append(aForExcel);
                $(".forExcel").click();
                aForExcel.remove();

                $('#ps1').css('display','block');
                $('#ws1').css('display','block');
                $('#ps2').css('display','none');
                $('#ws2').css('display','none');
            }, function (data) {
                console.log(data);
            });
        }
    };




    //Actual��Forecastѡ��
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

    //Actual��PRC��WW
    $scope.aww = true;
    $scope.btnSwitchA = function(flag){
        if(flag == 'w'){
            $scope.aww = false;
        }else if(flag == 'p'){
            $scope.aww = true;
        }
    }

    //Forecast��PRC��WW�
    $scope.fww = true;
    $scope.btnSwitchF = function(flag){
        if(flag == 'w'){
            $scope.fww = false;
        }else if(flag == 'p'){
            $scope.fww = true;
        }
    }

})