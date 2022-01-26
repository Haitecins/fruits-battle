import FruitProps from "@/types/configs/common/fruits";

const fruits: FruitProps = [
  {
    id: "apple",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "banana",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "orange",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "lemon",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "watermelon",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "hami_melon",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "mango",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "peach",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "cherry",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "avocado",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "pineapple",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "persimmon",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "blueberry",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "strawberry",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "pitaya",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "mangosteen",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "litchi",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "kiwi_fruit",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "longan",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "pomegranate",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "prune",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "grape",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "pear",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
  {
    id: "durian",
    type: "fruits",
    priority: 0,
    scores: 0.15,
    speed: {
      min: 1.25,
      max: 3.75,
    },
  },
];

fruits
  .sort((fruit1, fruit2) => fruit1.scores - fruit2.scores)
  .forEach((fruit, index) => {
    fruit.priority = index;
  });

export default fruits;
