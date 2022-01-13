import levels from "@/data/common/levels";
import player from "@/data/common/player";
import statistics from "@/data/common/statistics";

const resetData = (): void => {
  levels.reset();
  player.reset();
  statistics.reset();
};

export default resetData;
