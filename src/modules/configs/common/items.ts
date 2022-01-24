import $ from "jquery";
import player from "@/configs/common/player";
import statistics from "@/configs/common/statistics";
import elements from "@/configs/common/elements";
import verify from "@/configs/common/verity";
import Random from "@/libs/classes/Random";
import setChance from "@/libs/functions/setChance";
import showDetails from "@/libs/functions/showDetails";
import ItemProps from "@/types/configs/common/items";

const { nodes, entities } = elements;
const items: ItemProps = [
  {
    id: "clock",
    type: "items",
    priority: 0,
    // 有效概率
    valid: {
      min: 21,
      max: 66,
    },
    effect(element) {
      const before = player.countdown;

      if (setChance(85)) {
        player.countdown += new Random(5.4, 11.2, 1).getNumber();
      } else {
        player.countdown -= new Random(4.1, 9.6, 1).getNumber();
      }

      showDetails({
        id: this.id,
        pos: {
          x: (element as JQuery<HTMLElement>).position().left,
          y: (element as JQuery<HTMLElement>).position().top,
        },
        before,
        after: player.countdown,
        fixed: 1,
      });
    },
    speed: {
      min: 1.25,
      max: 1.85,
    },
    description:
      "增加小量游戏时间。有85%的概率增加5.4-11.2秒游戏时间；有15%的概率减少4.1-9.6秒游戏时间。",
  },
  {
    id: "magnet",
    type: "items",
    priority: 0,
    valid: {
      min: 11,
      max: 49,
    },
    custom: {
      timer: null,
    },
    effect() {
      type CustomProps = { timer: NodeJS.Timeout };
      const attract = (element: JQuery<HTMLElement>) => {
        if (!(element.prop("disX") && element.prop("disY"))) {
          element.prop({
            disX: element.prop("xSpeed") as string,
            disY: element.prop("ySpeed") as string,
          });
        }
        element
          .prop({
            xSpeed: "+=0",
            ySpeed: "+=0",
          })
          .animate(
            {
              left:
                nodes.player.position().left +
                (nodes.player.width() as number) / 2 -
                (element.width() as number) / 2,
              top:
                nodes.player.position().top +
                (nodes.player.height() as number) / 2 -
                (element.height() as number) / 2,
            },
            400,
            "swing"
          );
      };
      const getChance = setChance(75);
      entities.fruits().each(function () {
        if (getChance) {
          if (!$(this).hasClass("bad")) attract($(this));
        } else {
          attract($(this));
        }
      });
      // 防止短时间内多次拾取该道具引发的问题，每次拾取道具后，
      // 先清除原先的定时器，再开启一个新的定时器。
      clearTimeout((this.custom as CustomProps).timer);
      (this.custom as CustomProps).timer = setTimeout(() => {
        entities.fruits().each(function () {
          if ($(this).prop("disX") && $(this).prop("disX")) {
            $(this).prop({
              xSpeed: $(this).prop("disX") as string,
              ySpeed: $(this).prop("disY") as string,
            });
          }
        });
        // 900毫秒的由来：500毫秒的等待时间 + 400毫秒实体从自身位置移动到玩家位置所需的时间
      }, 900);
    },
    speed: {
      min: 1.5,
      max: 2.28,
    },
    description:
      "吸引所有新鲜水果至玩家的位置，有25%的概率额外吸引腐烂水果。如果吸引的水果正在移动中，玩家的位置发生变化，则将移动到上次移动的地点。水果在吸引后将停留0.5秒。",
  },
  {
    id: "cake",
    type: "items",
    priority: 0,
    valid: {
      min: 7,
      max: 81,
    },
    custom: {
      timer: null,
      attrs: {
        width: nodes.player.width(),
        height: nodes.player.height(),
      },
    },
    effect() {
      type CustomProps = {
        timer: NodeJS.Timeout;
        attrs: { width: number; height: number };
      };
      type VerifyCustomProps = { attrs: { width: number; height: number } };

      const thisRoot = this;
      const { width } = (this.custom as CustomProps).attrs;
      const { height } = (this.custom as CustomProps).attrs;
      const change = (size: number): void => {
        const changeWidth = Math.floor(width * size);
        const changeHeight = Math.floor(height * size);
        (verify.PLAYER_EDIT_ARGUMENTS.custom as VerifyCustomProps).attrs.width =
          changeWidth;
        (
          verify.PLAYER_EDIT_ARGUMENTS.custom as VerifyCustomProps
        ).attrs.height = changeHeight;
        statistics.CAKE_ITEM_INFLUENCE_VALUE =
          1 + ((changeWidth - width) / width) * 1;
        nodes.player.animate(
          {
            width: changeWidth,
            height: changeHeight,
          },
          250,
          function () {
            const thisPlayer = $(this);

            clearTimeout((thisRoot.custom as CustomProps).timer);

            (thisRoot.custom as CustomProps).timer = setTimeout(() => {
              // 重置最终分数
              statistics.CAKE_ITEM_INFLUENCE_VALUE = 1;
              if (
                thisPlayer.position().top + height >
                (nodes.app.height() as number) -
                  (nodes.statusbar.element.height() as number)
              ) {
                thisPlayer.css({ top: thisPlayer.position().top - height });
              }

              if (
                thisPlayer.position().left + width >
                (nodes.app.width() as number)
              ) {
                thisPlayer.css({ left: thisPlayer.position().left - width });
              }

              thisPlayer.animate(
                {
                  width,
                  height,
                },
                250,
                () => {
                  (
                    verify.PLAYER_EDIT_ARGUMENTS.custom as VerifyCustomProps
                  ).attrs.width = width;
                  (
                    verify.PLAYER_EDIT_ARGUMENTS.custom as VerifyCustomProps
                  ).attrs.height = height;
                }
              );
            }, 10000);
          }
        );
      };

      if (setChance(55)) {
        change(new Random(1.5, 5.1, 2).getNumber());
      } else {
        change(new Random(0.1, 0.5, 2).getNumber());
      }
    },
    speed: {
      min: 1.5,
      max: 2.5,
    },
    description:
      "随地大小变(bushi。有55%的概率将玩家变大，有45%的概率变小。该效果持续10秒。重复拾取将覆盖上一次的效果。根据变化的大小，会影响拾取新鲜水果的最终分数，玩家越大分数越高，反之分数越低。",
  },
  {
    id: "book",
    type: "items",
    priority: 0,
    valid: {
      min: 41,
      max: 70,
    },
    effect() {
      if (setChance(65)) {
        // 将腐烂水果变为健康水果
        entities.fruits().each(function () {
          if ($(this).hasClass("bad")) {
            $(this).removeClass("bad");
          }
        });
      } else {
        // 将健康水果变为腐烂水果
        entities.fruits().each(function () {
          if (!$(this).hasClass("bad")) {
            $(this).addClass("bad");
          }
        });
      }
    },
    speed: {
      min: 1.15,
      max: 2.5,
    },
    description:
      "将游戏区域内的水果反转。有65%的概率将所有腐烂水果转换为新鲜水果，有35%的概率相反。",
  },
  {
    id: "hourglass",
    type: "items",
    priority: 0,
    valid: {
      min: 13,
      max: 44,
    },
    effect(element) {
      const before = player.countdown;
      const minTime = 1.5;

      if (setChance(5)) {
        player.countdown += minTime + player.countdown * 0.5;
      } else if (setChance(10)) {
        player.countdown += minTime + player.countdown * 0.3;
      } else {
        player.countdown += minTime + player.countdown * 0.1;
      }

      showDetails({
        id: this.id,
        pos: {
          x: (element as JQuery<HTMLElement>).position().left,
          y: (element as JQuery<HTMLElement>).position().top,
        },
        before,
        after: player.countdown,
        fixed: 1,
      });
    },
    speed: {
      min: 1.21,
      max: 2.6,
    },
    description:
      "增加大量游戏时间。有5%的概率获得当前50%的游戏时间。有10%的概率获得当前30%的游戏时间。有85%的概率获得当前10%的游戏时间。",
  },
];

// 对道具根据最低概率进行升序排序
items
  .sort((item1, item2) => item1.valid.min - item2.valid.min)
  .forEach((item, index) => {
    item.priority = 100 + index;
  });

export default items;
