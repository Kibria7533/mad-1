import axios from 'axios';
import React, { Component } from 'react';

class Hometeacher extends Component {
    state = {
        data: []
    }
    async componentDidMount() {
        await axios.get(`http://localhost:5000/getteacher`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(data => {
            console.log(data.data);
            this.setState({ data: data.data });

        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        return (
            <div>
                <div id="faculty-sec">
                    <div className="container set-pad">
                        <div className="row text-center">
                            <div className="col-lg-8 col-lg-offset-2 col-md-8 col-sm-8 col-md-offset-2 col-sm-offset-2">
                                <h1 data-scroll-reveal="enter from the bottom after 0.1s" className="header-line">OUR INSTRUCTOR </h1>
                                <p data-scroll-reveal="enter from the bottom after 0.3s">
                                    <pre>
                                        
                                We are not a teacher, but an awakener.
                                        A teacher is one who makes himself progressively unnecessary.
                                         </pre>
        </p>
                            </div>
                        </div>
                        {/*/.HEADER LINE END*/}
                        <div className="row">
                            {this.state.data.map((item, index) => {
                                return (
                                    <div key={index} className="col-lg-4  col-md-4 col-sm-4" data-scroll-reveal="enter from the bottom after 0.4s">
                                        <div className="faculty-div">
                                            <img src={`./uploads/${item.image}`} className="img-rounded" style={{"height":"300px","width":"300px"}}/>
                                            <h3>{item.title} </h3>
                                            <hr />
                                <h4>{item.degignation}</h4>
                                            <p>
                                                {item.text}
                                                </p>
                                                <a href={`${item.websites}`} target="_blank" className="btn btn-info btn-set">Contact me</a>
          
                                        </div>
                                    </div>
                                )
                            })}



                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Hometeacher;