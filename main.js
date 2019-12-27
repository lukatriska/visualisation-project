let fullName = "Border_Crossing_Entry_Data.csv";
let shortName = "short.csv";

d3.csv(fullName, data => {


  let newData = {};
  let borderCounts = {"US-Mexico Border": 0, "US-Canada Border": 0};
  data.forEach(d => {
    if (['Personal Vehicle Passengers', 'Bus Passengers', 'Pedestrians', 'Train Passengers'].includes(d.Measure)) {
      if (d.Border === "US-Mexico Border") {
        borderCounts["US-Mexico Border"] += parseInt(d.Value);
      } else {
        borderCounts["US-Canada Border"] += parseInt(d.Value);
      }
    }
    // if (newData[d.Measure] === undefined) {
    //   newData[d.Measure] = parseInt(d.Value)
    // } else {
    //   newData[d.Measure] += parseInt(d.Value)
    // }
  });
  console.log(borderCounts);
  console.log(Object.keys(borderCounts).map((key, index) => borderCounts[key]));

  let chart = new Chart(document.getElementById('myChart1'), {
    type: 'doughnut',

    data: {
      labels: Object.keys(borderCounts).map((key, index) => key),
      datasets: [{
        label: 'My First dataset',
        backgroundColor: ['rgb(255,191,71)', 'rgb(255, 99, 132)'],
        data: Object.keys(borderCounts).map((key, index) => borderCounts[key]),
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
  // let chart2 = new Chart(document.getElementById('myChart2'), {
  //   type: 'doughnut',
  //
  //   data: {
  //     labels: Object.keys(borderCounts).map((key, index) => key),
  //     datasets: [{
  //       label: 'My First dataset',
  //       backgroundColor: ['rgb(255,191,71)', 'rgb(255, 99, 132)'],
  //       data: Object.keys(borderCounts).map((key, index) => borderCounts[key]),
  //     }]
  //   },
  // });

});

