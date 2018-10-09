/**
 * Created by Qinglanhui on 2018/10/9.
 */
angular.module('app.Validation').service("CAAccumulationService", function ($http, $q, $rootScope, APP_CONFIG) {

    //Prc������
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
            //success
            d.resolve(response.data);
        }, function errorCallback(response) {
            //error���
            d.reject("error");
        });
        return d.promise;
    }
    //Ww������
    this.getWw = function (id) {
        //  console.log(id)
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/dm/ca/ww/' + id,
            //url : "http://10.116.44.182:8080/api/dm/ca/ww/20180829",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                // 'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MzYxOTkyMzMsInN1YiI6Imhhbmp6MSIsImNyZWF0ZWQiOjE1MzU1OTQ0MzMxMjZ9.GlA3OLL-lieX6XrZxPNeLPliybWx0z2j3zCCaY0Hiacl1bZ_8pUZ8CCF9ik2P127JDlIIIf6lqm5cRrYfqy0gQ'
            },
        }).then(function successCallback(response) {
            //success
            d.resolve(response.data);
        }, function errorCallback(response) {
            //error��
            d.reject("error");
        });
        return d.promise;
    }
    //Prc bu������
    this.getPrcBu = function (type) {
        //  console.log(type);
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/fileorder/'+type,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
        }).then(function successCallback(response) {
            //success��
            d.resolve(response.data);
        }, function errorCallback(response) {
            //error��
            d.reject("error");
        });
        return d.promise;
    }
    //Prc Segment������
    this.getPrcSegment = function (type) {
        //  console.log(type);
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/api/fileorder/'+type,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
        }).then(function successCallback(response) {
            //success���
            d.resolve(response.data);
        }, function errorCallback(response) {
            //error���
            d.reject("error");
        });
        return d.promise;
    }
    //Prc�Download
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
            //success���
            d.resolve(response);
        }, function errorCallback(response) {
            //error���
            d.reject("error");
        });
        return d.promise;
    }
    //Ww Download
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
            //success���
            d.resolve(response);
        }, function errorCallback(response) {
            //error���
            d.reject("error");
        });
        return d.promise;
    }
//Validate���
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
            //success
            d.resolve(response.data);
        }, function errorCallback(response) {
            // error�
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