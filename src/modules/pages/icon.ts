import $ from "jquery";
import { fruits, audio } from "../data/index";
import { randArrItem, playRandSound } from "../libs/index";

// 获取索引值，没有则默认为0
let getLocalIndex = window.localStorage.getItem("app_index")
  ? parseFloat(window.localStorage.getItem("app_index") as string)
  : 0;
const menuItems = $("#readme-menu>ul>li>span");
const menuContents = $("#readme>div:last-child>article");
// 显示随机的一种水果图标
const randomFruitIcon = (stopValue: boolean) => {
  return $("#fruit-icon")
    .stop(stopValue)
    .removeAttr("class")
    .addClass(randArrItem(fruits)[0].id);
};
const clickHandler = (index: number) => {
  if (getLocalIndex === index) return;
  getLocalIndex = index;
  window.localStorage.setItem("app_index", index.toString());

  playRandSound({ audio: audio.open_flip, volume: 60, promise: true });
  randomFruitIcon(true).animate({ top: 50 * index + 14 }, 200);
  menuContents
    .stop(true)
    .removeAttr("style class")
    .eq(index)
    .addClass("readme-article-active")
    .animate({ opacity: 1 }, 500);
};
// 页面刷新后更改到对应的界面
menuContents
  .eq(getLocalIndex)
  .addClass("readme-article-active readme-default-article");
// 调整水果图标的位置
randomFruitIcon(false).css({ top: 50 * getLocalIndex + 14 });
// 点击事件
menuItems.each(function (index) {
  $(this).on("click", clickHandler.bind(this, index));
});
