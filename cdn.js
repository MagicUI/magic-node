const {resolve} = require('path')
const fs = require('fs');
var args = process.argv.splice(2);

let copypath="";
args.forEach((obj) => {
    if(obj.indexOf('copypath') > -1){
        let copypath = obj.split('=')[1];
        fs.readFile(copypath + '/src/config.json', 'utf-8', function (err, data) {
            if (err) {
                return console.error(err);
            }
            let json = JSON.parse(data);
            // console.log("模块配置: " + data);
            let version = json.version;
            let name = json.name;
            let copyJsPath = `${copypath}/pack/js/app.js`;
            let distPath = `${__dirname}/${name}@${version}`;
            fs.exists(distPath, function( exists ){
                // 已存在
                if( exists ){
                    console.log(`${version}已经存在，请升级版本号`)
                }
                // 不存在
                else{
                    fs.mkdir( distPath, function(){
                        fs.copyFile(copyJsPath, `${distPath}/index.js`, function(){
                            console.log('复制js成功')
                        });
                    });
                    
                }
            });
        });
    }
});
