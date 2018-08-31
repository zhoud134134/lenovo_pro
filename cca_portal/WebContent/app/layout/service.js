angular.module('app.layout').service("navService", function($http, $q , APP_CONFIG) {

    //获取用户登录信息
    this.getUser = function() {
        var d = $q.defer();
        $http({
            method : 'GET',
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

    //bu
    this.getBU = function() {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl +'/api/fileorder/bu',
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }
    //geo
    this.getGEO = function() {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl +'/api/fileorder/geo',
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }
    //region
    this.getREGION = function() {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl +'/api/fileorder/region',
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }
    //segment-prc
    this.getSEGMENTprc = function(v) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl +'/api/fileorder/segment',
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
            transformRequest: function (obj) {
                var str = [];
                for (var s in obj) {
                    str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                }
                return str.join("&");
            },
            params: v,
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

    //segment-ww
    this.getSEGMENTww = function(v) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl +'/api/fileorder/segment',
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
            transformRequest: function (obj) {
                var str = [];
                for (var s in obj) {
                    str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                }
                return str.join("&");
            },
            params: v,
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