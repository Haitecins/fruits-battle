import { fruits, items } from "../data/index.js";

const fruitContainer = $("#total-fruits");
const itemContainer = $("#total-items");
const fillFruits = [];
const fillItems = [];

fruits.forEach(({ id, type, scores, speed }) => {
  fillFruits.push(
    `<div>
    <img src="/public/img/${type}/${id}.svg" alt="${id}" />
    <p>分数 ${scores * 100}</p>
    <p>移动速度 ${speed.min}-${speed.max}</p>
    </div>`
  );
});
items.forEach(({ id, type, valid, speed, descriptions }) => {
  fillItems.push(
    `<div>
    <div>
      <img src="/public/img/${type}/${id}.svg" alt="${id}" />
      <p>有效概率 ${valid.min}%-${valid.max}%</p>
      <p>移动速度 ${speed.min}-${speed.max}</p>
    </div>
    <p>${descriptions}</p>
    </div>`
  );
});

fruitContainer.html(fillFruits);
itemContainer.html(fillItems);
