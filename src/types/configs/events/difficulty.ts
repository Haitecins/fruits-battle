interface DifficultyObject {
  chance: number;
  title: string;
  data: () => string | number | boolean;
  change: () => number;
  suffixes?: () => string;
}
type DifficultyProps = DifficultyObject[];

export default DifficultyProps;
export { DifficultyObject };
