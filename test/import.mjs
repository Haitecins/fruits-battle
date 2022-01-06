const foo = () => {
  console.log("foo");
};
const bar = () => {
  console.log("bar");
};
const def = () => {
  console.log("default export");
};

export { foo, bar };
export default def;
