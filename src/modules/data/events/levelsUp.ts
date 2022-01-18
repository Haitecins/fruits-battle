import levels from "@/data/common/levels";
import randomNumber from "@/libs/functions/randomNumber";

const levelsUpList: LevelsUpListProps = [
  {
    chance: 29.5,
    title: '<b class="base-scores">基础得分</b>',
    data: levels.BASE_SCORES,
    change() {
      return (levels.BASE_SCORES += randomNumber({
        min: 0.01,
        max: 0.1,
        fixed: 2,
      }));
    },
  },
  {
    chance: 26.2,
    title: '<b class="base-multiple">基础得分倍率</b>',
    data: levels.BASE_SCORES_MULTIPLE,
    suffixes: () => (levels.BASE_SCORES_MULTIPLE < 1.25 ? "x" : "x (Max)"),
    change() {
      levels.BASE_SCORES_MULTIPLE += randomNumber({
        min: 0.01,
        max: 0.02,
        fixed: 2,
      });

      if (levels.BASE_SCORES_MULTIPLE > 1.25) {
        levels.BASE_SCORES_MULTIPLE = 1.25;
        return levels.BASE_SCORES_MULTIPLE;
      }
      return levels.BASE_SCORES_MULTIPLE;
    },
  },
  {
    chance: 31.3,
    title: '<b class="base-speed">基础移动速度</b>',
    data: levels.BASE_MOVE_SPEED,
    suffixes: () => (levels.BASE_MOVE_SPEED < 10.5 ? "" : " (Max)"),
    change() {
      levels.BASE_MOVE_SPEED += randomNumber({
        min: 0.01,
        max: 0.1,
        fixed: 2,
      });

      if (levels.BASE_MOVE_SPEED > 10.5) {
        levels.BASE_MOVE_SPEED = 10.5;
        return levels.BASE_MOVE_SPEED;
      }
      return levels.BASE_MOVE_SPEED;
    },
  },
  {
    chance: 33.3,
    title: '<b class="entity-spawn-speed">实体</b> 生成速度',
    data: levels.ENTITY_SPAWN_SPEED,
    suffixes: () => (levels.ENTITY_SPAWN_SPEED < 150 ? "%" : "% (Max)"),
    change() {
      levels.ENTITY_SPAWN_SPEED += randomNumber({
        min: 0.2,
        max: 1.4,
        fixed: 2,
      });

      if (levels.ENTITY_SPAWN_SPEED > 150) {
        levels.ENTITY_SPAWN_SPEED = 150;
        return levels.ENTITY_SPAWN_SPEED;
      }
      return levels.ENTITY_SPAWN_SPEED;
    },
  },
  {
    chance: 36.4,
    title: '<b class="items-des-chance">游戏道具</b> 生成概率',
    data: levels.ITEMS_SPAWN_CHANCE,
    suffixes: () => (levels.ITEMS_SPAWN_CHANCE < 28 ? "%" : "% (Max)"),
    change() {
      levels.ITEMS_SPAWN_CHANCE += randomNumber({
        min: 0.1,
        max: 1.6,
        fixed: 2,
      });

      if (levels.ITEMS_SPAWN_CHANCE > 28) {
        levels.ITEMS_SPAWN_CHANCE = 28;
        return levels.ITEMS_SPAWN_CHANCE;
      }
      return levels.ITEMS_SPAWN_CHANCE;
    },
  },
  {
    chance: 37.1,
    title: '<b class="healthy-fruits">新鲜水果</b> 生成概率',
    data: levels.HEALTHY_FRUITS_SPAWN_CHANCE,
    suffixes: () => (levels.HEALTHY_FRUITS_SPAWN_CHANCE < 70 ? "%" : "% (Max)"),
    change() {
      levels.HEALTHY_FRUITS_SPAWN_CHANCE += randomNumber({
        min: 0.1,
        max: 1.6,
        fixed: 2,
      });

      if (levels.HEALTHY_FRUITS_SPAWN_CHANCE > 70) {
        levels.HEALTHY_FRUITS_SPAWN_CHANCE = 70;
        return levels.HEALTHY_FRUITS_SPAWN_CHANCE;
      }
      return levels.HEALTHY_FRUITS_SPAWN_CHANCE;
    },
  },
  {
    chance: 39.8,
    title: '<b class="bad-fruits">腐烂水果</b> 生成概率',
    data: levels.BAD_FRUITS_CHANCE,
    suffixes: () => (levels.BAD_FRUITS_CHANCE < 50 ? "%" : "% (Max)"),
    change() {
      levels.BAD_FRUITS_CHANCE += randomNumber({
        min: 1,
        max: 3.2,
        fixed: 2,
      });

      if (levels.BAD_FRUITS_CHANCE > 50) {
        levels.BAD_FRUITS_CHANCE = 50;
        return levels.BAD_FRUITS_CHANCE;
      }
      return levels.BAD_FRUITS_CHANCE;
    },
  },
];

export default levelsUpList;
