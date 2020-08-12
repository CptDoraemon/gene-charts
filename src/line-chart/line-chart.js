import Highcharts from 'highcharts';
import data from 'highcharts/modules/data';
import Exporting from 'highcharts/modules/exporting';
import _ from 'lodash';

data(Highcharts);
Exporting(Highcharts);

const convertJsonToRowData = (json) => {
    const rowData = [];

    /*
        data: {
            rows: [
                [null, 'Ola', 'Kari'], // series names
                ['Apples', 1, 5], // category and values
                ['Pears', 4, 4], // category and values
                ['Oranges', 3, 2] // category and values
            ]
        }
     */

    // series
    const series = json.maxCategory.slice();
    series.unshift(null);
    rowData.push(series);

    // rows
    const array = json.infos;
    for (let gene=0; gene<array.length; gene++) {
        const geneData = [array[gene].name, ...array[gene].data];
        rowData.push(geneData)
    }

    console.log(rowData);
    return rowData
};

const lineChart = (elementId, data) => {
    const _data = _.cloneDeep(data);
    const _rowData = convertJsonToRowData(_data);

    Highcharts.chart(elementId, {

        data: {
            columns: _rowData
        },

        boost: {
            useGPUTranslations: true
        },

        title: {
            text: 'Line Chart',
            align: 'left',
            x: 40
        },

        subtitle: {
            // text: 'Temperature variation by day and hour through 2017',
            // align: 'left',
            // x: 40
        },

        xAxis: {
            type: 'category',
        },

        yAxis: {
            type: 'linear',
            title: {
                text: 'Expression (TPM)'
            },
        },

        labels: {
            style: {
                // color: "black",
                // fontSize: '16px',
                // fontWeight: 'normal',
                // position: "absolute",
                // bottom: '0px'
            },
            items: [{
                // html: "<b>NP</b>: Normal person; <b> CHD</b>: Coronary heart disease; <b>CRC</b>: Colorectal cancer; <b>HCC</b>: Hepatocellular carcinoma; <br>" +
                //     "<b>PAAD</b>:Pancreatic adenocarcinoma; <b>WhB</b>: Whole blood.",
                style: {
                    // textAlign: 'center',
                    // position: "absolute",
                    // bottom: 0

                },
            }],

        },

    });
};

export default lineChart
