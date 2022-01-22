interface ResetConfigObject {
  original: LevelProps | PlayerProps | StatisticProps;
  replaced: LevelProps | PlayerProps | StatisticProps;
}
type ResetConfigProps = ResetConfigObject[];
