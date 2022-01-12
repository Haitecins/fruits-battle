import audio from "@/data/common/audio";
import elements from "@/data/common/elements";
import levels from "@/data/common/levels";
import player from "@/data/common/player";
import statistics from "@/data/common/statistics";
import verify from "@/data/common/verity";
import antiCheatVerification from "@/libs/functions/antiCheatVerification";
import playSound from "@/libs/functions/playSound";
import refreshHistory from "@/libs/functions/refreshHistory";
import refreshStatus from "@/libs/functions/refreshStatus";
import runGame from "@/libs/functions/runGame";
import bgm from "./bgm";
import "./icon";
import "./detail";
import "./history";

const { nodes, resetStyles, allElements } = elements;
nodes.readme.startButton
  .one("click", () => bgm.play())
  .on("click", () => {
    if (player.isRunning) return;
    player.isRunning = !player.isRunning;
    // 刷新状态栏
    refreshStatus();
    // 暂时关闭游戏区域验证，等待其他项目验证完毕后再次打开。
    verify.LEAVING_THE_GAME_AREA.enabled = false;
    // 反作弊验证
    antiCheatVerification();
    // 打开游戏区域验证
    verify.LEAVING_THE_GAME_AREA.enabled = true;
    // 重置玩家的默认位置
    nodes.player.css({
      left: (nodes.app as any).width() / 2 - (nodes.player as any).width() / 2,
      top: nodes.app.height,
    });
    playSound({ src: audio.click });
    nodes.readme.element.fadeOut(300, () => {
      nodes.statusbar.element.animate({ height: 42 }, 300, "swing");
      nodes.player.animate(
        {
          top:
            (nodes.app as any).height() / 2 - (nodes.player as any).width() / 2,
        },
        600,
        "swing",
        runGame
      );
    });
  });
nodes.gameover.restart.on("click", () => {
  if (!player.isRunning) return;
  player.isRunning = !player.isRunning;
  resetStyles().removeAttr("style");
  levels.reset();
  player.reset();
  statistics.reset();
  const ev = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: false,
  });
  nodes.readme.startButton[0].dispatchEvent(ev);
});
nodes.gameover.backhome.on("click", () => {
  if (!player.isRunning) return;
  player.isRunning = !player.isRunning;
  allElements().removeAttr("style");
  // 刷新历史记录
  refreshHistory();
});
