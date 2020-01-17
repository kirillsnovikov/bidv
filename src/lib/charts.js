import { createSVG, getCathet, random } from "./../helpers/helper";

export function waterChart(percentage, animate) {
  if (percentage === undefined) return;
  animate = animate ? true : false;
  let chart = $(".water-chart");
  let chartSize = Math.round((chart.width() * 90) / 100);
  const options = {
    size: Math.round(chart.width()),
    chartSize: chartSize,
    borderWidth: 1
  };
  options.fontSize = Math.round((options.chartSize * 15) / 100);
  options.radius = options.chartSize / 2;
  options.chartCenterCoords = options.size / 2;
  options.chartBGSize = Math.round((options.chartSize * 90) / 100);
  options.chartBGRadius = options.chartBGSize / 2;
  options.waterChartSize = Math.round((options.chartSize * 80) / 100);
  options.waterChartRadius = options.waterChartSize / 2;

  let svg = createSVG("svg", {
    width: options.size,
    height: options.size
  });

  let border = createSVG("circle", {
    fill: "none",
    stroke: "#7abc2b",
    r: options.radius,
    cx: options.chartCenterCoords,
    cy: options.chartCenterCoords,
    "stroke-width": options.borderWidth
  });

  let chartBG = createSVG("circle", {
    fill: "#eaeaea",
    r: options.chartBGRadius,
    cx: options.chartCenterCoords,
    cy: options.chartCenterCoords
  });

  let waterChart;
  if (percentage >= 100) {
    waterChart = createSVG("circle", {
      fill: "#7abc2b",
      r: options.waterChartRadius,
      cx: options.chartCenterCoords,
      cy: options.chartCenterCoords
    });
  } else {
    options.isLargeAcr = percentage > 50 ? 1 : 0;
    options.startCoords = (options.size - options.waterChartSize) / 2;
    options.dy = parseFloat(
      (
        options.size -
        options.startCoords -
        (options.waterChartSize * percentage) / 100
      ).toFixed(3)
    );

    options.dx = getCathet(
      options.waterChartRadius - options.dy + options.startCoords,
      options.waterChartRadius
    );

    options.dx1 = options.chartCenterCoords - options.dx;
    options.dx2 = options.chartCenterCoords + options.dx;

    let bezier = options.dx1 + options.dx / 2;

    waterChart = createSVG("path", {
      d: `M${options.dx1} ${options.dy} Q${bezier} ${random(
        options.dy - 10,
        options.dy + 10
      )} ${options.chartCenterCoords} ${options.dy} T${options.dx2} ${
        options.dy
      } A ${options.waterChartRadius} ${options.waterChartRadius} 0 ${
        options.isLargeAcr
      } 1 ${options.dx1} ${options.dy}`,
      fill: "url(#grad1)"
    });
  }

  let text = createSVG("text", {
    class: "chart-percentage",
    x: "50%",
    y: options.chartCenterCoords + options.fontSize / 4,
    style: `font: bold ${options.fontSize}px Arial;fill: #5c5c5c`
  });
  let value = createSVG("tspan", {
    "text-anchor": "middle"
  });
  value.textContent = `${percentage}%`;
  text.appendChild(value);

  svg.appendChild(gradient());
  svg.appendChild(border);
  svg.appendChild(chartBG);
  svg.appendChild(waterChart);
  svg.appendChild(text);

  $("body").append(chart.append(svg));

  function gradient() {
    let defs = createSVG("defs");
    let linearGradient = createSVG("linearGradient", {
      id: "grad1",
      x1: "0%",
      y1: "0%",
      x2: "0%",
      y2: "100%"
    });
    let stop1 = createSVG("stop", {
      offset: "0%",
      style: "stop-color:rgb(128,188,43);stop-opacity:1"
    });
    let stop2 = createSVG("stop", {
      offset: "100%",
      style: "stop-color:rgb(189,218,87);stop-opacity:1"
    });
    linearGradient.appendChild(stop1);
    linearGradient.appendChild(stop2);
    defs.appendChild(linearGradient);
    return defs;
  }
}
