interface AchievementsObject {
  id: string;
  cond: () => boolean;
  title: string;
  description: string;
}
type AchievementProps = AchievementsObject[];

export default AchievementProps;
export { AchievementsObject };
