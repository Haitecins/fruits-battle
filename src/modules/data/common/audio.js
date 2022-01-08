const audio = {
  // 开始按钮点击音效
  click: new Audio("./public/audio/click.ogg"),
  // 游戏结束后的音效
  end: new Audio("./public/audio/end.ogg"),
  // 拾取水果的音效
  eat: [
    new Audio("./public/audio/eat1.ogg"),
    new Audio("./public/audio/eat2.ogg"),
    new Audio("./public/audio/eat3.ogg"),
  ],
  // 难度提高时的音效
  orb: new Audio("./public/audio/orb.ogg"),
  // 拾取有效道具时的音效
  equip_chain: [
    new Audio("./public/audio/equip_chain1.ogg"),
    new Audio("./public/audio/equip_chain2.ogg"),
    new Audio("./public/audio/equip_chain3.ogg"),
    new Audio("./public/audio/equip_chain4.ogg"),
    new Audio("./public/audio/equip_chain5.ogg"),
    new Audio("./public/audio/equip_chain6.ogg"),
  ],
  // 获取奖励分数时的音效
  burp: new Audio("./public/audio/burp.ogg"),
  // 玩家的生命值增加时的音效
  pop: new Audio("./public/audio/pop.ogg"),
  // 玩家失去生命值时的音效
  hit: [
    new Audio("./public/audio/hit1.ogg"),
    new Audio("./public/audio/hit2.ogg"),
    new Audio("./public/audio/hit3.ogg"),
  ],
  // 开始界面列表点击的音效
  open_flip: [
    new Audio("./public/audio/open_flip1.ogg"),
    new Audio("./public/audio/open_flip2.ogg"),
    new Audio("./public/audio/open_flip3.ogg"),
  ],
};

export default audio;
