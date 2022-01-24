interface FruitsObject {
  id: string;
  type: string;
  priority: number;
  scores: number;
  speed: {
    min: number;
    max: number;
  };
}
type FruitProps = FruitsObject[];

export default FruitProps;
export { FruitsObject };
