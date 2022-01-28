import "@/assets/styles/index.less";
import "@/pages/app";
import "@/pages/detailed";
import "@/pages/navigation";

// 禁用鼠标右键
window.oncontextmenu = (ev) => {
  ev.preventDefault();
  ev.stopPropagation();
  return false;
};
console.log(import.meta.env.MODE);
console.log("LEGACY", import.meta.env.LEGACY);
