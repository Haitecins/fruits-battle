interface BuiltEntity {
  className: string;
  x: () => number;
  y: () => number;
  xSpeed: () => string;
  ySpeed: () => string;
  extra: (element: JQuery<HTMLElement>) => void | any;
}
