/**
 * 计算数值修复
 * @param formula 需要修复的数值
 * @param ceil 向下取整
 * @param fixed 小数保留位数
 * @returns 修复后的数值
 */
const calcRepair = (formula: number, ceil = false, fixed = 2): number => {
  let int: string | number = "1";
  for (let i = 0; i < fixed; i++) {
    int += "0";
  }
  int = parseFloat(int);
  if (ceil) {
    return Math.ceil(formula * int) / int;
  }
  return Math.floor(formula * int) / int;
};

export default calcRepair;
