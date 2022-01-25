import "@/assets/styles/index.less";
import "@/pages/app";
import "@/pages/detailed";
import "@/pages/history";
import "@/pages/navigation";
import elements from "@/configs/common/elements";

// 禁用移动端
window.navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
)
  ? elements.nodes.body.empty().html('<p id="isMobile">暂不支持移动端运行</p>')
  : elements.nodes.app.removeAttr("style");
// 禁用鼠标右键
window.oncontextmenu = (ev) => {
  ev.preventDefault();
  ev.stopPropagation();
  return false;
};
console.log(import.meta.env.MODE);
console.log("LEGACY", import.meta.env.LEGACY);
