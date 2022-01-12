import $ from "jquery";
import elements from "../../data/common/elements";

const { nodes } = elements;
const builtEntity = ({
  className,
  x: left,
  y: top,
  xSpeed,
  ySpeed,
  extra,
}: BuiltEntityProps) => {
  const createElement = $("<i/>");
  // 优先加入到 HTML中，解决使用 $(this)方法获取不到信息的问题。
  // 先加入到 HTML中的元素再添加样式也是可行的。
  createElement
    .appendTo(nodes.app)
    .addClass(className)
    .css({ left, top })
    .prop({ xSpeed, ySpeed });
  // 额外的函数，通常用于添加额外的样式。
  if (extra) extra(createElement);
};

export default builtEntity;
