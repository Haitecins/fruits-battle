import elements from "@/modules/config/common/elements";
import fruits from "@/modules/config/common/fruits";
import items from "@/modules/config/common/items";

const {
  nodes: {
    readme: { totalFruits, totalItems },
  },
} = elements;
totalFruits.html(
  fruits
    .sort((fruit1, fruit2) => fruit1.scores - fruit2.scores)
    .map(({ id, type, scores, speed }) => {
      return `<div><i class="${type} ${id}"></i><p>分数 ${
        scores * 100
      }</p><p>移动速度 ${speed.min}-${speed.max}</p></div>`;
    }) as never
);

totalItems.html(
  items
    .sort((item1, item2) => item1.speed.min - item2.speed.min)
    .map((item) => {
      const { id, type, valid, speed } = item;
      return `<div><div><i class="${type} ${id}"></i><p>有效概率 ${
        valid.min
      }%-${valid.max}%</p><p>移动速度 ${speed.min}-${
        speed.max
      }</p></div><p>${item.description()}</p></div>`;
    }) as never
);
