import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './blog/Header';
import './Dashbordmenu.css'
import {Link,Route} from 'react-router-dom';
import Forms from './Forms';
const Superadmintables = () => {

    const [data, setdata] = useState([])


    useEffect(() => {

        axios.get(`http://localhost:5000/getall`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(reletedval => {
           // console.log(reletedval.data);
           if(reletedval.data.length)
            setdata(reletedval.data)

        }).catch(err => {
            console.log(err);
        })
    }, []
    )

    return (
        <div className="container">
        <div className="row">
        <div className="col-lg-12 d-inline-flex justify-content-center navbar portfolio ">
          <ul id="portfolio-flters nav-item">
          <li  className="filter-active nav-link d-inline-flex"><Link exact to="/Supperadmintables">Home</Link></li>
            <li  className="filter-active nav-link d-inline-flex"><Link exact to="/superadminforms">Forms</Link></li>
            <li  className="filter-active nav-link  d-inline-flex"><Link exact to="/Topicstable">Topics Table</Link></li>
            <li  className="filter-active nav-link  d-inline-flex"><Link exact to="/getcomment">Comments and Releted Posts</Link></li>
            <li  className="filter-active nav-link  d-inline-flex"><Link exact to="/usersinfo">User's Info</Link></li>
            <li className="filter-active nav-link  d-inline-flex"><Link  to="/PostQuestion">Add A Question</Link></li>
            <li className="filter-active nav-link  d-inline-flex"><Link  to="/AllQuestion">All Question</Link></li>
            
          </ul>
        </div>
      </div>
        <div className="container">
            <Link exact to="/">Back to Home</Link>
            <div className="col-md-12 ">
                {data.map((value) => {
                    return (
                        <div key={Math.random()}>
                            <h1>{value.Topic}</h1>
                            <hr></hr>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Chapter</th>
                                        <th>EDIT</th>
                                        <th>DELETE</th>
                                    </tr>

                                    {value.posts.map(post => {
                                        return (

                                            <tr key={Math.random()}>
                                                <td>{post.ch}</td>
                                                <td> <button type="submit" className="btn btn-primary">Edit</button> </td>
                                                <td> <button type="submit" className="btn btn-primary" >Delete</button></td>

                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                    )
                })}
            </div>
        </div>
        
        </div>
    )
}

export default Superadmintables
