"use strict";

angular.module('app.OperationData').controller('CAmaintenanceCtrl', function ($scope, $state, $timeout, $stateParams, $rootScope, APP_CONFIG, CAmaintenanceService) {
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

    $rootScope.getCycle('FCST').then(function (data) {
        $scope.cycledata = data.result;
    });
    //第二部分tab信息展示
    $scope.getPage = function () {
        CAmaintenanceService.getExecute2().then(function (data) {
            if (data.code == 0) {
                $scope.tablist = data.result;
                $("#tabExample1").dataTable().fnDestroy();
                $timeout(function () {
                    $('#tabExample1').dataTable({
                        "scrollY": 160,
                        "scrollX": true,
                        "dom": '<"top">rt<"bottom"><"clear">',
                        "scrollCollapse": true,
                        //"jQueryUI": true,
                        // "pagingType":   "simple_numbers",
                        stateSave: true,
                        "paging": false,
                        "ordering": false,
                        "bLengthChange": true
                    });
                });
            }
            // console.log(data);
        }, function (data) {
            //  console.log(data);
        });
    }
    $scope.getPage();

    //点击Execute执行
    $scope.getExecute = function () {
        $scope.taskId = '';
        $scope.search = {
            cycleName: $scope.CycleChoose,
            user: $rootScope.user
        }
        //console.log($rootScope.user);
        if (!$scope.CycleChoose) {
            alert("Please select conditions！");
        } else {
            $('#execute2').css('display', 'block');
            $('#execute1').css('display', 'none');
            CAmaintenanceService.getExecute($scope.search).then(function (data) {
                console.log(data);
                if (data.code == 0) {
                    alert(data.result);
                    $('#execute1').css('display', 'block');
                    $('#execute2').css('display', 'none');
                    $scope.getPage();
                } else {
                    alert(data.msg);
                }
                // console.log(data);
            }, function (data) {
                console.log(data);
            });
        }
    };
    //单击整行选中
    $scope.trClick = function ($event, id, status, cycleName) {
        $($("#tabExample input:radio")).removeAttr("checked");
        $($event.target).parent().find("input:radio").prop("checked", true);
        $scope.taskId = id;
        //  console.log($scope.taskId)
        $scope.status = status;
        // console.log($scope.status)
        $scope.cyclename = cycleName;
        //  console.log($scope.cyclename)
        //$scope.SearchTaskId(a,b,c)
    }

    //点击Search
    $scope.SearchTab = function () {
        if (!$scope.taskId) {
            alert("Please select items！");
        } else if ($scope.status == 'Success' || $scope.status == 'Publish') {

            $("#search1").show();
            $("#search2").hide();

            $scope.PRCww = false;
            $scope.TaskID = $scope.taskId;
            $scope.CycleName = $scope.cyclename;
            //WW
            CAmaintenanceService.getWw($scope.TaskID).then(function (data) {
                if (data.code == 0) {
                    $scope.PRCww = true;
                    var WwList = data.result;
                    $scope.iconData = {
                        "Consumer": "fa-university",
                        "SMB": "fa-bookmark",
                        "Commercial": "fa-life-bouy",
                        "Others": "fa-code-fork",
                        "Total": "fa-reorder"
                    };

                    // $scope.segment = $rootScope.getFiled(WwList, "segment");
                    $scope.segment = $rootScope.sortByDataBase($rootScope.getFiled(WwList, "segment"), $rootScope.wwSortData);
                    $scope.bu = $rootScope.sortByDataBase($rootScope.getFiled(WwList, "bu"), $rootScope.allSortData.bus);
                    $scope.geo = $rootScope.sortByDataBase($rootScope.getFiled(WwList, "geo"), $rootScope.allSortData.geos);
                    $scope.dataMap = CAmaintenanceService.getDataMap(WwList, $scope.segment, $scope.geo, $scope.bu, $rootScope.wwSortData.regions);

                    $("#search1").hide();
                    $("#search2").show();
                    //加载表格
                    //$rootScope.change = true;
                    //if ($rootScope.change == true) {
                        $timeout(function () {
                            $scope.$emit('ngRepeatFinished');
                        });
                    //}
                }
                //console.log(data);
            }, function (data) {
                console.log(data);
            });

            //PRC
            CAmaintenanceService.getPrc($scope.TaskID).then(function (caprcdata) {
                if (caprcdata.code == 0) {

                    var PrcList = caprcdata.result;
                    // $scope.Prcsegment = $rootScope.getFiled(PrcList, "segment");
                    $scope.Prcsegment = $rootScope.sortByDataBase($rootScope.getFiled(PrcList, "segment"), $rootScope.prcSortData);
                    $scope.Prcbu = $rootScope.sortByDataBase($rootScope.getFiled(PrcList, "bu"), $rootScope.allSortData.bus);
                    $scope.Prcbu.push('Total');
                    $scope.getPrcDataMap = CAmaintenanceService.getPrcDataMap(PrcList, $scope.Prcsegment, $scope.Prcbu);
                }
            }, function (data) {
                // console.log(data);
            });


        } else {
            alert("Execution in process, unable to check！");
        }
    };
    CAmaintenanceService.getPrcBu($scope.bu).then(function (caprcbudata) {
        //console.log(caprcbudata.result);
        $rootScope.PrcBu = caprcbudata.result;
    }, function (data) {
        // console.log(data);
    })
    CAmaintenanceService.getPrcSegment($scope.segment).then(function (caprcsegmentdata) {
        // console.log(caprcsegmentdata.result);
        $rootScope.PrcSegment = caprcsegmentdata.result;
    }, function (data) {
        // console.log(data);
    })
    //删除
    $scope.DelOneItem = function () {
        if (!$scope.taskId) {
            alert("Select items！");
        } else if ($scope.status == 'Success' || $scope.status == 'Publish' || $scope.status == 'Error') {
            if (confirm('Confirm to delete？')) {
                //console.log($scope.taskid);
                $scope.taskid = {
                    uuid: $scope.taskId
                };
                CAmaintenanceService.DelItem($scope.taskid).then(function (data) {
                    if (data.code == 0) {
                        alert("Success！");
                        $scope.taskId = '';
                        $scope.getPage();
                        //$("#tabExample").dataTable().fnDestroy();
                        //$scope.PRCWW = true;
                    } else {
                        alert(data.msg);
                    }
                    //console.log(data);
                }, function (data) {
                    //console.log(data);
                });
            }
        } else {
            alert("Execution is not complete！");
        }
    };

    //prc时的Download
    $scope.getPRCDownLoad = function () {
        if (!$scope.TaskID) {
            return;
        } else {
            CAmaintenanceService.getPrcDown($scope.TaskID).then(function (response) {
                var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
                fileName=fileName.replace(/\"/g,"");
                var data = response.data;
                // console.log(data);
                //type: "application/vnd.ms-excel"}可以保存为xls格式的excel文件（兼容老版本）
                //而使用“application/vnd.openxmlformats-officedocument.spreadsheetml.sheet”则会保存为xlsx
                var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                var objectUrl = URL.createObjectURL(blob);
                var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href", objectUrl);
                aForExcel.attr("download", fileName);
                $("body").append(aForExcel);
                $(".forExcel").click();
                aForExcel.remove();
            }, function (data) {
                //console.log(data);
            })
        }
    }

    //ww时的Download
    $scope.getWWDownLoad = function () {
        if (!$scope.TaskID) {
            return;
        } else {
            CAmaintenanceService.getWwDown($scope.TaskID).then(function (response) {
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
                //console.log(data);
            })
        }
    }

    //点击Validate
    $scope.getValidate = function () {
        $scope.validate = {
            zcycle_name: $scope.CycleName,
            zuuid: $scope.TaskID,
            user: $rootScope.user
        };
        //  console.log($rootScope.user)
        CAmaintenanceService.getValidate($scope.validate).then(function (data) {
            if (data.code == 0) {
                alert('success！');
                $scope.getPage();
            } else {
                alert(data.msg);
            }
            //  console.log(data);
        }, function (data) {
            //  console.log(data);
        });
    };

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

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //下面是在table render完成后执行的js
        $('#final table').stickySort({sortable: true});

        var length = -1;
        $(".caleft").nextAll().removeClass("gray");
        $.each($scope.dataMap, function (key, value) {
            $.each(value.geo, function (gkey, gvalue) {
                length += gvalue;
                if (gvalue > 1) {
                    $(".th_" + length).addClass("gray");
                }
            });
        })

    });

})