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
  custom?: {
    timer?: NodeJS.Timeout | null | number | undefined;
    [propName: string]: unknown;
  };
  description: () => string;
  effect: (element: HTMLElement | JQuery<HTMLElement>) => void;
}
type ItemProps = ItemsObject[];

export default ItemProps;
export { ItemsObject };
