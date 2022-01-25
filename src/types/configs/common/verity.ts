interface VerityObject {
  enabled: boolean;
  custom?: object;
  check: () => boolean;
  actions: () => void;
}
interface VerityProps {
  [propName: string]: VerityObject;
}

export default VerityProps;
export { VerityObject };
