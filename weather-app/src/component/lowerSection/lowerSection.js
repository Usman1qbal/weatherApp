import React, { Component } from 'react';
import WeatherPanel from '../weatherPanel/weatherPanel';
import './lowerSection.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as R from 'ramda';


class LowerSection extends Component {
    constructor(props)
    {
        super(props);
        this.state =
        {
            weekTemp: [],
            totalData: [],
            dayList: [
                        {   id: 0,  day:'Sunday'   },
                        {   id: 1,  day:'Monday'   },
                        {   id: 2,  day:'Tuesday'  },
                        {   id: 3,  day:'Wednesday'},
                        {   id: 4,  day:'Thursday' },
                        {   id: 5,  day:'Friday'   },
                        {   id: 6,  day:'Saturday' }
                    ]   
                    
        }  
        
    }
     
    weekDetail = (list) =>
    {
            let currentDateTime = new Date();
            let currentHour = currentDateTime.getHours();
            currentHour = (Math.floor(currentHour / 3))*3;
            let currentDay = currentDateTime.getDay();

            let today = R.filter((
                (list) => {
                            let date = new Date(list.dt_txt);
                            let hour =date.getHours();
                            return  hour === currentHour && date.getDay() === currentDay;
                        }),list);

            let week = R.filter((
                (list)=> {
                            let date = new Date(list.dt_txt);
                            let hour = date.getHours();
                            return hour === 12 && date.getDay() !== currentDay;
                        }),list);
            
            
            today = today.concat(week);
            return today;
    }

