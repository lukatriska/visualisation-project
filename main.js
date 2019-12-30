let fullName = "Border_Crossing_Entry_Data.csv";

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
        backgroundColor: ['rgba(255,73,65,0.64)', 'rgba(255,206,86,0.42)'],
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
          backgroundColor: 'rgba(255,206,86,0.42)',
          data: Object.keys(borderCountsForEachYearBorder["US-Mexico Border"]).map((key, index) => borderCountsForEachYearBorder["US-Mexico Border"][key])
        },
        {
          label: 'US-Canada Border',
          backgroundColor: 'rgba(255,73,65,0.64)',
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
          backgroundColor: 'rgba(255,206,86,0.42)',
          label: personMeasures[0],
          data: Object.keys(borderCountsForEachYearMeasure[personMeasures[0]]).map((key, index) => borderCountsForEachYearMeasure[personMeasures[0]][key])
        },
        {
          label: personMeasures[1],
          backgroundColor: 'rgba(255,73,65,0.64)',
          data: Object.keys(borderCountsForEachYearMeasure[personMeasures[1]]).map((key, index) => borderCountsForEachYearMeasure[personMeasures[1]][key]),
        },
        {
          label: personMeasures[2],
          backgroundColor: 'rgba(255,99,231,0.55)',
          data: Object.keys(borderCountsForEachYearMeasure[personMeasures[2]]).map((key, index) => borderCountsForEachYearMeasure[personMeasures[2]][key]),
        },
        {
          label: personMeasures[3],
          backgroundColor: 'rgba(69,81,255,0.56)',
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

  let peopleVehicleRatioChart = new Chart(document.getElementById('myChart4'), {
    type: 'bar',
    data: {
      labels: years,
      datasets: [
        {
          label: "Inbound personal vehicles",
          backgroundColor: 'rgba(255,206,86,0.42)',
          data: Object.keys(borderCountsForEachYearMeasure[personMeasures[0]]).map((key, index) => parseInt(borderCountsForEachYearMeasure[personMeasures[0]][key] / 1.5))
        }
      ]
    },
    options: {
      tooltips: {
        callbacks: {
          label: tooltipItem => `# of personal inbound vehicles: ${numberWithCommas(tooltipItem.value)}`
        }
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

  let personalVehicleVsBusLitresOfFuelBurnedChart = new Chart(document.getElementById('myChart5'), {
    type: 'bar',
    data: {
      labels: years,
      datasets: [
        {
          label: "Litres of fuel that would have been consumed by 20 people buses",
          backgroundColor: 'rgba(255,206,86,0.42)',
          data: Object.keys(borderCountsForEachYearMeasure[personMeasures[0]]).map((key, index) =>
            parseInt(borderCountsForEachYearMeasure[personMeasures[0]][key] / 20 * 13 * 1.5))
        },
        {
          label: "Litres of fuel consumed by personal vehicles",
          backgroundColor: 'rgba(255,110,78,0.6)',
          data: Object.keys(borderCountsForEachYearMeasure[personMeasures[0]]).map((key, index) =>
            parseInt(borderCountsForEachYearMeasure[personMeasures[0]][key] * 10 * 1.5))
        }
      ]
    },
    options: {
      tooltips: {
        callbacks: {
          label: tooltipItem => `# of litres burned: ${numberWithCommas(tooltipItem.value)}`
        }
      },
      title: {
        display: true,
        text: 'Litres of fuel consumed by two different ways of transporting people'
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

  let amountOfCO2SavedByUsingBusesOnlyChart = new Chart(document.getElementById('myChart6'), {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: "Amount of CO2 that would not have been released, if all personal vehicle passengers travelled by buses, in kilotonnes",
          backgroundColor: 'rgba(255,206,86,0.42)',
          data: Object.keys(borderCountsForEachYearMeasure[personMeasures[0]]).map((key, index) =>
            parseInt(((borderCountsForEachYearMeasure[personMeasures[0]][key] * 10 * 1.5) -
              (borderCountsForEachYearMeasure[personMeasures[0]][key] / 20 * 13 * 1.5)) * 0.0000023))
        },
        // {
        //   label: "Litres of fuel consumed by personal vehicles",
        //   backgroundColor: "#d21243",
        //   data: Object.keys(borderCountsForEachYearMeasure[personMeasures[0]]).map((key, index) =>
        //     parseInt(borderCountsForEachYearMeasure[personMeasures[0]][key] * 10))
        // }
      ]
    },
    options: {
      tooltips: {
        callbacks: {
          label: tooltipItem => `CO2 that would not have been released, if all personal vehicle passengers travelled by buses, in kilotonnes: ${numberWithCommas(tooltipItem.value)}`
        }
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


















