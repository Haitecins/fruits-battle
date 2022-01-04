import { fruits, audio } from "../data/index.js";
import { randArrItem, playRandSound } from "../libs/index.js";

// 上一个索引值
let beforeIndex = 0;
const fruitIcon = $("#fruit-icon");
const menuItems = $("#readme-menu>ul>li>span");
const menuContents = $("#readme>div:last-child>article");

// 随机获取一个水果的URL
const backgroundImage = () =>
  `url("/public/img/fruits/${randArrItem(fruits)[0].id}.svg"`;

// 显示随机的一种水果图标
const randomFruitIcon = (stopValue = false) =>
  fruitIcon.stop(stopValue).css({ backgroundImage });
const clickHandler = (index) => {
  if (beforeIndex === index) return;
  beforeIndex = index;

  playRandSound({ audio: audio.open_flip, volume: 60, promise: true });
  randomFruitIcon(true).animate({ top: 50 * index + 14 }, 200);
  menuContents
    .stop(true)
    .removeAttr("style class")
    .eq(index)
    .addClass("readme-article-active")
    .animate({ opacity: 1 }, 500);
};

randomFruitIcon();
menuItems.each(function (index) {
  $(this).click(clickHandler.bind(this, index));
});
