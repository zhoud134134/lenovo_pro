"use strict";

angular.module('app.layout').controller('navCtrl', function ($scope,$rootScope, $state, $stateParams, $location, navService,APP_CONFIG) {

    $rootScope.userData = JSON.parse(sessionStorage.getItem("userResult"));
    if($rootScope.userData){
        if (!$rootScope.userData.thumbnailphoto) {
            $scope.userData.thumbnailphoto = 'styles/img/avatars/sunny.png';
        } else {
            $scope.userData.thumbnailphoto = 'data:image/jpg;base64,' + $rootScope.userData.thumbnailphoto[0];
        }

        $rootScope.user =  $rootScope.userData.ITcode[0];

             
        navService.getSortData("all","").then(function(caprcsegmentdata){
            $rootScope.allSortData=caprcsegmentdata.result;
        }, function (data) {
            // console.log(data);
        });
        
        navService.getSortData("segment","prc").then(function(caprcsegmentdata){
            $rootScope.prcSortData=caprcsegmentdata.result;
        }, function (data) {
            // console.log(data);
        });
        navService.getSortData("segment","ww").then(function(cawwsegmentdata){
            $rootScope.wwSortData=cawwsegmentdata.result;
        }, function (data) {
            // console.log(data);
        });
    }else {
        console.log("获取用户信息失败！");
    }




})

angular.module('app.layout').controller('JurisdictionCtrl', function ($scope,$rootScope, $state, $stateParams, $location, navService) {

    $scope.aaa = "11111111111111";


})