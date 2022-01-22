const levels: LevelProps = {
  // 基础得分 (default: 1)
  BASE_SCORES: 1,
  // 基础得分倍率 (default: 0.25)
  BASE_SCORES_MULTIPLE: 0.25,
  // 基础移动速度 (default: 1)
  BASE_MOVE_SPEED: 1,
  // 实体生成速度 (default: 100%)
  ENTITY_SPAWN_SPEED: 100,
  // 道具生成概率 (default: 10%)
  ITEMS_SPAWN_CHANCE: 10,
  // 健康水果水果概率 (default: 45%)
  HEALTHY_FRUITS_SPAWN_CHANCE: 45,
  // 腐烂水果生成概率 (default: 15%)
  BAD_FRUITS_CHANCE: 15,
  // 难度等级 (default: 1)
  DIFFICULTY_LEVELS: 1,
  // 重置
  reset() {
    Object.keys(levels).forEach((index) => {
      levels[index] = levelsCopy[index];
    });
  },
};
const levelsCopy: LevelProps = { ...levels };

export default levels;
