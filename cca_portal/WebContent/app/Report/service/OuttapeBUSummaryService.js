angular.module('app.Report').service('OuttapeBUSummaryService', function ($http, $q , $rootScope,APP_CONFIG){
    
    this.getOuttapeBUSummaryData = function(CycleChose) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.baseUrl + '/api/sumFcst/bu/list?cycle=' + CycleChose,
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
    
    
    this.getData = function(bUSummary,bu,segment,geo){
    	var map = {};
    	var data = {};
    	var regionKey = "region";
    	var geoKey = "geo";
    	var geoList = [];
    	var regionList = [];
    	var georegion = {};
    	var geoMap = {};
    	for(var i = 0; i < geo.length; i++){
    		var temp = [];
    		for(var bs = 0; bs < bUSummary.length; bs++){
    			if(bUSummary[bs].geo == geo[i]){
    				if($rootScope.isNotInArray(temp,bUSummary[bs].region)){
    					temp.push(bUSummary[bs].region);
    					regionList.push(bUSummary[bs].region);
    				}
    			}
    		}
    		var key = geo[i];
    		geoMap[key] = temp.length;
    		georegion[key] = temp;
    	}
    	data[regionKey] = regionList;
    	data[geoKey] = geoMap;
    	for(var i = 0; i < bu.length; i++){
    		var segmentMap = {};
    		for(var s = 0; s < segment.length; s++){
    			var ca = [];
	    		for(var k = 0; k < geo.length; k++){
	    			var regions = georegion[geo[k]];
	    			for(var r = 0; r < regions.length; r++){
	    				for(var bs = 0; bs < bUSummary.length; bs++){
	            			if(bUSummary[bs].bu == bu[i] && bUSummary[bs].segment == segment[s] && bUSummary[bs].geo == geo[k] 
	            				&& bUSummary[bs].region == regions[r]){
	            				ca.push(bUSummary[bs].value);
	            			}
	            		}
	    			}
	    		}
	    		var key = segment[s];
	    		segmentMap[key] = ca;
    		}
    		var buKey = bu[i];
    		console.log(buKey);
    		map[buKey] = segmentMap;
    	}
    	var dataKey = "data";
    	data[dataKey] = map;
    	//console.log(data);
    	return data;
    }
    
});