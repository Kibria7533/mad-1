import React, { Component } from 'react';

class Reletedposts extends Component {
   
    render() {
        return (
            <div>
                {this.props.releted.length?<div><h4 style={{"color":"ActiveCaption","textAlign":"center"}}>Releted Posts</h4>
                <hr></hr>
                {this.props.releted.map((data,index)=>(
                    <div key={Math.random()}>
                        {/* <a href={`${data}`}>{data}</a> */}
                        <a key={index}>{data}</a>
                        <br></br>
                 </div> 
               
                 )
                )}</div>:''}
                 
              
            </div>
        );
    }
}

export default Reletedposts;