import PlaySoundProps from "@/types/libs/functions/playSound";

const playSound = ({
  src,
  volume = 25,
  loop = false,
  promise = false,
}: PlaySoundProps): void => {
  // 使用独立播放功能
  // 防止一个正在播放的声音未结束时，无法再次重新播放。
  const audio = promise ? new Audio(src.src) : src;
  audio.volume = volume / 100;
  audio.loop = loop;
  audio.play().catch(() => {
    console.error("Play error.");
  });
};

export default playSound;
