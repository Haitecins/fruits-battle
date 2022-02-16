import jQuery from "jquery";
import player from "@/configs/common/player";
import statistics from "@/configs/common/statistics";
import elements from "@/configs/common/elements";
import cheatList from "@/configs/common/cheatList";
import Random from "@/libs/classes/Random";
import setChance from "@/libs/functions/setChance";
import detailBlocks from "@/libs/functions/detailBlocks";
import ItemProps from "@/types/configs/common/items";

const { nodes, entities } = elements;
const items: ItemProps = [
  {
    id: "clock",
    type: "items",
    priority: 0,
    speed: {
      min: 1.25,
      max: 3.5,
    },
    // 有效概率
    valid: {
      min: 25,
      max: 42,
    },
    custom: {
      chance: 85,
      playtime: {
        added: [5.4, 11.2],
        removed: [4.1, 9.6],
      },
    },
    description() {
      const { chance, playtime } = this.custom as {
        chance: number;
        playtime: { added: number[]; removed: number[] };
      };
      return `THE WORLD<br/>有${chance}%的概率增加${playtime.added[0]}-${
        playtime.added[1]
      }秒游戏时间；<br/>${100 - chance}%的概率减少${playtime.removed[0]}-${
        playtime.removed[1]
      }秒游戏时间。`;
    },
    effect(element) {
      const { chance, playtime } = this.custom as {
        chance: number;
        playtime: { added: number[]; removed: number[] };
      };
      const before = player.countdown;

      if (setChance(chance)) {
        player.countdown += new Random(
          playtime.added[0],
          playtime.added[1],
          1
        ).getNumber();
      } else {
        player.countdown -= new Random(
          playtime.removed[0],
          playtime.removed[1],
          1
        ).getNumber();
      }

      detailBlocks({
        id: this.id,
        location: {
          x: (element as JQuery<HTMLElement>).position().left,
          y: (element as JQuery<HTMLElement>).position().top,
        },
        value: {
          before,
          after: player.countdown,
        },
        fixed: 1,
      });
    },
  },
  {
    id: "magnet",
    type: "items",
    priority: 0,
    speed: {
      min: 1.5,
      max: 2.25,
    },
    valid: {
      min: 30,
      max: 60,
    },
    custom: {
      timer: null,
      chance: 75,
      delays: 500,
    },
    description() {
      const { chance, delays } = this.custom as {
        chance: number;
        delays: number;
      };
      return `吸引所有新鲜水果至玩家的位置，有${
        100 - chance
      }%的概率额外吸引腐烂水果。如果吸引的水果正在移动中，玩家的位置发生变化，则将移动到上次移动的地点。水果在吸引后将停留${
        delays / 1000
      }秒。`;
    },
    effect() {
      type CustomProps = { timer: NodeJS.Timeout };
      const getPlayer = nodes.player;
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
                getPlayer.position().left +
                (getPlayer.width() as number) / 2 -
                (element.width() as number) / 2,
              top:
                getPlayer.position().top +
                (getPlayer.height() as number) / 2 -
                (element.height() as number) / 2,
            },
            400,
            "swing"
          );
      };
      const { chance, delays } = this.custom as {
        chance: number;
        delays: number;
      };
      const getGlobalChance = setChance(chance);
      entities.fruits().each(function () {
        if (getGlobalChance) {
          if (!jQuery(this).hasClass("bad")) attract(jQuery(this));
        } else {
          attract(jQuery(this));
        }
      });
      // 防止短时间内多次拾取该道具引发的问题，每次拾取道具后，
      // 先清除原先的定时器，再开启一个新的定时器。
      clearTimeout((this.custom as CustomProps).timer);
      (this.custom as CustomProps).timer = setTimeout(() => {
        entities.fruits().each(function () {
          if (jQuery(this).prop("disX") && jQuery(this).prop("disX")) {
            jQuery(this).prop({
              xSpeed: jQuery(this).prop("disX") as string,
              ySpeed: jQuery(this).prop("disY") as string,
            });
          }
        });
        // 900毫秒的由来：500毫秒的等待时间 + 400毫秒实体从自身位置移动到玩家位置所需的时间
      }, delays + 400);
    },
  },
  {
    id: "cake",
    type: "items",
    priority: 0,
    speed: {
      min: 1.5,
      max: 3.25,
    },
    valid: {
      min: 20,
      max: 55,
    },
    custom: {
      timer: null,
      attrs: {
        width: nodes.player.width(),
        height: nodes.player.height(),
      },
      chance: 55,
      duration: 10000,
    },
    description() {
      const { chance, duration } = this.custom as {
        chance: number;
        duration: number;
      };
      return `随地大小变(bushi<br/>有${chance}%的概率将玩家变大，${
        100 - chance
      }%的概率变小。<br/>该效果持续${
        duration / 1000
      }秒。<br/>重复拾取将覆盖上一次的效果。根据变化的大小，会影响拾取新鲜水果的最终分数，体型越大分数越高，反之分数越低。`;
    },
    effect() {
      type CustomProps = {
        timer: NodeJS.Timeout;
        attrs: { width: number; height: number };
        chance: number;
        duration: number;
      };

      const {
        attrs: { width, height },
        chance,
        duration,
      } = this.custom as CustomProps;
      const change = (size: number): void => {
        const widthChanged = Math.floor(width * size);
        const heightChanged = Math.floor(height * size);
        (cheatList.PLAYER_EDIT_ARGUMENTS.custom as CustomProps).attrs.width =
          widthChanged;
        (cheatList.PLAYER_EDIT_ARGUMENTS.custom as CustomProps).attrs.height =
          heightChanged;
        statistics.CAKE_ITEM_INFLUENCE_VALUE =
          1 + ((widthChanged - width) / width) * 1;
        nodes.player.animate(
          {
            width: widthChanged,
            height: heightChanged,
          },
          250,
          () => {
            clearTimeout((this.custom as CustomProps).timer);
            (this.custom as CustomProps).timer = setTimeout(() => {
              // 重置最终分数
              statistics.CAKE_ITEM_INFLUENCE_VALUE = 1;
              if (
                nodes.player.position().top + height >
                (nodes.app.height() as number) -
                  (nodes.statusbar.element.height() as number)
              ) {
                nodes.player.css({ top: nodes.player.position().top - height });
              }
              if (
                nodes.player.position().left + width >
                (nodes.app.width() as number)
              ) {
                nodes.player.css({
                  left: nodes.player.position().left - width,
                });
              }
              nodes.player.animate(
                {
                  width,
                  height,
                },
                250,
                () => {
                  (
                    cheatList.PLAYER_EDIT_ARGUMENTS.custom as CustomProps
                  ).attrs.width = width;
                  (
                    cheatList.PLAYER_EDIT_ARGUMENTS.custom as CustomProps
                  ).attrs.height = height;
                }
              );
            }, duration);
          }
        );
      };

      if (setChance(chance)) {
        change(new Random(1.5, 5.1, 2).getNumber());
      } else {
        change(new Random(0.1, 0.5, 2).getNumber());
      }
    },
  },
  {
    id: "book",
    type: "items",
    priority: 0,
    speed: {
      min: 1.15,
      max: 2.25,
    },
    valid: {
      min: 40,
      max: 70,
    },
    custom: {
      chance: 65,
    },
    description() {
      const { chance } = this.custom as {
        chance: number;
      };
      return `《白夜国馆藏》<br/>有${chance}%的概率将所有腐烂水果转换为新鲜水果，${
        100 - chance
      }%的概率相反。`;
    },
    effect() {
      const { chance } = this.custom as {
        chance: number;
      };
      if (setChance(chance)) {
        // 将腐烂水果变为健康水果
        entities.fruits().each(function () {
          if (jQuery(this).hasClass("bad")) {
            jQuery(this).removeClass("bad");
          }
        });
      } else {
        // 将健康水果变为腐烂水果
        entities.fruits().each(function () {
          if (!jQuery(this).hasClass("bad")) {
            jQuery(this).addClass("bad");
          }
        });
      }
    },
  },
  {
    id: "hourglass",
    type: "items",
    priority: 0,
    speed: {
      min: 1.75,
      max: 3.25,
    },
    valid: {
      min: 15,
      max: 40,
    },
    custom: {
      high: [5, 0.5],
      medium: [10, 0.3],
      low: [85, 0.1],
    },
    description() {
      const { high, medium, low } = this.custom as {
        high: number[];
        medium: number[];
        low: number[];
      };
      return `神舆之辔<br/>${high[0]}%的概率获得当前${
        high[1] * 100
      }%的游戏时间；<br/>${medium[0]}%的概率获得当前${
        medium[1] * 100
      }%的游戏时间；<br/>${low[0]}%的概率获得当前${low[1] * 100}%的游戏时间。`;
    },
    effect(element) {
      const { high, medium, low } = this.custom as {
        high: number[];
        medium: number[];
        low: number[];
      };
      const before = player.countdown;
      const minTime = 1.5;

      if (setChance(high[0])) {
        player.countdown += minTime + player.countdown * high[1];
      } else if (setChance(medium[0])) {
        player.countdown += minTime + player.countdown * medium[1];
      } else {
        player.countdown += minTime + player.countdown * low[1];
      }

      detailBlocks({
        id: this.id,
        location: {
          x: (element as JQuery<HTMLElement>).position().left,
          y: (element as JQuery<HTMLElement>).position().top,
        },
        value: {
          before,
          after: player.countdown,
        },
        fixed: 1,
      });
    },
  },
];

// 对道具根据最低概率进行升序排序
items
  .sort((item1, item2) => item1.valid.min - item2.valid.min)
  .forEach((item, index) => {
    item.priority = 100 + index;
  });

export default items;
