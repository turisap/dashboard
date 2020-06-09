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

const { saveData, effectiveType } = window.navigator["connection"];
// TODO add GA
console.log("Save data %s, type %s", saveData, effectiveType);
