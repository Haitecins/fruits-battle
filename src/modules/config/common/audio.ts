import { Howl, Howler, HowlOptions } from "howler";
import GenshinImpact_2_4_PVMusic from "@/assets/sounds/bgm1.mp3";
import Random from "@/libs/classes/Random";
import click from "@/assets/sounds/click.ogg";
import end from "@/assets/sounds/end.ogg";
import eat1 from "@/assets/sounds/eat1.ogg";
import eat2 from "@/assets/sounds/eat2.ogg";
import eat3 from "@/assets/sounds/eat3.ogg";
import orb from "@/assets/sounds/orb.ogg";
import equipChain1 from "@/assets/sounds/equip_chain1.ogg";
import equipChain2 from "@/assets/sounds/equip_chain2.ogg";
import equipChain3 from "@/assets/sounds/equip_chain3.ogg";
import equipChain4 from "@/assets/sounds/equip_chain4.ogg";
import equipChain5 from "@/assets/sounds/equip_chain5.ogg";
import equipChain6 from "@/assets/sounds/equip_chain6.ogg";
import brup from "@/assets/sounds/burp.ogg";
import pop from "@/assets/sounds/pop.ogg";
import hit1 from "@/assets/sounds/hit1.ogg";
import hit2 from "@/assets/sounds/hit2.ogg";
import hit3 from "@/assets/sounds/hit3.ogg";
import openFlip1 from "@/assets/sounds/open_flip1.ogg";
import openFlip2 from "@/assets/sounds/open_flip2.ogg";
import openFlip3 from "@/assets/sounds/open_flip3.ogg";

Howler.volume(0.5);
const options: HowlOptions = {
  preload: true,
  volume: 0.5,
};
const audio: AudioProps = {
  // 开始按钮点击音效
  click: new Howl({ ...options, src: click }),
  // 游戏结束后的音效
  end: new Howl({ ...options, src: end }),
  // 拾取水果的音效
  eat: [
    new Howl({ ...options, src: eat1 }),
    new Howl({ ...options, src: eat2 }),
    new Howl({ ...options, src: eat3 }),
  ],
  // 难度提高时的音效
  orb: new Howl({ ...options, src: orb }),
  // 拾取有效道具时的音效
  equip_chain: [
    new Howl({ ...options, src: equipChain1 }),
    new Howl({ ...options, src: equipChain2 }),
    new Howl({ ...options, src: equipChain3 }),
    new Howl({ ...options, src: equipChain4 }),
    new Howl({ ...options, src: equipChain5 }),
    new Howl({ ...options, src: equipChain6 }),
  ],
  // 获取奖励分数时的音效
  burp: new Howl({ ...options, src: brup }),
  // 玩家的生命值增加时的音效
  pop: new Howl({ ...options, src: pop }),
  // 玩家失去生命值时的音效
  hit: [
    new Howl({ ...options, src: hit1 }),
    new Howl({ ...options, src: hit2 }),
    new Howl({ ...options, src: hit3 }),
  ],
  // 开始界面列表点击的音效
  open_flip: [
    new Howl({ ...options, src: openFlip1 }),
    new Howl({ ...options, src: openFlip2 }),
    new Howl({ ...options, src: openFlip3 }),
  ],
  bgm: new Howl({
    ...options,
    src: GenshinImpact_2_4_PVMusic,
    autoplay: true,
    loop: true,
    volume: 0.1,
  }),
  random(audios: Howl[]) {
    return new Random().getItem<Howl>(audios);
  },
};

interface AudioProps {
  click: Howl;
  end: Howl;
  eat: Howl[];
  orb: Howl;
  equip_chain: Howl[];
  burp: Howl;
  pop: Howl;
  hit: Howl[];
  open_flip: Howl[];
  bgm: Howl[] | Howl;
  random: (audios: Howl[]) => Howl;
}

export default audio;
