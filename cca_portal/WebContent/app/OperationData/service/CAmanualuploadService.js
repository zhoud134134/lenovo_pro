/**
 * Created by Qinglanhui on 2018/8/23.
 */
angular.module('app.OperationData').service("CAmanualuploadService", function($http, $q , APP_CONFIG) {
    //Select��һ����Cycle
    this.getSelectCycle = function() {
        var d = $q.defer();
        $http({
            method : 'GET',
            //http://10.99.123.10:8080/lenovo-ccf-prod/api/bmc/
            url : APP_CONFIG.baseUrl +'/api/mcm/',
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
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
    //����Prc������
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
            // ����ɹ�ִ�д���
            d.resolve(response.data);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }
    //����Ww������
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
            // ����ɹ�ִ�д���
            d.resolve(response.data);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }
    //����Prc bu������
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
            // ����ɹ�ִ�д���
            d.resolve(response.data);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }
    //����Prc Segment������
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
            // ����ɹ�ִ�д���
            d.resolve(response.data);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }
    ////Validate��ť����
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
    //        // ����ɹ�ִ�д���
    //        d.resolve(response.data);
    //    }, function errorCallback(response) {
    //        // ����ʧ��ִ�д���
    //        d.reject("error");
    //    });
    //    return d.promise;
    //}
})
