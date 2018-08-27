/**
 * Created by Qinglanhui on 2018/8/23.
 */
angular.module('app.Basicdata').service("CommoditymaintenanceService", function($http, $q , APP_CONFIG) {

    /**
     * 页面初始化
     */
    this.getPage = function(page) {
        console.log(page)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl +'/api/cmt/',
            transformRequest: function(obj) {
                var str = [];
                for (var s in obj) {
                    str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                }
                return str.join("&");
            },
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
            params : page
        }).then(function successCallback(response) {
            // ????????��???
            d.resolve(response.data);
        }, function errorCallback(response) {
            // ?????????��???
            d.reject("error");
        });
        return d.promise;
    }

    /**
     * 某项删除
     */
    this.delList = function(id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method : 'DELETE',
            url : APP_CONFIG.baseUrl +'/api/cmts/'+id,
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
            /*transformRequest: function(obj) {
             var str = [];
             for (var s in obj) {
             str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
             }
             return str.join("&");
             },*/
            //data : id
        }).then(function successCallback(response) {
            // ????????��???
            d.resolve(response.data);
        }, function errorCallback(response) {
            // ?????????��???
            d.reject("error");
        });
        return d.promise;
    }

    /**
     * 下载Excel
     */
    this.download = function(load) {
        console.log(load)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl +'/api/loadfile/loadexcel',
            transformRequest: function(obj) {
                var str = [];
                for (var s in obj) {
                    str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                }
                return str.join("&");
            },
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
            params : load,
            responseType : 'arraybuffer'
        }).then(function successCallback(response) {
            // ????????��???
            d.resolve(response.data);
        }, function errorCallback(response) {
            // ?????????��???
            d.reject("error");
        });
        return d.promise;
    }

});