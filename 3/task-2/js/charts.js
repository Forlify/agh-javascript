var mainChart;

window.onload = function () {
  mainChart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Czasy wykonania obliczeń"
    },
    axisY: {
      title: "Czas w milisekundach",
      suffix: " ms"
    },
    data: [
      {
        type: "column",
        indexLabelFontColor: "#5A5757",
        indexLabelFontSize: 8,
        dataPoints: []
      }
    ]
  });
  mainChart.render();
};

const addResultToChart = function (chart, type, result) {
  chart.data[0].options.dataPoints.push({ y: result, label: type });
  chart.render();
};