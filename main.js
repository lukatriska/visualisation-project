let fullName = "Border_Crossing_Entry_Data.csv";
let shortName = "short.csv";

const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

d3.csv(fullName, data => {

  let years = [];
  let personMeasures = ['Personal Vehicle Passengers', 'Bus Passengers', 'Pedestrians', 'Train Passengers'];
  let allBorderCounts = {"US-Mexico Border": 0, "US-Canada Border": 0};
  let borderCountsForEachYearBorder = {
    "US-Mexico Border": {
      2019: 0,
      2018: 0,
      2017: 0,
      2016: 0,
      2015: 0,
      2014: 0,
      2013: 0,
      2012: 0,
      2011: 0,
      2010: 0,
      2009: 0,
      2008: 0,
      2007: 0,
      2006: 0,
      2005: 0,
      2004: 0,
      2003: 0,
      2002: 0,
      2001: 0,
      2000: 0,
      1999: 0,
      1998: 0,
      1997: 0,
      1996: 0
    },
    "US-Canada Border": {
      2019: 0,
      2018: 0,
      2017: 0,
      2016: 0,
      2015: 0,
      2014: 0,
      2013: 0,
      2012: 0,
      2011: 0,
      2010: 0,
      2009: 0,
      2008: 0,
      2007: 0,
      2006: 0,
      2005: 0,
      2004: 0,
      2003: 0,
      2002: 0,
      2001: 0,
      2000: 0,
      1999: 0,
      1998: 0,
      1997: 0,
      1996: 0
    }
  };
  let borderCountsForEachYearMeasure = {
    "Train Passengers": {
      2019: 0,
      2018: 0,
      2017: 0,
      2016: 0,
      2015: 0,
      2014: 0,
      2013: 0,
      2012: 0,
      2011: 0,
      2010: 0,
      2009: 0,
      2008: 0,
      2007: 0,
      2006: 0,
      2005: 0,
      2004: 0,
      2003: 0,
      2002: 0,
      2001: 0,
      2000: 0,
      1999: 0,
      1998: 0,
      1997: 0,
      1996: 0
    },
    "Bus Passengers": {
      2019: 0,
      2018: 0,
      2017: 0,
      2016: 0,
      2015: 0,
      2014: 0,
      2013: 0,
      2012: 0,
      2011: 0,
      2010: 0,
      2009: 0,
      2008: 0,
      2007: 0,
      2006: 0,
      2005: 0,
      2004: 0,
      2003: 0,
      2002: 0,
      2001: 0,
      2000: 0,
      1999: 0,
      1998: 0,
      1997: 0,
      1996: 0
    },
    "Personal Vehicle Passengers": {
      2019: 0,
      2018: 0,
      2017: 0,
      2016: 0,
      2015: 0,
      2014: 0,
      2013: 0,
      2012: 0,
      2011: 0,
      2010: 0,
      2009: 0,
      2008: 0,
      2007: 0,
      2006: 0,
      2005: 0,
      2004: 0,
      2003: 0,
      2002: 0,
      2001: 0,
      2000: 0,
      1999: 0,
      1998: 0,
      1997: 0,
      1996: 0
    },
    "Pedestrians": {
      2019: 0,
      2018: 0,
      2017: 0,
      2016: 0,
      2015: 0,
      2014: 0,
      2013: 0,
      2012: 0,
      2011: 0,
      2010: 0,
      2009: 0,
      2008: 0,
      2007: 0,
      2006: 0,
      2005: 0,
      2004: 0,
      2003: 0,
      2002: 0,
      2001: 0,
      2000: 0,
      1999: 0,
      1998: 0,
      1997: 0,
      1996: 0
    }
  };

  data.forEach(d => {
    let currValue = parseInt(d.Value);
    let currYear = new Date(d.Date).getFullYear();

    // get the list of years
    if (!years.includes(currYear)) {
      years.push(currYear)
    }

    // check if current d is about persons, not vehicles
    if (personMeasures.includes(d.Measure) && currValue > 1) {
      // organise the needed information for totalInboundPieChart
      if (d.Border === "US-Mexico Border") {
        allBorderCounts["US-Mexico Border"] += currValue;
      } else {
        allBorderCounts["US-Canada Border"] += currValue;
      }

      // organise the needed information for totalInboundByYearBorderStackedBarChart
      if (borderCountsForEachYearBorder["US-Mexico Border"][currYear] !== 0 || borderCountsForEachYearBorder["US-Canada Border"][currYear] !== 0) {
        borderCountsForEachYearBorder[d.Border][currYear] += currValue;
      } else {
        borderCountsForEachYearBorder[d.Border][currYear] = currValue;
      }

      // organise the needed information for totalInboundByYearMeasureStackedBarChart
      if (
        borderCountsForEachYearMeasure["Personal Vehicle Passengers"][currYear] !== 0 ||
        borderCountsForEachYearMeasure["Bus Passengers"][currYear] !== 0 ||
        borderCountsForEachYearMeasure["Pedestrians"][currYear] !== 0 ||
        borderCountsForEachYearMeasure["Train Passengers"][currYear] !== 0
      ) {
        borderCountsForEachYearMeasure[d.Measure][currYear] += currValue;
      } else {
        borderCountsForEachYearMeasure[d.Measure][currYear] = currValue;
      }
    }
  });
  console.log(borderCountsForEachYearMeasure);

  years = years.sort((a, b) => a - b);

  let totalInboundPieChart = new Chart(document.getElementById('myChart1'), {
    type: 'doughnut',

    data: {
      labels: Object.keys(allBorderCounts).map((key, index) => key),
      datasets: [{
        label: 'Total inbound persons, since 1996',
        backgroundColor: [
          "#d21243",
          "#d2ae79"
        ],
        data: Object.keys(allBorderCounts).map((key, index) => allBorderCounts[key]),
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Total inbound persons, since 1996'
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            let dataset = data.datasets[tooltipItem.datasetIndex];
            let total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);

            let percentage = Math.floor(((dataset.data[tooltipItem.index] / total) * 100) + 0.5);

            return `${percentage}%, ${numberWithCommas(parseInt(total * percentage / 100))}`;
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  });

  let totalInboundByYearBorderStackedBarChart = new Chart(document.getElementById('myChart2'), {
    type: 'bar',
    data: {
      labels: years,
      datasets: [
        {
          label: 'US-Mexico Border',
          backgroundColor: "#d21243",
          data: Object.keys(borderCountsForEachYearBorder["US-Mexico Border"]).map((key, index) => borderCountsForEachYearBorder["US-Mexico Border"][key])
        },
        {
          label: 'US-Canada Border',
          backgroundColor: "#d2ae79",
          data: Object.keys(borderCountsForEachYearBorder["US-Canada Border"]).map((key, index) => borderCountsForEachYearBorder["US-Canada Border"][key]),
        },
      ]
    },
    options: {
      tooltips: {
        callbacks: {
          label: tooltipItem => `${numberWithCommas(tooltipItem.yLabel)} people`
        }
      },
      title: {
        display: true,
        text: 'Total inbound persons, since 1996, ordered by border and year'
      },
      scales: {
        xAxes: [
          {stacked: true}
        ],
        yAxes: [
          {stacked: true}
        ]
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  });

  let totalInboundByYearMeasureStackedBarChart = new Chart(document.getElementById('myChart3'), {
    type: 'bar',
    data: {
      labels: years,
      datasets: [
        {
          label: personMeasures[0],
          backgroundColor: "#d21243",
          data: Object.keys(borderCountsForEachYearMeasure[personMeasures[0]]).map((key, index) => borderCountsForEachYearMeasure[personMeasures[0]][key])
        },
        {
          label: personMeasures[1],
          backgroundColor: "#d2ae79",
          data: Object.keys(borderCountsForEachYearMeasure[personMeasures[1]]).map((key, index) => borderCountsForEachYearMeasure[personMeasures[1]][key]),
        },
        {
          label: personMeasures[2],
          backgroundColor: "#4470d2",
          data: Object.keys(borderCountsForEachYearMeasure[personMeasures[2]]).map((key, index) => borderCountsForEachYearMeasure[personMeasures[2]][key]),
        },
        {
          label: personMeasures[3],
          backgroundColor: "#6ad27b",
          data: Object.keys(borderCountsForEachYearMeasure[personMeasures[3]]).map((key, index) => borderCountsForEachYearMeasure[personMeasures[3]][key]),
        },
      ]
    },
    options: {
      tooltips: {
        callbacks: {
          label: tooltipItem => `# of ${personMeasures[tooltipItem.datasetIndex]}: ${numberWithCommas(tooltipItem.value)}`
        }
      },
      title: {
        display: true,
        text: 'Total inbound persons, since 1996, ordered by way of crossing the border and year'
      },
      scales: {
        xAxes: [
          {stacked: true}
        ],
        yAxes: [
          {stacked: true}
        ]
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  });


});


















