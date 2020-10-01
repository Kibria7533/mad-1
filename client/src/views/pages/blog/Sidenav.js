import React, { Component } from 'react';
import { Link} from "react-router-dom";
class Sidenav extends Component {
  
  render() {
    return (
      <div className="sidenav">
          {this.props.ch.map((data,index)=>(
                
                <a key={index} onClick={()=>this.props.redata(data.ch)}>{data.ch}</a>
                ))} 
      
      </div>
    );
  }
}

export default Sidenav;