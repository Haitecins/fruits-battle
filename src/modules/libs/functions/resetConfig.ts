import levels, { levelsCopied } from "@/configs/common/levels";
import player, { playerCopied } from "@/configs/common/player";
import statistics, { statisticsCopied } from "@/configs/common/statistics";
import LevelProps from "@/types/configs/common/levels";
import PlayerProps from "@/types/configs/common/player";
import StatisticProps from "@/types/configs/common/statistics";

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
