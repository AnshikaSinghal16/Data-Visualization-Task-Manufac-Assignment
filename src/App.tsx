import React from 'react';
import logo from './logo.svg';
import './App.css';
import ClassWiseStatsCalculation from './ClassWiseStatsCalculation';
import wineData from './Wine-Data.json';

function App() {
  return (
    <div className="App">
  
        <p className='assignment-header'>
         <ClassWiseStatsCalculation wineData={wineData} assignment={"assignment1"}/>
         <ClassWiseStatsCalculation wineData={wineData} assignment={"assignment2"}/>
        </p>
     
    </div>
  );
}

export default App;
