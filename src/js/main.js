import * as libs from "./libs.js";
import { uid, DATA } from "./data.js";
import "./page.js";

("use strict");

// Add logo at the bottom of the page.
$("head").append(`
    <style data-type="jquery-build">
        #jquery {
            background: rgba(255, 255, 255, 0.5);
            color: #1b1b1b;
            font-size: 14px;
            line-height: 20px;
            text-align: center;
            padding: 4px 10px;
            position: fixed;
            right: 4px;
            bottom: 4px;
        }
        #jquery a {
            color: #0769ad;
        }
    </style>
`);
$("#wrapper").after(`
    <div id="jquery" data-type="jquery-build">
        <p>${uid}</p>
        <p>Copyright ${new Date().getFullYear()}, Powered by
            <a href="https://jquery.com" target="_blank" title="jquery.com">jQuery</a>
            <a href="https://api.jquery.com/" target="_blank" title="api.jquery.com">API</a>.
        </p>
    </div>
`);

// Output account information to the console.
console.warn(
  "\nAccount ID:\n%c" +
    uid +
    "\n\n%c(Not unique, the user ID will be updated every time the page is refreshed.)\n\n" +
    "%c" +
    new Date() +
    "\n",
  "color: orangered",
  "color: gray",
  "color: fuchsia"
);

