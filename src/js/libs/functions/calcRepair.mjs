function calcRepair({ formula, ceil = false, fixed = 2 } = {}) {
  let int = 1;

  for (let i = 0; i < fixed; i++) int = int + "0";

  if (ceil) {
    return Math.ceil(formula * int) / int;
  } else {
    return Math.floor(formula * int) / int;
  }
}

export default calcRepair;
