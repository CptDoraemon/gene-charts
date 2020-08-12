import heatMap from "./heat-map/heat-map";
import lineChart from "./line-chart/line-chart";
import loadMockData from "./mock-data/load-mock-data";

const createDiv = (id) => {
    let div = document.createElement('div');
    div.id = id;
    document.body.appendChild(div);
    div = null;
};

async function App() {
    try {
        const mockData = await loadMockData();

        createDiv('gene-chart-entry-1');
        createDiv('gene-chart-entry-2');

        lineChart("gene-chart-entry-1", mockData);
        heatMap("gene-chart-entry-2", mockData)
    } catch (e) {
        console.log(e);
    }
}

App();
