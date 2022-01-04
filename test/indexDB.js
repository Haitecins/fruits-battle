const request = window.indexedDB.open("APP_DB_V1", 1);
let database = null;

request.onerror = () => {
  console.error("无法打开IndexDB数据库。");
};
request.onsuccess = () => {
  database = request.result;
  console.log("连接本地数据库成功。");
};
request.onupgradeneeded = (ev) => {
  console.log("已更新本地数据库。");
  database = ev.target.result;

  let objectStore = null;
  if (!database.objectStoreNames.contains("history")) {
    objectStore = database.createObjectStore("history", {
      keyPath: "id",
      autoIncrement: true,
    });
  }
};

function add() {
  var request = database
    .transaction(["history"], "readwrite")
    .objectStore("history")
    .add({ id: 1, name: "张三", age: 24, email: "zhangsan@example.com" });

  request.onsuccess = function (event) {
    console.log("数据写入成功");
  };

  request.onerror = function (event) {
    console.log("数据写入失败");
  };
}

setTimeout(() => {
  add();
}, 1000);
