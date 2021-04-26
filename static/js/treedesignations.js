const heritagetrees = "https://opendata.arcgis.com/datasets/fd1d618ac3174ad5be730524a4dd778e_26.geojson"

d3.json(heritagetrees).then(trees => {
    console.log(trees)
    console.log(trees.features)

    let yearDesignated = []

    for (let i = 0; i < trees.features.length; i++) {
        const designation = trees.features[i].properties.YEAR_Designated;
        // console.log(designation)

        if (designation) {
            yearDesignated.push(designation)
        }
    }
    console.log(yearDesignated)

    let sortedYearDes = yearDesignated.sort((a, b) => a - b);
    // console.log(sortedYearDes)
    let counts = {};

    for (var i = 0; i < sortedYearDes.length; i++) {
        var num = sortedYearDes[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    //   console.log(counts);

    let designationYear = Object.keys(counts);
    let treeCount = Object.values(counts);

    console.log(designationYear);
    console.log(treeCount);

    Highcharts.chart('chart1', {

        chart: {
            type: 'column'
        },
        title: {
            text: 'Heritage Trees Designated by Year'
        },
        subtitle: {
            text: 'Source: Portland Open Data'
        },
        xAxis: {
            categories: designationYear,
            crosshair: true,
            title: {
                text: "Year Designated"
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Trees Designated'
            }
        },
        tooltip: {
            formatter: function () {
                return '<strong>' + this.x +
                    '</strong>: <p>' + this.y + '</p>';
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            showInLegend: false,
            data: treeCount
        }]
    });
});




// copy of above for formatting

Highcharts.chart('chart2', {

    title: {
        text: 'Solar Employment Growth by Sector, 2010-2016'
    },

    subtitle: {
        text: 'Source: thesolarfoundation.com'
    },

    yAxis: {
        title: {
            text: 'Number of Employees'
        }
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 2010 to 2017'
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },

    series: [{
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }],

    // responsive: {
    //     rules: [{
    //         condition: {
    //             maxWidth: 500
    //         },
    //         chartOptions: {
    //             legend: {
    //                 layout: 'horizontal',
    //                 align: 'center',
    //                 verticalAlign: 'bottom'
    //             }
    //         }
    //     }]
    // }

});

