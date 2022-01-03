function timeFormat(num) {
  let m = Math.floor(num / 60),
    s = num % 60;

  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  return m + ":" + s;
}

export default timeFormat;
