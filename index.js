const wifi = require('Wifi');
const http = require('http');

// wifi 名称
const WIFI_Name = "where is your dick";
// wifi 参数
const WIFI_OPTIONS = {
    password: "boyulinzuishuai"
};
console.log("connecting...");
// yilianjiewifi的事件
wifi.on('connected', function () {
    wifi.getIP((err, info) => {
        if(err !== null) {
            throw err;
        }
        // 获取一下所在wifi下的局域网IP地址
        console.log(info.ip, 'connected');
        startServer();
    })
})
// 连接wifi
wifi.connect(WIFI_Name, WIFI_OPTIONS, err => {
    if(err !== null) {
        throw err;
    }
})
// 开启服务的函数
function startServer() {
    let PORT = 1314;
    http.createServer(serverCallback).listen(PORT);
    console.log(`server is running listen ${PORT}`);
}

// 服务的回调函数
function serverCallback(req, res) {
    // 使用 url 模块对请求地址进行解析
    const URL = url.parse(req.url, true);
    if (req.method === 'POST' && URL.pathname == '/led') {
        let data = "";
        req.on('data', (chunk) => {
            data += chunk;
        })
        req.on('end', () => {
            const params = JSON.parse(data);
            // 0 和 1 
            // 0是低电平开启灯 
            // 1是高电平关闭灯
            console.log(params);
            digitalWrite(NodeMCU.D4, params.status);
            res.end('ok');
        })
    } else {
        return res.end('err');
    }
}