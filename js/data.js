import { Rand, Probability, ShowDetails } from "./methods.js";

export { uid, DATA };

// get user id, Will be uploaded to the database before and after the game starts.
const uid = md5(new Date().getTime());

const DATA = {
  // 玩家基础信息
  player: {
    // 剩余生命值，最大上限为10。
    health: 5,

    // 魔力值，初始为100，最大上限为100。
    mana: 100,

    // 玩家未进行移动行为的计时
    stays: 0,

    // 游戏倒计时。
    countdown: 0,
  },

  // 玩家统计信息
  statistics: {
    // 游戏分数
    SCORES: 0,

    // 游戏持续时间
    PLAYTIME: 0,

    // 技能使用次数
    USE_SKILLS: 0,

    // 总计拾取水果的个数
    TOTAL_FRUITS: 0,

    // 总计拾取腐烂水果的个数
    TOTAL_BAD_FRUITS: 0,

    // 水果奖励分数
    REWARD_SCORES_ARRAY: [],

    // 拾取健康水果计数
    HEALTHY_FRUIT_COUNTS: 0,

    // 拾取腐烂水果计数
    BAD_FRUIT_COUNTS: 0,

    // 总计达成的成就个数
    TOTAL_ACHIEVEMENTS: 0,

    // 总计获得的奖章个数
    TOTAL_MEDALS: 0,

    // 开始游戏后从未发生过移动
    NEVER_MOVED: true,

    // 难度等级，随着游戏的进行会提高难度。
    DIFFICULTY_LEVELS: 1,

    // 实体生成速度 (default: 100%)
    ENTITY_SPAWN_SPEED: 100,

    // 道具生成概率 (default: 10%)
    ITEMS_SPAWN_CHANCE: 10,

    // 健康水果水果概率 (default: 45%)
    HEALTHY_FRUITS_SPAWN_CHANCE: 45,

    // 腐烂水果生成概率 (default: 15%)
    BAD_FRUITS_CHANCE: 15,
  },

  // 游戏定时器，处理游戏的各种行为事件。
  timer: {
    // 主定时器，负责游戏的核心功能。
    main: null,

    // 难度定时器，负责处理游戏难度。
    difficulty: null,
  },

  // 基础数值
  base: {
    // 得分
    scores: 1,

    // 基础得分倍率
    multiple: 0.25,

    // 实体移动速度
    speed: 1,
  },

  // 游戏音频
  audio: {
    // 开始按钮点击音效
    click: new Audio("audio/click.ogg"),

    // 游戏结束后的音效
    end: new Audio("audio/end.ogg"),

    // 拾取水果的音效
    eat: [
      new Audio("audio/eat1.ogg"),
      new Audio("audio/eat2.ogg"),
      new Audio("audio/eat3.ogg"),
    ],

    // 难度提高时的音效
    orb: new Audio("audio/orb.ogg"),

    // 拾取有效道具时的音效
    equip_chain: [
      new Audio("audio/equip_chain1.ogg"),
      new Audio("audio/equip_chain2.ogg"),
      new Audio("audio/equip_chain3.ogg"),
      new Audio("audio/equip_chain4.ogg"),
      new Audio("audio/equip_chain5.ogg"),
      new Audio("audio/equip_chain6.ogg"),
    ],

    // 获取奖励分数时的音效
    burp: new Audio("audio/burp.ogg"),

    // 玩家的生命值增加时的音效
    pop: new Audio("audio/pop.ogg"),

    // 玩家失去生命值时的音效
    hit: [
      new Audio("audio/hit1.ogg"),
      new Audio("audio/hit2.ogg"),
      new Audio("audio/hit3.ogg"),
    ],

    // 开始界面列表点击的音效
    open_flip: [
      new Audio("audio/open_flip1.ogg"),
      new Audio("audio/open_flip2.ogg"),
      new Audio("audio/open_flip3.ogg"),
    ],
  },

  // 所有水果
  fruits: [
    {
      id: "apple",
      type: "fruits",
      scores: 0.08,
      speed: {
        min: 1.1,
        max: 2.2,
      },
    },
    {
      id: "banana",
      type: "fruits",
      scores: 0.08,
      speed: {
        min: 1.2,
        max: 2.4,
      },
    },
    {
      id: "orange",
      type: "fruits",
      scores: 0.11,
      speed: {
        min: 1.3,
        max: 2.6,
      },
    },
    {
      id: "lemon",
      type: "fruits",
      scores: 0.11,
      speed: {
        min: 1.4,
        max: 2.8,
      },
    },
    {
      id: "watermelon",
      type: "fruits",
      scores: 0.13,
      speed: {
        min: 1.5,
        max: 3.0,
      },
    },
    {
      id: "mango",
      type: "fruits",
      scores: 0.17,
      speed: {
        min: 1.6,
        max: 3.2,
      },
    },
    {
      id: "peach",
      type: "fruits",
      scores: 0.17,
      speed: {
        min: 1.7,
        max: 3.4,
      },
    },
    {
      id: "cherry",
      type: "fruits",
      scores: 0.23,
      speed: {
        min: 1.8,
        max: 3.6,
      },
    },
  ],

  // 所有道具
  items: [
    {
      id: "clock",
      type: "items",

      // 有效概率
      valid: {
        min: 30,
        max: 45,
      },
      effect(obj) {
        const before = DATA.player.countdown,
          { type, id } = this;

        if (Probability(85)) {
          DATA.player.countdown += Rand({
            min: 5.4,
            max: 11.2,
            fixed: 1,
          });
        } else {
          DATA.player.countdown -= Rand({
            min: 4.1,
            max: 9.6,
            fixed: 1,
          });
        }

        ShowDetails({
          type,
          id,
          pos: {
            x: obj.position().left,
            y: obj.position().top,
          },
          before,
          after: DATA.player.countdown,
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
          if (!obj.prop("disX") && !obj.prop("disY")) {
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

        const getChance = Probability(75);

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

          DATA.verify.PLAYER_EDIT_ARGUMENTS.custom.attrs.width = changeWidth;
          DATA.verify.PLAYER_EDIT_ARGUMENTS.custom.attrs.height = changeHeight;

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
                  $this.css({ top: $this.position().top - height - 10 });
                }

                if ($this.position().left + width > $("#wrapper").width()) {
                  $this.css({ left: $this.position().left - width - 10 });
                }

                $this.animate(
                  {
                    width,
                    height,
                  },
                  250,
                  () => {
                    DATA.verify.PLAYER_EDIT_ARGUMENTS.custom.attrs.width =
                      width;
                    DATA.verify.PLAYER_EDIT_ARGUMENTS.custom.attrs.height =
                      height;
                  }
                );
              }, 10000);
            }
          );
        }

        if (Probability(55)) {
          change(
            Rand({
              min: 1.5,
              max: 5.1,
              fixed: 2,
            })
          );
        } else {
          change(
            Rand({
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
        const getChance = Probability(65);

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
        const before = DATA.player.countdown,
          { type, id } = this,
          minTime = 1.5;

        if (Probability(21)) {
          DATA.player.countdown += minTime + DATA.player.countdown * 0.7;
        } else if (Probability(34)) {
          DATA.player.countdown += minTime + DATA.player.countdown * 0.4;
        } else {
          DATA.player.countdown += minTime + DATA.player.countdown * 0.2;
        }

        ShowDetails({
          type,
          id,
          pos: {
            x: obj.position().left,
            y: obj.position().top,
          },
          before,
          after: DATA.player.countdown,
          fixed: 1,
        });
      },
      speed: {
        min: 1.21,
        max: 2.6,
      },
    },
  ],

  // Anti-cheat verification
  verify: {
    // Prevent elements from disappearing (delete elements).
    DELETE_PLAYER_ELEMENT: {
      enabled: true,
      check() {
        return $("#fruit-basket")[0] == null;
      },
      actions() {
        $(location).attr("href", "about:blank");
      },
    },

    // Players modify CSS property parameters.
    PLAYER_EDIT_ARGUMENTS: {
      enabled: true,
      custom: {
        attrs: {
          width: $("#fruit-basket").width(),
          height: $("#fruit-basket").height(),
        },
      },
      check() {
        return (
          parseFloat($("#fruit-basket").width()) !==
            parseFloat(this.custom.attrs.width) ||
          parseFloat($("#fruit-basket").height()) !==
            parseFloat(this.custom.attrs.height)
        );
      },
      actions() {
        $("#fruit-basket").css({
          width: this.custom.attrs.width,
          height: this.custom.attrs.height,
        });
      },
    },

    // Prevent leaving the game area.
    LEAVING_THE_GAME_AREA: {
      enabled: true,
      check() {
        return (
          $("#fruit-basket").position().left < 0 ||
          $("#fruit-basket").position().left >
            $("#wrapper").width() - $("#fruit-basket").width() ||
          $("#fruit-basket").position().top < 0 ||
          $("#fruit-basket").position().top >
            $("#wrapper").height() -
              $("#status").height() -
              $("#fruit-basket").height()
        );
      },
      actions() {
        if ($("#fruit-basket").position().left < 0) {
          $("#fruit-basket").css({ left: 0 });
        }
        if (
          $("#fruit-basket").position().left >
          $("#wrapper").width() - $("#fruit-basket").width()
        ) {
          $("#fruit-basket").css({
            left: $("#wrapper").width() - $("#fruit-basket").width(),
          });
        }
        if ($("#fruit-basket").position().top < 0) {
          $("#fruit-basket").css({ top: 0 });
        }
        if (
          $("#fruit-basket").position().top >
          $("#wrapper").height() -
            $("#status").height() -
            $("#fruit-basket").height()
        ) {
          $("#fruit-basket").css({
            top:
              $("#wrapper").height() -
              $("#status").height() -
              $("#fruit-basket").height(),
          });
        }
      },
    },
  },
};
