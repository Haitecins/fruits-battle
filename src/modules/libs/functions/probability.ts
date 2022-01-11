import randomNumber from "./randomNumber";

function probability(chance: number, fixed: number = 0) {
  // 返回1-100的百分比数值
  return (
    randomNumber({
      min: 1,
      max: 100,
      fixed,
    }) <= (chance > 100 ? 100 : chance)
  );
}

export default probability;
