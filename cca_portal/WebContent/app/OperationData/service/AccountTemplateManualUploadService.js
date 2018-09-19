/**
 * Created by Qinglanhui on 2018/9/12.
 */
angular.module('app.OperationData').service("AccountTemplateManualUploadService", function ($http, $q, $rootScope, APP_CONFIG) {
    //获取第二部分表格数据
    //this.getExecute2 = function () {
    //    var d = $q.defer();
    //    $http({
    //        method: 'GET',
    //        url: APP_CONFIG.baseUrl + '/api/CAMaintenanceBmc/',
    //        headers: {
    //            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    //        },
    //    }).then(function successCallback(response) {
    //        // 请求成功执行代码
    //        d.resolve(response.data);
    //    }, function errorCallback(response) {
    //        // 请求失败执行代码
    //        d.reject("error");
    //    });
    //    return d.promise;
    //}
    //
    ////删除第二部分某一项
    //this.DelItem = function (id) {
    //    //  console.log(id)
    //    var d = $q.defer();
    //    $http({
    //        method: 'DELETE',
    //        url: APP_CONFIG.baseUrl + '/api/caMaintenanceUUid/',
    //        /*transformRequest: function(obj) {
    //         var str = [];
    //         for (var s in obj) {
    //         str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
    //         }
    //         return str.join("&");
    //         },*/
    //        params: id,
    //        headers: {
    //            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
    //            'Content-Type': 'application/x-www-form-urlencoded'
    //        },
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
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

    //请求AccountTemplateManualUpload表格 接口
    this.getOthercategoryData = function (cycle) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/SUMACT/?cycle=' + cycle,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
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
})