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

const audio: AudioProps = {
  // 开始按钮点击音效
  click: new Audio(click),
  // 游戏结束后的音效
  end: new Audio(end),
  // 拾取水果的音效
  eat: [new Audio(eat1), new Audio(eat2), new Audio(eat3)],
  // 难度提高时的音效
  orb: new Audio(orb),
  // 拾取有效道具时的音效
  equip_chain: [
    new Audio(equipChain1),
    new Audio(equipChain2),
    new Audio(equipChain3),
    new Audio(equipChain4),
    new Audio(equipChain5),
    new Audio(equipChain6),
  ],
  // 获取奖励分数时的音效
  burp: new Audio(brup),
  // 玩家的生命值增加时的音效
  pop: new Audio(pop),
  // 玩家失去生命值时的音效
  hit: [new Audio(hit1), new Audio(hit2), new Audio(hit3)],
  // 开始界面列表点击的音效
  open_flip: [new Audio(openFlip1), new Audio(openFlip2), new Audio(openFlip3)],
};

export default audio;
