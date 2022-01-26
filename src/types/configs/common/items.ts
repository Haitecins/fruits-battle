interface ItemsObject {
  id: string;
  type: string;
  priority: number;
  speed: {
    min: number;
    max: number;
  };
  valid: {
    min: number;
    max: number;
  };
  custom?: object;
  description: () => string;
  effect: (element: HTMLElement | JQuery<HTMLElement>) => void;
}
type ItemProps = ItemsObject[];

export default ItemProps;
export { ItemsObject };
