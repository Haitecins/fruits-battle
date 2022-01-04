window.localStorage.setItem(
  "app_history",
  JSON.stringify({ id: 1, name: "WC" })
);

console.log(JSON.parse(window.localStorage.getItem("app_history")));
