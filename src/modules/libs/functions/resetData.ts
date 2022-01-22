import levels from "@/configs/common/levels";
import player from "@/configs/common/player";
import statistics from "@/configs/common/statistics";

const resetData = (): void => {
  levels.reset();
  player.reset();
  statistics.reset();
};

export default resetData;
