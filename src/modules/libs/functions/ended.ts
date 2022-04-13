import achievements from "@/modules/config/events/achievements";
import statistics from "@/modules/config/common/statistics";
import cheatList from "@/modules/config/common/cheatList";
import timer from "@/modules/config/common/timer";
import audio from "@/modules/config/common/audio";
import items from "@/modules/config/common/items";
import player from "@/modules/config/common/player";
import levels from "@/modules/config/common/levels";
import elements from "@/modules/config/common/elements";
import calcRepair from "@/libs/functions/calcRepair";
import timeFormat from "@/libs/functions/timeFormat";

const { nodes, clearEntities } = elements;
const ended = (): void => {
  // 关闭所有定时器
  Object.keys(timer).forEach((key) =>
    clearInterval((timer as never)[key] as NodeJS.Timeout)
  );
  // 结束时播放特定声音
  audio.end.play();
  player.isEnded = !player.isEnded;
  clearEntities();
  // 清除遗留下来的难度日志
  nodes.levels.element.stop(true).removeAttr("style");
  nodes.levels.value.empty();
  nodes.levels.container.empty();
  // 清除道具中所有用到定时器的项目
  items
    .filter(
      (item) => (item.custom as { timer: NodeJS.Timeout }).timer !== undefined
    )
    .forEach((item) => {
      clearTimeout((item.custom as { timer: NodeJS.Timeout }).timer);
    });
  // 重置样式的验证属性
  cheatList.PLAYER_EDIT_ARGUMENTS.custom = {
    attrs: {
      width: 50,
      height: 42,
    },
  };
  // 重置玩家位置
  nodes.player.removeAttr("style").hide();
  // 显示本局的游戏数据
  const getCompletion = achievements.filter((item) => item.cond());
  const fillItem = getCompletion.map((item) => {
    const { title } = item;
    return `<li><i class="achievements-icon"></i><div><p>${title}</p><p>${item.description()}</p></div></li>`;
  });
  statistics.TOTAL_ACHIEVEMENTS = getCompletion.length;
  // 解构赋值，需要保存的数据。
  const {
    SCORES,
    PLAYTIME,
    USE_SKILLS,
    TOTAL_FRUITS,
    TOTAL_BAD_FRUITS,
    TOTAL_ACHIEVEMENTS,
    TOTAL_MEDALS,
  } = statistics;
  const { DIFFICULTY_LEVELS } = levels;
  // 需要存储的项目
  const savedItems = {
    // 统计信息
    statistics: {
      SCORES,
      PLAYTIME,
      USE_SKILLS,
      TOTAL_FRUITS,
      TOTAL_BAD_FRUITS,
      TOTAL_ACHIEVEMENTS,
      TOTAL_MEDALS,
      DIFFICULTY_LEVELS,
    },
    // 成就列表
    achievements: getCompletion.map(({ title, description }) => ({
      title,
      description,
    })),
  };
  // 保存游戏记录
  if (!window.localStorage.getItem("app_history")) {
    window.localStorage.setItem(
      "app_history",
      JSON.stringify([
        {
          ...savedItems,
          timestamp: new Date().getTime(),
        },
      ])
    );
  } else {
    const getHistory = JSON.parse(
      window.localStorage.getItem("app_history") as string
    ) as object;
    window.localStorage.setItem(
      "app_history",
      JSON.stringify([
        {
          ...savedItems,
          timestamp: new Date().getTime(),
        },
        ...(getHistory as never),
      ])
    );
    if (
      (
        JSON.parse(
          window.localStorage.getItem("app_history") as string
        ) as never[]
      ).length > 50
    ) {
      const totals = JSON.parse(
        window.localStorage.getItem("app_history") as string
      ) as never[];
      totals.length = 50;
      window.localStorage.setItem("app_history", JSON.stringify(totals));
    }
  }

  // 隐藏状态栏
  nodes.statusbar.element.animate({ height: 0 }, 300, "swing");
  // 显示结算界面
  nodes.gameover.element.show().animate({ opacity: 1 }, 600, "swing");
  nodes.gameover.playtime.text(timeFormat(Math.floor(PLAYTIME)));
  nodes.gameover.levels.text(`Lv.${DIFFICULTY_LEVELS}`);
  nodes.gameover.achievements.totals.text(fillItem.length);
  nodes.gameover.totals.fruits.text(TOTAL_FRUITS);
  nodes.gameover.totals.badFruits.text(TOTAL_BAD_FRUITS);
  nodes.gameover.achievements.element.html(fillItem as never);
  nodes.gameover.scores.text(calcRepair(SCORES));
  nodes.gameover.details.animate({ height: 268 }, 800, () => {});
};

export default ended;
