var worker = new Worker("js/calculate.js");

function doPointlessComputationsInWorker(timeStart) {
  function handleWorkerCompletion(message) {
    if (message.data.command == "done") {
      pointlessComputationsButton.disabled = false;
      worker.removeEventListener("message", handleWorkerCompletion);
      timeEnd = performance.now();
      addResultToChart(mainChart, "Worker", timeEnd - timeStart);
    }
  }

  worker.addEventListener("message", handleWorkerCompletion, false);

  worker.postMessage({
    multiplier: multiplier,
    iterations: iterations
  });
}
