// 禁止Safari浏览器的弹性滚动
let lastTouchEnd = 0;

document.addEventListener("touchstart", (ev) => {
  if (ev.touches.length > 1) ev.preventDefault();
});
document.addEventListener(
  "touchend",
  (ev) => {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) ev.preventDefault();
    lastTouchEnd = now;
  },
  false
);
document.addEventListener("gesturestart", (ev) => ev.preventDefault());
document.addEventListener("dblclick", (ev) => ev.preventDefault());