$("#sg-btn").one("click", () => {
  // Get the cache id and upload it to the server.
  libs.UploadDatabase("/src/php/cache.php", { uid });

  // 暂时关闭游戏区域验证，等待其他项目验证完毕后再次打开。
  DATA.verify.LEAVING_THE_GAME_AREA.enabled = false;

  // 反作弊验证
  libs.AntiCheatVerification();

  // 打开游戏区域验证
  DATA.verify.LEAVING_THE_GAME_AREA.enabled = true;

  // 重置玩家的默认位置
  $("#fruit-basket").css({
    left: $("#wrapper").width() / 2 - $("#fruit-basket").width() / 2,
    top: $("#wrapper").height,
  });

  libs.PlaySound({
    src: DATA.audio.click,
  });

  $("#readme").fadeOut(300, () => {
    $("#status").animate({ height: 42 }, 300, "swing");
    $("#fruit-basket").animate(
      {
        top: $("#wrapper").height() / 2 - $("#fruit-basket").width() / 2,
      },
      600,
      "swing",
      function () {
        $(this).mousedown((e) => {
          // 获取鼠标的坐标与该对象的坐标之间的距离
          const x = e.clientX - $(this).position().left,
            y = e.clientY - $(this).position().top;

          $(document).on({
            mousemove(e) {
              if (DATA.player.countdown > 0 && DATA.player.health > 0) {
                // 获取鼠标的坐标减去对象之间坐标的位置
                let lx = e.clientX - x,
                  ly = e.clientY - y;

                // 阻止超出游戏区域
                if (lx < 0) lx = 0;
                if (ly < 0) ly = 0;
                if (lx > $("#wrapper").width() - $("#fruit-basket").width()) {
                  lx = $("#wrapper").width() - $("#fruit-basket").width();
                }
                if (
                  ly >
                  $("#wrapper").height() -
                    $("#fruit-basket").height() -
                    $("#status").height()
                ) {
                  ly =
                    $("#wrapper").height() -
                    $("#fruit-basket").height() -
                    $("#status").height();
                }

                DATA.player.stays = 0;
                DATA.statistics.NEVER_MOVED = false;

                $("#fruit-basket").css({
                  left: lx,
                  top: ly,
                });
              }
            },
            mouseup() {
              $(this).off("mousemove");
            },
          });
        });

        const builder = {
          // 准备构建的所有实体
          list: [DATA.fruits, DATA.items],

          // 将实体的指定属性以json的方式添加进列表
          push() {
            for (let arrItem of this.list) {
              for (let item of arrItem) {
                this.arr.push(item);
              }
            }
          },

          // 已经准备构建的实体
          arr: [],

          // 实体生成冷却时间
          cd: 0,

          // 腐烂水果生成计数
          badCounts: 0,
        };
        builder.push();

        // 主定时器
        DATA.timer.main = setInterval(() => {
          // 反作弊验证
          libs.AntiCheatVerification();

          // 满足结束游戏的条件
          if (DATA.player.countdown < 0 || DATA.player.health <= 0)
            libs.GameOver();

          // 玩家未进行移动行为的惩罚
          DATA.player.stays++;
          if (DATA.player.stays >= 500) {
            // 减少生命值
            DATA.player.health--;

            // 当前分数大于0时
            if (DATA.statistics.SCORES > 0) {
              // 扣除当前游戏得分的 10%
              DATA.statistics.SCORES =
                DATA.statistics.SCORES - DATA.statistics.SCORES * 0.1;
              libs.PlayRandSound({
                audio: DATA.audio.hit,
                promise: true,
              });
            }
            DATA.player.stays = 0;
          }

          $("#health > i").text(() => {
            if (DATA.player.health > 10) DATA.player.health = 10;
            return DATA.player.health;
          });
          $("#mana > i").text(() => {
            if (DATA.player.mana > 100) {
              DATA.player.mana = 100;
            } else {
              // 魔力值自动恢复
              DATA.player.mana += 0.01;
            }
            return libs.CalcRepair({
              formula: DATA.player.mana,
              fixed: 0,
            });
          });
          $("#current-scores > i").text(
            libs.CalcRepair({
              formula: DATA.statistics.SCORES,
            })
          );
          $("#countdown > i").text(() => {
            DATA.statistics.PLAYTIME += 0.01;
            return libs.TimeFormat(Math.ceil((DATA.player.countdown -= 0.01)));
          });

          // 操纵所有水果、道具的移动
          $(".fruits, .items").each(function () {
            $(this).animate(
              {
                left: $(this).prop("xSpeed"),
                top: $(this).prop("ySpeed"),
              },
              0,
              "swing",
              function () {
                const limit = 20,
                  $this = $(this);

                // 超出一定距离时删除元素
                if (
                  $this.position().left < -($this.width() + limit) ||
                  $this.position().top < -($this.height() + limit) ||
                  $this.position().left > $("#wrapper").width() + limit ||
                  $this.position().top > $("#wrapper").height() + limit
                ) {
                  $this.remove();
                }
              }
            );
          });

          // 玩家与水果之间发生的碰撞
          $.each(DATA.fruits, function () {
            const $this = $(this),
              { scores, type, id } = $this[0];

            libs.CollideEntity({
              // 对象
              id,

              // 比较对象
              contrast: $("#fruit-basket"),

              // 碰撞后发生的事件
              collided(obj) {
                // 获取该元素是不是一个腐烂水果
                const isBad = obj.hasClass("bad"),
                  // 获取目前的总分数
                  before = DATA.statistics.SCORES,
                  // 计算最终的分数结果
                  result =
                    DATA.base.scores +
                    scores +
                    (DATA.base.scores + scores) * DATA.base.multiple;

                DATA.statistics.TOTAL_FRUITS++;

                if (isBad) {
                  // 清空健康水果拾取计数
                  DATA.statistics.HEALTHY_FRUIT_COUNTS = 0;

                  // 清空奖励分数序列
                  DATA.statistics.REWARD_SCORES_ARRAY.length = 0;

                  // 增加总计拾取的腐烂水果
                  DATA.statistics.TOTAL_BAD_FRUITS++;

                  // 增加腐烂水果的拾取计数
                  DATA.statistics.BAD_FRUIT_COUNTS++;

                  if (DATA.statistics.BAD_FRUIT_COUNTS >= 5) {
                    DATA.player.health--;
                    libs.PlayRandSound({
                      audio: DATA.audio.hit,
                      promise: true,
                    });
                    DATA.statistics.BAD_FRUIT_COUNTS = 0;
                  }

                  // 当玩家的游戏分数处于负数时，
                  // 每次拾取腐烂水果都将减少1点生命值。
                  if (DATA.statistics.SCORES < 0) {
                    DATA.player.health--;
                    libs.PlayRandSound({
                      audio: DATA.audio.hit,
                      promise: true,
                    });
                  }

                  DATA.statistics.SCORES -= result / 0.35;

                  libs.PlayRandSound({
                    audio: DATA.audio.eat,
                    promise: true,
                  });
                } else {
                  // 增加健康水果的拾取计数
                  DATA.statistics.HEALTHY_FRUIT_COUNTS++;
                  if (DATA.statistics.HEALTHY_FRUIT_COUNTS >= 10) {
                    if (DATA.player.health < 10) {
                      libs.PlaySound({
                        src: DATA.audio.pop,
                      });
                      DATA.player.health++;
                    }
                    DATA.statistics.HEALTHY_FRUIT_COUNTS = 0;
                  }

                  // 添加拾取的水果的分数到奖励分数序列
                  DATA.statistics.REWARD_SCORES_ARRAY.push(result);
                  if (DATA.statistics.REWARD_SCORES_ARRAY.length >= 15) {
                    let rewardScores = 0;

                    $.each(
                      DATA.statistics.REWARD_SCORES_ARRAY,
                      (index, value) => (rewardScores += value)
                    );

                    // 奖励 15个水果总和的 35%游戏分数
                    DATA.statistics.SCORES += rewardScores * 0.35;

                    // 播放特殊的声音
                    libs.PlaySound({
                      src: DATA.audio.burp,
                      promise: true,
                    });
                    DATA.statistics.REWARD_SCORES_ARRAY.length = 0;
                  } else {
                    libs.PlayRandSound({
                      audio: DATA.audio.eat,
                      promise: true,
                    });
                  }
                  DATA.statistics.SCORES += result;
                }

                // 显示分数细节
                libs.ShowDetails({
                  type,
                  id,
                  pos: {
                    x: obj.position().left,
                    y: obj.position().top,
                  },

                  // 获取之前的数值
                  before: before,

                  // 与当前数值进行比较
                  after: DATA.statistics.SCORES,

                  // 额外的函数，常用于添加额外样式。
                  extra() {
                    return isBad ? "bad" : "";
                  },
                });
                obj.remove();
              },
            });
          });

          // 玩家与道具之间发生的碰撞
          $.each(DATA.items, function (index) {
            const { id } = $(this)[0],
              { min, max } = DATA.items[index].valid;

            libs.CollideEntity({
              id,
              contrast: $("#fruit-basket"),
              collided(obj) {
                if (
                  libs.Probability(
                    libs.Rand({
                      min,
                      max,
                    })
                  )
                ) {
                  DATA.items[index].effect(obj);

                  libs.PlayRandSound({
                    audio: DATA.audio.equip_chain,
                    promise: true,
                  });
                } else {
                  libs.PlayRandSound({
                    audio: DATA.audio.eat,
                    promise: true,
                  });
                }
                obj.remove();
              },
            });
          });

          function built() {
            // 获取实体
            const { type, id, speed } = libs.RandArrItems(builder.arr)[0];

            // 实体构造函数
            function create() {
              libs.BuiltEntity({
                className: type + " " + id,
                x() {
                  if (libs.Probability(30)) {
                    // 30% 的概率会生成在顶部
                    return libs.Rand({
                      min: 0,
                      max: $("#wrapper").width() - $(this).width(),
                    });
                  } else {
                    return libs.RandArrItems([
                      -$(this).width(),
                      $("#wrapper").width(),
                    ])[0];
                  }
                },
                y() {
                  // 判断该元素的X轴是否在游戏区域可见范围内
                  if (
                    $(this).position().left >= 0 &&
                    $(this).position().left < $("#wrapper").width()
                  ) {
                    return -$(this).height();
                  } else {
                    return libs.Rand({
                      min: 0,
                      max:
                        $("#wrapper").height() -
                        $(this).height() -
                        $("#status").height(),
                    });
                  }
                },
                xSpeed() {
                  const getXSpeed = libs.Rand({
                    min:
                      DATA.base.speed *
                      speed.min *
                      libs.Rand({
                        min: 0.7,
                        max: 1.4,
                        fixed: 2,
                      }),
                    max:
                      DATA.base.speed *
                      speed.max *
                      libs.Rand({
                        min: 0.7,
                        max: 1.4,
                        fixed: 2,
                      }),
                    fixed: 1,
                  });

                  if ($(this).position().left < 0) {
                    return "+=" + getXSpeed;
                  } else if ($(this).position().left >= $("#wrapper").width()) {
                    return "-=" + getXSpeed;
                  } else if ($(this).position().top < 0) {
                    if (libs.Probability(25)) {
                      // 25% 的概率X轴不会偏移
                      return "+=0";
                    } else {
                      return (
                        libs.RandArrItems(["+=", "-="])[0] +
                        libs.CalcRepair({
                          formula:
                            getXSpeed *
                            libs.Rand({
                              min: 0.5,
                              max: 1.75,
                              fixed: 1,
                            }),
                        })
                      );
                    }
                  }
                },
                ySpeed() {
                  const getYSpeed = libs.Rand({
                    min: DATA.base.speed * speed.min,
                    max: DATA.base.speed * speed.max,
                    fixed: 1,
                  });

                  if ($(this).position().top < 0) {
                    return "+=" + getYSpeed;
                  } else {
                    if (libs.Probability(25)) {
                      // 25% 的概率Y轴不会偏移
                      return "+=0";
                    } else {
                      return (
                        libs.RandArrItems(["+=", "-="])[0] +
                        libs.CalcRepair({
                          formula:
                            getYSpeed *
                            libs.Rand({
                              min: 0.75,
                              max: 1.25,
                              fixed: 1,
                            }),
                        })
                      );
                    }
                  }
                },
                extra(obj) {
                  // 本次生成的水果是否变成腐烂水果
                  if (obj.hasClass("fruits")) {
                    if (
                      libs.Probability(DATA.statistics.BAD_FRUITS_CHANCE, 2)
                    ) {
                      obj.addClass("bad");
                    }
                  }
                },
              });
            }

            if (type === "fruits") {
              if (libs.Probability(DATA.statistics.HEALTHY_FRUITS_SPAWN_CHANCE))
                create();
            }

            // 道具将在游戏开始 5秒后生成
            if (type === "items" && DATA.statistics.PLAYTIME > 5) {
              if (libs.Probability(DATA.statistics.ITEMS_SPAWN_CHANCE))
                create();
            }
          }

          // 执行实体生成函数
          builder.cd++;
          if (
            builder.cd >=
            10 - (10 * Math.abs(100 - DATA.statistics.ENTITY_SPAWN_SPEED)) / 100
          ) {
            built();
            builder.cd = 0;
          }
        }, 10);

        // 难度定时器
        DATA.timer.difficulty = setTimeout(
          function Upgrade() {
            clearTimeout(DATA.timer.difficulty);

            libs.PlaySound({
              src: DATA.audio.orb,
            });

            // 淡入淡出效果
            $("#diff-notify").fadeIn(500).delay(3000).fadeOut(500);

            // 等级提升
            $("#diff-levels_up").text(function () {
              // $(this)
              //   .parent()
              //   .find(".bef")
              //   .text("Lv." + DATA.statistics.DIFFICULTY_LEVELS);
              // DATA.statistics.DIFFICULTY_LEVELS++;
              return "Lv." + ++DATA.statistics.DIFFICULTY_LEVELS;
            });

            // 所有升级项目
            const UpgradeList = [
              {
                chance: 29.5,
                title: '<b class="base-scores">基础得分</b>',
                data: DATA.base.scores,
                change() {
                  return (DATA.base.scores += libs.Rand({
                    min: 0.01,
                    max: 0.1,
                    fixed: 2,
                  }));
                },
              },
              {
                chance: 26.2,
                title: '<b class="base-multiple">基础得分倍率</b>',
                data: DATA.base.multiple,
                symbol: "x",
                change() {
                  DATA.base.multiple += libs.Rand({
                    min: 0.01,
                    max: 0.02,
                    fixed: 2,
                  });

                  if (DATA.base.multiple > 1.25) {
                    DATA.base.multiple = 1.25;

                    this.symbol = this.symbol + " (MAX)";

                    return DATA.base.multiple;
                  } else {
                    return DATA.base.multiple;
                  }
                },
              },
              {
                chance: 31.3,
                title: '<b class="base-speed">基础移动速度</b>',
                data: DATA.base.speed,
                change() {
                  return (DATA.base.speed += libs.Rand({
                    min: 0.01,
                    max: 0.15,
                    fixed: 2,
                  }));
                },
              },
              {
                chance: 33.3,
                title: '<b class="entity-spawn-speed">实体</b> 生成速度',
                data: DATA.statistics.ENTITY_SPAWN_SPEED,
                symbol: "%",
                change() {
                  DATA.statistics.ENTITY_SPAWN_SPEED += libs.Rand({
                    min: 0.2,
                    max: 1.4,
                    fixed: 2,
                  });

                  if (DATA.statistics.ENTITY_SPAWN_SPEED > 150) {
                    DATA.statistics.ENTITY_SPAWN_SPEED = 150;

                    this.symbol = this.symbol + " (Max)";

                    return DATA.statistics.ENTITY_SPAWN_SPEED;
                  } else {
                    return DATA.statistics.ENTITY_SPAWN_SPEED;
                  }
                },
              },
              {
                chance: 36.4,
                title: '<b class="items-des-chance">游戏道具</b> 生成概率',
                data: DATA.statistics.ITEMS_SPAWN_CHANCE,
                symbol: "%",
                change() {
                  DATA.statistics.ITEMS_SPAWN_CHANCE += libs.Rand({
                    min: 0.1,
                    max: 1.6,
                    fixed: 2,
                  });

                  if (DATA.statistics.ITEMS_SPAWN_CHANCE > 28) {
                    DATA.statistics.ITEMS_SPAWN_CHANCE = 28;

                    this.symbol = this.symbol + " (Max)";

                    return DATA.statistics.ITEMS_SPAWN_CHANCE;
                  } else {
                    return DATA.statistics.ITEMS_SPAWN_CHANCE;
                  }
                },
              },
              {
                chance: 37.1,
                title: '<b class="healthy-fruits">新鲜水果</b> 生成概率',
                data: DATA.statistics.HEALTHY_FRUITS_SPAWN_CHANCE,
                symbol: "%",
                change() {
                  DATA.statistics.HEALTHY_FRUITS_SPAWN_CHANCE += libs.Rand({
                    min: 0.1,
                    max: 1.6,
                    fixed: 2,
                  });

                  if (DATA.statistics.HEALTHY_FRUITS_SPAWN_CHANCE > 70) {
                    DATA.statistics.HEALTHY_FRUITS_SPAWN_CHANCE = 70;

                    this.symbol = this.symbol + " (Max)";

                    return DATA.statistics.HEALTHY_FRUITS_SPAWN_CHANCE;
                  } else {
                    return DATA.statistics.HEALTHY_FRUITS_SPAWN_CHANCE;
                  }
                },
              },
              {
                chance: 39.8,
                title: '<b class="bad-fruits">腐烂水果</b> 生成概率',
                data: DATA.statistics.BAD_FRUITS_CHANCE,
                symbol: "%",
                change() {
                  DATA.statistics.BAD_FRUITS_CHANCE += libs.Rand({
                    min: 1,
                    max: 3.2,
                    fixed: 2,
                  });

                  if (DATA.statistics.BAD_FRUITS_CHANCE > 50) {
                    DATA.statistics.BAD_FRUITS_CHANCE = 50;

                    this.symbol = this.symbol + " (Max)";

                    return DATA.statistics.BAD_FRUITS_CHANCE;
                  } else {
                    return DATA.statistics.BAD_FRUITS_CHANCE;
                  }
                },
              },
            ];

            const $diff = $("#diff-notify > div");

            function write(obj) {
              $diff.html(
                $diff.html() +
                  `<p>${
                    obj.title
                  }&nbsp;<i class="items-min-valid bef">${libs.CalcRepair({
                    formula: obj.data,
                  })}${
                    obj.symbol || ""
                  }</i>&nbsp;to&nbsp;<i class="healthy-fruits aft">${libs.CalcRepair({
                    formula: obj.change(),
                  })}${obj.symbol || ""}</i></p>`
              );
            }

            // 清空上一次的升级数值
            $diff.empty();

            // 把即将升级的项目写入HTML
            for (let item of UpgradeList) {
              if (libs.Probability(item.chance, 2)) {
                write(item);
              }
            }

            // 如果本次升级没有项目，则随机选取一个。
            if (!$diff.find("p").length) {
              write(libs.RandArrItems(UpgradeList)[0]);
            }

            DATA.timer.difficulty = setTimeout(
              Upgrade,
              libs.Rand({
                min: 5000,
                max: 14000,
              })
            );
          },
          libs.Rand({
            min: 5000,
            max: 14000,
          })
        );
      }
    );
  });
});

// Output game information.
console.info(
  "\n%cFruit Wars" +
    "\n%cv2.0-alpha\n" +
    "%cMD5: b8e2bccb9b7301a31b1a00819be642d2\n",
  "color:hotpink",
  "color:green",
  "color:black"
);
