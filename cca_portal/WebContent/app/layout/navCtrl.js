"use strict";

angular.module('app.layout').controller('navCtrl', function ($scope,$rootScope, $state, $stateParams, $location, navService) {

    navService.getUser().then(function (data) {
        if (data.code == 0) {
            var data = {"result":{"displayname":["Jiaozi JZ1 Han"],"ITcode":["hanjz1"],"email":["hanjz1@lenovo.com"]},"code":0}
             $scope.userData = data.result;

            //$scope.userData = {"displayname":["Jiaozi JZ1 Han"],"ITcode":["hanjz1"],"email":["hanjz1@lenovo.com"]}
            $scope.imgUser = true;
            if (!$scope.userData.thumbnailphoto) {
                $scope.imgUser = true;
                $scope.userData.thumbnailphoto = 'styles/img/avatars/sunny.png';
            } else {
                $scope.imgUser = false;
                $scope.userData.thumbnailphoto[0] = 'data:image/jpg;base64,' + data.result.thumbnailphoto[0];
            }
        }
        $rootScope.user =  $scope.userData.ITcode[0];
        console.log($rootScope.user)
        /*displayname
         ITcode
         telephone
         email
         thumbnailphoto*/
        console.log(data);
    }, function (data) {
        console.log(data);
    });


})

angular.module('app.layout').controller('JurisdictionCtrl', function ($scope,$rootScope, $state, $stateParams, $location, navService) {

    $scope.aaa = "11111111111111";


})