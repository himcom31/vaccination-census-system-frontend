import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LineGraph from "./LineGraph";
import DataTable from "./DataTable";
import BarGraph from "./BarGraph";

const Trend = () => {
  // Table
  const [data, setData] = useState([]);

  const getAllData = async () => {
    const { data } = await axios.get("https://vaccination-census-system-backend-3.onrende/records");
    setData(data.data);
  };
  useEffect(() => {
    getAllData();
  }, []);


  // Line Chart
  const [lineData, setLineData] = useState([]);
  const [lineData2, setLineData2] = useState([]);
  
  const getLineChartData =async ()=>{
    const lineChart = await axios.get("https://vaccination-census-system-backend-3.onrende/number-vaccinated");
    const lineChart2 = await axios.get("https://vaccination-census-system-backend-3.onrende/number-not-vaccinated"); 
    setLineData(lineChart.data.data);
    setLineData2(lineChart2.data.data);
  }
  useEffect(()=>{
    getLineChartData();
    //  console.log("lineData (Vaccinated):", lineData);
  // console.log("lineData2 (Not Vaccinated):", lineData2);
  },[]);
  

  // Bar Chart
  const [barDataMale,setBarDataMale] = useState([]);
  const [barDataFemale,setBarDataFemale] = useState([]);
  const [barDataOthers,setBarDataOthers] = useState([]);
const getBarChartData = async ()=>{
  const barChartMale = await axios.get("https://vaccination-census-system-backend-3.onrende/number-gender-male");
  const barChartFemale = await axios.get("https://vaccination-census-system-backend-3.onrende/number-gender-female");
  const barChartOthers = await axios.get("https://vaccination-census-system-backend-3.onrende/number-gender-others");
  setBarDataMale(barChartMale.data.data);
  setBarDataFemale(barChartFemale.data.data);
  setBarDataOthers(barChartOthers.data.data);
  // console.log("BarChart Male Data:", barDataMale.data.data);
// console.log("BarChart Female Data:", barDataFemale.data.data);
// console.log("BarChart Others Data:", barDataOthers.data.data);

}
useEffect(()=>{
  getBarChartData();

},[]);

// Styles for charts


  return (
    <>
    <div className="flex justify-center mt-8">
  <Link
    to="/form"
    className="inline-flex items-center gap-2 rounded-2xl px-6 py-2.5 text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
  >
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
    </svg>
    Back to Form
  </Link>
</div>

      <DataTable data={data} />
      <LineGraph lineData={lineData} lineData2={lineData2}/>
      <BarGraph style={{padding:'20px',width:'80%'}} barDataMale={barDataMale} barDataFemale={barDataFemale} barDataOthers={barDataOthers}/>
    </>
  );
};

export default Trend;