    graph = () =>
    {
       this.setState({chart: new Highcharts.chart("chartsContainer", {
            chart: {
                events: {
                    redraw: function () {
                        var label = this.renderer.label('The chart was just redrawn', 100, 120)
                            .attr({
                                fill: Highcharts.getOptions().colors[0],
                                zIndex: 8,
                                
                            })
                            .css({
                                color: "black",
                                height: "10px"
                            })
                            .add();
        
                        setTimeout(function () {
                            label.fadeOut();
                        }, 1000);
                    }
                },
                height:200
            },title:"",
            xAxis: {
                categories: this.state.categories,
                title:""
            },
            yAxis:
            {
                visible : false
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name:'time ->',
                data: this.state.tempList
            }]
        })
    });
    }
   

    currentDayDetail = (dayName) =>
    {
        let myArray = [];
        let myCat = [];
        
        R.map((
            (item)=>{
                        if(item.dayName === dayName)
                        {
                            this.setState
                            ({
                                status: item.status,
                                pressure: item.pressure,
                                humidity: item.humidity,
                                windSpeed: item.windSpeed,
                                imgSrc: item.icon,
                                temperature: item.temperature,
                                dayName: item.dayName
                            })
                        }
                    }),this.state.weekTemp);

        let currentDayList = R.map((
            (item)=>{
                        if(item.dayName === dayName)
                        {
                            let date = new Date(item.date);
                            myCat.push(date.getHours());
                            myArray.push(Math.floor(item.temperature));
                            
                        }
                    }),this.state.totalData);

                    this.setState({
                        categories:myCat,
                        tempList:myArray
                    });

        this.graph();       

    }

    celciusToFarenhietFormula = (value) =>
    {
        return Math.floor(((value * 9)/5)+32);
    }

    farenhietToCelciusFormula = (value) =>
    {
        return Math.floor(((value-32)*5)/9);
    }

    SetTempFarenhiet = () =>
    {
        if(this.state.degree !== "F")
        {
            let weekArray = R.map((
                (item)=>{
                            item.temperature = this.celciusToFarenhietFormula(item.temperature);
                            item.minTemp = this.celciusToFarenhietFormula(item.minTemp);
                            item.maxTemp= this.celciusToFarenhietFormula(item.maxTemp);
                            return item;
                        }),this.state.weekTemp);

            let updateTotalData = R.map((
                (item)=>{
                            item.temperature = this.celciusToFarenhietFormula(item.temperature);
                            item.minTemp = this.celciusToFarenhietFormula(item.minTemp);
                            item.maxTemp= this.celciusToFarenhietFormula(item.maxTemp);
                            return item;
                        }),this.state.totalData);
            
            console.log(this.state.tempList);
            
             let temp = R.map((
                (item)=>{
                            item = this.celciusToFarenhietFormula(item);
                        }),this.state.tempList);

            this.setState({
                            weekTemp : weekArray,
                            totalData: updateTotalData,
                            tempList: temp,
                            temperature:this.celciusToFarenhietFormula(this.state.temperature)
                        });
            this.graph();
            this.set_color('farenhietBtn');
            //console.log(this.state.totalData);
        }
    }

    SetTempCelcius = () =>
    {
        if(this.state.degree !== "C")
        {
            let weekArray = R.map((
                (item)=>{
                            item.temperature = this.farenhietToCelciusFormula(item.temperature);
                            item.minTemp = this.farenhietToCelciusFormula(item.minTemp);
                            item.maxTemp= this.farenhietToCelciusFormula(item.maxTemp);
                            return item;
                        }),this.state.weekTemp);

            let updateTotalData = R.map((
                (item)=>{
                            item.temperature = this.farenhietToCelciusFormula(item.temperature);
                            item.minTemp = this.farenhietToCelciusFormula(item.minTemp);
                            item.maxTemp= this.farenhietToCelciusFormula(item.maxTemp);
                            return item;
                        }),this.state.totalData);
            
            let temp = R.map((
                (item)=>{
                                item = this.farenhietToCelciusFormula(item);
                        }),this.state.tempList);
    
           this.setState
            ({
                weekTemp : weekArray,
                totalData: updateTotalData,
                tempList: temp,
                temperature:this.farenhietToCelciusFormula(this.state.temperature)
            });
            this.graph();
            //console.log(this.state.totalData);
            this.set_color('celciusBtn');
        }
    }

    set_color = (id) =>
    {
        if(id === "celciusBtn"){
        let element = this.refs.celcius;//document.getElementById(`${id}`);
        let element2 = this.refs.farenhiet;//document.getElementById("farenhietBtn");
        element.style.color = "Blue";
        element.style.textDecoration = "underline";
        element2.style.color ="darkcyan";
        element2.style.textDecoration = "none";
        this.setState({ degree: "C"});
        }

        if(id === "farenhietBtn"){
            let element = this.refs.farenhiet;//document.getElementById(`${id}`);
            let element2 = this.refs.celcius;//document.getElementById("celciusBtn");
            element.style.color = "Blue";
            element.style.textDecoration = "underline";
            element2.style.color ="darkcyan";
            element2.style.textDecoration = "none";
            this.setState({ degree: "F"});
        }
        
        
    }

    
    setData = (value) =>
    {
        const weekData = this.weekDetail(value.list);
        
        let totalDetail = R.map((
            (item)=>{
                        const dayName = this.dayNameFind(item.dt_txt)
                        const temperature = item.main.temp;
                        const icon = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`;
                        const minTemp = item.main.temp_min;
                        const maxTemp= item.main.temp_max;
                        const date = item.dt_txt;
                        const status = item.weather[0].description;
                        const humidity = item.main.humidity;
                        const pressure = item.main.pressure;
                        const windSpeed = item.wind.speed;
                        return {dayName,temperature,icon,minTemp,maxTemp,date,status,humidity,pressure,windSpeed};
                    }),value.list);

        //console.log(totalDetail);

        let weekArray = R.map((
            (item)=>
                    {
                        const dayName = this.dayNameFind(item.dt_txt)
                        const temperature = item.main.temp;
                        const icon = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`;
                        const minTemp = item.main.temp_min;
                        const maxTemp= item.main.temp_max;
                        const status = item.weather[0].description;
                        const humidity = item.main.humidity;
                        const pressure = item.main.pressure;
                        const windSpeed = item.wind.speed;
                        return {dayName,temperature,icon,minTemp,maxTemp,status,humidity,pressure,windSpeed};
                    }),weekData);

        weekArray = weekArray.splice(0,5);

        this.setState
        ({
            data : value,
            name : value.city.name +", "+ value.city.country,
            weekTemp: weekArray,
            totalData: totalDetail
        });

        this.currentDayDetail(weekArray[0].dayName);
        this.set_color('celciusBtn');
    }

   
    dayNameFind = (id) =>
    {
        if(id !== undefined)
        {
            let dat = new Date(id);
            let dayID = dat.getDay();
            let today = R.filter((
                (dayList) => {
                                return  dayList.id === dayID;
                             }),this.state.dayList);

            return today[0].day;
        }
    }

    render() { 

        return ( 
            <div className="detailSection">
                <section className="lowerSection">
                    
                    <div className="upperGrid">     
                        <p id="cityName">       {this.state.name}                   </p>
                        <p id="cityDay">        {this.state.dayName}                </p>
                        <p id="cityStatus">     {this.state.status}                 </p>
                    </div>

                    <div className="middleGrid">                     
                        <div className="middleImgDiv">  <img  src={this.state.imgSrc} alt="Today Weather"/>
                        </div>

                        <label id="temperature">{Math.floor(this.state.temperature)}</label>

                        <div className="temperatureType">
                            <a id="celciusBtn" onClick={this.SetTempCelcius} ref="celcius">      ºC      </a>  <label> | </label>
                            <a id="farenhietBtn" onClick={this.SetTempFarenhiet} ref="farenhiet">   ºF      </a>
                        </div>

                        <div className="showDetail">
                            <p>Pressure:    <label id="pressure">{this.state.pressure}  </label>    hPa </p>
                            <p>Humidity:    <label id="humidity">{this.state.humidity}  </label>    %   </p>
                            <p>Wind Speed:  <label id="wind">{this.state.windSpeed}     </label>    mph </p>
                        </div>
                    </div>
                    
                    <div className="graphType">
                        <div className="graphPanel">Temperature</div>
                        <div className="graphPanel">Precipitation</div>
                        <div className="graphPanel">Wind</div>
                    </div>

                    <div id="chartsContainer" name="chartsContainer" className="Chart">
                    </div>

                    
                    <div className="lowerGrid">
                        {
                            this.state.weekTemp.map(
                                                    item =><WeatherPanel    dayName={item.dayName}  icon={item.icon}
                                                                            minTemp={item.minTemp}  maxTemp={item.maxTemp} 
                                                                            day = {this.currentDayDetail}/>
                        )}
                        
                    </div>
                </section>
            </div>
         );
        
    }
}
 
export default LowerSection;
