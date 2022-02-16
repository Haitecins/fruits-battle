/**
 * 设置时间显示格式
 * @param num 时间（单位：秒）
 * @returns 格式化后的时间
 */
const timeFormat = (num: number): string => {
  let m: string | number = Math.floor(num / 60);
  let s: string | number = num % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  return `${m}:${s}`;
};

export default timeFormat;
