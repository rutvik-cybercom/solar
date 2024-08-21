import React from "react";
import "./SideBar.css";
import ReactApexChart from "react-apexcharts";
import ReactSlider from "react-slider";
import { Link } from "react-router-dom";
import MapImage from "../../assets/icon_Waypoint.svg"
import { useState } from "react";
import { useEffect } from "react";

export default function SideBar({ onSliderValueChange,getReportSlider,getReportParameter }) {
  const [sliderValue,setSliderValue]=useState(80)

  const [response, setResponse] = useState(null);
  const [hasData, setHasData] = useState(false);

  let responseData;
  useEffect(() => {
    const storedResponse = localStorage.getItem('savedResponse');
    if (storedResponse) {
      const data = JSON.parse(storedResponse);
      const value = data.meta.arg.percentOfEnergyToGenerate;
      responseData = data.payload.result;
      if (value) {
        setSliderValue(parseInt(value, 10));
        setChartSeries([parseInt(value, 10), 100 - parseInt(value, 10)]);
      }
      setResponse(responseData);
      if (responseData) {
        setHasData(true);
      }
    }
  }, [localStorage.getItem('savedResponse')]);

  useEffect(() =>{
    if(getReportSlider>1){
      setSliderValue(getReportSlider);
      setChartSeries([parseInt(getReportSlider, 10), 100 - parseInt(getReportSlider, 10)]);
      responseData=getReportParameter;
      setResponse(responseData);
      if (responseData) {
        setHasData(true);
      }
    }
  },[getReportSlider])



  const [chartSeries, setChartSeries] = useState([sliderValue, 100 - sliderValue]);

  const chartData = {
    series: chartSeries, 
    options: {
      chart: { type: "donut" },
      legend: { show: false },
      dataLabels: { enabled: false },
      tooltip: { enabled: false },
      fill: { colors: ["#9EBF1A", "#135483"] },
      stroke: { width: 0 },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: "65%",
            labels: {
              show: true,
              name: { show: false },
              total: {
                show: true,
                showAlways: true,
                formatter: function (w) {
                  return w.config.series[0] + "%";
                },
              },
            },
          },
        },
      },
    },
  };

  const handleSliderChange = (newValue) => {
    setSliderValue(newValue);
    onSliderValueChange(newValue);
    setChartSeries([newValue, 100 - newValue]);
  };


 return (
    <>
      <div className="cardBorder">
        <div className="cardHeader">Summary</div>
        <div className="cardHeaderTop">
          <div className="chartWrapper">
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="donut"
              />
            
          </div>

          <ReactSlider
            className="hSlider"
            thumbClassName="hSliderThumb"
          //  defaultValue={[sliderValue]}
            trackClassName="hSliderTrack"
            value={sliderValue} 
            onChange={handleSliderChange}//
            renderThumb={(props, state) => <div {...props}></div>}
            /> 
         

          <p className="txtLight text-center">
            Drag bar to change {sliderValue} % of total energy
            <br /> generaged by solar system
          </p>
        </div>

        {hasData && (
        <div className="cardHeaderBottom">

        <div className="flex justify-between bottomContent">
          <div className="fLabel">kWhrs generated:</div>
          <div className="fValue">{response ? Number(response.kwPerHourGenerated).toFixed(2):'14,3865'}</div>
          </div>

          <div className="flex justify-between bottomContent">
            <div className="fLabel">Yearly Savings:</div>
            <div className="fValue">${response ? Number(response.yearlySavings).toFixed(2):'2,157'}</div>
          </div>
          <div className="flex justify-between bottomContent">
            <div className="fLabel">Total Turn-key Cost:</div>
            <div className="fValue">${response ? Number(response.totalTurnKeyCost).toFixed(2):'14,825'}</div>
          </div>
          <div className="flex justify-between bottomContent">
            <div className="fLabel">Mo. payment if solar <br/>system is financed:</div>
            <div className="fValue"> ${response ? Number(response.paymentWithFinancing).toFixed(2) : '292'}
            <small className="dBlock">(5-years term, 7% APR)</small></div>
          </div>
          <div className="flex justify-between bottomContent">
            <div className="fLabel">Total Turn-key Cost:</div>
            <div className="fValue">${response ? Number(response.totalTurnKeyCost).toFixed(2):'14,825'}</div>
          </div>
          <div className="flex justify-between bottomContent">
            <div className="fLabel">Order Status:</div>
            <div className="fValue"> {response ? response.orderStatus:'Preliminary'}</div>
          </div>
          <div className="flex justify-between bottomContent">
            <div className="fLabel">Questions?</div>
            <div className="fValue"><button className="button-medium-default">Contact Us</button></div>
          </div>
        </div>
        )}
      </div>
      <div className="cardBorder mt-30">
        <div className="cardHeader">Solar Panels</div>
        <div className="cardHeaderTop text-center">
            <img src={MapImage}/>
            <h5 className="headingType5">The location of the panels on the<br/> roof has not been specified</h5>
            <p className="txtLight">Please tap on the below button</p>
            <Link to="/solar_design" className="btm-medium-secondary">Edit Panel Areas</Link>
        </div>
      </div>
    </>
  );
}
