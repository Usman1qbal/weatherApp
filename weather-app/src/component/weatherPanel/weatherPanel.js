import React, { Component } from 'react';

class weatherPanel extends Component {
    constructor(props)
    {
        super(props);
        this.state=
        {
            day:undefined
        }
    }
   name=(e)=>
   {
        this.props.day(e.currentTarget.getAttribute('data-value'));
   }
    render() { 
        //this.setState({ day : this.props.dayName });
        return ( 
            
                <div data-value={this.props.dayName} onClick={this.name}>
                        <p className="weatherPanelHeading" >     {this.props.dayName}    </p>

                        <div className="middleImgDiv">  <img src={this.props.icon} alt="Today Weather"/>
                        </div>

                        <label className="min tempLabel">     {Math.floor(this.props.minTemp)} º </label>
                        
                        <label className="tempLabel"> {Math.floor(this.props.maxTemp)} º  </label>
                </div>
                
         );
    }
}
 
export default weatherPanel;