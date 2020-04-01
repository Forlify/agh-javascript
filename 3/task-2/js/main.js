const iterations = 100;
const multiplier = 1000000000;

var worker = new Worker("js/calculate.js");

/**
 * Doing the pointless computations.
 */
var pointlessComputationsButton = document.getElementById("pointless-computations");
pointlessComputationsButton.disabled = false;
pointlessComputationsButton.addEventListener(
  "click",
  doPointlessComputations,
  false
);

function doPointlessComputations() {
  let timeStart;
  pointlessComputationsButton.disabled = true;

  var useWorkerButton = document.getElementById("use-worker");
  var useBlockingJsButton = document.getElementById("use-blocking-js");
  var useRequestAnimationFrame = document.getElementById(
    "use-request-animation-frame"
  );
  var useSetInterval = document.getElementById("use-interval");
  var useSetTimeout = document.getElementById("use-timeout");

  if (useRequestAnimationFrame.checked) {
    timeStart = performance.now();
    doPointlessComputationsWithRequestAnimationFrame(timeStart);
  }

  if (useWorkerButton.checked) {
    timeStart = performance.now();
    doPointlessComputationsInWorker(timeStart);
  }

  if (useBlockingJsButton.checked) {
    timeStart = performance.now();
    doPointlessComputationsWithBlocking(timeStart);
  }

  if (useSetInterval.checked) {
    timeStart = performance.now();
    doPointlessComputationWithSetInterval(timeStart);
  }

  if (useSetTimeout.checked) {
    timeStart = performance.now();
    doPointlessComputationWithSetTimeout(timeStart);
  }
}

/**
 * Start/stop animation
 */
var started = false;
var startStopButton = document.getElementById("start-stop");

startStopButton.addEventListener("click", startStop, false);

function startStop() {
  started = !started;
  if (started) {
    container.classList.add("started");
    startStopButton.value = "Stop animations";
  } else {
    container.classList.remove("started");
    startStopButton.value = "Start animations";
  }
}
