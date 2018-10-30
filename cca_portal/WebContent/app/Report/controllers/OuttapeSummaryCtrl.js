"use strict";

angular.module('app.Report').controller('OuttapeSummaryCtrl', function ($scope, $rootScope, OuttapeSummaryService, $state, $stateParams, $timeout,navService) {
    $rootScope.getCycle().then(function (data) {
        $scope.cycledata = data.result;

    });

    $scope.sumShow=false;
    $scope.getSumSeach = function(){
        if(!$scope.CycleChoose){
            alert("Please select conditions！");
        }else {
            $('#searchLoda1').css('display','none');
            $('#searchLoda').css('display','block');
            if($scope.CycleChoose.indexOf('FCST') > 0){
	            navService.getSortData("category2","summary fcst").then(function(cawwsegmentdata){
	            	$rootScope.outSortData=cawwsegmentdata.result;
	            }, function (data) {
	                // console.log(data);
	            });
            }else if($scope.CycleChoose.indexOf('Actual') > 0){
	            navService.getSortData("category2","summary actual").then(function(cawwsegmentdata){
	            	$rootScope.outSortData=cawwsegmentdata.result;
	            }, function (data) {
	            	// console.log(data);
	            });
            }
            $scope.sumShow=false;
            OuttapeSummaryService.getSumdata($scope.CycleChoose).then(function (data) {
                $scope.sumShow=true;
                var outtapeData = data.result;
                console.log(outtapeData);

                $rootScope.prcSortData.push('Total');
                var geo = $rootScope.sortByDataBase($rootScope.getFiled(outtapeData, "geo"), $rootScope.allSortData.geos);
                var categorylvl1 = $rootScope.sortByDataBase($rootScope.getFiled(outtapeData, "categorylvl1"),$rootScope.outSortData.category1);
                $scope.sudataMap = OuttapeSummaryService.getDataMap(outtapeData, geo, categorylvl1);

                $('#searchLoda1').css('display','block');
                $('#searchLoda').css('display','none');
                //console.log($scope.sudataMap);
            }, function (data) {
                console.log(data);
            });
        }
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在table render完成后执行的js
        $('#final table').stickySort({sortable: true});

        $(".sticky-intersect").find('table').html('<thead><tr><th rowspan="3" colspan="2" class="summary-tab-width1" style="width:276px;height:90px;">FY Cost Guidance <br/>(+Benefit/-Hit) </th></tr></thead>');

    });

})