import CalcRepairProps from "@/types/libs/functions/calcRepair";

const calcRepair = ({
  formula,
  ceil = false,
  fixed = 2,
}: CalcRepairProps): number => {
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
