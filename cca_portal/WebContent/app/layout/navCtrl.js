"use strict";

angular.module('app.layout').controller('navCtrl', function ($scope,$state,$stateParams,$location,navService) {

    navService.getUser().then(function(data){
        if(data.code == 0){
            $scope.user = data.result;
            //$scope.user = {"displayname":["Jiaozi JZ1 Han"],"ITcode":["hanjz1"],"email":["hanjz1@lenovo.com"]}
            if(!$scope.user.thumbnailphoto){
                $scope.user.thumbnailphoto = 'styles/img/avatars/sunny.png';
            }
        }
            /*displayname
             ITcode
            telephone
             email
            thumbnailphoto*/
        console.log(data);
    },function(data){
        console.log(data);
    });


})