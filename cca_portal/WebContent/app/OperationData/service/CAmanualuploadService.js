/**
 * Created by Qinglanhui on 2018/8/23.
 */
angular.module('app.OperationData').service("CAmanualuploadService", function($http, $q , APP_CONFIG) {
    //请求Prc的数据
    this.getPrc = function(id) {
        console.log(id);
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/dm/ca/prc/'+id,
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
        console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/dm/ca/ww/'+id,
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
    //请求Prc bu的数据
    this.getPrcBu = function(type) {
        console.log(type);
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/fileorder/bu',
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
    //请求Prc Segment的数据
    this.getPrcSegment = function(type) {
        console.log(type);
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/fileorder/segment',
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
    //this.getValidate = function(v) {
    //    console.log(v)
    //    var d = $q.defer();
    //    $http({
    //        method : 'PUT',
    //        url : APP_CONFIG.baseUrl + '/api/publish/',
    //        transformRequest: function(obj) {
    //            var str = [];
    //            for (var s in obj) {
    //                str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
    //            }
    //            return str.join("&");
    //        },
    //        headers: {
    //            'Authorization': 'Bearer '+ sessionStorage.getItem("token")
    //        },
    //        params : v,
    //    }).then(function successCallback(response) {
    //        // 请求成功执行代码
    //        d.resolve(response.data);
    //    }, function errorCallback(response) {
    //        // 请求失败执行代码
    //        d.reject("error");
    //    });
    //    return d.promise;
    //}

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

})
