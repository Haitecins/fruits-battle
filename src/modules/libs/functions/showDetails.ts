import $ from "jquery";
import elements from "@/data/common/elements";
import calcRepair from "./calcRepair";

const { nodes } = elements;
const showDetails = ({
  id,
  pos,
  before,
  after,
  extra,
  fixed,
}: ShowDetailProps) => {
  const getPos = pos;
  const send = (className: string, text: string | number) => {
    $("<span/>")
      .appendTo(nodes.app)
      .addClass(`pickup ${className}`)
      .html(() => {
        const extraClass = extra ? extra() : "";

        return `<span class="picked-icon picked-${id} ${extraClass}"></span> ${text}`;
      })
      .css({
        left() {
          // 阻止拾取后显示的信息超出游戏区域
          if (getPos.x < 0) getPos.x = 10;
          if (
            getPos.x >
            (nodes.app as any).width() - ($(this) as any).width()
          ) {
            getPos.x =
              (nodes.app as any).width() - ($(this) as any).width() - 10;
          }

          return getPos.x;
        },
        top() {
          if (getPos.y < 0) getPos.y = 10;
          if (
            getPos.y >
            (nodes.app as any).height() -
              (nodes.statusbar.element as any).height() -
              ($(this) as any).height()
          ) {
            getPos.y =
              (nodes.app as any).height() -
              (nodes.statusbar.element as any).height() -
              ($(this) as any).height() -
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
      "+" +
        calcRepair({
          formula: after - before,
          ceil: false,
          fixed,
        })
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
