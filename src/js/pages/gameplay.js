import { randArrItem, playRandSound } from "../libs/index.js";
import { fruits, audio } from "../data/index.js";

let beforeIndex = 0;

// 显示随机的一种水果图标
$("#gameplay > aside > i")
  .stop()
  .css({
    backgroundImage: `url("/public/img/fruits/${
      randArrItem(fruits)[0].id
    }.svg"`,
  });

$("#gameplay > aside > span").each(function (index) {
  $(this).click(() => {
    if (beforeIndex === index) return;
    beforeIndex = index;
    // 随机播放一种声音
    playRandSound({
      audio: audio.open_flip,
      volume: 60,
      promise: true,
    });

    $("#gameplay > aside > i")
      .stop(true)
      .css({
        backgroundImage: `url("/public/img/fruits/${
          randArrItem(fruits)[0].id
        }.svg")`,
      })
      .animate({ top: 70 * index + 14 }, 200);

    $("#gameplay > div > article")
      .stop(true)
      .removeAttr("style class")
      .eq(index)
      .addClass("art-active")
      .animate({ opacity: 1 }, 500);
  });
});
