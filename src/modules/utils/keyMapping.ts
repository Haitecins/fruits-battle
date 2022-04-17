document.addEventListener("keydown", (ev) => {
  if (ev.key === "f") {
    if (document.fullscreenElement === null) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      document.documentElement.requestFullscreen();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      document.exitFullscreen();
    }
  }
});
