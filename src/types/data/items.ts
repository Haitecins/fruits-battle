interface ItemsObject {
  id: string;
  type: string;
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
