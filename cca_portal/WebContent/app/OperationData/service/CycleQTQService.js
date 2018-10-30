angular.module('app.OperationData').service("CycleQTQService", function ($http, $q, APP_CONFIG, $rootScope) {

    //第一部分Select中第二第三个框
    this.getSelect = function (type) {

        var d = $q.defer();
        $http({
            method: 'GET',
            //http://10.99.123.10:8080/lenovo-ccf-prod/api/bmc/
            url: APP_CONFIG.baseUrl + '/api/cycle/zfiscper/' + type,
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

    //点击Execute执行
    this.getExecute = function (page) {

        var d = $q.defer();
        $http({
            method: 'GET',
            //http://10.99.123.10:8080/lenovo-ccf-prod/api/bmc/
            url: APP_CONFIG.baseUrl + '/api/routine/funCreateTskId',
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
            url: APP_CONFIG.baseUrl + '/api/bmc/',
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
    this.DelParticular = function (id) {

        var d = $q.defer();
        $http({
            method: 'DELETE',
            url: APP_CONFIG.baseUrl + '/api/uuid/',
            /*transformRequest: function(obj) {
             var str = [];
             for (var s in obj) {
             str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
             }
             return str.join("&");
             },*/
            params: id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
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

        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/bmc/summary/prc/' + id,
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

        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/bmc/summary/row/' + id,
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


    //Validate按钮功能
    this.getValidate = function (v) {

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

    //WW时Download Summary
    this.getWwSum = function (id) {

        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/bmc/summary/loadexcel/row/' + id,
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

    //Prc时Download Summary
    this.getPrcSum = function (id) {

        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/bmc/summary/loadexcel/prc/' + id,
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

    //WW时Download Detail
    this.getWwDet = function (id) {

        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/bmc/detail/loadexcel/row/' + id,
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

    //Prc时Download Detail
    this.getPrcDet = function (id) {

        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/bmc/detail/loadexcel/prc/' + id,
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


    //BU vs Segment $/Saving按钮功能
    this.getSegment = function (s, id) {

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
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            params: s,
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

    this.getDataMap = function (arryList, segment, geo, rptBuDes) {
        var map = {};
        var rptBuDesKey = "rptBuDes";
        var cfeSegmentKey = "cfeSegment";
        var BuDesDataList = [];
        var priceKey = "price";
        var BuDataKey = 'buData';
        var rptBuDesmapName = "name";
        var lengthKey = 'length';
        var indexKey = 'index';
        for (var s = 0; s < segment.length; s++) {
            var geoRegionDate = {};
            var region = [];
            var geoDate = {};
            var regionAll = [];
            var buAll = {};
            for (var i = 0; i < geo.length; i++) {
                var goeRegion = [];
                for (var r = 0; r < arryList.length; r++) {
                    if (segment[s] == $.trim(arryList[r].cfeSegment)) {
                        if (geo[i] == $.trim(arryList[r].zfingeo)) {
                            //if ("Total" != $.trim(arryList[r].zregion2)) {
                            if ($rootScope.isNotInArray(goeRegion, $.trim(arryList[r].zregion2))) {
                                goeRegion.push($.trim(arryList[r].zregion2.toString()));
                            }
                            //}
                        }

                    }

                }

                var length = goeRegion.length;
                if (length > 0) {
                    //if (length > 1) {
                    //    length++;
                    //}
                    var key = geo[i];

                    geoDate[key] = length;
                    var geokey = "zfingeo";
                    geoRegionDate[geokey] = geoDate;
                    region.push(goeRegion);
                    for (var reg = 0; reg < goeRegion.length; reg++) {

                        regionAll.push(goeRegion[reg]);
                    }
                }

            }
            var regionkey = "region";
            geoRegionDate[regionkey] = regionAll;
            var key = "geolist";
            map[key] = geoRegionDate;
        }

        for (var a = 0; a < rptBuDes.length; a++) {
            var cfeSegment = [];
            var rptBuDesmap = {};
            for (var arl = 0; arl < arryList.length; arl++) {
                if (rptBuDes[a] != '' && rptBuDes[a] == arryList[arl].rptBuDes) {
                    if ($rootScope.isNotInArray(cfeSegment, $.trim(arryList[arl].cfeSegment))) {
                        cfeSegment.push(arryList[arl].cfeSegment);

                    }
                }
            }

            cfeSegment = $rootScope.sortByDataBase(cfeSegment, $rootScope.wwSortData);
            for (var b = 0; b < cfeSegment.length; b++) {
                var buCa = {};
                var ca = [];
                for (var c = 0; c < region.length; c++) {
                    for (var k = 0; k < region[c].length; k++) {
                        for (var arl = 0; arl < arryList.length; arl++) {
                            if (rptBuDes[a] == arryList[arl].rptBuDes) {
                                if (cfeSegment[b] == arryList[arl].cfeSegment) {
                                    if (geo[c] == $.trim(arryList[arl].zfingeo)) {
                                        if (region[c][k] == $.trim(arryList[arl].zregion2)) {
                                            ca.push(arryList[arl].price);
                                        }
                                    }
                                    if (c == region.length - 1 && k == region[region.length - 1].length ) {
                                        if ($.trim(arryList[arl].zfingeo) == "Total" && $.trim(arryList[arl].zregion2) == "Total") {
                                            ca.push($.trim(arryList[arl].price.toString()));
                                        }
                                    }
                                }
                            }

                        }
                    }


                }


                rptBuDesmap[rptBuDesmapName] = rptBuDes[a];
                rptBuDesmap[lengthKey] = cfeSegment.length;
                buCa[priceKey] = ca;
                buCa[lengthKey] = cfeSegment.length;
                buCa[indexKey] = b;
                buCa[rptBuDesKey] = rptBuDesmap;
                buCa[cfeSegmentKey] = cfeSegment[b];
                BuDesDataList.push(buCa);

            }

        }
        map[BuDataKey] = BuDesDataList;
        return map;
    }


    //getWW时的Download
    this.getWWDownLoad = function(param,id) {
        // console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/bmc/summary/loadexcel/rpt/'+id,

            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
            params : param,
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
});