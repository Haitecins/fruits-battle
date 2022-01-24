import $ from "jquery";
import elements from "@/configs/common/elements";
import calcRepair from "@/libs/functions/calcRepair";
import ShowDetailProps from "@/types/libs/functions/showDetails";

const { nodes } = elements;
const showDetails = ({
  id,
  pos,
  before,
  after,
  extra,
  fixed,
}: ShowDetailProps): void => {
  const getPos = pos;
  const send = (className: string, text: string | number) => {
    $("<i/>")
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
          if (getPos.x < 0) getPos.x = 10;
          if (
            getPos.x >
            (nodes.app.width() as number) - ($(this).width() as number)
          ) {
            getPos.x =
              (nodes.app.width() as number) - ($(this).width() as number) - 10;
          }

          return getPos.x;
        },
        top() {
          if (getPos.y < 0) getPos.y = 10;
          if (
            getPos.y >
            (nodes.app.height() as number) -
              (nodes.statusbar.element.height() as number) -
              ($(this).height() as number)
          ) {
            getPos.y =
              (nodes.app.height() as number) -
              (nodes.statusbar.element.height() as number) -
              ($(this).height() as number) -
              10;
          }

          return getPos.y;
        },
      })
      .fadeOut(1500, function () {
        $(this).remove();
      });
  };
  if (after > before) {
    send(
      "get",
      `+${calcRepair({
        formula: after - before,
        ceil: false,
        fixed,
      })}`
    );
  } else {
    send(
      "lose",
      calcRepair({
        formula: after - before,
        ceil: true,
        fixed,
      })
    );
  }
};

export default showDetails;
