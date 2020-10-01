import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Header from './blog/Header';
import './Dashbordmenu.css'
import { Link, Route } from 'react-router-dom';
import Forms from './Forms';
class Usersinfo extends Component {

    constructor(){
        super()
        this.state = {
            data: [],
        }

    }



    componentDidMount(){
        axios.get(`http://localhost:5000/api/users/getalluser`, {
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
    userdelete=async (id)=>{
       await axios.post(`http://localhost:5000/api/users/deleteuser`,{"id":id}, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(data => {
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
                        <li className="filter-active nav-link d-inline-flex"><Link  to="/Supperadmintables">Home</Link></li>
                        <li className="filter-active nav-link d-inline-flex"><Link  to="/superadminforms">Forms</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link  to="/Topicstable">Topics Table</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link  to="/getcomment">Comments and Releted Posts</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link  to="/usersinfo">User's Info</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link  to="/PostQuestion">Add A Question</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link  to="/AllQuestion">All Question</Link></li>

                    </ul>
                </div>
                <br></br>
                <br></br>
                <hr></hr>
                <div className="col-lg-12 d-inline-flex justify-content-center navbar portfolio ">
                    <ul id="portfolio-flters nav-item">


                        <li className="filter-active nav-link  d-inline-flex"><Link  to="/usersinfo">All Users</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link  to="/writter">All Writters</Link></li>
                        <li className="filter-active nav-link  d-inline-flex"><Link  to="/writteraplicant">Writter Applicant</Link></li>

                    </ul>
                </div>
            </div>
            <div className="container">
                <Link  to="/">Back to Home</Link>

                <div className="col-md-12 ">
                    <h3>All Users</h3>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>User Nmae</th>
                                <th>Email</th>
                                <th>Status</th>
                               
                                <th>Action</th>

                            </tr>



                            {this.state.data.map(user => {
                                return (

                                    <tr key={Math.random()}>
                                        <td>{user.fullname}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.confirmed ? 'Active' : 'Not Active'}</td>
                                       
                                        <td> <button type="button" onClick={()=>this.userdelete(user._id)} className="btn btn-primary" >Delete</button></td>

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

export default Usersinfo
