import levels, {
  LevelProps,
  levelsCopied,
} from "@/modules/config/common/levels";
import player, {
  playerCopied,
  PlayerProps,
} from "@/modules/config/common/player";
import statistics, {
  StatisticProps,
  statisticsCopied,
} from "@/modules/config/common/statistics";

const resetConfig = (): void => {
  const resetHandler = (configs: ResetConfigProps): void => {
    configs.forEach((config) => {
      Object.keys(config.original).forEach((configItem) => {
        (config.original as never)[configItem] = (config.replaced as never)[
          configItem
        ];
      });
    });
  };

  resetHandler([
    {
      original: levels,
      replaced: levelsCopied,
    },
    {
      original: player,
      replaced: playerCopied,
    },
    {
      original: statistics,
      replaced: { ...statisticsCopied, REWARD_SCORES_ARRAY: [] },
    },
  ]);
};

interface ResetConfigObject {
  original: LevelProps | PlayerProps | StatisticProps;
  replaced: LevelProps | PlayerProps | StatisticProps;
}

type ResetConfigProps = ResetConfigObject[];

export { ResetConfigProps, ResetConfigObject };

export default resetConfig;
