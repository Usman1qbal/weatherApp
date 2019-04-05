import React, { Component } from 'react';
import Header from './component/header/header';
import UpperSection from './component/UpperSection/UpperSection';
import LowerSection from './component/lowerSection/lowerSection';
import WeatherApi from './action/weatherApi';

 
class App extends Component {
  state ={
    city : undefined,
    type : undefined,
    detail : undefined
  }
 
  setStatesUpperSection = (city,type) =>
  {
    this.setState({
      city: city,
      type: type
    });
  }

  getweather = (e) =>
  {
    e.preventDefault();
    const {city , type } = this.state;
    this.refs.weather.trigger(city,type);
  }

  getData = (list) =>
  {
     if(list !== undefined){  /* 
    console.log("there11",list); */
    this.setState({ detail : list });
    if(list !== undefined ? ((list.cod === "404") ? alert("Please Insert Correct Data") :   this.refs.lowerSect.setData(list)): null); }
  }

  render() { 
    return ( 
      
      <div>
        <WeatherApi city={this.state.city} type={this.state.type} setDetail={this.getData}  ref="weather"/>
         <Header />
        <UpperSection 
          getweather={this.getweather}
          setType = {this.setStatesUpperSection}
        />
        
       {this.state.detail !== undefined ? (this.state.detail.cod !=="404" ? ( <LowerSection ref="lowerSect"/> ):null ) : null} }
      </div>
     );
  }
}
 
export default App;
