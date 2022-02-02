import jQuery from "jquery";
import Entity from "@/libs/classes/Entity";
import audio from "@/configs/common/audio";
import levels from "@/configs/common/levels";
import player from "@/configs/common/player";
import statistics from "@/configs/common/statistics";
import levelsUpList from "@/configs/events/levelsUpList";
import timer from "@/configs/common/timer";
import elements from "@/configs/common/elements";
import verifications from "@/libs/functions/verifications";
import isCollide from "@/libs/functions/isCollide";
import hasOutArea from "@/libs/functions/hasOutArea";
import calcRepair from "@/libs/functions/calcRepair";
import ended from "@/libs/functions/ended";
import setChance from "@/libs/functions/setChance";
import updateStatusbar from "@/libs/functions/updateStatusbar";
import detailBlocks from "@/libs/functions/detailBlocks";
import Random from "@/libs/classes/Random";
import { FruitsObject } from "@/types/configs/common/fruits";
import { ItemsObject } from "@/types/configs/common/items";
import { LevelsUpListObject } from "@/types/configs/events/levelsUpList";
import levels_test from "@/test/levels.test";

const { nodes, entities } = elements;
const launcher = (): void => {
  // 主定时器
  timer.main = setInterval(() => {
    // 反作弊验证
    verifications();
    // 刷新状态栏
    updateStatusbar();
    // 玩家未进行移动行为的惩罚
    if (++player.not_moving_ticks >= 500) {
      // 减少生命值
      player.health--;
      // 当前分数大于0时
      if (statistics.SCORES > 0) {
        // 扣除当前游戏得分的 10%
        statistics.SCORES -= statistics.SCORES * 0.1;
        audio.random(audio.hit).play();
      }
      player.not_moving_ticks = 0;
    }
    // 实体处理程序
    entities.totals().each(function () {
      // 实体的移动
      jQuery(this).animate(
        {
          left: jQuery(this).prop("xSpeed") as string,
          top: jQuery(this).prop("ySpeed") as string,
        },
        0,
        "swing",
        hasOutArea.bind(this, jQuery(this))
      );
      // 碰撞事件
      if (isCollide(jQuery(this))) {
        const { data } = this as never as { data: FruitsObject & ItemsObject };
        if (data.type === "fruits") {
          // 获取该元素是不是一个腐烂水果
          const isBadFruit = jQuery(this).hasClass("bad");
          // 获取目前的总分数
          const before = statistics.SCORES;
          // 计算最终的分数结果
          const result =
            levels.BASE_SCORES +
            data.scores +
            (levels.BASE_SCORES + data.scores) * levels.BASE_SCORES_MULTIPLE;
          // 受道具CAKE影响的分数结果
          const cakeItemResult = result * statistics.CAKE_ITEM_INFLUENCE_VALUE;
          statistics.TOTAL_FRUITS++;
          if (isBadFruit) {
            // 清空健康水果拾取计数奖励
            statistics.HEALTHY_FRUIT_COUNTS = 0;
            // 清空奖励分数序列
            statistics.REWARD_SCORES_ARRAY.length = 0;
            // 增加总计拾取的腐烂水果
            statistics.TOTAL_BAD_FRUITS++;
            // 增加腐烂水果的拾取计数
            if (++statistics.BAD_FRUIT_COUNTS >= 5) {
              player.health--;
              audio.random(audio.hit).play();
              statistics.BAD_FRUIT_COUNTS = 0;
            }
            // 当玩家的游戏分数处于负数时，
            // 每次拾取腐烂水果都将减少1点生命值。
            if (statistics.SCORES < 0) {
              player.health--;
              audio.random(audio.hit).play();
            }
            statistics.SCORES -= result / 0.35;
            audio.random(audio.eat).play();
          } else {
            // 增加健康水果的拾取计数
            if (++statistics.HEALTHY_FRUIT_COUNTS >= 10) {
              ++player.health < 10 && audio.pop.play();
              statistics.HEALTHY_FRUIT_COUNTS = 0;
            }
            // 添加拾取的水果的分数到奖励分数序列
            statistics.REWARD_SCORES_ARRAY.push(cakeItemResult);
            if (statistics.REWARD_SCORES_ARRAY.length >= 15) {
              const totals = statistics.REWARD_SCORES_ARRAY.reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                0
              );
              // 奖励 15个水果总和的 35%游戏分数
              statistics.SCORES += totals * 0.35;
              // 清空数组
              statistics.REWARD_SCORES_ARRAY.length = 0;
              // 播放特殊的声音
              audio.burp.play();
            } else {
              audio.random(audio.eat).play();
            }
            statistics.SCORES += cakeItemResult;
          }
          // 显示分数细节
          detailBlocks({
            id: data.id,
            location: {
              x: jQuery(this).position().left,
              y: jQuery(this).position().top,
            },
            value: {
              // 获取之前的数值
              before,
              // 与当前数值进行比较
              after: statistics.SCORES,
            },
            // 额外的函数，常用于添加额外样式。
            extra: (): string => (isBadFruit ? "bad" : ""),
          });
        }
        if (data.type === "items") {
          if (
            setChance(new Random(data.valid.min, data.valid.max).getNumber())
          ) {
            // 执行道具的效果函数
            data.effect(jQuery(this));
            audio.random(audio.equip_chain).play();
          } else {
            audio.random(audio.eat).play();
          }
        }
        // 删除元素
        jQuery(this).remove();
      }
    });
    // 满足结束游戏的条件
    if (player.countdown < 0 || player.health <= 0) ended();
    // 实体生成
    if (
      ++statistics.SUMMON_CD >=
      8 - (10 * Math.abs(100 - levels.ENTITY_SPAWN_SPEED + 1)) / 100
    ) {
      const entity = new Entity();
      const { element } = entity;
      entity.location(Entity.random.x(element), Entity.random.y(element));
      entity.speed(
        Entity.random.speed.x(element),
        Entity.random.speed.y(element)
      );
      statistics.SUMMON_CD = 0;
    }
  }, 10);
  const levelsUpTicks = {
    min: levels_test.enabled ? levels_test.value[0] : 5000,
    max: levels_test.enabled ? levels_test.value[1] : 14000,
  };
  // 难度定时器
  const levelsUp = (): void => {
    clearTimeout(timer.difficulty as number);
    audio.orb.play();
    // 淡入淡出效果
    nodes.levels.element.fadeIn(500).delay(4000).fadeOut(500);
    // 等级提升
    nodes.levels.value.text(() => `Lv.${++levels.DIFFICULTY_LEVELS}`);
    // 清空上一次的项目
    nodes.levels.container.empty();
    const levelsUpItems = ({
      title,
      data,
      suffixes,
      change,
    }: LevelsUpListObject) => {
      return `<p>${title}&nbsp;<i class="items-min-valid">${calcRepair(
        data() as number
      )}${
        (suffixes && suffixes()) || ""
      }</i>&nbsp;to&nbsp;<i class="healthy-fruits">${calcRepair(change())}${
        (suffixes && suffixes()) || ""
      }</i></p>`;
    };
    // 过滤掉未达成条件的项目
    const filterList = levelsUpList.filter(({ chance }) =>
      setChance(chance, 2)
    );
    // 如果有升级项目的话就套用模板，没有升级项目则会随机获取一条。
    const getUpList = filterList.length && filterList.map(levelsUpItems);
    if ((getUpList as string[]).length) {
      nodes.levels.container.html(getUpList as never);
    } else {
      nodes.levels.container.html(
        levelsUpItems(new Random().getItem<LevelsUpListObject>(levelsUpList))
      );
    }
    timer.difficulty = setTimeout(
      levelsUp,
      new Random(levelsUpTicks.min, levelsUpTicks.max).getNumber()
    );
  };
  timer.difficulty = setTimeout(
    levelsUp,
    new Random(levelsUpTicks.min, levelsUpTicks.max).getNumber()
  );
};

export default launcher;
