import { statistics, timer, audio, player } from "../../data/index.js";
import playSound from "./playSound.js";
import timeFormat from "./timeFormat.js";
import calcRepair from "./calcRepair.js";

function gameOver() {
  // 关闭所有定时器
  $.each(timer, function () {
    clearInterval($(this)[0]);
  });

  // 停止所有正在播放的声音
  // Use native for..in/for..of for better performance.
  for (let item in audio) {
    if (Array.isArray(audio[item])) {
      const audioList = audio[item];

      audioList.forEach((audio) => audio.pause());
    } else {
      audio[item].pause();
    }
  }

  $("#wrapper > *:not(div)").remove();
  $("#diff-notify").stop(true).removeAttr("style");
  $("#fruit-basket").removeAttr("style").hide();

  // 结束时播放特定声音
  playSound({ src: audio.end });

  $("#status").animate({ height: 0 }, 300, "swing");
  $("#finished")
    .show()
    .animate({ opacity: 1 }, 300, "swing", () => {
      $("#all-data").animate({ height: 252 }, 500, "swing", () => {
        // 计算偏差，游戏数值在计算时可能会出现偏差，使用后可以避免偏差。
        const deviation = 0.1;

        // 成就总览
        const achievements = [
          {
            id: "NONE_FRUITS",
            cond: statistics.TOTAL_FRUITS <= 0,
            title: "消失的水果",
            description: "没有拾取任何水果。",
          },
          {
            id: "FRUITS_100_UP",
            cond: statistics.TOTAL_FRUITS >= 100,
            title: "水果能手",
            description: "累计拾取100个以上的水果。",
          },
          {
            id: "FRUITS_300_UP",
            cond: statistics.TOTAL_FRUITS >= 300,
            title: "水果先锋",
            description: "累计拾取300个以上的水果。",
          },
          {
            id: "FRUITS_500_UP",
            cond: statistics.TOTAL_FRUITS >= 500,
            title: "水果大师",
            description: "累计拾取500个以上的水果。",
          },
          {
            id: "FRUITS_1000_UP",
            cond: statistics.TOTAL_FRUITS >= 1000,
            title: "水果之王",
            description: "累计拾取1000个以上的水果。",
          },
          {
            id: "NONE_BAD_FRUITS",
            cond: player.countdown <= 0 && statistics.TOTAL_BAD_FRUITS <= 0,
            title: "Full Combo",
            description: "直至游戏结束，没有拾取一个腐烂水果。",
          },
          {
            id: "BAD_FRUITS_50_UP",
            cond: statistics.TOTAL_BAD_FRUITS >= 50,
            title: "烂活，就是有点好。",
            description: "累计拾取50个以上的腐烂水果。",
          },
          {
            id: "BAD_FRUITS_150_UP",
            cond: statistics.TOTAL_BAD_FRUITS >= 150,
            title: "这也太烂了吧！",
            description: "累计拾取150个以上的腐烂水果。",
          },
          {
            id: "PLAYTIME_5S_DOWN",
            cond: statistics.PLAYTIME <= 5 + deviation,
            title: "开始即结束",
            description: "游戏时长小于5秒。",
          },
          {
            id: "PLAYTIME_80S_UP",
            cond: statistics.PLAYTIME >= 80 - deviation,
            title: "还差得远呢",
            description: "游戏时长大于80秒。",
          },
          {
            id: "PLAYTIME_120S_UP",
            cond: statistics.PLAYTIME >= 120 - deviation,
            title: "不要停下来啊···",
            description: "游戏时长大于120秒。",
          },
          {
            id: "PLAYTIME_240S_UP",
            cond: statistics.PLAYTIME >= 240 - deviation,
            title: "你也是加把劲···",
            description: "游戏时长大于240秒。",
          },
          {
            id: "PLAYTIME_360S_UP",
            cond: statistics.PLAYTIME >= 360 - deviation,
            title: "再起不能",
            description: "游戏时长大于360秒。",
          },
          {
            id: "LEVELS_5_UP",
            cond: statistics.DIFFICULTY_LEVELS >= 5,
            title: "就这？",
            description: "游戏难度到达5级以上。",
          },
          {
            id: "LEVELS_15_UP",
            cond: statistics.DIFFICULTY_LEVELS >= 25,
            title: "就这就这？",
            description: "游戏难度到达25级以上。",
          },
          {
            id: "LEVELS_40_UP",
            cond: statistics.DIFFICULTY_LEVELS >= 45,
            title: "就...这...",
            description: "游戏难度到达45级以上。",
          },
          {
            id: "TOO_WATER",
            cond:
              statistics.PLAYTIME >= 60 - deviation &&
              statistics.TOTAL_FRUITS <= 0,
            title: "摸鱼",
            description: "游戏时长大于60秒，并且没有拾取任何水果。",
          },
          {
            id: "NOT_USE_SKILLS",
            cond: statistics.USE_SKILLS <= 0,
            title: "法师有个···",
            description: "没有使用魔法技能。",
          },
          {
            id: "NEVER_MOVED",
            cond: statistics.NEVER_MOVED,
            title: "安如磐石",
            description: "游戏开始后从未移动过。",
          },
          {
            id: "REMAIN_1_HEALTH",
            cond: player.countdown <= 0 && player.health === 1,
            title: "苟延残喘",
            description: "保持1点生命值直到游戏结束。",
          },
          {
            id: "REMAIN_MAX_HEALTH",
            cond: player.countdown <= 0 && player.health >= 10,
            title: "Perfect",
            description: "保持最大生命值直到游戏结束。",
          },
        ];

        // 显示本局的游戏数据
        const container = $("#achievements > ul");
        const filter = achievements.filter(({ cond }) => cond);
        statistics.TOTAL_ACHIEVEMENTS = filter.length;
        const fill = filter.map(({ title, description }) => {
          return `<li>
            <img src="/public/img/achievements_2.svg" alt="" />
            <div>
            <span>${title}</span>
            <p>${description}</p>
            </div>
          </li>`;
        });
        container.html([...fill]);

        // 显示本局的游戏数据
        $("#get-playtime > i").text(
          timeFormat(Math.floor(statistics.PLAYTIME))
        );
        $("#get-scores > i").text(calcRepair({ formula: statistics.SCORES }));
        $("#get-total-fruits > i").text(statistics.TOTAL_FRUITS);
        $("#get-total-achievements > i").text(statistics.TOTAL_ACHIEVEMENTS);
        $("#get-total-medals > i").text(statistics.TOTAL_MEDALS);
      });
    });
}

export default gameOver;
