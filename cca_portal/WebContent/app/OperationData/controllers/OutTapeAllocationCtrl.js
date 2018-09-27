"use strict";

angular.module('app.OperationData').controller('OutTapeAllocationCtrl', function ($scope, $rootScope, Upload, $timeout, APP_CONFIG, $state, $stateParams, $location, OutTapeAllocationService) {
    //EBR  上传文件  lta
    $scope.myfileslta1 = {};
    $scope.openUploadlta1 = function () {
        $scope.myfilesltaVal1 = '';
        $scope.fileChangelta1 = function () {
            if ($scope.myfileslta1.name) {
                $scope.myfilesltaVal1 = $scope.myfileslta1.name;
            } else {
                $scope.myfilesltaVal1 = '';
            }
        }
    };
    //GIBP 上传文件  lta
    $scope.myfileslta2 = {};
    $scope.openUploadlta2 = function () {
        $scope.myfilesltaVal2 = '';
        $scope.fileChangelta2 = function () {
            if ($scope.myfileslta2.name) {
                $scope.myfilesltaVal2 = $scope.myfileslta2.name;
            } else {
                $scope.myfilesltaVal2 = '';
            }
        }
    };
    //EBR  上传文件  out
    $scope.myfilesout1 = {};
    $scope.openUploadout1 = function () {
        $scope.myfilesoutVal1 = '';
        $scope.fileChangeout1 = function () {
            if ($scope.myfilesout1.name) {
                $scope.myfilesoutVal1 = $scope.myfilesout1.name;
            } else {
                $scope.myfilesoutVal1 = '';
            }
        }
    };
    //GIBP 上传文件  out
    $scope.myfilesout2 = {};
    $scope.openUploadout2 = function () {
        $scope.myfilesoutVal2 = '';
        $scope.fileChangeout2 = function () {
            if ($scope.myfilesout2.name) {
                $scope.myfilesoutVal2 = $scope.myfilesout2.name;
            } else {
                $scope.myfilesoutVal2 = '';
            }
        }
    };
    //EBR  上传文件  sw
    $scope.myfilessw1 = {};
    $scope.openUploadsw1 = function () {
        $scope.myfilesswVal1 = '';
        $scope.fileChangesw1 = function () {
            if ($scope.myfilessw1.name) {
                $scope.myfilesswVal1 = $scope.myfilessw1.name;
            } else {
                $scope.myfilesswVal1 = '';
            }
        }
    };
    //GIBP 上传文件  sw
    $scope.myfilessw2 = {};
    $scope.openUploadsw2 = function () {
        $scope.myfilesswVal2 = '';
        $scope.fileChangesw2 = function () {
            if ($scope.myfilessw2.name) {
                $scope.myfilesswVal2 = $scope.myfilessw2.name;
            } else {
                $scope.myfilesswVal2 = '';
            }
        }
    };
    $rootScope.getCycle().then(function (data) {
        console.log(data);
        $scope.cycledata = data.result;
    });
    //上传 LTA  （第一个）
    $scope.uploadlta = function () {
        if (!$scope.CycleChooselta) {
            alert("Please select conditions！");
        } else {
            Upload.upload({
                //服务端接收
                url: APP_CONFIG.baseUrl + '/api/ota/attachments_alliance',
                data: {
                    file: $scope.myfileslta2,
                    file1: $scope.myfileslta1,
                    username: $rootScope.user,
                    cyclename: $scope.CycleChooselta
                },
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                },
            }).success(function (data, status, headers, config) {
                if (data.code == 0) {
                    //alert('Uploaded successfully！');
                    alert(data.result);
                    console.log(data);
                    $scope.id = data.result;
                   $scope.outtapelta=true;
                    $scope.outtapeout=false;
                    $scope.outtapesw=false;
                    $scope.LatalTable();
                    $scope.LatresTable();
                } else {
                    alert('Upload failed！');
                }
            }).error(function (data, status, headers, config) {
                alert('Upload failed');
                //上传失败
                console.log('error status: ' + status);
            });
        }
    };
    //上传 out（第er个）
    $scope.uploadout = function () {
        if (!$scope.CycleChooseout) {
            alert("Please select conditions！");
        } else {
            Upload.upload({
                //服务端接收
                url: APP_CONFIG.baseUrl + '/api/ota/attachments_ot',
                data: {
                    file: $scope.myfilesout1,
                    file1: $scope.myfilesout2,
                    username: $rootScope.user,
                    cyclename: $scope.CycleChooseout
                },
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                },
            }).success(function (data, status, headers, config) {
                if (data.code == 0) {
                    //alert('Uploaded successfully！');
                    console.log(data);
                    alert(data.result);
                    $scope.id = data.result;
                    $scope.outtapelta=false;
                    $scope.outtapeout=true;
                    $scope.outtapesw=false;
                    $scope.OutalTable();
                    $scope.OutresTable();
                } else {
                    alert('Upload failed！');
                }
            }).error(function (data, status, headers, config) {
                alert('Upload failed');
                //上传失败
                console.log('error status: ' + status);
            });
        }
    };
    //上传 sw  （第san个）
    $scope.uploadsw = function () {
        if (!$scope.CycleChoosesw) {
            alert("Please select conditions！");
        } else {
            Upload.upload({
                //服务端接收
                url: APP_CONFIG.baseUrl + '/api/ota/attachments_sw',
                data: {
                    file: $scope.myfilessw1,
                    file1: $scope.myfilessw2,
                    username: $rootScope.user,
                    cyclename : $scope.CycleChoosesw
                },
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                },
            }).success(function (data, status, headers, config) {
                if (data.code == 0) {
                    //alert('Uploaded successfully！');
                    alert(data.result);
                    console.log(data);
                    $scope.id = data.result;
                    $scope.outtapelta=false;
                    $scope.outtapeout=false;
                    $scope.outtapesw=true;

                    $scope.SwalTable();
                    $scope.SwresTable();
                } else {
                    alert('Upload failed！');
                }
            }).error(function (data, status, headers, config) {
                alert('Upload failed');
                //上传失败
                console.log('error status: ' + status);
            });
        }
    };

    //下载模板 download Template lta
    $scope.DowTemplta = function () {
        $scope.temp = {
            type: 'lta'
        }
        OutTapeAllocationService.download($scope.temp).then(function (response) {
            console.log(response);
            var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
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
    //下载模板 download Template out
    $scope.DowTempout = function () {
        $scope.temp = {
            type: 'out'
        }
        OutTapeAllocationService.download($scope.temp).then(function (response) {
            console.log(response);
            var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
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
    //下载模板 download Template sw
    $scope.DowTempsw = function () {
        $scope.temp = {
            type: 'sw'
        }
        OutTapeAllocationService.download($scope.temp).then(function (response) {
            console.log(response);
            var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
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


    //LatalTable 搜索数据 lta
    $scope.LatalTable = function () {
        $("#LatalExample").dataTable().fnDestroy();
        $timeout(function () {
            $('#LatalExample thead tr').eq(1).find('td').each(function () {
                var title = $('#LatalExample thead tr td').eq($(this).index()).text();
                $(this).html('<input type="text" placeholder="Search ' + title + '" />');
            });
            var table = $('#LatalExample').DataTable({
                "scrollY": 600,
                "scrollX": true,
                "dom": '<"top">rt<"bottom"><"clear">',
                "scrollCollapse": true,
                "paging": false,
                "ordering": false,
                "autoWidth": false,
                "data": $scope.WwList,
                "columns": [
                    {"data": "H1"},
                    {"data": "Account"},
                    {"data": "A0"},
                    {"data": "Profit Center"},
                    {"data": "Amount"},
                    {"data": "Deal Des./SKU/Text"},
                    {"data": "GPN"},
                    {"data": "Plant"},
                    {"data": "CD"},
                    {"data": "BU"},
                    {"data": "Geo"},
                    {"data": "Sub_Geo"},
                    {"data": "Country"},
                    {"data": "BPC Segment"},
                    {"data": "Segment"}
                    //{ "data": "lqBmc" ,render: function ( data, type, row ) {
                    //    if(data == null){
                    //        return data;
                    //    }else {
                    //        var abc = data + '';
                    //        return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    //    }
                    //}}
                ]
            });
            table.columns().eq(0).each(function (colIdx) {
                $('input', table.column(colIdx).header()).on('keyup change', function () {
                    table
                        .column(colIdx)
                        .search(this.value)
                        .draw();
                });
            });
        });
    }
    //LatresTable  搜索数据  lta
    $scope.LatresTable = function () {
        $("#LatresExample").dataTable().fnDestroy();
        $timeout(function () {
            $('#LatresExample thead tr').eq(1).find('td').each(function () {
                var title = $('#LatresExample thead tr td').eq($(this).index()).text();
                $(this).html('<input type="text" placeholder="Search ' + title + '" />');
            });
            var table = $('#LatresExample').DataTable({
                "scrollY": 600,
                "scrollX": true,
                "dom": '<"top">rt<"bottom"><"clear">',
                "scrollCollapse": true,
                "paging": false,
                "ordering": false,
                "autoWidth": false,
                "data": $scope.PrcList,
                "columns": [
                    {"data": "BU"},
                    {"data": "Segment"},
                    {"data": "Intel Alliance Funding"},
                    {"data": "SKU"},
                    {"data": "Geo"},
                    {"data": "Sub_Geo"},
                    {"data": "Amount"}
                    //{ "data": "lqBmc" ,render: function ( data, type, row ) {
                    //    if(data == null){
                    //        return data;
                    //    }else {
                    //        var abc = data + '';
                    //        return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    //    }
                    //}}
                ]
            });
            table.columns().eq(0).each(function (colIdx) {
                $('input', table.column(colIdx).header()).on('keyup change', function () {
                    table
                        .column(colIdx)
                        .search(this.value)
                        .draw();
                });
            });
        });
    }
    //OutalTable 搜索数据 out
    $scope.OutalTable = function () {
        $("#OutalExample").dataTable().fnDestroy();
        $timeout(function () {
            $('#OutalExample thead tr').eq(1).find('td').each(function () {
                var title = $('#OutalExample thead tr td').eq($(this).index()).text();
                $(this).html('<input type="text" placeholder="Search ' + title + '" />');
            });
            var table = $('#OutalExample').DataTable({
                "scrollY": 600,
                "scrollX": true,
                "dom": '<"top">rt<"bottom"><"clear">',
                "scrollCollapse": true,
                "paging": false,
                "ordering": false,
                "autoWidth": false,
                "data": $scope.WwList,
                "columns": [
                    {"data": "H1"},
                    {"data": "Account"},
                    {"data": "A0"},
                    {"data": "Profit Center"},
                    {"data": "Amount"},
                    {"data": "Deal Des./SKU/Text"},
                    {"data": "GPN"},
                    {"data": "Plant"},
                    {"data": "CD"},
                    {"data": "BU"},
                    {"data": "Geo"},
                    {"data": "Sub_Geo"},
                    {"data": "Country"},
                    {"data": "BPC Segment"},
                    {"data": "Segment"}
                    //{ "data": "lqBmc" ,render: function ( data, type, row ) {
                    //    if(data == null){
                    //        return data;
                    //    }else {
                    //        var abc = data + '';
                    //        return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    //    }
                    //}}
                ]
            });
            table.columns().eq(0).each(function (colIdx) {
                $('input', table.column(colIdx).header()).on('keyup change', function () {
                    table
                        .column(colIdx)
                        .search(this.value)
                        .draw();
                });
            });
        });
    }
    //OutresTable  搜索数据  out
    $scope.OutresTable = function () {
        $("#OutresExample").dataTable().fnDestroy();
        $timeout(function () {
            $('#OutresExample thead tr').eq(1).find('td').each(function () {
                var title = $('#OutresExample thead tr td').eq($(this).index()).text();
                $(this).html('<input type="text" placeholder="Search ' + title + '" />');
            });
            var table = $('#OutresExample').DataTable({
                "scrollY": 600,
                "scrollX": true,
                "dom": '<"top">rt<"bottom"><"clear">',
                "scrollCollapse": true,
                "paging": false,
                "ordering": false,
                "autoWidth": false,
                "data": $scope.PrcList,
                "columns": [
                    {"data": "Geo"},
                    {"data": "Sub_Geo"},
                    {"data": "BU"},
                    {"data": "Product Number"},
                    {"data": "SKU"},
                    {"data": "Amount"}
                    //{ "data": "lqBmc" ,render: function ( data, type, row ) {
                    //    if(data == null){
                    //        return data;
                    //    }else {
                    //        var abc = data + '';
                    //        return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    //    }
                    //}}
                ]
            });
            table.columns().eq(0).each(function (colIdx) {
                $('input', table.column(colIdx).header()).on('keyup change', function () {
                    table
                        .column(colIdx)
                        .search(this.value)
                        .draw();
                });
            });
        });
    }
    //SwalTable 搜索数据 sw
    $scope.SwalTable = function () {
        $("#SwalExample").dataTable().fnDestroy();
        $timeout(function () {
            $('#SwalExample thead tr').eq(1).find('td').each(function () {
                var title = $('#SwalExample thead tr td').eq($(this).index()).text();
                $(this).html('<input type="text" placeholder="Search ' + title + '" />');
            });
            var table = $('#SwalExample').DataTable({
                "scrollY": 600,
                "scrollX": true,
                "dom": '<"top">rt<"bottom"><"clear">',
                "scrollCollapse": true,
                "paging": false,
                "ordering": false,
                "autoWidth": false,
                "data": $scope.WwList,
                "columns": [
                    {"data": "H1"},
                    {"data": "Account"},
                    {"data": "A0"},
                    {"data": "Profit Center"},
                    {"data": "Amount"},
                    {"data": "Deal Des./SKU/Text"},
                    {"data": "GPN"},
                    {"data": "Plant"},
                    {"data": "CD"},
                    {"data": "BU"},
                    {"data": "Geo"},
                    {"data": "Sub_Geo"},
                    {"data": "Country"},
                    {"data": "BPC Segment"},
                    {"data": "Segment"},
                    {"data": "Material"}
                    //{ "data": "lqBmc" ,render: function ( data, type, row ) {
                    //    if(data == null){
                    //        return data;
                    //    }else {
                    //        var abc = data + '';
                    //        return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    //    }
                    //}}
                ]
            });
            table.columns().eq(0).each(function (colIdx) {
                $('input', table.column(colIdx).header()).on('keyup change', function () {
                    table
                        .column(colIdx)
                        .search(this.value)
                        .draw();
                });
            });
        });
    }
    //SwresTable  搜索数据  sw
    $scope.SwresTable = function () {
        $("#SwresExample").dataTable().fnDestroy();
        $timeout(function () {
            $('#SwresExample thead tr').eq(1).find('td').each(function () {
                var title = $('#SwresExample thead tr td').eq($(this).index()).text();
                $(this).html('<input type="text" placeholder="Search ' + title + '" />');
            });
            var table = $('#SwresExample').DataTable({
                "scrollY": 600,
                "scrollX": true,
                "dom": '<"top">rt<"bottom"><"clear">',
                "scrollCollapse": true,
                "paging": false,
                "ordering": false,
                "autoWidth": false,
                "data": $scope.PrcList,
                "columns": [
                    {"data": "Geo"},
                    {"data": "Country"},
                    {"data": "BU"},
                    {"data": "Deal Des#/SKU"},
                    {"data": "PU"},
                    {"data": "Amount"}
                ]
            });
            table.columns().eq(0).each(function (colIdx) {
                $('input', table.column(colIdx).header()).on('keyup change', function () {
                    table
                        .column(colIdx)
                        .search(this.value)
                        .draw();
                });
            });
        });
    }

    //有数据的Download
    $scope.getLtaDownLoad = function () {
        if (!$scope.TaskID) {
            return;
        } else {
            OutTapeAllocationService.getDownLoad($scope.TaskID).then(function (response) {
                var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
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
        OutTapeAllocationService.getValidate($scope.validate).then(function (data) {
            if (data.code == 0) {
                alert('Success！');
                $scope.getPage();
            } else {
                alert(data.msg);
            }
            console.log(data);
        }, function (data) {
            console.log(data);
        });
    };

});