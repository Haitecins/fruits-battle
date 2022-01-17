import $ from "jquery";
import fruits from "@/data/common/fruits";
import audio from "@/data/common/audio";
import elements from "@/data/common/elements";
import randArrItem from "@/libs/functions/randArrItem";
import playRandSound from "@/libs/functions/playRandSound";

const { nodes } = elements;
// 获取索引值，没有则默认为0
let getLocalIndex = window.localStorage.getItem("app_index")
  ? parseFloat(window.localStorage.getItem("app_index") as string)
  : 0;
const contents = nodes.readme.icons.contents;
// 显示随机的一种水果图标
const randomFruitIcon = (stopped: boolean): JQuery<HTMLElement> => {
  return nodes.readme.icons.element
    .stop(stopped)
    .removeAttr("class")
    .addClass(randArrItem(fruits)[0].id);
};
const clickHandler = (index: number): void => {
  if (getLocalIndex === index) return;
  getLocalIndex = index;
  window.localStorage.setItem("app_index", index.toString());

  playRandSound({ audio: audio.open_flip, volume: 60, promise: true });
  randomFruitIcon(true).animate({ top: 50 * index + 14 }, 200);
  contents
    .stop(true)
    .removeAttr("style class")
    .eq(index)
    .addClass("readme-article-active")
    .animate({ opacity: 1 }, 500);
};
// 页面刷新后更改到对应的界面
contents
  .eq(getLocalIndex)
  .addClass("readme-article-active")
  .addClass("readme-default-article");
// 调整水果图标的位置
randomFruitIcon(false).css({ top: 50 * getLocalIndex + 14 });
// 点击事件
nodes.readme.icons.items.each(function (index) {
  $(this).on("click", clickHandler.bind(this, index));
});
