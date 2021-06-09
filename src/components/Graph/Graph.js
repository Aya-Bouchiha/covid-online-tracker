import React from 'react';
import './Graph.css';
import { Line } from "react-chartjs-2";
import useFetch from '../Utilities/useFetch';
import { useParams } from 'react-router-dom';
let options = {
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          displayFormats: {
            quarter: "ll",
          },
        },
      },
    ],
  },
};
// const colors = {
  // cases: { primaryColor: "#DB9200", LightColor: "#FFAA00" },
  // recovered: {primaryColor:"#11AF92",lightColor:"#16DFBa"},
  // deaths: {primaryColor:"#BF2101",lightColor:"#F42A01"},
// };
const colors = {
  cases: { primaryColor: "#FFAA00", LightColor: "#FFAA00" },
  recovered: { primaryColor: "#16DFBa" },
  deaths: { primaryColor: "#F42A01" },
};
const Graph = () => {
  const numOfDays = 60;
  let fetchedData = useFetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=${numOfDays}`);
  let { type } = useParams(); // the parametre in the url which indicate the type of data.
  /* 
  you can just use [??] in place of if statement :)
  let {type} == useParams() ?? 'cases' 
  */
  if (!type || !(type in colors) ) {
     type = 'cases';
  }
  const colorOfTheLine = colors[type];
  let data = []; // will contains time (x) and number of typeOfDaata[cases or recovered or deaths](y)
  let labelsTime = [] //will contains X AXES labels which are time.
  // data for line Graph
  let dataInLineGraph = {
    labels: labelsTime,
    datasets: [
      {
        label: `${type} in last ${numOfDays} `,
        lineTension: 0.1,
        borderColor: colorOfTheLine['primaryColor'] ,
        backgroundColor: colorOfTheLine["primaryColor"] + '80' ,//+ '80',
        data: data,
      },
    ],
  };
    const getData = () => {
      if (fetchedData !== null) {
          let last = 0,x,y;
            for (let time in fetchedData[type]) {
                if (last) {
                    x = time;
                    y =
                        fetchedData[type][time] - fetchedData[type][last];
                  data.push({ x, y });
                  labelsTime.push(x); 
                }
                last = time;
          }
        }
      return 1;
    }
    return (
      <section className="graph">
        {getData() && <Line data={dataInLineGraph} options={options} />}
      </section>
    );
}
export default Graph;