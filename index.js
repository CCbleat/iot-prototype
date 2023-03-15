const wifi = require("Wifi");
const http = require("http");
const mqtt = require("modules/MQTT.min.js");

// wifi 名称
// const WIFI_NAME = "where is your dick";
const WIFI_NAME = "abcdefg";
// wifi 参数
const WIFI_OPTIONS = {
  password: "12345678",
  // password: "boyulinzuishuai",
};
console.log("connecting...");
//已连接wifi的事件
wifi.on("connected", function () {
  wifi.getIP((err, info) => {
    if (err !== null) {
      throw err;
    }
    //获取一下所在wifi下的局域网IP地址
    console.log(info.ip, "connected");
    connectMQTTServer();
  });
});
// 连接wifi
wifi.connect(WIFI_NAME, WIFI_OPTIONS, (err) => {
  if (err !== null) {
    throw err;
  }
});

// 连接mqtt服务的函数
function connectMQTTServer() {
  // 139.224.56.89 cloud server open ip address
  // var host = "139.224.56.89";
  var host = "localhost/";
  var client = mqtt.connect({
    host: host,
    port: 1883,
    username: "user",
    password: "123456",
  });
  client.on("connect", () => {
    console.log("connected success ...");
    client.subscribe("topic/led", { qos: 1 });
  });
  client.on("message", (topic, message) => {
    console.log("message success ...");
    // console.log(pub,'pub')
    if (topic == "topic/led") {
      var params = message.toString();
      params = JSON.parse(params);
      digitalWrite(NodeMCU.D4, params.status);
    }
  });
}
