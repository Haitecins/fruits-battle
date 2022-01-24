interface ItemsObject {
  id: string;
  type: string;
  priority: number;
  valid: {
    min: number;
    max: number;
  };
  effect: (element: HTMLElement | JQuery<HTMLElement>) => void;
  speed: {
    min: number;
    max: number;
  };
  description: string;
  custom?: object;
}
type ItemProps = ItemsObject[];

export default ItemProps;
export { ItemsObject };
