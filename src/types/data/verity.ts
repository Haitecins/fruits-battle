interface VerityObject {
  enabled: boolean;
  check: () => boolean;
  actions: () => void;
  [propName: string]: any;
}
interface Verity {
  [propName: string]: VerityObject;
}
