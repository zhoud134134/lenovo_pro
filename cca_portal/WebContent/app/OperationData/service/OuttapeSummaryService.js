angular.module('app.Report').service("OuttapeSummaryService", function ($http, $q,$rootScope, APP_CONFIG) {

    this.getSumdata = function (cycle) {

        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl +'/api/SUMACT/list?cycle='+cycle,
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },

        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    };


    this.getDataMap = function (arryList, geo, categorylvl1) {
        var map = {};
        var geoMap = {};
        var geoKey = "geo";
        var segmentKey = "segment";
        var subsegmentKey = "subsegment";
        var categorylvl1Key = 'categorylvl1';
        var categorylvl2Key = 'categorylvl2';
        var categoryData = {};
        var categoryDataList = [];
        var buKey = 'bu';
        var caKey = 'ca';
        var lengthKey = 'length';
        var indexKey = 'index';
        var categoryDataKey = 'categoryData';
        var categorylvl1mapName = "name";
        var segmentMap = {};
        var segmentlengthMap = {};
        var segmentList = [];
        var geoList = [];
        var subsegmentList = [];
        var canPushCa = true;
        for (var d = 0; d < geo.length; d++) {

            var segment = [];
            var geoValue = geo[d];

            for (var r = 0; r < arryList.length; r++) {
                if (geo[d] == $.trim(arryList[r].geo) && $.trim(arryList[r].segment) != '') {
                    if ($rootScope.isNotInArray(segment, $.trim(arryList[r].segment))) {
                        segment.push($.trim(arryList[r].segment));

                    }
                }
            }
            var sum = 0;
            for (var e = 0; e < segment.length; e++) {
                var subsegment = [];
                for (var ar = 0; ar < arryList.length; ar++) {
                    if (geo[d] == arryList[ar].geo) {
                        if (segment[e] == arryList[ar].segment) {
                            if ($rootScope.isNotInArray(subsegment, $.trim(arryList[ar].subsegment))) {
                                subsegment.push($.trim(arryList[ar].subsegment));
                                if ('Total' == $.trim(arryList[ar].subsegment)) {
                                    subsegmentList.push('$M');
                                    subsegmentList.push('$/CA');
                                    subsegment.push('');
                                }
                            }
                        }

                    }

                }


                var segmentValue = segment[e] + '_' + geoValue;
                var length = subsegment.length;
                segmentList.push(segmentValue);
                segmentMap[segmentValue] = subsegment;
                sum += length;
                var segmentlengthValueMap = {};
                segmentlengthValueMap[segmentKey] = segment[e];
                segmentlengthValueMap[lengthKey] = length;
                segmentlengthMap[segmentValue] = segmentlengthValueMap;

            }
            geoMap[geoValue] = sum;
            geoList.push(segment);
        }

        map[geoKey] = geoMap;
        map[segmentKey] = segmentlengthMap;
        map[subsegmentKey] = subsegmentList;


        for (var a = 0; a < categorylvl1.length; a++) {

            var categorylvl2 = [];
            var categorylvl1map = {};
            var categorylvl1maptemp = {};

            for (var arl = 0; arl < arryList.length; arl++) {
                if (categorylvl1[a] != '' && categorylvl1[a] == arryList[arl].categorylvl1) {
                    if ($rootScope.isNotInArray(categorylvl2, $.trim(arryList[arl].categorylvl2))) {
                        categorylvl2.push(arryList[arl].categorylvl2);
                    }
                }
            }

            categorylvl2 = $rootScope.sortByDataBase(categorylvl2,$rootScope.outSortData.category2[categorylvl1[a]]);
            
            for (var b = 0; b < categorylvl2.length; b++) {
                var index = 0;
                var buCa = {};
                var ca = [];
                for (var h = 0; h < geoList.length; h++) {

                    for (var i = 0; i < geoList[h].length; i++) {
                        var segmentMapKey = geoList[h][i] + '_' + geo[h];

                        for (var j = 0; j < segmentMap[segmentMapKey].length; j++) {
                            index++;
                            for (var arl = 0; arl < arryList.length; arl++) {
                                if (categorylvl1[a] != '' && categorylvl1[a] == arryList[arl].categorylvl1) {
                                    if (categorylvl2[b] != '' &&  categorylvl2[b] == arryList[arl].categorylvl2) {
                                        if (geo[h] == arryList[arl].geo) {
                                            if (geoList[h][i] == arryList[arl].segment) {
                                                if (segmentMap[segmentMapKey][j] == arryList[arl].subsegment) {


                                                    if(geoList[h][i] == 'Total' && arryList[arl].subsegment == 'Total'){
                                                    	if(canPushCa){
	                                                        
                                                    		if(arryList[arl].savem != null){
                                                        		ca.push(arryList[arl].savem);
                                                        	}else{
                                                        		ca.push('-');
                                                        	}
	                                                        if(arryList[arl].ca != null && arryList[arl].ca != 0){
	                                                            ca.push(arryList[arl].savem / arryList[arl].ca);
	                                                        }else{
	                                                            ca.push('-');
	                                                        }
	                                                        canPushCa = false;
                                                    	}
                                                    }else{
                                                    	if(arryList[arl].savem != null){
                                                    		ca.push(arryList[arl].savem);
                                                    	}else{
                                                    		ca.push('-');
                                                    	}
                                                        canPushCa = true;
                                                    }

                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                
                categorylvl1map[categorylvl1mapName] = categorylvl1[a];
                categorylvl1map[lengthKey] = categorylvl2.length;
                buCa[caKey] = ca;
                buCa[lengthKey] = categorylvl2.length;
                buCa[indexKey] = b;
                buCa[categorylvl1Key] = categorylvl1map;
                buCa[categorylvl2Key] = categorylvl2[b];


                categoryDataList.push(buCa);
            }
           /* if (a != categorylvl1.length - 1) {
                var buCatemp = {};
                categorylvl1maptemp[categorylvl1mapName] = '';
                categorylvl1maptemp[lengthKey] = 1;
                buCatemp[caKey] = [];
                buCatemp[lengthKey] = 1;
                buCatemp[indexKey] = 0;
                buCatemp[categorylvl1Key] = categorylvl1maptemp;
                buCatemp[categorylvl2Key] = '';

                categoryDataList.push(buCatemp);

            }*/
        }
        map[categoryDataKey] = categoryDataList;
        return map;
    }
});