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
        $('#ltaupload1').css('display', 'none');
        $('#ltaupload2').css('display', 'block');
        Upload.upload({
            //服务端接收
            url: APP_CONFIG.baseUrl + '/api/ota/AllocationAlliance',
            data: {
                file: $scope.myfileslta2,
                file1: $scope.myfileslta1,
                username: $rootScope.user
            },
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
        }).success(function (data, status, headers, config) {
            if (data.code == 0) {
                //alert('Uploaded successfully！');
                alert(data.result);
                console.log(data);
                $scope.timestamp = data.timestamp;
                $scope.ltaTab = {
                    userName: $rootScope.user,
                    timestamp: $scope.timestamp,
                    flag: 0
                };
                $scope.ltaTab1 = {
                    userName: $rootScope.user,
                    timestamp: $scope.timestamp,
                    flag: 1
                };
                if (data.result == "upload successed.") {
                    $timeout(function () {
                        OutTapeAllocationService.getltaTab($scope.ltaTab).then(function (data) {
                            //if(data.result[0][0].Error){
                            //    alert(data.result[0][0].Error);
                            //}else{
                            $('#ltaupload2').css('display', 'none');
                            $('#ltaupload1').css('display', 'block');
                            $scope.ltaall = data.result[0];
                            console.log($scope.ltaall);
                            //让表格显示
                            $scope.outtapelta = true;
                            $scope.outtapeout = false;
                            $scope.outtapesw = false;
                            //表格的搜索
                            $scope.LatalTable();
                            //$scope.LatresTable();
                            //}
                        }, function (data) {
                            console.log(data);
                        });
                        OutTapeAllocationService.getltaTab($scope.ltaTab1).then(function (data) {
                            //if(data.result[0][0].Error){
                            //    alert(data.result[0][0].Error);
                            //}else{
                            $('#ltaupload2').css('display', 'none');
                            $('#ltaupload1').css('display', 'block');
                            $scope.ltaall1 = data.result[0];
                            console.log($scope.ltaall1);
                            //让表格显示
                            $scope.outtapelta = true;
                            $scope.outtapeout = false;
                            $scope.outtapesw = false;
                            //表格的搜索
                            $scope.LatresTable();
                            //}
                        }, function (data) {
                            console.log(data);
                        });
                    }, 3000);
                }else{
                    $('#ltaupload2').css('display', 'none');
                    $('#ltaupload1').css('display', 'block');
                }
            } else {
                alert('Upload failed！');
                $('#ltaupload2').css('display', 'none');
                $('#ltaupload1').css('display', 'block');
            }
        }).error(function (data, status, headers, config) {
            alert('Upload failed');
            $('#ltaupload2').css('display', 'none');
            $('#ltaupload1').css('display', 'block');
            //上传失败
            console.log('error status: ' + status);
        });
    };
    //上传 out（第er个）
    $scope.uploadout = function () {
        $('#outupload1').css('display', 'none');
        $('#outupload2').css('display', 'block');
        Upload.upload({
            //服务端接收
            url: APP_CONFIG.baseUrl + '/api/ota/OutTape',
            data: {
                file: $scope.myfilesout2,
                file1: $scope.myfilesout1,
                username: $rootScope.user
            },
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
        }).success(function (data, status, headers, config) {
            if (data.code == 0) {
                //alert('Uploaded successfully！');
                alert(data.result);
                console.log(data);
                $scope.timestamp = data.timestamp;
                $scope.outTab = {
                    userName: $rootScope.user,
                    timestamp: $scope.timestamp,
                    flag: 0
                };
                $scope.outTab1 = {
                    userName: $rootScope.user,
                    timestamp: $scope.timestamp,
                    flag: 1
                };
                if (data.result == "upload successed.") {
                    $timeout(function () {
                        OutTapeAllocationService.getoutTab($scope.outTab).then(function (data) {
                            //if(data.result[0][0].Error){
                            //    alert(data.result[0][0].Error);
                            //}else{
                            $('#outupload2').css('display', 'none');
                            $('#outupload1').css('display', 'block');
                            $scope.outall = data.result[0];
                            console.log($scope.outall);
                            //让表格显示
                            $scope.outtapelta = false;
                            $scope.outtapeout = true;
                            $scope.outtapesw = false;
                            //表格的搜索
                            $scope.OutalTable();
                            //$scope.OutresTable();
                            //}
                        }, function (data) {
                            console.log(data);
                        });
                        OutTapeAllocationService.getoutTab($scope.outTab1).then(function (data) {
                            //if(data.result[0][0].Error){
                            //    alert(data.result[0][0].Error);
                            //}else{
                            $('#outupload2').css('display', 'none');
                            $('#outupload1').css('display', 'block');
                            $scope.outall1 = data.result[0];
                            console.log($scope.outall1);
                            //让表格显示
                            $scope.outtapelta = false;
                            $scope.outtapeout = true;
                            $scope.outtapesw = false;
                            //表格的搜索
                            //$scope.OutalTable();
                            $scope.OutresTable();
                            //}
                        }, function (data) {
                            console.log(data);
                        });
                    }, 3000);
                }else{
                    $('#outupload2').css('display', 'none');
                    $('#outupload1').css('display', 'block');
                }
            } else {
                alert('Upload failed！');
                $('#outupload2').css('display', 'none');
                $('#outupload1').css('display', 'block');
            }
        }).error(function (data, status, headers, config) {
            alert('Upload failed');
            $('#outupload2').css('display', 'none');
            $('#outupload1').css('display', 'block');
            //上传失败
            console.log('error status: ' + status);
        });
    };
    //上传 sw  （第san个）
    $scope.uploadsw = function () {
        $('#swupload1').css('display', 'none');
        $('#swupload2').css('display', 'block');
        Upload.upload({
            //服务端接收
            url: APP_CONFIG.baseUrl + '/api/ota/AllocationSW',
            data: {
                file: $scope.myfilessw2,
                file1: $scope.myfilessw1,
                username: $rootScope.user
            },
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
        }).success(function (data, status, headers, config) {
            if (data.code == 0) {
                //alert('Uploaded successfully！');
                alert(data.result);
                console.log(data);
                $scope.timestamp = data.timestamp;
                $scope.swTab = {
                    userName: $rootScope.user,
                    timestamp: $scope.timestamp,
                    flag: 0
                };
                $scope.swTab1 = {
                    userName: $rootScope.user,
                    timestamp: $scope.timestamp,
                    flag: 1
                };
                if (data.result == "upload successed.") {
                    $timeout(function () {
                        OutTapeAllocationService.getswTab($scope.swTab).then(function (data) {
                            //if(data.result[0][0].Error){
                            //    alert(data.result[0][0].Error);
                            //}else{
                            $('#swupload2').css('display', 'none');
                            $('#swupload1').css('display', 'block');
                            $scope.swall = data.result[0];
                            console.log($scope.swall);
                            //让表格显示
                            $scope.outtapelta = false;
                            $scope.outtapeout = false;
                            $scope.outtapesw = true;
                            //表格的搜索
                            $scope.SwalTable();
                            //$scope.SwresTable();
                            //}
                        }, function (data) {
                            console.log(data);
                        });
                        OutTapeAllocationService.getswTab($scope.swTab1).then(function (data) {
                            //if(data.result[0][0].Error){
                            //    alert(data.result[0][0].Error);
                            //}else{
                            $('#swupload2').css('display', 'none');
                            $('#swupload1').css('display', 'block');
                            $scope.swall1 = data.result[0];
                            console.log($scope.swall1);
                            //让表格显示
                            $scope.outtapelta = false;
                            $scope.outtapeout = false;
                            $scope.outtapesw = true;
                            //表格的搜索
                            //$scope.SwalTable();
                            $scope.SwresTable();
                            //}
                        }, function (data) {
                            console.log(data);
                        });
                    }, 3000);
                }else{
                    $('#swupload2').css('display', 'none');
                    $('#swupload1').css('display', 'block');
                }
            } else {
                alert('Upload failed！');
                $('#swupload2').css('display', 'none');
                $('#swupload1').css('display', 'block');
            }
        }).error(function (data, status, headers, config) {
            alert('Upload failed');
            $('#swupload2').css('display', 'none');
            $('#swupload1').css('display', 'block');
            //上传失败
            console.log('error status: ' + status);
        });

    };

    //xia下载ebr
    $scope.EbrDown = function () {
        $scope.temp1 = {
            type: 'ebr'
        }
        OutTapeAllocationService.download($scope.temp1).then(function (response) {
            console.log(response);
            var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
            fileName = fileName.replace(/\"/g, "");
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
    };

    //下载模板 download Template lta
    $scope.DowTemplta = function () {
        $scope.temp = {
            type: 'alliance'
        }
        OutTapeAllocationService.download($scope.temp).then(function (response) {
            console.log(response);
            var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
            fileName = fileName.replace(/\"/g, "");
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
        $scope.EbrDown();
    }
    //下载模板 download Template out
    $scope.DowTempout = function () {
        $scope.EbrDown();
        $scope.temp = {
            type: 'outTape'
        }
        OutTapeAllocationService.download($scope.temp).then(function (response) {
            console.log(response);
            var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
            fileName = fileName.replace(/\"/g, "");
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
        $scope.EbrDown();
        $scope.temp = {
            type: 'sw'
        }
        OutTapeAllocationService.download($scope.temp).then(function (response) {
            console.log(response);
            var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
            fileName = fileName.replace(/\"/g, "");
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
                "retrieve": true,
                "destroy": true,
                "data": $scope.ltaall,
                "columns": [
                    {"data": "H1"},
                    {"data": "Account"},
                    {"data": "A0"},
                    {"data": "Profit Center"},
                    {"data": "Amount"},
                    {"data": "Deal Des#/SKU/Text"},
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
                "scrollY": 340,
                "scrollX": true,
                "dom": '<"top">rt<"bottom"><"clear">',
                "scrollCollapse": true,
                "paging": false,
                "ordering": false,
                "autoWidth": false,
                "retrieve": true,
                "destroy": true,
                "data": $scope.ltaall1,
                "columns": [
                    {"data": "BU"},
                    {"data": "Segment"},
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
            //table.ajax.reload(function () {
            //    table.columns.adjust().draw();
            //},false);
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
                "retrieve": true,
                "destroy": true,
                "data": $scope.outall,
                "columns": [
                    {"data": "H1"},
                    {"data": "Account"},
                    {"data": "A0"},
                    {"data": "Profit Center"},
                    {"data": "Amount"},
                    {"data": "Deal Des#/SKU/Text"},
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
                "data": $scope.outall1,
                "retrieve": true,
                "destroy": true,
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
                "retrieve": true,
                "destroy": true,
                "data": $scope.swall,
                "columns": [
                    {"data": "H1"},
                    {"data": "Account"},
                    {"data": "A0"},
                    {"data": "Profit Center"},
                    {"data": "Amount"},
                    {"data": "Deal Des#/SKU/Text"},
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
                "retrieve": true,
                "destroy": true,
                "data": $scope.swall1,
                "columns": [
                    {"data": "Geo"},
                    {"data": "Country"},
                    {"data": "BU"},
                    {"data": "SKU"},
                    {"data": "PN"},
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

    //有数据的 lta 的 Download
    $scope.getLtaDownLoad = function () {
        $scope.timesta = {
            userName: $rootScope.user,
            timestamp: $scope.timestamp
        };
        console.log($scope.timestamp);
        OutTapeAllocationService.getltaDown($scope.timesta).then(function (response) {
            var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
            fileName = fileName.replace(/\"/g, "");
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
        //}
    };
    //有数据的 out 的 Download
    $scope.getOutDownLoad = function () {
        $scope.timesta = {
            userName: $rootScope.user,
            timestamp: $scope.timestamp
        };
        console.log($scope.timestamp);
        OutTapeAllocationService.getoutDown($scope.timesta).then(function (response) {
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
        //}
    };
    //有数据的 sw 的 Download
    $scope.getSwDownLoad = function () {
        $scope.timesta = {
            userName: $rootScope.user,
            timestamp: $scope.timestamp
        };
        console.log($scope.timestamp);
        OutTapeAllocationService.getswDown($scope.timesta).then(function (response) {
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
        //}
    };


});