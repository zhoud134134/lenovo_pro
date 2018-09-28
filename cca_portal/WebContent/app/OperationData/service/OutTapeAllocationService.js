/**
 * Created by Qinglanhui on 2018/9/5.
 */
angular.module('app.OperationData').service("OutTapeAllocationService", function($http, $q , APP_CONFIG) {
    /**
     * 下载模板
     */
    this.download = function (load) {
        console.log(load)
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/loadfile/loadexcel',
            transformRequest: function (obj) {
                var str = [];
                for (var s in obj) {
                    str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                }
                return str.join("&");
            },
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
            params: load,
            responseType: 'arraybuffer'
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }
    //请求lta 表格的数据
    this.getltaTab = function(param) {
        console.log(param);
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/ota/AllocationAlliance',
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
            params:param
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    };
    //请求 out 表格的数据
    this.getoutTab = function(param) {
        console.log(param);
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/ota/OutTape',
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
            params:param
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    };
    //请求 sw 表格的数据
    this.getswTab = function(param) {
        console.log(param);
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/ota/AllocationSW',
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
            params:param
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    };
    //下边的 lta Download
    this.getltaDown = function(timesta) {
        // console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/otaExcelAllocationAlliance/',
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
            params : timesta,
            responseType : 'arraybuffer'
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    };
    //下边的 out Download
    this.getoutDown = function(timesta) {
        // console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/otaExcelOutTape/',
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
            params : timesta,
            responseType : 'arraybuffer'
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    };
    //下边的 sw Download
    this.getswDown = function(timesta) {
        // console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/otaExcelSW/',
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
            params : timesta,
            responseType : 'arraybuffer'
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    };
})