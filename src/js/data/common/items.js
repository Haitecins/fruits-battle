import { randomNumber, probability, showDetails } from "../../libs/index.js";
import { player, verify } from "../index.js";

const items = [
  {
    id: "clock",
    type: "items",

    // 有效概率
    valid: {
      min: 30,
      max: 45,
    },
    effect(obj) {
      const before = player.countdown,
        { type, id } = this;

      if (probability(85)) {
        player.countdown += randomNumber({
          min: 5.4,
          max: 11.2,
          fixed: 1,
        });
      } else {
        player.countdown -= randomNumber({
          min: 4.1,
          max: 9.6,
          fixed: 1,
        });
      }

      showDetails({
        type,
        id,
        pos: {
          x: obj.position().left,
          y: obj.position().top,
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
  },
  {
    id: "magnet",
    type: "items",
    valid: {
      min: 30,
      max: 45,
    },
    custom: {
      timer: null,
    },
    effect() {
      function attract(obj) {
        if (!(obj.prop("disX") && obj.prop("disY"))) {
          obj.prop({
            disX: obj.prop("xSpeed"),
            disY: obj.prop("ySpeed"),
          });
        }
        obj
          .prop({
            xSpeed: "+=0",
            ySpeed: "+=0",
          })
          .animate(
            {
              left:
                $("#fruit-basket").position().left +
                $("#fruit-basket").width() / 2 -
                obj.width() / 2,
              top:
                $("#fruit-basket").position().top +
                $("#fruit-basket").height() / 2 -
                obj.height() / 2,
            },
            400,
            "swing"
          );
      }

      const getChance = probability(75);

      $(".fruits").each(function () {
        if (getChance) {
          if (!$(this).hasClass("bad")) attract($(this));
        } else {
          attract($(this));
        }
      });

      // 防止短时间内多次拾取该道具引发的问题，每次拾取道具后，
      // 先清除原先的定时器，再开启一个新的定时器。
      clearTimeout(this.custom.timer);

      this.custom.timer = setTimeout(() => {
        $(".fruits").each(function () {
          if ($(this).prop("disX") && $(this).prop("disX")) {
            $(this).prop({
              xSpeed: $(this).prop("disX"),
              ySpeed: $(this).prop("disY"),
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
  },
  {
    id: "cake",
    type: "items",
    valid: {
      min: 30,
      max: 45,
    },
    custom: {
      timer: null,
      attrs: {
        width: $("#fruit-basket").width(),
        height: $("#fruit-basket").height(),
      },
    },
    effect() {
      const _this = this,
        width = this.custom.attrs.width,
        height = this.custom.attrs.height;

      function change(size) {
        const changeWidth = Math.floor(width * size),
          changeHeight = Math.floor(height * size);

        verify.PLAYER_EDIT_ARGUMENTS.custom.attrs.width = changeWidth;
        verify.PLAYER_EDIT_ARGUMENTS.custom.attrs.height = changeHeight;

        $("#fruit-basket").animate(
          {
            width: changeWidth,
            height: changeHeight,
          },
          250,
          function () {
            const $this = $(this);

            clearTimeout(_this.custom.timer);

            _this.custom.timer = setTimeout(() => {
              if (
                $this.position().top + height >
                $("#wrapper").height() - $("#status").height()
              ) {
                $this.css({ top: $this.position().top - height });
              }

              if ($this.position().left + width > $("#wrapper").width()) {
                $this.css({ left: $this.position().left - width });
              }

              $this.animate(
                {
                  width,
                  height,
                },
                250,
                () => {
                  verify.PLAYER_EDIT_ARGUMENTS.custom.attrs.width = width;
                  verify.PLAYER_EDIT_ARGUMENTS.custom.attrs.height = height;
                }
              );
            }, 10000);
          }
        );
      }

      if (probability(55)) {
        change(
          randomNumber({
            min: 1.5,
            max: 5.1,
            fixed: 2,
          })
        );
      } else {
        change(
          randomNumber({
            min: 0.1,
            max: 0.5,
            fixed: 2,
          })
        );
      }
    },
    speed: {
      min: 1.5,
      max: 2.5,
    },
  },
  {
    id: "book",
    type: "items",
    valid: {
      min: 30,
      max: 45,
    },
    effect() {
      const getChance = probability(65);

      $(".fruits").each(function () {
        if (getChance) {
          if ($(this).hasClass("bad")) {
            $(this).removeClass("bad");
          }
        } else {
          if (!$(this).hasClass("bad")) {
            $(this).addClass("bad");
          }
        }
      });
    },
    speed: {
      min: 1.15,
      max: 2.5,
    },
  },
  {
    id: "hourglass",
    type: "items",
    valid: {
      min: 30,
      max: 45,
    },
    effect(obj) {
      const before = player.countdown,
        { type, id } = this,
        minTime = 1.5;

      if (probability(21)) {
        player.countdown += minTime + player.countdown * 0.7;
      } else if (probability(34)) {
        player.countdown += minTime + player.countdown * 0.4;
      } else {
        player.countdown += minTime + player.countdown * 0.2;
      }

      showDetails({
        type,
        id,
        pos: {
          x: obj.position().left,
          y: obj.position().top,
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
  },
];

export default items;
