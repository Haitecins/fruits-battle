function builtEntity({ className, x, y, xSpeed, ySpeed, extra } = {}) {
  const $e = $("<i/>");

  // 优先加入到 HTML中，解决使用 $(this)方法获取不到信息的问题。
  // 先加入到 HTML中的元素再添加样式也是可行的。
  $e.appendTo($("#wrapper"))
    .addClass(className)
    .css({
      left: x,
      top: y,
    })
    .prop({
      xSpeed,
      ySpeed,
    });

  // 额外的函数，通常用于添加额外的样式。
  if (extra) extra($e);
}

export default builtEntity;
