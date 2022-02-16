interface CheatListObject {
  enabled: boolean;
  custom?: object;
  check: () => boolean;
  actions: () => void;
}
interface CheatListProps {
  [propName: string]: CheatListObject;
}

export default CheatListProps;
export { CheatListObject };
