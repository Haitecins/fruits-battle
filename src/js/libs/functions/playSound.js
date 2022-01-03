function playSound({ src, volume = 25, loop = false, promise = false } = {}) {
  // 使用独立播放功能
  // 防止一个正在播放的声音未结束时，无法再次重新播放。
  let audio;

  if (promise) {
    audio = new Audio(src.src);
  } else {
    audio = src;
  }

  audio.volume = volume / 100;
  audio.loop = loop;

  audio.play().catch(() => {
    console.error("play error.");
  });
}

export default playSound;
