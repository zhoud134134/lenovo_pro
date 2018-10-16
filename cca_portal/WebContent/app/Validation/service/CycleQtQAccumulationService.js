/**
 * Created by Qinglanhui on 2018/10/16.
 */
angular.module('app.Validation').service("CycleQtQAccumulationService", function($http, $q , APP_CONFIG) {

    //请求Prc的数据
    this.getPrc = function(id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/bmc/summary/prc/'+id,
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
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

    //请求Ww的数据
    this.getWw = function(id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/bmc/summary/row/'+id,
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
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


    //Validate按钮功能
    this.getValidate = function(v) {
        var d = $q.defer();
        $http({
            method : 'PUT',
            url : APP_CONFIG.baseUrl + '/api/publish/',
            transformRequest: function(obj) {
                var str = [];
                for (var s in obj) {
                    str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                }
                return str.join("&");
            },
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
            params : v,
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

    //WW时Download Summary
    this.getWwSum = function(id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/bmc/summary/loadexcel/row/'+id,
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
            responseType : 'arraybuffer'
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

    //Prc时Download Summary
    this.getPrcSum = function(id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/bmc/summary/loadexcel/prc/'+id,
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
            responseType : 'arraybuffer'
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

    //WW时Download Detail
    this.getWwDet = function(id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/bmc/detail/loadexcel/row/'+id,
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
            responseType : 'arraybuffer'
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

    //Prc时Download Detail
    this.getPrcDet = function(id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/bmc/detail/loadexcel/prc/'+id,
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
            responseType : 'arraybuffer'
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }


    //BU vs Segment $/Saving按钮功能
    this.getSegment = function(s,id) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/bmc/summary/rpt/'+id,
            transformRequest: function(obj) {
                var str = [];
                for (var s in obj) {
                    str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                }
                return str.join("&");
            },
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
            params : s,
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