function doPointlessComputationsWithRequestAnimationFrame(timeStart) {
  function testCandidate(index) {
    // finishing condition
    if (index == iterations) {
      pointlessComputationsButton.disabled = false;
      let timeEnd = performance.now();
      addResultToChart(mainChart, "animation", timeEnd - timeStart);
      return;
    }
    // test this number
    var candidate = index * (multiplier * Math.random());
    var isPrime = true;
    for (var c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
        // not prime
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(candidate);
    }
    // schedule the next
    var testFunction = testCandidate.bind(this, index + 1);
    window.requestAnimationFrame(testFunction);
  }

  var primes = [];
  var testFunction = testCandidate.bind(this, 0);
  window.requestAnimationFrame(testFunction);
}