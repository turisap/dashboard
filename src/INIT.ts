// load fonts
const fontFaces = [
  ["OpenSans-Bold", "600"],
  ["OpenSans-SemiBold", "500"],
  ["OpenSans-Light", "100"],
  ["OpenSans-Regular", "300"],
];

fontFaces
  .map(
    ([font, weight]) =>
      new FontFace("Open Sans", `url(../assets/fonts/${font}.ttf)`, {
        style: "normal",
        unicodeRange: "U+000-5FF",
        weight,
      })
  )
  .forEach((fontFace) => {
    fontFace.load().then(function() {
      document.fonts.add(fontFace);
      document.body.style.fontFamily = "Open Sans, serif";
    });
  });

// setup performance observer
if (typeof PerformanceObserver !== "undefined") {
  const observer = new PerformanceObserver((list) => {
    const perfEntries = list.getEntries();
    for (let i = 0; i < perfEntries.length; i++) {
      if (process.env.PERF === "true") {
        console.log("Long running task:", perfEntries[i].toJSON());
      }
    }
  });

  observer.observe({ entryTypes: ["longtask"] });
}

// check user connection
if (typeof navigator !== "undefined") {
  const saveData = (window.navigator as any)?.connection?.saveData;
  const effectiveType = (window.navigator as any)?.connection?.effectiveType;

  // TODO add GA
  console.log("Save data %s, type %s", saveData, effectiveType);
}
