import $ from "jquery";
import achievements from "@/configs/events/achievements";
import statistics from "@/configs/common/statistics";
import timer from "@/configs/common/timer";
import audio from "@/configs/common/audio";
import player from "@/configs/common/player";
import levels from "@/configs/common/levels";
import elements from "@/configs/common/elements";
import calcRepair from "@/libs/functions/calcRepair";
import playSound from "@/libs/functions/playSound";
import timeFormat from "@/libs/functions/timeFormat";

const { nodes, clearEntities } = elements;
const ended = (): void => {
  // 关闭所有定时器
  $.each(timer, function () {
    clearInterval($(this as never)[0] as unknown as NodeJS.Timeout);
  });
  // 停止所有正在播放的声音
  Object.keys(audio).forEach((key) => {
    const thisAudio = (audio as never)[key] as HTMLAudioElement;

    if (Array.isArray(thisAudio)) {
      const audioList: HTMLAudioElement[] = thisAudio;
      audioList.forEach((audioItem: HTMLAudioElement) => audioItem.pause());
    } else {
      thisAudio.pause();
    }
  });
  player.isEnded = !player.isEnded;
  clearEntities();
  nodes.levels.element.stop(true).removeAttr("style");
  nodes.levels.value.empty();
  nodes.levels.container.empty();
  nodes.player.removeAttr("style").hide();
  // 结束时播放特定声音
  playSound({ src: audio.end });
  // 显示本局的游戏数据
  const getCompletion = achievements.filter(({ cond }) => cond());
  const fillItem = getCompletion.map(({ title, description }) => {
    return `<li>
      <i class="achievements-icon"></i>
      <div>
      <p>${title}</p>
      <p>${description}</p>
      </div>
    </li>`;
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
  nodes.gameover.achievementsLength.text(fillItem.length);
  nodes.gameover.totals.fruits.text(TOTAL_FRUITS);
  nodes.gameover.totals.badFruits.text(TOTAL_BAD_FRUITS);
  nodes.gameover.achievements.html(fillItem as never);
  nodes.gameover.scores.text(
    calcRepair({
      formula: SCORES,
    })
  );
  nodes.gameover.details.animate({ height: 268 }, 800, () => {});
};

export default ended;
