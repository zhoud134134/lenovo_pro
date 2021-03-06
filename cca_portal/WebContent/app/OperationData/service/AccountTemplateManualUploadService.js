/**
 * Created by Qinglanhui on 2018/9/12.
 */
angular.module('app.OperationData').service("AccountTemplateManualUploadService", function ($http, $q, $rootScope, APP_CONFIG) {

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
    
    
       //请求AccountTemplateManualUpload表格 接口
    this.getSumactData = function(id) {
        var d = $q.defer();
        $http({
            method : 'GET',
             url : APP_CONFIG.baseUrl +'/api/SUMACT/?uuid='+id,
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
    
    //SumAct时的Download
    this.getSumActDownLoad = function(id) {
       // console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/SUMACTExcel/',
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
            params : {
            'uuid' :id
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
    //SumAct时的Download Detail
    this.getSumSimpDownLoad = function(id) {
        // console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/SUMACTSimpleExcel/',
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
            params : {
                'uuid' :id
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
})