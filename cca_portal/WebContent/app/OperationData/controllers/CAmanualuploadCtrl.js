"use strict";

angular.module('app.OperationData').controller('CAmanualuploadCtrl', function ($scope, $state, APP_CONFIG, $timeout, $location, $rootScope, navService, CAmanualuploadService, CAmaintenanceService, Upload) {
    //函数说明：合并指定表格（表格id为_w_table_id）指定列（列数为_w_table_colnum）的相同文本的相邻单元格
//参数说明：_w_table_id 为需要进行合并单元格的表格的id。如在HTMl中指定表格 id="data" ，此参数应为 #data
//参数说明：_w_table_colnum 为需要合并单元格的所在列。为数字，从最左边第一列为1开始算起。
    function _w_table_rowspan(_w_table_id, _w_table_colnum) {
        var _w_table_firsttd = "";
        var _w_table_currenttd = "";
        var _w_table_SpanNum = 0;
        var _w_table_Obj = $(_w_table_id + " tr td:nth-child(" + _w_table_colnum + ")");
        _w_table_Obj.each(function (i) {
            if (i == 0) {
                _w_table_firsttd = $(this);
                _w_table_SpanNum = 1;
            } else {
                _w_table_currenttd = $(this);
                if (_w_table_firsttd.text() == _w_table_currenttd.text()) {
                    _w_table_SpanNum++;
                    _w_table_currenttd.hide(); //remove();
                    _w_table_firsttd.attr("rowSpan", _w_table_SpanNum);
                } else {
                    _w_table_firsttd = $(this);
                    _w_table_SpanNum = 1;
                }
            }
        });
    }

//函数说明：合并指定表格（表格id为_w_table_id）指定行（行数为_w_table_rownum）的相同文本的相邻单元格
//参数说明：_w_table_id 为需要进行合并单元格的表格id。如在HTMl中指定表格 id="data" ，此参数应为 #data
//参数说明：_w_table_rownum 为需要合并单元格的所在行。其参数形式请参考jQuery中nth-child的参数。
//          如果为数字，则从最左边第一行为1开始算起。
//          "even" 表示偶数行
//          "odd" 表示奇数行
//          "3n+1" 表示的行数为1、4、7、10.......
//参数说明：_w_table_maxcolnum 为指定行中单元格对应的最大列数，列数大于这个数值的单元格将不进行比较合并。
//          此参数可以为空，为空则指定行的所有单元格要进行比较合并。
    function _w_table_colspan(_w_table_id, _w_table_rownum, _w_table_maxcolnum) {
        if (_w_table_maxcolnum == void 0) {
            _w_table_maxcolnum = 0;
        }
        var _w_table_firsttd = "";
        var _w_table_currenttd = "";
        var _w_table_SpanNum = 0;
        $(_w_table_id + " tr:nth-child(" + _w_table_rownum + ")").each(function (i) {
            var _w_table_Obj = $(this).children();
            _w_table_Obj.each(function (i) {
                if (i == 0) {
                    _w_table_firsttd = $(this);
                    _w_table_SpanNum = 1;
                } else if ((_w_table_maxcolnum > 0) && (i > _w_table_maxcolnum)) {
                    return "";
                } else {
                    _w_table_currenttd = $(this);
                    if (_w_table_firsttd.text() == _w_table_currenttd.text()) {
                        _w_table_SpanNum++;
                        _w_table_currenttd.hide(); //remove();
                        _w_table_firsttd.attr("colSpan", _w_table_SpanNum);
                    } else {
                        _w_table_firsttd = $(this);
                        _w_table_SpanNum = 1;
                    }
                }
            });
        });
    }

    $rootScope.getCycle('Actual').then(function (data) {
        $scope.cycledata = data.result;
    });
    $scope.getPage = function () {
        //WW
        CAmanualuploadService.getWw($scope.id).then(function (data) {
            if (data.code == 0) {
                $scope.iconData = {
                    "Consumer": "fa-university",
                    "SMB": "fa-bookmark",
                    "Commercial": "fa-life-bouy",
                    "Others": "fa-code-fork",
                    "Total": "fa-reorder"
                };
                var WwList = data.result;

                $scope.segment = $rootScope.sortByDataBase($rootScope.getFiled(WwList, "segment"), $rootScope.wwSortData);
                $scope.bu = $rootScope.sortByDataBase($rootScope.getFiled(WwList, "bu"), $rootScope.allSortData.bus);
                $scope.geo = $rootScope.sortByDataBase($rootScope.getFiled(WwList, "geo"), $rootScope.allSortData.geos);
                $scope.dataMap = CAmaintenanceService.getDataMap(WwList, $scope.segment, $scope.geo, $scope.bu, $rootScope.wwSortData.regions);

            }
            //console.log(data);
        }, function (data) {
            // console.log(data);
        });

        //PRC
        CAmanualuploadService.getPrc($scope.id).then(function (caprcdata) {
            if (caprcdata.code == 0) {

                var PrcList = caprcdata.result;
                // $scope.Prcsegment = $rootScope.getFiled(PrcList, "segment");
                $scope.Prcsegment = $rootScope.sortByDataBase($rootScope.getFiled(PrcList, "segment"), $rootScope.prcSortData);
                $scope.Prcbu = $rootScope.sortByDataBase($rootScope.getFiled(PrcList, "bu"), $rootScope.allSortData.bus);
                $scope.Prcbu.push('Total');
                $scope.getPrcDataMap = CAmaintenanceService.getPrcDataMap(PrcList, $scope.Prcsegment, $scope.Prcbu);
                console.log($scope.getPrcDataMap);
            }
        }, function (data) {
            // console.log(data);
        });
        //CAmanualuploadService.getPrc($scope.id).then(function(data){
        //    if(data.code == 0){
        //        $scope.PrcList = data.result;
        //        console.log($scope.PrcList);
        //
        //        var arrSegment=$rootScope.PrcSegment.concat(["Total"]);
        //        $rootScope.PrcBu.push("Total");
        //
        //        //$rootScope.segmenttop = [ 'BU', 'PRC Segment', 'PRC Segment', 'PRC Segment', 'PRC Segment', 'PRC Segment', 'PRC Segment', 'PRC Segment', 'Total'];
        //        //var caprcthead = ["BU", "Think-T", "T-Model", "Commercial", "SMB", "Consumer", "Others", "YT", "Total"];
        //        //var caprctbody = ["Think Pad", "Lenovo NB", "Commercial DT", "Consumer DT", "Workstation", "Chrome", "Server", "Accessory", "Visual", "Total"];
        //
        //        $scope.cadata = $rootScope.caprcTabCon($scope.PrcList,  $rootScope.PrcBu, arrSegment, 'values');
        //        console.log($scope.cadata);
        //        console.log($rootScope.segmenttop);
        //        console.log($rootScope.PrcSegment);
        //        console.log($rootScope.PrcBu);
        //    }
        //    console.log(data);
        //},function(data){
        //    console.log(data);
        //});
        //CAmanualuploadService.getWw($scope.id).then(function(data){
        //    if(data.code == 0){
        //        $scope.cawwList = data.result;
        //        console.log($scope.cawwList);
        //    }
        //    console.log(data);
        //},function(data){
        //    console.log(data);
        //});
    };

    //上传
    $scope.myfiles = {};
    $scope.openUpload = function () {
        //$('#myModal').modal('show');
        $scope.myfilesVal = '';
        $scope.fileChange = function () {
            if ($scope.myfiles.name) {
                $scope.myfilesVal = $scope.myfiles.name;
            } else {
                $scope.myfilesVal = '';
            }
        }
    }
    $scope.caprcww = false;

    $scope.upload = function () {
        if (!$scope.CycleChoose) {
            alert("Please select conditions！");
        } else {
            $('#upload1').css('display', 'none');
            $('#upload2').css('display', 'block');
            Upload.upload({
                //服务端接收
                url: APP_CONFIG.baseUrl + '/api/dm/ca/attachments',
                data: {
                    file: $scope.myfiles,
                    username: $rootScope.user,
                    cyclename: $scope.CycleChoose
                },
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                },
            }).success(function (data, status, headers, config) {
                //console.log($scope.CycleChoose.indexOf("M0")==-1);
                if (data.code == 0) {
                    //alert('Success');
                    $scope.caprcww = true;
                    $scope.id = data.result;
                    console.log($scope.id);
                    $scope.getPage();

                    $('#upload1').css('display','block');
                    $('#upload2').css('display','none');
                } else {
                    alert('Uploading Failed');

                    $('#upload1').css('display','block');
                    $('#upload2').css('display','none');
                }
            }).error(function (data, status, headers, config) {
                alert('Uploading Failed');
                //上传失败
                console.log('error status: ' + status);
            });
        }
    }

    var prc = {
        stype: 'PRC'
    };
    CAmanualuploadService.getPrcBu(prc).then(function (caprcbudata) {
        console.log(caprcbudata.result);
        $rootScope.PrcBu = caprcbudata.result;
    }, function (data) {
        console.log(data);
    })
    CAmanualuploadService.getPrcSegment(prc).then(function (caprcsegmentdata) {
        console.log(caprcsegmentdata.result);
        $rootScope.PrcSegment = caprcsegmentdata.result;
    }, function (data) {
        console.log(data);
    })

//点击Validate
//    $scope.getValidate = function(){
//        console.log($scope.CycleChoose);
//        $scope.validate = {
//            zcycle_name : $scope.CycleChoose,
//            zuuid : $scope.TaskID,
//            user : $rootScope.user
//        };
//        console.log($rootScope.user)
//        CAmanualuploadService.getValidate($scope.validate).then(function (data) {
//            if(data.code == 0){
//                alert('成功！');
//                $scope.getPage();
//            }else {
//                alert(data.msg);
//            }
//            console.log(data);
//        }, function (data) {
//            console.log(data);
//        });
//    };
    //button 切换
    $scope.sw1 = true;
    $scope.ww = false;
    $scope.sw2 = false;
    $scope.btnSwitch = function (flag) {
        if (flag == 'w') {
            $scope.ww = true;
            $scope.sw1 = false;
            //$scope.sw2 = false;
        } else if (flag == 'p') {
            $scope.ww = false;
            $scope.sw1 = true;
            //$scope.sw2 = false;
        }
    }

    //$scope.btnSV = function (flag) {
    //    if (flag == 's1') {
    //        $scope.sw2 = true;
    //        $scope.sw1 = false;
    //        $scope.ww=false;
    //    } else if (flag == 's2') {
    //        $scope.sw1 = true;
    //        $scope.sw2 = false;
    //        $scope.ww=false;
    //    }
    //}

    //下载模板
    $scope.DowTemp = function () {
        $scope.temp = {
            type: 'cam'
        }
        CAmanualuploadService.download($scope.temp).then(function (response) {
            console.log(response);
            var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
            fileName=fileName.replace(/\"/g,"");
            var data = response.data;
            //console.log(data);
            var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            var objectUrl = URL.createObjectURL(blob);
            var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href", objectUrl);
            aForExcel.attr("download", fileName);
            $("body").append(aForExcel);
            $(".forExcel").click();
            aForExcel.remove();
        }, function (data) {
            console.log(data);
        });
    }

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在table render完成后执行的js
        $('#final table').stickySort({sortable: true});
        //console.log("12");
        var length = -1;
        $(".caleft").nextAll().removeClass("gray");
        $.each($scope.dataMap, function (key, value, index) {
            $.each(value.geo, function (gkey, gvalue, gindex) {
                length += gvalue;
                if (gvalue > 1) {
                    $(".th_" + length).addClass("gray");
                }
            });
        })
    });

})