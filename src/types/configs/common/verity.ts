interface VerityObject {
  enabled: boolean;
  check: () => boolean;
  actions: () => void;
  [propName: string]: any;
}
interface VerityProps {
  [propName: string]: VerityObject;
}
