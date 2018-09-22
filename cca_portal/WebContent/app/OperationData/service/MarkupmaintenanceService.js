angular.module('app.OperationData').service("MarkupmaintenanceService", function ($http, $q, APP_CONFIG) {
    //点击Execute执行
    this.getExecute = function (page) {
        console.log(page)
        var d = $q.defer();
        $http({
            method: 'GET',
            //http://10.99.123.10:8080/lenovo-ccf-prod/api/bmc/
            url: APP_CONFIG.baseUrl + '/api/routine/markupBmc',
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
            params: page
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

    //获取第二部分表格数据
    this.getExecute2 = function () {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/markupBmc/',
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

    //删除第二部分某一项
    this.DelParticular = function (id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method: 'DELETE',
            url: APP_CONFIG.baseUrl + '/api/uuid/',
            params: id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            }
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
    this.getWw = function (id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/dm/markup/ww/' + id,
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

    //请求Prc的数据
    this.getPrc = function (id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/dm/markup/prc/' + id,
            //url: APP_CONFIG.baseUrl + '/api/dm/markup/prc/ACT1234',
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


    //Validate按钮功能
    this.getValidate = function (v) {
        console.log(v)
        var d = $q.defer();
        $http({
            method: 'PUT',
            url: APP_CONFIG.baseUrl + '/api/publish/',
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

    //WW时Download Summary
    this.getWwSum = function (id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/dm/markup/excel/' + id,
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
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

    //Prc时Download Summary
    this.getPrcSum = function (id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/dm/markup/excel/' + id,
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
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

    //WW时Download Detail
    this.getWwDet = function (id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/bmc/detail/loadexcel/row/' + id,
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
            responseType: 'arraybuffer'
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

    //Prc时Download Detail
    this.getPrcDet = function (id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/bmc/detail/loadexcel/prc/' + id,
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
            responseType: 'arraybuffer'
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }


    //BU vs Segment $/Saving按钮功能
    this.getSegment = function (s, id) {
        console.log(s)
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/bmc/summary/rpt/' + id,
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
            params: s,
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