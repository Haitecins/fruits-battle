import player from "@/configs/common/player";
import statistics from "@/configs/common/statistics";
import levels from "@/configs/common/levels";
import AchievementProps from "@/types/configs/events/achievements";

// 计算偏差，游戏数值在计算时可能会出现偏差，使用后可以避免偏差。
const deviation = 0.1;
const achievements: AchievementProps = [
  {
    id: "NONE_FRUITS",
    cond() {
      return statistics.TOTAL_FRUITS === 0;
    },
    title: "消失的水果",
    description() {
      return "没有拾取任何水果。";
    },
  },
  {
    id: "FRUITS_100_UP",
    required: {
      fruits: 100,
    },
    cond() {
      const { fruits } = this.required as {
        fruits: number;
      };
      return statistics.TOTAL_FRUITS > fruits;
    },
    title: "水果能手",
    description() {
      const { fruits } = this.required as {
        fruits: number;
      };
      return `累计拾取${fruits}个以上的水果。`;
    },
  },
  {
    id: "FRUITS_300_UP",
    required: {
      fruits: 300,
    },
    cond() {
      const { fruits } = this.required as {
        fruits: number;
      };
      return statistics.TOTAL_FRUITS > fruits;
    },
    title: "水果先锋",
    description() {
      const { fruits } = this.required as {
        fruits: number;
      };
      return `累计拾取${fruits}个以上的水果。`;
    },
  },
  {
    id: "FRUITS_500_UP",
    required: {
      fruits: 500,
    },
    cond() {
      const { fruits } = this.required as {
        fruits: number;
      };
      return statistics.TOTAL_FRUITS > fruits;
    },
    title: "水果大师",
    description() {
      const { fruits } = this.required as {
        fruits: number;
      };
      return `累计拾取${fruits}个以上的水果。`;
    },
  },
  {
    id: "FRUITS_1000_UP",
    required: {
      fruits: 1000,
    },
    cond() {
      const { fruits } = this.required as {
        fruits: number;
      };
      return statistics.TOTAL_FRUITS > fruits;
    },
    title: "水果之王",
    description() {
      const { fruits } = this.required as {
        fruits: number;
      };
      return `累计拾取${fruits}个以上的水果。`;
    },
  },
  {
    id: "NONE_BAD_FRUITS",
    cond: () => player.countdown <= 0 && statistics.TOTAL_BAD_FRUITS <= 0,
    title: "完美躲避",
    description() {
      return "直至游戏结束，没有拾取一个腐烂水果。";
    },
  },
  {
    id: "BAD_FRUITS_50_UP",
    required: {
      badFruits: 50,
    },
    cond() {
      const { badFruits } = this.required as {
        badFruits: number;
      };
      return statistics.TOTAL_BAD_FRUITS > badFruits;
    },
    title: "烂活，就是有点好。",
    description() {
      const { badFruits } = this.required as {
        badFruits: number;
      };
      return `累计拾取${badFruits}个以上的腐烂水果。`;
    },
  },
  {
    id: "BAD_FRUITS_150_UP",
    required: {
      badFruits: 150,
    },
    cond() {
      const { badFruits } = this.required as {
        badFruits: number;
      };
      return statistics.TOTAL_BAD_FRUITS > badFruits;
    },
    title: "这也太烂了吧！",
    description() {
      const { badFruits } = this.required as {
        badFruits: number;
      };
      return `累计拾取${badFruits}个以上的腐烂水果。`;
    },
  },
  {
    id: "PLAYTIME_5S_DOWN",
    required: {
      playtime: 5,
    },
    cond() {
      const { playtime } = this.required as {
        playtime: number;
      };
      return statistics.PLAYTIME < playtime + deviation;
    },
    title: "开始即结束",
    description() {
      const { playtime } = this.required as {
        playtime: number;
      };
      return `游戏时长小于${playtime}秒。`;
    },
  },
  {
    id: "PLAYTIME_80S_UP",
    required: {
      playtime: 80,
    },
    cond() {
      const { playtime } = this.required as {
        playtime: number;
      };
      return statistics.PLAYTIME > playtime - deviation;
    },
    title: "还差得远呢",
    description() {
      const { playtime } = this.required as {
        playtime: number;
      };
      return `游戏时长大于${playtime}秒。`;
    },
  },
  {
    id: "PLAYTIME_120S_UP",
    required: {
      playtime: 120,
    },
    cond() {
      const { playtime } = this.required as {
        playtime: number;
      };
      return statistics.PLAYTIME > playtime - deviation;
    },
    title: "不要停下来啊···",
    description() {
      const { playtime } = this.required as {
        playtime: number;
      };
      return `游戏时长大于${playtime}秒。`;
    },
  },
  {
    id: "PLAYTIME_240S_UP",
    required: {
      playtime: 240,
    },
    cond() {
      const { playtime } = this.required as {
        playtime: number;
      };
      return statistics.PLAYTIME > playtime - deviation;
    },
    title: "你也是加把劲···",
    description() {
      const { playtime } = this.required as {
        playtime: number;
      };
      return `游戏时长大于${playtime}秒。`;
    },
  },
  {
    id: "PLAYTIME_360S_UP",
    required: {
      playtime: 360,
    },
    cond() {
      const { playtime } = this.required as {
        playtime: number;
      };
      return statistics.PLAYTIME > playtime - deviation;
    },
    title: "再起不能",
    description() {
      const { playtime } = this.required as {
        playtime: number;
      };
      return `游戏时长大于${playtime}秒。`;
    },
  },
  {
    id: "LEVELS_5_UP",
    required: {
      lv: 5,
    },
    cond() {
      const { lv } = this.required as {
        lv: number;
      };
      return levels.DIFFICULTY_LEVELS > lv;
    },
    title: "就这？",
    description() {
      const { lv } = this.required as {
        lv: number;
      };
      return `游戏难度到达${lv}级以上。`;
    },
  },
  {
    id: "LEVELS_15_UP",
    required: {
      lv: 15,
    },
    cond() {
      const { lv } = this.required as {
        lv: number;
      };
      return levels.DIFFICULTY_LEVELS > lv;
    },
    title: "就这就这？",
    description() {
      const { lv } = this.required as {
        lv: number;
      };
      return `游戏难度到达${lv}级以上。`;
    },
  },
  {
    id: "LEVELS_40_UP",
    required: {
      lv: 40,
    },
    cond() {
      const { lv } = this.required as {
        lv: number;
      };
      return levels.DIFFICULTY_LEVELS > lv;
    },
    title: "就...这...",
    description() {
      const { lv } = this.required as {
        lv: number;
      };
      return `游戏难度到达${lv}级以上。`;
    },
  },
  {
    id: "TOO_WATER",
    required: {
      playtime: 60,
    },
    cond() {
      const { playtime } = this.required as {
        playtime: number;
      };
      return (
        statistics.PLAYTIME > playtime - deviation &&
        statistics.TOTAL_FRUITS === 0
      );
    },
    title: "摸鱼",
    description() {
      const { playtime } = this.required as {
        playtime: number;
      };
      return `游戏时长大于${playtime}秒，并且没有拾取任何水果。`;
    },
  },
  {
    id: "NOT_USE_SKILLS",
    cond: () => statistics.USE_SKILLS <= 0,
    title: "法师有个···",
    description() {
      return "没有使用魔法技能。";
    },
  },
  {
    id: "NEVER_MOVED",
    cond: () => statistics.NEVER_MOVED,
    title: "安如磐石",
    description() {
      return "游戏开始后从未移动过。";
    },
  },
  {
    id: "REMAIN_1_HEALTH",
    cond: () => player.countdown <= 0 && player.health === 1,
    title: "苟延残喘",
    description() {
      return "保持1点生命值直到游戏结束。";
    },
  },
  {
    id: "REMAIN_MAX_HEALTH",
    cond: () => player.countdown <= 0 && player.health >= 10,
    title: "优雅至上",
    description() {
      return "保持最大生命值直到游戏结束。";
    },
  },
];

export default achievements;
