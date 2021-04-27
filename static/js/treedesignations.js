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
