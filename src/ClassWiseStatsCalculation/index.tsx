import React, { FC, useEffect, useState } from "react";
import './index.css';

type Props = {
 wineData:{},
 assignment:string
};

const meanMedianModeHeaderArr = ["Flavanoids Mean", "Flavanoids Median", "Flavanoids Mode"];

const gammaMeanMedianModeHeaderArr = ["Gamma Mean", "Gamma Median", "Gamma Mode"];

const ClassWiseStatsCalculation: React.FC<Props> = (props) => {

  const [classWiseStatistics ,setClassWiseStatistics] = useState<Array<any>>([]);
  const [headerArr ,setHeaderArr] = useState<Array<any>>([]);

  useEffect(()=>{
    if(props.assignment==="assignment1"){
      const classWiseStats = calculateClassWiseStats(props.wineData);
      setClassWiseStatistics(classWiseStats);
    }
    else{
      const classWiseStats = calculateClassWiseGammaStats(props.wineData);
      setClassWiseStatistics(classWiseStats);
    }
    
  },[props.wineData])

  useEffect(()=>{
    if(props.assignment=="assignment1"){
      setHeaderArr(meanMedianModeHeaderArr);
    }
    else{
      setHeaderArr(gammaMeanMedianModeHeaderArr);
    }
  },[])

  function calculateClassWiseGammaStats(dataset:any) {
    dataset.forEach((item:any) => {
      // Calculate Gamma for each data point
      const gamma = (item.Ash * item.Hue) / item.Magnesium;
      item.Gamma = gamma;
    });
  
    const classMap:any = {};
    dataset.forEach((item:any) => {
      const alcoholClass = item.Alcohol;
      const gammaValue = item.Gamma;
      if (!classMap[alcoholClass]) {
        classMap[alcoholClass] = [];
      }
      classMap[alcoholClass].push(gammaValue);
    });
  
    const result = [];
    for (const alcoholClass in classMap) {
      const gammaValues = classMap[alcoholClass];
      const stats = {
        class: alcoholClass,
        mean: calculateMean(gammaValues).toFixed(3),
        median: calculateMedian(gammaValues).toFixed(3),
        mode: calculateMode(gammaValues),
      };
      result.push(stats);
    }
    console.log(result);
    return result;
  }

  // Function to calculate class-wise mean, median, and mode
function calculateClassWiseStats(dataset:any) {
  const classMap:any = {};
  dataset.forEach((item:any) => {
    const alcoholClass = item.Alcohol;
    const flavanoidsValue = item.Flavanoids;
    if (!classMap[alcoholClass]) {
      classMap[alcoholClass] = [];
    }
    classMap[alcoholClass].push(flavanoidsValue);
  });

  const result = [];
  for (const alcoholClass in classMap) {
    const flavanoidsValues = classMap[alcoholClass];
    const stats = {
      class: alcoholClass,
      mean: calculateMean(flavanoidsValues).toFixed(3),
      median: calculateMedian(flavanoidsValues).toFixed(3),
      mode: calculateMode(flavanoidsValues),
    };
    result.push(stats);
  }
  return result;
}

// Function to calculate the mean
function calculateMean(arr:Array<[]>) {
  if (!arr.length) return 0;
  const sum = arr.reduce((acc:any, val:any) => acc + Number(val), 0);
  return sum / arr.length;
}

// Function to calculate the median
function calculateMedian(arr:Array<[]>) {
  if (!arr.length) return 0;
  const sortedArr:any = arr.slice().sort((a:any, b:any) => a - b);
  const mid = Math.floor(arr.length / 2);
  return arr.length % 2 === 0 ? (sortedArr[mid - 1] + sortedArr[mid]) / 2 : sortedArr[mid];
}

// Function to calculate the mode
function calculateMode(arr:Array<[]>) {
  if (!arr.length) return [];
  const freqMap:any = {};
  arr.forEach((item:any) => (freqMap[item] = (freqMap[item] || 0) + 1));

  let maxFrequency = 0;
  let modes:any = [];
  for (const key in freqMap) {
    const frequency = freqMap[key];
    if (frequency > maxFrequency) {
      maxFrequency = frequency;
      modes = [parseFloat(key).toFixed(3)];
    } else if (frequency === maxFrequency) {
      modes.push(parseFloat(key).toFixed(3));
    }
  }
  return modes;
}

return (
  <>
  <h4>{props.assignment.toUpperCase()}</h4>
    <div className="table-header">
      <div>
<table>
  <tr>
    <th className="table-headings">Measure</th>
  </tr>
  {headerArr.length && headerArr.map((item:any,index)=>{
    return <tr><th className="table-headings">{item}</th></tr>})}
</table>
</div>
<div className="table-sub-division">
  {classWiseStatistics.length && classWiseStatistics.map((item:any,index)=>{
    return (
      <table>
        <tr>
          <th>Class {item.class}</th>
        </tr>
        <tr>
        <td>{item.mean}</td>
        </tr>
        <tr>
        <td>{item.median}</td>
        </tr>
        <tr>
          
        <td>{item.mode.toString().replace(/,/g, '\n')}</td>
          </tr>

      </table>
      
    )
   })}
</div>
    </div>
    </>
)
}

export default ClassWiseStatsCalculation;