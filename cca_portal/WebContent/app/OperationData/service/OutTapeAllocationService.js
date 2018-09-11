/**
 * Created by Qinglanhui on 2018/9/5.
 */
angular.module('app.OperationData').service("OutTapeAllocationService", function($http, $q , APP_CONFIG) {
    //Select��һ����Cycle
    this.getSelectCycle = function() {
        var d = $q.defer();
        $http({
            method : 'GET',
            //http://10.99.123.10:8080/lenovo-ccf-prod/api/bmc/
            url : APP_CONFIG.baseUrl +'/api/mcm/',
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
        }).then(function successCallback(response) {
            // ����ɹ�ִ�д���
            d.resolve(response.data);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }

    //��ȡ�ڶ����ֱ������
    this.getExecute2 = function() {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/CAMaintenanceBmc/',
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
        }).then(function successCallback(response) {
            // ����ɹ�ִ�д���
            d.resolve(response.data);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }

    //ɾ���ڶ�����ĳһ��
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
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token"),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(function successCallback(response) {
            // ����ɹ�ִ�д���
            d.resolve(response.data);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }

    //����Ww������ 1
    this.getWw = function(id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/bmc/summary/row/'+id,
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
        }).then(function successCallback(response) {
            // ����ɹ�ִ�д���
            d.resolve(response.data);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }
    //����Prc������ 2
    this.getPrc = function(id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/bmc/summary/prc/'+id,
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
        }).then(function successCallback(response) {
            // ����ɹ�ִ�д���
            d.resolve(response.data);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }

    //Download
    this.getWwDown = function(id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/dm/ca/loadexcel/ww/'+id,
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
            responseType : 'arraybuffer'
        }).then(function successCallback(response) {
            // ����ɹ�ִ�д���
            d.resolve(response.data);
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