interface LevelsUpListObject {
  chance: number;
  title: string;
  data: () => string | number | boolean;
  change: () => number;
  suffixes?: () => string;
}
type LevelsUpListProps = LevelsUpListObject[];
