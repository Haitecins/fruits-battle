interface Levels {
  BASE_SCORES: number;
  BASE_SCORES_MULTIPLE: number;
  BASE_MOVE_SPEED: number;
  ENTITY_SPAWN_SPEED: number;
  ITEMS_SPAWN_CHANCE: number;
  HEALTHY_FRUITS_SPAWN_CHANCE: number;
  BAD_FRUITS_CHANCE: number;
  DIFFICULTY_LEVELS: number;
  reset: () => void;
  [propName: string]: number | string | Function;
}
