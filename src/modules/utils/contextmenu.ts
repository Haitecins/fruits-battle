// 禁用鼠标右键
window.oncontextmenu = (ev) => {
  ev.preventDefault();
  ev.stopPropagation();
  return false;
};
