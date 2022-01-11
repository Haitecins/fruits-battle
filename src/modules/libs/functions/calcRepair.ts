function calcRepair({ formula, ceil = false, fixed = 2 }: CalcRepairProps) {
  let int: string | number = "1";
  for (let i = 0; i < fixed; i++) {
    int += "0";
  }
  int = parseFloat(int);
  if (ceil) {
    return Math.ceil(formula * int) / int;
  } else {
    return Math.floor(formula * int) / int;
  }
}

export default calcRepair;
