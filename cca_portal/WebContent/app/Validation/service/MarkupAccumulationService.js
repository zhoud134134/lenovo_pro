/**
 * Created by Qinglanhui on 2018/10/9.
 */
angular.module('app.Validation').service("MarkupAccumulationService", function ($http, $q, $rootScope, APP_CONFIG) {
    //����Ww������
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
            // ����ɹ�ִ�д���
            d.resolve(response.data);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }

    //����Prc������
    this.getPrc = function (id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/dm/markup/prc/' + id,
            //url: APP_CONFIG.baseUrl + '/api/dm/markup/prc/ACT1234',
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


    //Validate��ť����
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
            // ����ɹ�ִ�д���
            d.resolve(response.data);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }

    //WWʱDownload Summary
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
            // ����ɹ�ִ�д���
            d.resolve(response);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }

    //PrcʱDownload Summary
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
            // ����ɹ�ִ�д���
            d.resolve(response);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }

    //WWʱDownload Detail
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
            // ����ɹ�ִ�д���
            d.resolve(response);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }

    //PrcʱDownload Detail
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
            // ����ɹ�ִ�д���
            d.resolve(response);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }


    //BU vs Segment $/Saving��ť����
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
            // ����ɹ�ִ�д���
            d.resolve(response.data);
        }, function errorCallback(response) {
            // ����ʧ��ִ�д���
            d.reject("error");
        });
        return d.promise;
    }

});