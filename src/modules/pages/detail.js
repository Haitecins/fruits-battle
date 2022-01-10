import { fruits, items } from "../data/index.js";

$("#total-fruits").html(
  fruits.map(({ id, type, scores, speed }) => {
    return `<div>
    <i class="${type} picked-${id}"></i>
    <p>分数 ${scores * 100}</p>
    <p>移动速度 ${speed.min}-${speed.max}</p>
  </div>`;
  })
);
$("#total-items").html(
  items.map(({ id, type, valid, speed, descriptions }) => {
    return `<div>
      <div>
        <i class="${type} picked-${id}"></i>
        <p>有效概率 ${valid.min}%-${valid.max}%</p>
        <p>移动速度 ${speed.min}-${speed.max}</p>
      </div>
      <p>${descriptions}</p>
    </div>`;
  })
);