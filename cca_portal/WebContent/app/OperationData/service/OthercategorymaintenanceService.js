angular.module('app.OperationData').service("OthercategorymaintenanceService", function($http, $q ,$rootScope, APP_CONFIG) {

    //第一部分Select中第二第三个框
    this.getSelect = function(type) {
        console.log(type)
        var d = $q.defer();
        $http({
            method : 'GET',
            //http://10.99.123.10:8080/lenovo-ccf-prod/api/bmc/
            url : APP_CONFIG.baseUrl +'/api/cycle/zfiscper/'+type,
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
    //Select第一个框Cycle
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
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }


    //点击Execute执行
    this.getExecute = function(page) {
        console.log(page)
        var d = $q.defer();
        $http({
            method : 'GET',
            //http://10.99.123.10:8080/lenovo-ccf-prod/api/bmc/
            url : APP_CONFIG.baseUrl +'/api/routine/funCreateTskId',
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
            transformRequest: function(obj) {
                var str = [];
                for (var s in obj) {
                    str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                }
                return str.join("&");
            },
            params : page
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
    this.getExecute2 = function() {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/bmc/',
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

    //删除第二部分某一项
    this.DelParticular = function(id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method : 'DELETE',
            url : APP_CONFIG.baseUrl + '/api/uuid/',
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token"),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            /*transformRequest: function(obj) {
                var str = [];
                for (var s in obj) {
                    str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                }
                return str.join("&");
            },*/
            params : id,
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


    //Validate按钮功能
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
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
            params : v,
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
    this.getWwSum = function(id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/bmc/summary/loadexcel/row/'+id,
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
            responseType : 'arraybuffer'
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

    //Prc时Download Summary
    this.getPrcSum = function(id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/bmc/summary/loadexcel/prc/'+id,
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
            responseType : 'arraybuffer'
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

    //WW时Download Detail
    this.getWwDet = function(id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/bmc/detail/loadexcel/row/'+id,
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
            responseType : 'arraybuffer'
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }

    //Prc时Download Detail
    this.getPrcDet = function(id) {
        console.log(id)
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/bmc/detail/loadexcel/prc/'+id,
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
            responseType : 'arraybuffer'
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }
    
    //请求Othercategory表格 接口

    this.getOthercategoryData = function() {
        var d = $q.defer();
        $http({
            method : 'GET',
             url : APP_CONFIG.baseUrl +'/api/FYCGData/',
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
    		var region = [];
    		var geoValue = geo[d];
    		for (var r=0;r<arryList.length;r++){
				if(geo[d] == $.trim(arryList[r].geo)){
					if('TTL' != $.trim(arryList[r].region) && $rootScope.isNotInArray(region,$.trim(arryList[r].region))){
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
		    			var index = 0;
		    			var buCa = {};
		    			var ca = [];
		    			for(var h = 0; h < geoList.length; h++){
		    				for(var i = 0; i < geoList[h].length; i++){
		    					var regionMapKey =  geoList[h][i] + '_' + geo[h];
		    					for(var j = 0; j < regionMap[regionMapKey].length; j++){
		    						for (var arl=0;arl<arryList.length;arl++){
				    					if(categorylvl1[a] == arryList[arl].categorylvl1){
						        			if(categorylvl2[b] == arryList[arl].categorylvl2){
						        				if(categorylvl3[c] == arryList[arl].categorylvl3){
						        					if(bu[o] == arryList[arl].bu){
						        						if(geo[h] == arryList[arl].geo){
						        							if(geoList[h][i] == arryList[arl].region){
						        								if(regionMap[regionMapKey][j] == arryList[arl].segment){
						        									ca.push(arryList[arl].value);
						        								}
						        							}
						        						
						        						}
						        						
						        						/*if(h == geo.length -1 && i == geoList[h].length -1 && j == regionMap[geoList[h][i]].length -1){
						        		    				if('Total' == arryList[arl].geo && 'Total' == arryList[arl].region && 'TTL $M' == arryList[arl].segment){
						        		    					if(o == 0){console.log(arryList[arl].value)}
						        								ca.push(arryList[arl].value);
						        							}
					        							}*/
						        					}
						        				}
						        			}
						        		}
				    				}
		    					}
		    				}
    					}
		    			
		    			buCa[buKey] = bu[o];
		    			buCa[caKey] = ca;
		    			buCa[lengthKey] = bu.length;
		    			buCa[indexKey] = o;
		    			buCa[categorylvl1Key] = categorylvl1[a];
		    			buCa[categorylvl2Key] = categorylvl2[b];
		    			buCa[categorylvl3Key] = categorylvl3[c];
		    			categoryDataList.push(buCa);
		    		}
		    	
    			}
    		}
    	}
    	map[categoryDataKey] = categoryDataList;
    	console.log(map);
    	return map;
    }
    
    
    
});