import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Header from './blog/Header';
import './Dashbordmenu.css'
import { Link, Route } from 'react-router-dom';
import Forms from './Forms';
class writteraplicants extends Component {

    constructor(){
        super()
        this.state = {
            data: [],
        }

    }



   async componentDidMount(){
       await axios.get(`http://localhost:5000/api/users/getallwritteraplicant`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(reletedval => {
            // console.log(reletedval.data);
            if (reletedval.data.length)
               this.setState({data:reletedval.data})
               else{
                this.setState({data:[]})
               }

        }).catch(err => {
            console.log(err);
        })
    }
    deletewritteraplicant=async (id)=>{
       await axios.post(`http://localhost:5000/api/users/deletewritterapplicant`,{"id":id}, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(data => {
            // console.log(reletedval.data);
            // if (reletedval.data.length)
            //    this.setState({data:reletedval.data})
            this.componentDidMount();

        }).catch(err => {
            console.log(err);
        })
    }
    writterapplicant_to_writter=async (id)=>{
        await axios.post(`http://localhost:5000/api/users/writterapplicant_to_writter`,{"id":id}, {
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
             }
         }).then(data => {
             // console.log(reletedval.data);
             // if (reletedval.data.length)
             //    this.setState({data:reletedval.data})
             this.componentDidMount();
 
         }).catch(err => {
             console.log(err);
         })
     }
    render(){

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 d-inline-flex justify-content-center navbar portfolio ">
                    <ul id="portfolio-flters nav-item">
                        <li className="filter-active nav-link d-inline-flex"><Link exact to="/Supperadmintables">Home</Link></li>
                        <li className="filter-active nav-link d-inline-flex"><Link exact to="/superadminforms">Forms</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link exact to="/Topicstable">Topics Table</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link exact to="/getcomment">Comments and Releted Posts</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link exact to="/usersinfo">User's Info</Link></li>

                    </ul>
                </div>
                <br></br>
                <br></br>
                <hr></hr>
                <div className="col-lg-12 d-inline-flex justify-content-center navbar portfolio ">
                    <ul id="portfolio-flters nav-item">


                        <li className="filter-active nav-link  d-inline-flex"><Link exact to="/usersinfo">All Users</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link exact to="/writter">All Writters</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link exact to="/writteraplicant">Writter Applicant</Link></li>

                    </ul>
                </div>
            </div>
            <div className="container">
                <Link exact to="/">Back to Home</Link>
                <div className="col-md-12 ">
                <h3>All Writter Applicant</h3>
                    <table className="table">
                        <tbody>
                            <tr>
                            <th>Name</th>
                                <th>Email</th>
                                <th>Education</th>
                                <th>Institute</th>
                                <th>Depertment</th>
                                <th>Mobile Number</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>



                            {this.state.data.map(user => {
                                return (

                                    <tr key={Math.random()}>
                                        <td>{user.fullname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.EducationLevel}</td>
                                        <td>{user.eductioninstitute}</td>
                                        <td>{user.DepertmentName}</td>
                                        <td>{user.Mobile}</td>
                                        <td>{user.Address}</td>
                                        <td>{user.confirmed ? 'Active  ' : 'Not Active '}<button type="button" onClick={()=>this.writterapplicant_to_writter(user._id)}>Permit</button></td>
                                       
                                        <td> <button type="button" onClick={()=>this.deletewritteraplicant(user._id)}  >Delete</button></td>


                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    )
}
}

export default writteraplicants
