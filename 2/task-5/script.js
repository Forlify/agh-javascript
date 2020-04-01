function drawLine(ctx, startX, startY, endX, endY, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
}

function drawBar(ctx, X, Y, width, height, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(X, Y, width, height);
    ctx.restore();
}

function Comparator(a, b) {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
}

var BarChart = function (options) {
    this.options = options;
    this.chartPadding = options.chartPadding;
    this.seriesName = options.seriesName;
    this.gridScale = options.gridScale;
    this.canvas = options.canvas;
    this.sorted = options.sorted;

    this.ctx = this.canvas.getContext("2d");

    if (this.sorted)
        this.data = Object.entries(options.data).sort(Comparator);
    else
        this.data = Object.entries(options.data)

    this.gridColor = options.gridColor;
    this.colors = options.colors;
    this.colorSolid = options.colorSolid;

    if (this.colorSolid)
        this.colorsChosen = this.data.map(() => this.colorSolid);
    else
        this.colorsChosen = this.data.map(() => this.colors[Math.floor(Math.random() * 100) % this.colors.length]);


    this.render = function () {
        var maxValue = 0;
        for (var i in this.data)
            maxValue = Math.max(maxValue, this.data[i][1]);

        var canvasActualHeight = this.canvas.height - this.chartPadding * 2;
        var canvasActualWidth = this.canvas.width - this.chartPadding * 2;

        var value = 0;
        while (value <= maxValue + this.gridScale) {
            var gridY = canvasActualHeight * (1 - value / maxValue) + this.chartPadding;
            drawLine(
                this.ctx,
                0,
                gridY,
                this.canvas.width,
                gridY,
                this.gridColor
            );

            this.ctx.save();
            this.ctx.fillStyle = this.gridColor;
            this.ctx.font = "bold 10px Open Sans";
            this.ctx.fillText(value, 10, gridY - 2);
            this.ctx.restore();

            value += this.gridScale;
        }

        var barIndex = 0;
        var numberOfBars = this.data.length;
        var barSize = (canvasActualWidth) / numberOfBars;

        for (i in this.data) {
            var val = this.data[i][1];
            var barHeight = Math.round(canvasActualHeight * val / maxValue);
            drawBar(
                this.ctx,
                this.chartPadding + barIndex * barSize,
                this.canvas.height - barHeight - this.chartPadding,
                barSize,
                barHeight,
                this.colorsChosen[i]
            );

            barIndex++;
        }
        this.ctx.save();
        this.ctx.textBaseline = "bottom";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "bold 14px Open Sans";
        this.ctx.fillText(this.seriesName, this.canvas.width / 2, this.canvas.height);
        this.ctx.restore();

        barIndex = 0;
        var legend = document.querySelector("legend[for='" + this.canvas.id + "']");
        var ul = document.createElement("ul");
        legend.append(ul);

        for (i in this.data) {
            var li = document.createElement("li");
            li.style.listStyle = "none";
            li.style.borderLeft = "20px solid " + this.colorsChosen[barIndex];
            li.style.padding = "5px";
            li.style.font = "14px Open Sans";
            li.textContent = this.data[i][0];
            ul.append(li);
            barIndex++;
        }
    }
}

var coronaCanvas = document.getElementById("CoronaVirus");
coronaCanvas.width = 700;
coronaCanvas.height = 500;

var ctx = coronaCanvas.getContext("2d");

var barChart = new BarChart(
    {
        canvas: coronaCanvas,
        seriesName: "Corona virus across the world",
        chartPadding: 50,
        gridScale: 10000,
        gridColor: "#2c3e50",
        sorted: true,
        colorSolid: undefined,
        colors: ["#1abc9c", "#3498db", "#9b59b6", "#e74c3c", "#34495e", "#f1c40f", "#16a085", "#c0392b", "#f39c12", "#d35400", "#3498db", "#2980b9"],
        data: {
            "USA": 85991,
            "Germany": 43555,
            "United Kingdom": 11813,
            "Poland": 1221,
            "France": 29566,
            "China": 81782,
            "Italy": 80589,
            "Spain": 57786
        }
    }
).render()

var other = document.getElementById("Other");
other.width = 700;
other.height = 500;

var ctx = other.getContext("2d");

var barChartOther = new BarChart(
    {
        canvas: other,
        seriesName: "Punkty JavaScript - Błazej Kustra",
        chartPadding: 50,
        gridScale: 1,
        gridColor: "#2c3e50",
        sorted: false,
        colorSolid: undefined,
        colors: ["#1abc9c", "#3498db", "#9b59b6", "#e74c3c", "#34495e", "#f1c40f", "#16a085", "#c0392b", "#f39c12", "#d35400", "#3498db", "#2980b9"],
        data: {
            "Ćwiczenie 1": 7,
            "Ćwiczenie 2": 5.25,
            "Ćwiczenie 3": 0,
            "Ćwiczenie 4": 0,
            "Ćwiczenie 5": 0,
            "Ćwiczenie 6": 0,
            "Ćwiczenie 7": 0,
        }
    }
).render()