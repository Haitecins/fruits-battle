// 禁止Safari浏览器的弹性滚动
(() => {
  let lastTouchEnd = 0;
  document.addEventListener("touchstart", (event) => {
    if (event.touches.length > 1) event.preventDefault();
  });
  document.addEventListener(
    "touchend",
    (event) => {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) event.preventDefault();
      lastTouchEnd = now;
    },
    false
  );
  document.addEventListener("gesturestart", (event) => event.preventDefault());
  document.addEventListener("dblclick", (event) => event.preventDefault());
})();
