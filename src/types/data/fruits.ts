interface FruitsObject {
  id: string;
  type: string;
  scores: number;
  speed: {
    min: number;
    max: number;
  };
}
type Fruits = FruitsObject[];
