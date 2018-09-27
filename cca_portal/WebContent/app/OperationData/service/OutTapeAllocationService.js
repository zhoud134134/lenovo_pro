/**
 * Created by Qinglanhui on 2018/9/5.
 */
angular.module('app.OperationData').service("OutTapeAllocationService", function($http, $q , APP_CONFIG) {
    /**
     * ����ģ��
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
            // ����ɹ�ִ�д���
            d.resolve(response);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }

    //�±ߵ�Download
    this.getDownLoad = function(id) {
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
            // ����ɹ�ִ�д���
            d.resolve(response);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }

    //Validate��ť����
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
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
            params : v,
        }).then(function successCallback(response) {
            // ����ɹ�ִ�д���
            d.resolve(response.data);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }

})