angular.module('app.layout').service("navService", function($http, $q , APP_CONFIG) {

    //获取用户登录信息
    this.getUser = function() {
       /* var d = $q.defer();
        $http({
            method : 'GET',
            //http://10.99.123.10:8080/lenovo-ccf-prod/api/bmc/
            url : APP_CONFIG.baseUrl +'/adfs/user',
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;*/
    	
    	$.ajax({
            url: APP_CONFIG.baseUrl +'/adfs/user',
            type: "get",
            contentType: "application/json;charset=utf-8;",
            dataType: "JSON",
            async:false,
            success: function(data){
            	 if (data.code == 0) {
                     if (!data.result) {
                         window.location.href = APP_CONFIG.indexUrl;
                     } else {
                         if (data.result.token[0]) {
                             sessionStorage.setItem("token", data.result.token[0]);
                         } else {
                             alert("没有token!");
                         }
                         if (data.result.status == '-1') {
                             alert('没有权限！');
                             window.location.href = APP_CONFIG.indexUrl;
                         } else {
                             sessionStorage.setItem("userResult", JSON.stringify(data.result));
                         }

                     }
                 }
            },
            error: function(xhr, err) {
               // openNewAlert( {title: "提示", message: "获取数据失败，请联系管理员！"} );
                console.log(err);
            }
        });
    	
    	
    }
    //bu
    this.getBU = function() {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl +'/api/fileorder/bu',
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
    //geo
    this.getGEO = function() {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl +'/api/fileorder/geo',
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
    //region
    this.getREGION = function() {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl +'/api/fileorder/region',
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
    //segment-prc
    this.getSEGMENTprc = function(v) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl +'/api/fileorder/segment',
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
            transformRequest: function (obj) {
                var str = [];
                for (var s in obj) {
                    str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                }
                return str.join("&");
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

    //segment-ww
    this.getSEGMENTww = function(v) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl +'/api/fileorder/segment',
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
            transformRequest: function (obj) {
                var str = [];
                for (var s in obj) {
                    str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                }
                return str.join("&");
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

    //请求全部排序的数据type=all
    this.getSortData = function(type,stype) {
      //  console.log(type);
       var paramsdata = {
            'type' : type,
            'stype' : stype
        };
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/fileorder/'+type,
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
             params: paramsdata,
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

    //Select第一个框Cycle Choose
    this.getSelectCycle = function(type) {
        var url=APP_CONFIG.baseUrl +'/api/mcm';
        var d = $q.defer();
        if(type){
            url+="?type="+type;
        }
        $http({
            method : 'GET',
            //http://10.99.123.10:8080/lenovo-ccf-prod/api/bmc/
            //url : APP_CONFIG.baseUrl +'/api/mcm/',
            url:url,
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

});