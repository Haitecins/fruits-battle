import "./pages/app.mjs";

window.navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
) && $("body").empty().html('<p id="isMobile">暂不支持移动端运行此游戏</p>');

console.log(
  "%cp" + "%cr" + "%co" + "%cd" + "%cu" + "%cc" + "%ct" + "%ci" + "%co" + "%cn",
  "color:red",
  "color:green",
  "color:orange",
  "color:aqua",
  "color:hotpink",
  "color:gray",
  "color:purple",
  "color:black",
  "color:pink",
  "color:yellow"
);
