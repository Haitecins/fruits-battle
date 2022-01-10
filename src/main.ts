import $ from "jquery";
// CSS文件必须在JS文件之前加载，否则会导致DOM节点无法获取。
import "./assets/main.css";
import "./modules/pages/app";

window.navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
)
  ? $("body").empty().html('<p id="isMobile">暂不支持移动端运行此游戏</p>')
  : $("#app").removeAttr("style");
