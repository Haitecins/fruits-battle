import playSound from "@/libs/functions/playSound";
import Random from "@/libs/classes/Random";
import PlayRandSoundProps from "@/types/libs/functions/playRandSound";

const playRandSound = ({
  audio,
  volume,
  loop,
  promise,
}: PlayRandSoundProps): void => {
  // 播放列表中随机一种声音
  playSound({
    src: new Random().getItem<HTMLAudioElement>(audio),
    volume,
    loop,
    promise,
  });
};

export default playRandSound;
