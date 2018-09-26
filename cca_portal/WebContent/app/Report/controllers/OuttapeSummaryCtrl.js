"use strict";

angular.module('app.Report').controller('OuttapeSummaryCtrl', function ($scope, $rootScope, OuttapeSummaryService, $state, $stateParams, $timeout) {
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
            OuttapeSummaryService.getSumdata($scope.CycleChoose).then(function (data) {
                $scope.sumShow=true;
                $scope.outtapeData = data.result;
                console.log($scope.outtapeData)
                var geo = $rootScope.getFiled($scope.outtapeData, "geo");
                var categorylvl1 = $rootScope.getFiled($scope.outtapeData, "categorylvl1");
                $scope.sudataMap = OuttapeSummaryService.getDataMap($scope.outtapeData, geo, categorylvl1);
                $('#searchLoda1').css('display','block');
                $('#searchLoda').css('display','none');
                console.log($scope.sudataMap);
            }, function (data) {
                console.log(data);
            });
        }
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在table render完成后执行的js
        $('#final table').stickySort({sortable: true});
    });
    // console.log($scope.sudataMap)

})