import { RandArrItems, PlayRandSound } from "./methods.js";
import { DATA } from "./data.js";

// 显示随机的一种水果图标
$("#gameplay > aside > i")
  .stop()
  .css({
    backgroundImage:
      'url("../public/img/fruits/' + RandArrItems(DATA.fruits)[0].id + '.svg")',
  });

$("#gameplay > aside > span").each(function (index) {
  $(this).click(() => {
    // 随机播放一种声音
    PlayRandSound({
      audio: DATA.audio.open_flip,
      volume: 60,
      promise: true,
    });

    $("#gameplay > aside > i")
      .stop(true)
      .css({
        backgroundImage:
          'url("../public/img/fruits/' + RandArrItems(DATA.fruits)[0].id + '.svg")',
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
