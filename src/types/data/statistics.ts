interface StatisticProps {
  SCORES: number;
  PLAYTIME: number;
  USE_SKILLS: number;
  TOTAL_FRUITS: number;
  TOTAL_BAD_FRUITS: number;
  REWARD_SCORES_ARRAY: number[];
  HEALTHY_FRUIT_COUNTS: number;
  BAD_FRUIT_COUNTS: number;
  TOTAL_ACHIEVEMENTS: number;
  TOTAL_MEDALS: number;
  NEVER_MOVED: boolean;
  SUMMON_CD: number;
  reset: () => void;
  [propName: string]: number | string | boolean | number[] | Function;
}
