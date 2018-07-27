var http = require("http");
var url = require("url");
var fs = require('fs');
const querystring = require("querystring");
var path = require('path');



var config = require('./node-config').types;//


var javaServerUrlFlag = require('./node-config').javaServerUrlFlag;
var javaServerhost = require('./node-config').javaServerhost;
var javaServerport = require('./node-config').javaServerport;

var webapp = ".";
var PORT = 3000;

var server=http.createServer(function(request,response){
    //console.log("request.url: " + request.url + "");
    var clientUrl = request.url;
    var url_parts=url.parse(clientUrl);//解析路径
    var pathname = url_parts.pathname;

    var sreq = request;
    var sres = response;

	console.log("clientUrl......"+clientUrl);

    // java 转发请求
    if(pathname.match(javaServerUrlFlag)!=null){
        response.setHeader("Content-type", "text/plain;charset=UTF-8");

            var clientUrl2 = clientUrl;
            console.log(".java转发请求......http://" + javaServerhost + ":" + javaServerport + "" + clientUrl2);
            var prams = '';
            sreq.on("data", function (data) {
                prams += data;
            }).on("end", function () {
                console.log("client pramsJson>>>>>" + prams);
                const postData = prams;
                console.log("client pramsJson>>>>>" + postData);
                var contenttype = request.headers['content-type'];
                if (contenttype == undefined || contenttype == null || contenttype == '') {
                    var opt = {
                        host: javaServerhost, //跨域访问的主机ip
                        port: javaServerport,
                        path: "/" + clientUrl2,
                        method: request.method,
                        headers: {
                            'Content-Length': Buffer.byteLength(postData)
                        }
                    }
                } else {
                    var opt = {
                        host: javaServerhost, //跨域访问的主机ip
                        port: javaServerport,
                        path: "/" + clientUrl2,
                        method: request.method,
                        headers: {
                            'Content-Type': request.headers['content-type'],
                            'Content-Length': Buffer.byteLength(postData)
                        }
                    }
                }
                var body = '';

                console.log('method', opt.method);
                var req = http.request(opt, function (res) {
                    //console.log("response: " + res.statusCode);
                    res.on('data', function (data) {
                        body += data;
                    }).on('end', function () {
                        response.write(body);
                        response.end();
                        //console.log("end:>>>>>>>" + body);
                    });
                }).on('error', function (e) {
                    response.end('内部错误，请联系管理员！MSG:' + e);
                    console.log("error: " + e.message);
                })

                req.write(postData);
                req.end();

        })
    }else{
        var realPath = path.join(webapp, pathname);    //这里设置自己的文件名称;
        var ext = path.extname(realPath);
        ext = ext ? ext.slice(1) : 'unknown';
        fs.exists(realPath, function (exists) {
            //console.log("file is exists："+exists+" file path: " + realPath + "");
            if (!exists) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
            } else {
                fs.readFile(realPath, "binary", function (err, file) {
                    if (err) {
                        response.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        //response.end(err);
                        response.end("内部错误，请联系管理员");
                    } else {
                        var contentType = config[ext] || "text/plain";
                        response.writeHead(200, {
                            'Content-Type': contentType
                        });
                        response.write(file, "binary");
                        response.end();
                    }
                });
            }
        });

    }
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");