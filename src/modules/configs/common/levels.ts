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
};
const levelsCopied: LevelProps = { ...levels };

interface LevelProps {
  BASE_SCORES: number;
  BASE_SCORES_MULTIPLE: number;
  BASE_MOVE_SPEED: number;
  ENTITY_SPAWN_SPEED: number;
  ITEMS_SPAWN_CHANCE: number;
  HEALTHY_FRUITS_SPAWN_CHANCE: number;
  BAD_FRUITS_CHANCE: number;
  DIFFICULTY_LEVELS: number;
}

export { LevelProps };

export default levels;
export { levelsCopied };
