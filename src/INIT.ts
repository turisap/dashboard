import ReactGA from "react-ga";
import LogRocket from "logrocket";

ReactGA.initialize(process.env.GA_TRACKING_ID as string);
ReactGA.pageview(window.location.pathname + window.location.search);

window.requestIdleCallback =
  window.requestIdleCallback ||
  function(cb) {
    // eslint-disable-next-line no-var
    var start = Date.now();

    return setTimeout(function() {
      cb({
        didTimeout: false,
        timeRemaining: function() {
          return Math.max(0, 50 - (Date.now() - start));
        },
      });
    }, 1);
  };

window.cancelIdleCallback =
  window.cancelIdleCallback ||
  function(id) {
    clearTimeout(id);
  };

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
        // uncomment for dev
        // console.log(`Long running task: ${perfEntries[i].toJSON()}`);

        ReactGA.event({
          category: "Performance",
          action: `Long running task ${perfEntries[i].toJSON()}`,
        });
      }
    }
  });

  observer.observe({ entryTypes: ["longtask"] });
}

// check user connection
if (typeof navigator !== "undefined") {
  const saveData = (window.navigator as any)?.connection?.saveData;
  const effectiveType = (window.navigator as any)?.connection?.effectiveType;

  // uncomment for dev
  // console.log("Save data %s, type %s", saveData, effectiveType);

  ReactGA.event({
    category: "Performance",
    action: `Save data ${saveData}, connection type ${effectiveType}`,
  });
}

// register a SW
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((registration) => {
        // uncomment for dev
        // console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        // uncomment for dev
        // console.log("SW registration failed: ", registrationError);
        LogRocket.captureMessage("SW install failed");
      });
  });
}
