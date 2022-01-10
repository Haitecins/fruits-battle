interface CollideEntity {
  id: string;
  contrast: JQuery<HTMLElement>;
  collided: (obj: JQuery<HTMLElement>) => void;
}
