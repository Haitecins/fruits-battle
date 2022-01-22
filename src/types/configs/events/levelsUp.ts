interface LevelsUpListObject {
  chance: number;
  title: string;
  data: number;
  change: () => number;
  suffixes?: () => string;
}
type LevelsUpListProps = LevelsUpListObject[];
