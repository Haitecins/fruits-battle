interface ShowDetails {
  id: string;
  pos: {
    x: number;
    y: number;
  };
  before: number;
  after: number;
  extra?: () => any;
  fixed?: number;
}