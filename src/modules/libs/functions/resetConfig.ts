import levels, { levelsCopied } from "@/configs/common/levels";
import player, { playerCopied } from "@/configs/common/player";
import statistics, { statisticsCopied } from "@/configs/common/statistics";
import ResetConfigProps from "@/types/libs/functions/resetConfig";

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

export default resetConfig;
