import Highcharts from 'highcharts/highcharts';
import data from 'highcharts/modules/data';
import Exporting from 'highcharts/modules/exporting';
import _ from 'lodash';

data(Highcharts);
Exporting(Highcharts);

const convertJsonToRowData = (json) => {
    const rowData = [];

    /*
        data format
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

        xAxis: {
            type: 'category',
        },

        yAxis: {
            type: 'linear',
            title: {
                text: 'Expression (TPM)'
            },
        },

        tooltip: {
            useHTML: true,
        }

    });
};

export default lineChart
