import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Header from './blog/Header';
import './Dashbordmenu.css'
import { Link, Route } from 'react-router-dom';
import Forms from './Forms';
class writters extends Component {

    constructor(){
        super()
        this.state = {
            data: [],
        }

    }



    componentDidMount(){
        axios.get(`http://localhost:5000/api/users/getallwritter`, {
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
    changetouser=async(id)=>{
        axios.post(`http://localhost:5000/api/users/getallwritter`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(reletedval => {
            // console.log(reletedval.data);
            if (reletedval.data.length)
               this.setState({data:reletedval.data})

        }).catch(err => {
            console.log(err);
        })

    }

    wrriterdelete=async(id)=>{
        axios.post(`http://localhost:5000/api/users/deletewritter`,{"id":id}, {
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
    change_to_user=async (id)=>{
        await axios.post(`http://localhost:5000/api/users/change_to_user`,{"id":id}, {
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
                <h3>All Writters</h3>
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
                                        <td>{user.confirmed ? 'Active' : 'Not Active'}</td>
                                       
                                        <td> <button type="button" onClick={()=>this.wrriterdelete(user._id)} >Delete</button></td>
                                        <td> <button type="button" onClick={()=>this.change_to_user(user._id)}  >Change to User</button></td>

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

export default writters
