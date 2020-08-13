import Highcharts from 'highcharts/es-modules/masters/highcharts.src';
import 'highcharts/es-modules/masters/modules/heatmap.src';
import 'highcharts/es-modules/masters/modules/annotations.src';
import 'highcharts/es-modules/modules/exporting.src';
import {cloneDeep} from 'lodash-es';

// Heatmap(Highcharts);
// Annotations(Highcharts);
// Exporting(Highcharts);

/**
 * Convert data to fit _heatMap
 */
const heatMap = (elementId, data) => {
    const xCategories = data.maxCategory.slice();
    const yCategories = data.infos.map(obj => obj.name);
    const seriesData = [];
    const logTPM = (val) => Math.log2(val + 1);

    for (let i=0; i<data.infos.length; i++) {
        const geneObj = data.infos[i];
        /*
        {
            category: [],
            data: [],
            name: string
        }
        * */
        for (let j=0; j<geneObj.data.length; j++) {
            seriesData.push([j, i, logTPM(geneObj.data[j])])
        }
    }

    _heatMap(elementId, xCategories, yCategories, seriesData);
};

const _heatMap = (elementId, xCategories, yCategories, seriesData) => {

    Highcharts.chart(elementId, {

        chart: {
            type: 'heatmap',
        },

        title: {
            text: 'Heat Map',
            align: 'left',
            x: 40
        },

        xAxis: {
            categories: xCategories.slice(),
        },

        yAxis: {
            categories: yCategories.slice(),
            title: null,
        },

        colorAxis: {
            stops: [
                [0.1, '#78b8ed'],
                [0.5, '#fffbbc'],
                [0.8, '#c4463a'],
                [1, '#c4463a']
            ],
            min: 0
        },

        legend: {
            align: 'right',
            layout: 'vertical',
            verticalAlign: 'top',
            y: 24,
            title: {
                text: 'TPM(log2+1)',
            }
        },

        tooltip: {
            formatter: function () {
                return `
                    <b>Sample Name:</b> ${xCategories[this.point.x]}<br> 
                    <b>Gene:</b> ${yCategories[this.point.y]}<br> 
                    <b>TPM(log2+1):</b> ${this.point.value}<br> 
                    `
            }
        },

        series: [{
            borderWidth: 0,
            data: cloneDeep(seriesData),
            dataLabels: {
                enabled: false,
            },
        }],

        caption: {
            text: `
                <b>NP</b>: Normal person; 
                <b> CHD</b>: Coronary heart disease; 
                <b>CRC</b>: Colorectal cancer; 
                <br>
                <b>HCC</b>: Hepatocellular carcinoma;
                <b>PAAD</b>:Pancreatic adenocarcinoma; 
                <b>WhB</b>: Whole blood.
            `,
            useHTML: true,
            align: 'center',
        },

    });
};

export default heatMap
