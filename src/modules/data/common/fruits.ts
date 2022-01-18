const fruits: FruitProps = [
  {
    id: "apple",
    type: "fruits",
    priority: 0,
    scores: 0.08,
    speed: {
      min: 1.1,
      max: 3.2,
    },
  },
  {
    id: "banana",
    type: "fruits",
    priority: 0,
    scores: 0.08,
    speed: {
      min: 1.2,
      max: 2.4,
    },
  },
  {
    id: "orange",
    type: "fruits",
    priority: 0,
    scores: 0.11,
    speed: {
      min: 1.3,
      max: 2.6,
    },
  },
  {
    id: "lemon",
    type: "fruits",
    priority: 0,
    scores: 0.11,
    speed: {
      min: 1.4,
      max: 2.8,
    },
  },
  {
    id: "watermelon",
    type: "fruits",
    priority: 0,
    scores: 0.13,
    speed: {
      min: 1.5,
      max: 3.0,
    },
  },
  {
    id: "hami_melon",
    type: "fruits",
    priority: 0,
    scores: 0.13,
    speed: {
      min: 1.2,
      max: 3.1,
    },
  },
  {
    id: "mango",
    type: "fruits",
    priority: 0,
    scores: 0.17,
    speed: {
      min: 1.6,
      max: 3.2,
    },
  },
  {
    id: "peach",
    type: "fruits",
    priority: 0,
    scores: 0.17,
    speed: {
      min: 1.7,
      max: 3.4,
    },
  },
  {
    id: "cherry",
    type: "fruits",
    priority: 0,
    scores: 0.23,
    speed: {
      min: 1.8,
      max: 3.6,
    },
  },
  {
    id: "avocado",
    type: "fruits",
    priority: 0,
    scores: 0.25,
    speed: {
      min: 1.4,
      max: 3.1,
    },
  },
  {
    id: "pineapple",
    type: "fruits",
    priority: 0,
    scores: 0.24,
    speed: {
      min: 1.6,
      max: 2.8,
    },
  },
  {
    id: "persimmon",
    type: "fruits",
    priority: 0,
    scores: 0.21,
    speed: {
      min: 2.5,
      max: 3.1,
    },
  },
  {
    id: "blueberry",
    type: "fruits",
    priority: 0,
    scores: 0.18,
    speed: {
      min: 1.2,
      max: 3.2,
    },
  },
  {
    id: "strawberry",
    type: "fruits",
    priority: 0,
    scores: 0.18,
    speed: {
      min: 1.2,
      max: 3.4,
    },
  },
  {
    id: "pitaya",
    type: "fruits",
    priority: 0,
    scores: 0.26,
    speed: {
      min: 1.9,
      max: 3.4,
    },
  },
  {
    id: "mangosteen",
    type: "fruits",
    priority: 0,
    scores: 0.25,
    speed: {
      min: 1.8,
      max: 2.4,
    },
  },
  {
    id: "litchi",
    type: "fruits",
    priority: 0,
    scores: 0.23,
    speed: {
      min: 1.1,
      max: 3.5,
    },
  },
  {
    id: "kiwi_fruit",
    type: "fruits",
    priority: 0,
    scores: 0.18,
    speed: {
      min: 1.5,
      max: 2.9,
    },
  },
  {
    id: "longan",
    type: "fruits",
    priority: 0,
    scores: 0.18,
    speed: {
      min: 1.4,
      max: 3.1,
    },
  },
  {
    id: "pomegranate",
    type: "fruits",
    priority: 0,
    scores: 0.21,
    speed: {
      min: 1.5,
      max: 3.6,
    },
  },
  {
    id: "prune",
    type: "fruits",
    priority: 0,
    scores: 0.23,
    speed: {
      min: 1.4,
      max: 3.3,
    },
  },
  {
    id: "grape",
    type: "fruits",
    priority: 0,
    scores: 0.11,
    speed: {
      min: 1.1,
      max: 2.5,
    },
  },
  {
    id: "pear",
    type: "fruits",
    priority: 0,
    scores: 0.17,
    speed: {
      min: 1.4,
      max: 2.1,
    },
  },
  {
    id: "durian",
    type: "fruits",
    priority: 0,
    scores: 0.26,
    speed: {
      min: 1.6,
      max: 3.7,
    },
  },
];

fruits
  .sort((fruit1, fruit2) => fruit1.scores - fruit2.scores)
  .forEach((fruit, index) => {
    fruit.priority = index;
  });

export default fruits;
