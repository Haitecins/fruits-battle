import Random from "@/libs/classes/Random";

/**
 * 设置通过几率
 * @param chance 几率
 * @param fixed 小数保留位数
 * @returns 是否通过
 */
const setChance = (chance: number, fixed = 0): boolean => {
  const random = new Random(0, 100, fixed).getNumber();
  return random <= (chance > 100 ? 100 : chance);
};

export default setChance;
