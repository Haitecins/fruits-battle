import "./modules/pages/app.js";

window.navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
)
  ? $("body").empty().html('<p id="isMobile">暂不支持移动端运行此游戏</p>')
  : $("#wrapper").removeAttr("style");

console.log(
  "%cp" + "%cr" + "%co" + "%cd" + "%cu" + "%cc" + "%ct" + "%ci" + "%co" + "%cn",
  "color:red",
  "color:green",
  "color:orange",
  "color:aqua",
  "color:hotpink",
  "color:gray",
  "color:purple",
  "color:#0769ad",
  "color:pink",
  "color:yellow"
);