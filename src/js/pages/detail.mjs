import { fruits, items } from "../data/index.mjs";

$("#total-fruits").html(
  fruits.map(({ id, type, scores, speed }) => {
    return `<div>
    <img src="/public/img/${type}/${id}.svg" alt="${id}" />
    <p>分数 ${scores * 100}</p>
    <p>移动速度 ${speed.min}-${speed.max}</p>
  </div>`;
  })
);
$("#total-items").html(
  items.map(({ id, type, valid, speed, descriptions }) => {
    return `<div>
      <div>
        <img src="/public/img/${type}/${id}.svg" alt="${id}" />
        <p>有效概率 ${valid.min}%-${valid.max}%</p>
        <p>移动速度 ${speed.min}-${speed.max}</p>
      </div>
      <p>${descriptions}</p>
    </div>`;
  })
);
