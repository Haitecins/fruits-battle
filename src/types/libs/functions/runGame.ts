interface LevelsUpListObject {
  chance: number;
  title: string;
  data: number;
  change: () => number;
  symbol?: string;
}
type LevelsUpList = LevelsUpListObject[];
