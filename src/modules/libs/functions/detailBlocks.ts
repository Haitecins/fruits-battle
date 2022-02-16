import jQuery from "jquery";
import elements from "@/configs/common/elements";
import calcRepair from "@/libs/functions/calcRepair";
import DetailBlockProps from "@/types/libs/functions/detailBlocks";

const { nodes } = elements;
/**
 * 实体在拾取后显示的细节
 * @param DetailBlockProps 参数列表
 */
const detailBlocks = ({
  id,
  location,
  value,
  extra,
  fixed,
}: DetailBlockProps): void => {
  const send = (className: string, text: string | number) => {
    jQuery("<i/>")
      .appendTo(nodes.app)
      .addClass("pickup")
      .addClass(className)
      .html(() => {
        const extraClass = extra ? ` ${extra() as string}` : "";

        return `<span class="picked-icon ${id}${extraClass}"></span> ${text}`;
      })
      .css({
        left() {
          // 阻止拾取后显示的信息超出游戏区域
          if (location.x < 0) location.x = 10;
          if (
            location.x >
            (nodes.app.width() as number) - (jQuery(this).width() as number)
          ) {
            location.x =
              (nodes.app.width() as number) -
              (jQuery(this).width() as number) -
              10;
          }

          return location.x;
        },
        top() {
          if (location.y < 0) location.y = 10;
          if (
            location.y >
            (nodes.app.height() as number) -
              (nodes.statusbar.element.height() as number) -
              (jQuery(this).height() as number)
          ) {
            location.y =
              (nodes.app.height() as number) -
              (nodes.statusbar.element.height() as number) -
              (jQuery(this).height() as number) -
              10;
          }

          return location.y;
        },
      })
      .fadeOut(1500, function () {
        jQuery(this).remove();
      });
  };
  const { after, before } = value;
  if (after > before) {
    send(
      "get",
      `+${calcRepair(after - before, false, fixed)}${
        value.suffix ? value.suffix : ""
      }`
    );
  } else {
    send(
      "lose",
      `${calcRepair(after - before, true, fixed)}${
        value.suffix ? value.suffix : ""
      }`
    );
  }
};

export default detailBlocks;
