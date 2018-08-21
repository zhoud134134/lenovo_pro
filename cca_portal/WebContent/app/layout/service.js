angular.module('app.layout').service("navService", function($http, $q , APP_CONFIG) {

    //第一部分Select中第二第三个框
    this.getUser = function(type) {
        var d = $q.defer();
        $http({
            method : 'POST',
            //http://10.99.123.10:8080/lenovo-ccf-prod/api/bmc/
            url : APP_CONFIG.baseUrl +'/adfs/user',
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }



});