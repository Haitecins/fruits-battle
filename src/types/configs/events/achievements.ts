interface AchievementsObject {
  id: string;
  required?: object;
  cond: () => boolean;
  title: string;
  description: () => string;
}
type AchievementProps = AchievementsObject[];

export default AchievementProps;
export { AchievementsObject };
