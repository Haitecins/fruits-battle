import randomNumber from "./randomNumber.js";

function randArrItem(arr) {
  // 从自定义数组中随机获取其中一项
  let index = randomNumber({
    min: 0,
    max: arr.length - 1,
  });

  // 返回一个数组，第一个值为随机获取的值，
  // 第二个值为获取到的值在自定义数组中的索引。
  return [arr[index], index];
}

export default randArrItem;
