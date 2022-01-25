import $ from "jquery";
import Random from "@/libs/classes/Random";
import fruits from "@/configs/common/fruits";
import audio from "@/configs/common/audio";
import elements from "@/configs/common/elements";
import { FruitsObject } from "@/types/configs/common/fruits";

$(".random-fruit").each(function () {
  $(this).addClass(
    new Random(0, fruits.length - 1).getItem<FruitsObject>(fruits).id
  );
});
const { nodes } = elements;
// 获取索引值，没有则默认为0
let getLocalIndex = window.localStorage.getItem("app_index")
  ? parseFloat(window.localStorage.getItem("app_index") as string)
  : 0;
const { contents } = nodes.readme.icons;
// 显示随机的一种水果图标
const randomFruitIcon = (stopped: boolean): JQuery<HTMLElement> => {
  return nodes.readme.icons.element
    .stop(stopped)
    .removeAttr("class")
    .addClass(new Random().getItem<FruitsObject>(fruits).id);
};
const clickHandler = (index: number): void => {
  if (getLocalIndex === index) return;
  getLocalIndex = index;
  window.localStorage.setItem("app_index", index.toString());
  new Random().getItem(audio.open_flip).play();
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
nodes.readme.icons.items.each((index, item) => {
  $(item).on("click", clickHandler.bind(this, index));
});
