/**
 * Created by Qinglanhui on 2018/8/13.
 */
angular.module('app.OperationData').service("CAmaintenanceService", function($http, $q , APP_CONFIG) {
    //Select第一个框Cycle
    this.getSelectCycle = function() {
        var d = $q.defer();
        $http({
            method : 'GET',
            //http://10.99.123.10:8080/lenovo-ccf-prod/api/bmc/
            url : APP_CONFIG.baseUrl +'/api/mcm/',
            headers: {
                'token' : sessionStorage.getItem("token")
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
    //点击Execute执行
    this.getExecute = function(page) {
        console.log(page)
        var d = $q.defer();
        $http({
            method : 'GET',
            //http://10.99.123.10:8080/lenovo-ccf-prod/api/bmc/
            url : APP_CONFIG.baseUrl +'/api/routine/CAMaintenance',
            transformRequest: function(obj) {
                var str = [];
                for (var s in obj) {
                    str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                }
                return str.join("&");
            },
            headers: {
                'token' : sessionStorage.getItem("token")
            },
            params : page
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
    this.getExecute2 = function() {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/CAMaintenanceBmc/',
            headers: {
                'token' : sessionStorage.getItem("token")
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
    this.DelItem = function(id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method : 'DELETE',
            url : APP_CONFIG.baseUrl + '/api/caMaintenanceUUid/',
            /*transformRequest: function(obj) {
             var str = [];
             for (var s in obj) {
             str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
             }
             return str.join("&");
             },*/
            params : id,
            headers: {
                'token' : sessionStorage.getItem("token"),
                'Content-Type': 'application/x-www-form-urlencoded'
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
    this.getPrc = function(id) {
        console.log(id);
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/dm/ca/prc/'+id,
            headers: {
                'token' : sessionStorage.getItem("token")
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
        console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/dm/ca/ww/'+id,
            headers: {
                'token' : sessionStorage.getItem("token")
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

    //Prc时的Download
    this.getPrcDown = function(id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/dm/ca/loadexcel/prc/'+id,
            headers: {
                'token' : sessionStorage.getItem("token")
            },
            responseType : 'arraybuffer'
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }
    //Ww时的Download
    this.getWwDown = function(id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/dm/ca/loadexcel/ww/'+id,
            headers: {
                'token' : sessionStorage.getItem("token")
            },
            responseType : 'arraybuffer'
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
        console.log(v)
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
                'token' : sessionStorage.getItem("token")
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
})