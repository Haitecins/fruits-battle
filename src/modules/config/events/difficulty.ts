import levels from "@/modules/config/common/levels";
import Random from "@/libs/classes/Random";

const difficulty: DifficultyProps = [
  {
    chance: 39.5,
    title: '<span class="base-scores">基础得分</span>',
    data: () => levels.BASE_SCORES,
    change() {
      levels.BASE_SCORES += new Random(0.01, 0.1, 2).getNumber();
      return levels.BASE_SCORES;
    },
  },
  {
    chance: 36.2,
    title: '<span class="base-multiple">基础得分倍率</span>',
    data: () => levels.BASE_SCORES_MULTIPLE,
    suffixes: () => (levels.BASE_SCORES_MULTIPLE < 1.25 ? "x" : "x (Max)"),
    change() {
      levels.BASE_SCORES_MULTIPLE += new Random(0.01, 0.02, 2).getNumber();

      if (levels.BASE_SCORES_MULTIPLE > 1.25) {
        levels.BASE_SCORES_MULTIPLE = 1.25;
        return levels.BASE_SCORES_MULTIPLE;
      }
      return levels.BASE_SCORES_MULTIPLE;
    },
  },
  {
    chance: 41.3,
    title: '<span class="base-speed">基础移动速度</span>',
    data: () => levels.BASE_MOVE_SPEED,
    suffixes: () => (levels.BASE_MOVE_SPEED < 6.85 ? "" : " (Max)"),
    change() {
      levels.BASE_MOVE_SPEED += new Random(0.01, 0.1, 2).getNumber();

      if (levels.BASE_MOVE_SPEED > 6.85) {
        levels.BASE_MOVE_SPEED = 6.85;
        return levels.BASE_MOVE_SPEED;
      }
      return levels.BASE_MOVE_SPEED;
    },
  },
  {
    chance: 43.3,
    title: '<span class="entity-spawn-speed">实体</span> 生成速度',
    data: () => levels.ENTITY_SPAWN_SPEED,
    suffixes: () => (levels.ENTITY_SPAWN_SPEED < 150 ? "%" : "% (Max)"),
    change() {
      levels.ENTITY_SPAWN_SPEED += new Random(0.2, 1.4, 2).getNumber();

      if (levels.ENTITY_SPAWN_SPEED > 150) {
        levels.ENTITY_SPAWN_SPEED = 150;
        return levels.ENTITY_SPAWN_SPEED;
      }
      return levels.ENTITY_SPAWN_SPEED;
    },
  },
  {
    chance: 46.4,
    title: '<span class="items-des-chance">游戏道具</span> 生成概率',
    data: () => levels.ITEMS_SPAWN_CHANCE,
    suffixes: () => (levels.ITEMS_SPAWN_CHANCE < 28 ? "%" : "% (Max)"),
    change() {
      levels.ITEMS_SPAWN_CHANCE += new Random(0.1, 1.6, 2).getNumber();

      if (levels.ITEMS_SPAWN_CHANCE > 28) {
        levels.ITEMS_SPAWN_CHANCE = 28;
        return levels.ITEMS_SPAWN_CHANCE;
      }
      return levels.ITEMS_SPAWN_CHANCE;
    },
  },
  {
    chance: 47.1,
    title: '<span class="healthy-fruits">新鲜水果</span> 生成概率',
    data: () => levels.HEALTHY_FRUITS_SPAWN_CHANCE,
    suffixes: () => (levels.HEALTHY_FRUITS_SPAWN_CHANCE < 70 ? "%" : "% (Max)"),
    change() {
      levels.HEALTHY_FRUITS_SPAWN_CHANCE += new Random(0.1, 1.6, 2).getNumber();

      if (levels.HEALTHY_FRUITS_SPAWN_CHANCE > 70) {
        levels.HEALTHY_FRUITS_SPAWN_CHANCE = 70;
        return levels.HEALTHY_FRUITS_SPAWN_CHANCE;
      }
      return levels.HEALTHY_FRUITS_SPAWN_CHANCE;
    },
  },
  {
    chance: 49.8,
    title: '<span class="bad-fruits">腐烂水果</span> 生成概率',
    data: () => levels.BAD_FRUITS_CHANCE,
    suffixes: () => (levels.BAD_FRUITS_CHANCE < 50 ? "%" : "% (Max)"),
    change() {
      levels.BAD_FRUITS_CHANCE += new Random(1, 3.2, 2).getNumber();

      if (levels.BAD_FRUITS_CHANCE > 50) {
        levels.BAD_FRUITS_CHANCE = 50;
        return levels.BAD_FRUITS_CHANCE;
      }
      return levels.BAD_FRUITS_CHANCE;
    },
  },
];

interface DifficultyObject {
  chance: number;
  title: string;
  data: () => string | number | boolean;
  change: () => number;
  suffixes?: () => string;
}
type DifficultyProps = DifficultyObject[];

export { DifficultyObject, DifficultyProps };

export default difficulty;
