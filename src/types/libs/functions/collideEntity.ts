interface CollideEntityProps {
  id: string;
  contrast: JQuery<HTMLElement>;
  collided: (element: JQuery<HTMLElement>) => void;
}
