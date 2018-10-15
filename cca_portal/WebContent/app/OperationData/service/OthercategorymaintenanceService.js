angular.module('app.OperationData').service("OthercategorymaintenanceService", function($http, $q ,$rootScope, APP_CONFIG) {
    //请求Prc的数据
    this.getPrc = function(id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/bmc/summary/prc/'+id,
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

    //请求Ww的数据
    this.getWw = function(id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/bmc/summary/row/'+id,
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


    ////Validate按钮功能
    //this.getValidate = function(v) {
    //    console.log(v)
    //    var d = $q.defer();
    //    $http({
    //        method : 'PUT',
    //        url : APP_CONFIG.baseUrl + '/api/publish/',
    //        transformRequest: function(obj) {
    //         var str = [];
    //         for (var s in obj) {
    //         str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
    //         }
    //         return str.join("&");
    //         },
    //        headers: {
    //            'Authorization': 'Bearer '+ sessionStorage.getItem("token")
    //        },
    //        params : v,
    //    }).then(function successCallback(response) {
    //        // 请求成功执行代码
    //        d.resolve(response.data);
    //    }, function errorCallback(response) {
    //        // 请求失败执行代码
    //        d.reject("error");
    //    });
    //    return d.promise;
    //}

    
    //请求Othercategory表格 接口
    this.getOthercategoryData = function(id) {
        var d = $q.defer();
        $http({
            method : 'GET',
             url : APP_CONFIG.baseUrl +'/api/FYCGData/?uuid='+id,
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
    
    this.getDataMap = function(arryList,geo,categorylvl1,categorylvl2,categorylvl3){
    	var map = {};
    	var geoMap = {};
    	var geoKey = "geo";
    	var regionKey = "region";
    	var segmentKey = "segment";
    	var categorylvl1Key = 'categorylvl1';
		var categorylvl2Key = 'categorylvl2';
		var categorylvl3Key = 'categorylvl3';
		var categoryData = {};
		var categoryDataList = [];
		var buKey = 'bu';
		var caKey = 'ca';
		var lengthKey = 'length';
		var indexKey = 'index';
		var categoryDataKey = 'categoryData';
		var regionMap = {};
		var regionlengthMap = {};
		var regionList = [];
		var geoList = [];
		var segmentList = [];
    	for(var d = 0;d < geo.length; d++){
    		var geoValue = geo[d];
    		if('Total' == geoValue) continue;
    		var region = [];
    		for (var r=0;r<arryList.length;r++){
				if(geo[d] == $.trim(arryList[r].geo)){
					if('Total' == $.trim(arryList[r].region)) continue;
					if($rootScope.isNotInArray(region,$.trim(arryList[r].region))){
						region.push($.trim(arryList[r].region));
					}
				}
    		}
    		var sum = 0;
    		for(var e = 0; e < region.length; e++){
    			var segment = [];
    			for (var ar=0;ar<arryList.length;ar++){
    				if(geo[d] == arryList[ar].geo){
	    				if(region[e] == arryList[ar].region){
	    					if($rootScope.isNotInArray(segment,$.trim(arryList[ar].segment))){
	    						segment.push($.trim(arryList[ar].segment));
	    						segmentList.push($.trim(arryList[ar].segment));
	    					}
	    				}
    				}
    			}
    			var regionValue = region[e] + '_' + geoValue;
    			var length = segment.length;
    			regionList.push(regionValue);
    			regionMap[regionValue] = segment;
				sum += length;
				var regionlengthValueMap = {};
				regionlengthValueMap[regionKey] = region[e];
    			regionlengthValueMap[lengthKey] = length;
    			regionlengthMap[regionValue] = regionlengthValueMap;
				
    		}
	    		geoMap[geoValue] = sum;
	    		geoList.push(region);
		}
    	
		map[geoKey] = geoMap;
		map[regionKey] = regionlengthMap;
		map[segmentKey] = segmentList;
		
		
    	for(var a = 0; a < categorylvl1.length; a++){
    		for(var b = 0; b < categorylvl2.length; b++){
    			for(var c = 0; c < categorylvl3.length; c++){
    				var bu = [];
		    		for (var r=0;r<arryList.length;r++){
		        		if(categorylvl1[a] == arryList[r].categorylvl1){
		        			if(categorylvl2[b] == arryList[r].categorylvl2){
		        				if(categorylvl3[c] == arryList[r].categorylvl3){
		        					if($rootScope.isNotInArray(bu,$.trim(arryList[r].bu))){
		        						bu.push($.trim(arryList[r].bu));
		        					}
		        					
				        		}
			        		}
		        		}
		        	}
		    		for(var o = 0; o < bu.length; o++){
		    			(function(c1,c2,c3,b,bl,bo) {
			    			setTimeout(function (args) {
				    			var index = 0;
				    			var buCa = {};
				    			var ca = [];
				    			for(var h = 0; h < geoList.length; h++){
				    				for(var i = 0; i < geoList[h].length; i++){
				    					var regionMapKey =  geoList[h][i] + '_' + geo[h];
				    					var catemp = [];
				    					for(var j = 0; j < regionMap[regionMapKey].length; j++){
				    						for (var arl=0;arl<arryList.length;arl++){
						    					if(c1 == arryList[arl].categorylvl1){
								        			if(c2 == arryList[arl].categorylvl2){
								        				if(c3 == arryList[arl].categorylvl3){
								        					if(b == arryList[arl].bu){
								        						if(geo[h] == arryList[arl].geo){
								        							if(geoList[h][i] == arryList[arl].region){
								        								if(regionMap[regionMapKey][j] == arryList[arl].segment){
								        									ca.push(arryList[arl].formattedValue);
								        									catemp.push(arryList[arl].formattedValue);
								        									
								        								}
								        							}
								        						
								        						}
								        						
								        						/*if(h == geo.length -1 && i == geoList[h].length -1 && j == regionMap[geoList[h][i]].length -1){
								        		    				if('Total' == arryList[arl].geo && 'Total' == arryList[arl].region && 'Total $M' == arryList[arl].segment){
								        		    					if(o == 0){console.log(arryList[arl].value)}
								        								ca.push(arryList[arl].value);
								        							}
							        							}*/
								        					}
								        				}
								        			}
								        		}
						    				}
				    						if(j+1 != catemp.length){
				    							ca.push('-');
				    							catemp.push('-');
				    						}
				    					}
				    				}
		    					}
				    			
				    			buCa[buKey] = b;
				    			buCa[caKey] = ca;
				    			buCa[lengthKey] = bl;
				    			buCa[indexKey] = bo;
				    			buCa[categorylvl1Key] = c1;
				    			buCa[categorylvl2Key] = c2;
				    			buCa[categorylvl3Key] = c3;
				    			categoryDataList.push(buCa);
			    			},100);
		    			})(categorylvl1[a],categorylvl2[b],categorylvl3[c],bu[o],bu.length,o);
		    		}
		    	
    			}
    		}
    	}
    	map[categoryDataKey] = categoryDataList;
    	//console.log(map);
    	return map;
    }

    /**
     * 下载模板
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
            // 请求成功执行代码
            d.resolve(response);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }
    
});