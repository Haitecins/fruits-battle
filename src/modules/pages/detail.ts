import $ from "jquery";
import { fruits, items } from "../data/index";

$("#total-fruits").html(
  fruits.map(({ id, type, scores, speed }) => {
    return `<div>
    <i class="${type} picked-${id}"></i>
    <p>分数 ${scores * 100}</p>
    <p>移动速度 ${speed.min}-${speed.max}</p>
  </div>`;
  }) as never
);
$("#total-items").html(
  items.map(({ id, type, valid, speed, description }) => {
    return `<div>
      <div>
        <i class="${type} picked-${id}"></i>
        <p>有效概率 ${valid.min}%-${valid.max}%</p>
        <p>移动速度 ${speed.min}-${speed.max}</p>
      </div>
      <p>${description}</p>
    </div>`;
  }) as never
);
