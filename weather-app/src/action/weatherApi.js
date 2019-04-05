import React, { Component } from 'react';


const API_KEY ="c73aa228bfba692462f96e89080aa39a";
class weatherApi extends Component {
    constructor(props)
    {
        super(props);
        this.state =
        {
            list:undefined
        }
    }
    
    trigger = async (city,type) =>
    {
      
        const value = (this.props.type === "City Name" ? `https://api.openweathermap.org/data/2.5/forecast?q=${this.props.city}&units=metric&appid=${API_KEY}` :
        `https://api.openweathermap.org/data/2.5/forecast?zip=${this.props.city},pk&units=metric&appid=${API_KEY}`) ;

        const api_call = await fetch(`${value}`);
        const data = await api_call.json();
        this.setState({ list:data });
        this.props.setDetail(this.state.list);
        console.log("==222=> ",data);
    }
    render()
    {
        
        return(
            <div> 
            </div>
            
        );
    }
}
 
export default weatherApi;