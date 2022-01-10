import { calcRepair } from "../index.js";

function showDetails({ id, pos, before, after, extra, fixed } = {}) {
  const getPos = pos;

  function send(className, text) {
    $("<span/>")
      .appendTo($("#wrapper"))
      .addClass(`pickup ${className}`)
      .html(() => {
        const extraClass = extra ? extra() : "";

        return `<span class="picked-icon picked-${id} ${extraClass}"></span> ${text}`;
      })
      .css({
        left() {
          // 阻止拾取后显示的信息超出游戏区域
          if (getPos.x < 0) getPos.x = 0;
          if (getPos.x > $("#wrapper").width() - $(this).width()) {
            getPos.x = $("#wrapper").width() - $(this).width();
          }

          return getPos.x;
        },
        top() {
          if (getPos.y < 0) getPos.y = 0;
          if (
            getPos.y >
            $("#wrapper").height() -
              $("#player-status").height() -
              $(this).height()
          ) {
            getPos.y =
              $("#wrapper").height() -
              $("#player-status").height() -
              $(this).height();
          }

          return getPos.y;
        },
      })
      .fadeOut(1500, function () {
        $(this).remove();
      });
  }

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
}

export default showDetails;
