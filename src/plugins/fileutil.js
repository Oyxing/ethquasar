const fs = require("fs")
const path = require('path');
var readFile = () => {
    return new Promise(function(resolve, reject) {
        if (fs.readdir) {
            var fPath = path.join(__dirname, "../statics/keystore/")
            fs.readdir(fPath, function(err, data) {
                if (err) { reject(err) } else {
                    var keystore = []
                    for (var i = 0; i < data.length; i++) {
                        fs.readFile(fPath + data[i], function(err, data) {
                            if (err) { reject(err) } else {
                                keystore.push(JSON.parse(data.toString()));
                            }
                        });
                    }
                    setTimeout(() => {
                        resolve(keystore);
                    }, 500);
                };
            });
        } else {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
                fs.root.getDirectory('statics', { create: false }, function(dirEntry) {
                    console.log('statics')
                    dirEntry.getDirectory('keystore', { create: false }, (subDirEntry) => {
                        var subDirReader = subDirEntry.createReader();
                        var entries = [];
                        //返回FileEntry数组
                        subDirReader.readEntries((results) => {
                            if (!results.length) {
                                showEntries(entries.sort());
                            } else {
                                entries = entries.concat(toArray(results));
                                var keystore = []
                                for (var i = 0; i < entries.length; i++) {
                                    subDirEntry.getFile(entries[i].name, { create: false, exclusive: false }, (fileEntry) => {
                                        fileEntry.file((file) => {
                                            var reader = new FileReader();
                                            reader.onloadend = function() {
                                                if (this.result) {
                                                    keystore.push(this.result)
                                                }
                                            };
                                            reader.readAsText(file);
                                        }, onErrorReadFile);
                                    }, onErrorCreateFile);
                                }
                                setTimeout(() => {
                                    var keystorelist = Array.from(new Set(keystore))
                                    console.log('keystorelist')
                                    console.log(keystorelist)
                                    resolve(keystorelist);
                                }, 500);
                            }
                        }, errorHandler);
                    }, onErrorGetDir);
                }, onErrorGetDir);
            }, onErrorLoadFs);

        }
    });
}

var writeFile = (fPath, content) => {
    return new Promise(function(resolve, reject) {
        if (fs.writeFile) {
            fs.writeFile(fPath, content, function(err, data) {
                if (err) reject(err);
                else resolve(data);
            });
        } else {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
                fs.root.getDirectory('statics', { create: true }, function(dirEntry) {
                    console.log('statics')
                    dirEntry.getDirectory('keystore', { create: true }, function(subDirEntry) {
                        var fPathname = fPath.split('/')[fPath.split('/').length - 1]
                        subDirEntry.getFile(fPathname, { create: true, exclusive: false }, function(fileEntry) {
                            fileEntry.name == fPathname;
                            fileEntry.fullPath == 'statics/keystore/' + fPathname;
                            //文件内容
                            // var dataObj = new Blob([content], { type: 'text/plain' });
                            //写入文件
                            fileEntry.createWriter(function(fileWriter) {
                                //文件写入成功
                                fileWriter.onwriteend = function() {
                                    console.log("Successful file write...");
                                };
                                //文件写入失败
                                fileWriter.onerror = function(e) {
                                    console.log("Failed file write: " + e.toString());
                                };
                                //写入文件
                                fileWriter.write(content);
                            });
                        }, onErrorCreateFile);
                    }, onErrorGetDir);
                }, onErrorGetDir);
            }, onErrorLoadFs);
        }
    });
}
var removeFile = () => {
    if (fs.rmdir) {} else {
        console.log("fileEntry==")
        window.resolveLocalFileSystemURL('statics/keystore/', function(fileEntry) {
            console.log('fileEntry')
            console.log(fileEntry)
            fileEntry.remove(function() {
                console.log('delete success');
            }, function(err) {
                console.error(err);
            }, function() {
                console.log('file not exist');
            });
        })
    }
}



function errorHandler(err) {
    console.info(err);
}

function toArray(list) {
    return Array.prototype.slice.call(list || [], 0);
}
//显示读取结果
function showEntries(entries) {
    console.info(entries);
}


function onErrorLoadFs(error) {
    console.log("文件系统加载失败！")
}
//文件夹创建失败回调
function onErrorGetDir(error) {
    console.log("文件夹创建失败！")
}

//文件创建失败回调
function onErrorCreateFile(error) {
    console.log("文件创建失败！")
}

//读取文件失败响应
function onErrorReadFile() {
    console.log("文件读取失败!");
}

export default ({ Vue }) => {
    Vue.prototype.$readFile = readFile
    Vue.prototype.$writeFile = writeFile
    Vue.prototype.$removeFile = removeFile
}