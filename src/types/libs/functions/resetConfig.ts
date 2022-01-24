import PlayerProps from "@/types/configs/common/player";
import LevelProps from "@/types/configs/common/levels";
import StatisticProps from "@/types/configs/common/statistics";

interface ResetConfigObject {
  original: LevelProps | PlayerProps | StatisticProps;
  replaced: LevelProps | PlayerProps | StatisticProps;
}
type ResetConfigProps = ResetConfigObject[];

export default ResetConfigProps;
export { ResetConfigObject };
