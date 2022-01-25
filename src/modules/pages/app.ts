import $ from "jquery";
import audio from "@/configs/common/audio";
import elements from "@/configs/common/elements";
import player from "@/configs/common/player";
import statistics from "@/configs/common/statistics";
import verify from "@/configs/common/verity";
import verifications from "@/libs/functions/verifications";
import resetConfig from "@/libs/functions/resetConfig";
import refreshHistory from "@/libs/functions/refreshHistory";
import refreshStatus from "@/libs/functions/refreshStatus";
import launcher from "@/libs/functions/launcher";

const { nodes, resetPageStyles, resetIndexStyles } = elements;
const run = (): void => {
  if (player.isRunning) return;
  player.isRunning = !player.isRunning;
  nodes.player.removeAttr("style");
  // 播放点击音效
  audio.click.play();
  // 刷新状态栏
  refreshStatus();
  // 暂时关闭游戏区域验证，等待其他项目验证完毕后再次打开。
  verify.LEAVING_THE_GAME_AREA.enabled = false;
  // 反作弊验证
  verifications();
  // 打开游戏区域验证
  verify.LEAVING_THE_GAME_AREA.enabled = true;
  // 重置玩家的默认位置
  nodes.player.css({
    left:
      (nodes.app.width() as number) / 2 - (nodes.player.width() as number) / 2,
    top: () => nodes.app.height() as number,
  });
  nodes.readme.element.fadeOut(300, () => {
    nodes.statusbar.element.animate({ height: 42 }, 300, "swing");
    nodes.player.animate(
      {
        top:
          (nodes.app.height() as number) / 2 -
          (nodes.player.width() as number) / 2,
      },
      600,
      "swing",
      launcher
    );
  });
};
// 刷新历史记录
refreshHistory();
nodes.readme.startButton
  .one("click", () => {
    nodes.player.on({
      mousedown(downEvent) {
        // 获取鼠标的坐标与该对象的坐标之间的距离
        const x = downEvent.clientX - $(this).position().left;
        const y = downEvent.clientY - $(this).position().top;
        $(document).on({
          mousemove(moveEvent) {
            if (player.countdown > 0 && player.health > 0) {
              // 获取鼠标的坐标减去对象之间坐标的位置
              let left = moveEvent.clientX - x;
              let top = moveEvent.clientY - y;

              // 阻止超出游戏区域
              if (left < 0) left = 0;
              if (top < 0) top = 0;
              if (
                left >
                (nodes.app.width() as number) - (nodes.player.width() as number)
              ) {
                left =
                  (nodes.app.width() as number) -
                  (nodes.player.width() as number);
              }
              if (
                top >
                (nodes.app.height() as number) -
                  (nodes.player.height() as number) -
                  (nodes.statusbar.element.height() as number)
              ) {
                top =
                  (nodes.app.height() as number) -
                  (nodes.player.height() as number) -
                  (nodes.statusbar.element.height() as number);
              }
              player.not_moving_ticks = 0;
              statistics.NEVER_MOVED = false;
              nodes.player.css({ left, top });
            }
          },
          mouseup() {
            $(this).off("mousemove");
          },
        });
      },
    });
  })
  .on("click", run);
nodes.gameover.restart.on("click", () => {
  if (!player.isEnded) return;
  resetPageStyles();
  resetConfig();
  run();
});
nodes.gameover.spawnpoint.on("click", () => {
  if (!player.isEnded) return;
  resetIndexStyles();
  refreshHistory();
  resetConfig();
  audio.click.play();
});
