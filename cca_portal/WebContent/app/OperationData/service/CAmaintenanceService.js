/**
 * Created by Qinglanhui on 2018/8/13.
 */
angular.module('app.OperationData').service("CAmaintenanceService", function ($http, $q, $rootScope, APP_CONFIG) {
    //点击Execute执行
    this.getExecute = function (page) {
        //console.log(page)
        var d = $q.defer();
        $http({
            method: 'GET',
            //http://10.99.123.10:8080/lenovo-ccf-prod/api/bmc/
            url: APP_CONFIG.baseUrl + '/api/routine/CAMaintenance',
            transformRequest: function (obj) {
                var str = [];
                for (var s in obj) {
                    str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                }
                return str.join("&");
            },
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            params: page
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
    this.getExecute2 = function () {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/CAMaintenanceBmc/',
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

    //删除第二部分某一项
    this.DelItem = function (id) {
        //  console.log(id)
        var d = $q.defer();
        $http({
            method: 'DELETE',
            url: APP_CONFIG.baseUrl + '/api/caMaintenanceUUid/',
            /*transformRequest: function(obj) {
             var str = [];
             for (var s in obj) {
             str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
             }
             return str.join("&");
             },*/
            params: id,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
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
    this.getPrc = function (id) {
        // console.log(id);
        var d = $q.defer();
        $http({
            method: 'GET',
            //url : "http://10.116.44.182:8080/api/dm/ca/prc/20180829"
            url: APP_CONFIG.baseUrl + '/api/dm/ca/prc/' + id,
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
    //请求Ww的数据
    this.getWw = function (id) {
        //  console.log(id)
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/dm/ca/ww/' + id,
            //url : "http://10.116.44.182:8080/api/dm/ca/ww/20180829",
            cache:false,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                // 'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MzYxOTkyMzMsInN1YiI6Imhhbmp6MSIsImNyZWF0ZWQiOjE1MzU1OTQ0MzMxMjZ9.GlA3OLL-lieX6XrZxPNeLPliybWx0z2j3zCCaY0Hiacl1bZ_8pUZ8CCF9ik2P127JDlIIIf6lqm5cRrYfqy0gQ'
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
    this.getPrcBu = function (type) {
        //  console.log(type);
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/fileorder/bu',
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
    //请求Prc Segment的数据
    this.getPrcSegment = function (type) {
        //  console.log(type);
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/fileorder/segment',
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
    //Prc时的Download
    this.getPrcDown = function (id) {
        // console.log(id)
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/dm/ca/loadexcel/prc/' + id,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
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
    //Ww时的Download
    this.getWwDown = function (id) {
         console.log(id)
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/dm/ca/loadexcel/ww/' + id,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
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
//Validate按钮功能
    this.getValidate = function (v) {
        //  console.log(v)
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
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
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

    this.getDataMap = function (arryList, segment, geo, bu, regionsort) {
        var map = {};
        for (var s = 0; s < segment.length; s++) {
            var geoRegionDate = {};
            var region = [];
            var geoDate = {};
            var regionAll = [];
            var buAll = {};
            for (var i = 0; i < geo.length; i++) {
                var goeRegion = [];
                for (var r = 0; r < arryList.length; r++) {
                    if (segment[s] == $.trim(arryList[r].segment)) {
                        if (geo[i] == $.trim(arryList[r].geo)) {
                            if ("Total" != $.trim(arryList[r].region) && "Global Total" != $.trim(arryList[r].region)) {
                                if ($rootScope.isNotInArray(goeRegion, $.trim(arryList[r].region))) {
                                    goeRegion.push($.trim(arryList[r].region.toString()));
                                }
                            }
                        }

                    }

                }
                var length = goeRegion.length;
                if (length > 0) {
                    if (length > 1) {
                        goeRegion.push("Total");
                        length++;
                    }
                    var key = geo[i];
                    geoDate[key] = length;
                    var geokey = "geo";
                    geoRegionDate[geokey] = geoDate;
                    region.push(goeRegion);
                    for (var reg = 0; reg < goeRegion.length; reg++) {
                        regionAll.push(goeRegion[reg]);
                    }
                }
            }

            for (var b = 0; b < bu.length; b++) {
                var ca = [];
                for (var k = 0; k < region.length; k++) {
                    for (var re = 0; re < region[k].length; re++) {
                        for (var al = 0; al < arryList.length; al++) {
                            if (segment[s] == $.trim(arryList[al].segment)) {
                                if (bu[b] == $.trim(arryList[al].bu)) {
                                    if (geo[k] == $.trim(arryList[al].geo)) {
                                        if (region[k][re] == $.trim(arryList[al].region)) {
                                            ca.push($.trim(arryList[al].values.toString()));
                                        }
                                    }

                                    if (k == region.length - 1 && re == region[region.length - 1].length - 1) {
                                        if ($.trim(arryList[al].geo) == "Global Total" && $.trim(arryList[al].region) == "Global Total") {
                                            ca.push($.trim(arryList[al].values.toString()));
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
                var bukey = bu[b];
                buAll[bukey] = ca;
            }


            var regionkey = "region";
            var cakey = "bu";
            geoRegionDate[regionkey] = regionAll;
            geoRegionDate[cakey] = buAll;
            var key = segment[s];
            //console.log(key);
            map[key] = geoRegionDate;
        }
        //console.log(map);
        return map;
    }


    this.getPrcDataMap = function (prcList, segment, bu) {
        var buCa = {};
        for (var b = 0; b < bu.length; b++) {
            var ca = [];
            for (var s = 0; s < segment.length; s++) {
                for (var p = 0; p < prcList.length; p++) {
                    if (bu[b] == prcList[p].bu && prcList[p].segment == segment[s]) {
                        ca.push(prcList[p].values);
                    }

                    if (s == segment.length - 1) {
                        if (bu[b] == prcList[p].bu && prcList[p].segment == 'Total') {
                            ca.push(prcList[p].values);
                        }
                    }
                }
            }
            var buKey = bu[b];
            buCa[buKey] = ca;
        }
        return buCa;
    }

})