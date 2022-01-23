import levels, { levelsCopied } from "@/configs/common/levels";
import player, { playerCopied } from "@/configs/common/player";
import statistics, { statisticsCopied } from "@/configs/common/statistics";

const resetConfig = (): void => {
  const resetFn = (configs: ResetConfigProps): void => {
    configs.forEach((config) => {
      Object.keys(config.original).forEach((configItem) => {
        (config.original as any)[configItem] = (config.replaced as any)[
          configItem
        ];
      });
    });
  };

  resetFn([
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
