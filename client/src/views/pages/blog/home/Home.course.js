import React, { Component } from 'react';
import axios from 'axios';
class Homecourse extends Component {
  constructor(){
    super();
    this.state={
      data:[]
    }
  }
  componentDidMount(){
    axios.get(`http://localhost:5000/getcourse`, {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
  }).then(data=> {
      console.log(data.data);
      this.setState({data:data.data})

  }).catch(err => {
      console.log(err);
  })

  }
    render() {
        return (
            <div>
                <div id="features-sec" className="container set-pad">
  <div className="row text-center">
    <div className="col-lg-8 col-lg-offset-2 col-md-8 col-sm-8 col-md-offset-2 col-sm-offset-2">
      <h1 data-scroll-reveal="enter from the bottom after 0.2s" className="header-line">FEATURE CONTENT LIST </h1>
      <p data-scroll-reveal="enter from the bottom after 0.3s">
      Want more? Sign up for time-saving teaching tips, 
      effective strategies, and awesome freebies right to your inbox! Look for a freebie in your very first email!
      </p>
    </div>
  </div>
  {/*/.HEADER LINE END*/}
  <div className="row">
    {this.state.data.map((data,index)=>{
      return(
        <div key={index} className="col-lg-4  col-md-4 col-sm-4 justify-content-center" data-scroll-reveal="enter from the bottom after 0.4s">
        <div className="about-div">
        <img src={`./uploads/${data.image}`} className="rounded-circle" alt="Cinque Terre" width="204" height="136"/> 
      <h3>{data.title}</h3>
          <hr />
          <hr />
          <p>
            {data.text} 
          </p>
          <a href={`${data.courseLink}`} target="_blank" className="btn btn-info btn-set">Check Our Course</a>
        </div>
      </div>
      )
    })}
   
   
  </div>
</div>

            </div>
        );
    }
}

export default Homecourse;