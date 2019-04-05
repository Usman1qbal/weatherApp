import React, { Component } from 'react';
import './UpperSection.css';



class upperSection extends Component {
   constructor(props)
   {
       super(props);
       this.state = 
       {
           type: "Search by"
       }
   }
  

    setFindType = (value) =>
    {
        this.setState({ type: "City "+ value  });
    }

    searchDetail=()=>
    {
        this.setState({ type: "Search By"   });
        this.props.setType(this.refs.searchInput.value,this.state.type);
    }

    render() {     
        return ( 
            <section className="upperSection">
                <form onSubmit={this.props.getweather}>
                    <div className="upperSectionGrid">
                   
                        <div className="dropdown">
                            <span id="findTypes" name="findTypes">{this.state.type} </span> 
                            <i className="fa fa-caret-down"></i>

                            <div className="dropdown-content">
                                <p className="option" onClick={this.setFindType.bind(this,"Name")}>     City Name   </p><br/>
                                <p className="option" onClick={this.setFindType.bind(this,"Zip")}>      City Zip    </p>
                            </div>
                        </div>
                        
                        <input type="text" id="searchInput" ref="searchInput" name="searchInput"></input>
                    
                        <button className="searchButton" onClick={this.searchDetail}>  <i className="fa fa-search"></i>  </button>
                    </div>
                </form>
            </section>
            
         );
         
    }
}
 
export default upperSection;