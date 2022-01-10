interface BuiltEntity {
  className: string;
  x: () => number;
  y: () => number;
  xSpeed: () => string;
  ySpeed: () => string;
  extra: (obj: JQuery<HTMLElement>) => void | any;
}
